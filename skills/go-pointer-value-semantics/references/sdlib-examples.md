# Standard-library examples of consistent semantics

Three worked cases. Each shows how a real Go package commits to one semantic and respects it everywhere. Use these as templates when you're unsure what consistency looks like in practice.

## Contents
- [Built-in types: `strings` package (value)](#built-in-types-strings-package-value)
- [Reference types: `net.IP` / `net.IPMask` (value)](#reference-types-netip--netipmask-value)
- [User-defined value type: `time.Time` (value)](#user-defined-value-type-timetime-value)
- [User-defined pointer type: `os.File` (pointer)](#user-defined-pointer-type-osfile-pointer)

---

## Built-in types: `strings` package (value)

Built-in numeric/textual/boolean data is handled with value semantics. The `strings` API never shares these by pointer:

```go
func Replace(s, old, new string, n int) string
func LastIndex(s, sep string) int
func ContainsRune(s string, r rune) bool
```

Strings and ints go in and out by value. No `*string` sharing.

---

## Reference types: `net.IP` / `net.IPMask` (value)

> **Modern note:** `net.IP` is still the canonical illustration of a slice-based named type following value semantics, so it's used here for teaching. For *new* code, though, prefer `net/netip` — `netip.Addr` is a small, comparable, copyable struct value type that models the same value-semantic philosophy with the benefits of a fixed-size, allocation-free value. Treat `net.IP` below as the historical example, `netip.Addr` as the modern default.

```go
type IP []byte
type IPMask []byte
```

Both are slice-based, so both are reference types and follow value-semantic rules. `Mask` is a *mutation* operation, yet it uses a value receiver, takes its argument by value, builds a brand-new `IP`, and returns a copy:

```go
func (ip IP) Mask(mask IPMask) IP {
    if len(mask) == IPv6len && len(ip) == IPv4len && allFF(mask[:12]) {
        mask = mask[12:]
    }
    if len(mask) == IPv4len && len(ip) == IPv6len && bytesEqual(ip[:12], v4InV6Prefix) {
        ip = ip[12:]
    }
    n := len(ip)
    if n != len(mask) {
        return nil
    }
    out := make(IP, n)
    for i := 0; i < n; i++ {
        out[i] = ip[i] & mask[i]
    }
    return out
}
```

The built-in `append` follows the same value-semantic mutation pattern — slice in, new slice out:

```go
var data []string
data = append(data, "string")
```

The only pointer-semantic method on `IP` is the unmarshal hook, which is the standing exception:

```go
func (ip *IP) UnmarshalText(text []byte) error {
    if len(text) == 0 {
        *ip = nil
        return nil
    }
    s := string(text)
    x := ParseIP(s)
    if x == nil {
        return &ParseError{Type: "IP address", Text: s}
    }
    *ip = x
    return nil
}
```

Outside unmarshaling, a `*IP` receiver should make you stop and look.

---

## User-defined value type: `time.Time` (value)

```go
type Time struct {
    sec  int64
    nsec int32
    loc  *Location
}
```

The constructor commits the API to value semantics by returning `Time`, not `*Time`:

```go
func Now() Time {
    sec, nsec := now()
    return Time{sec + unixToInternal, nsec, Local}
}
```

`Add` is a mutation, and it respects value semantics — value receiver, mutate the copy, return a new copy:

```go
func (t Time) Add(d Duration) Time {
    t.sec += int64(d / 1e9)
    nsec := t.nsec + int32(d%1e9)
    if nsec >= 1e9 {
        t.sec++
        nsec -= 1e9
    } else if nsec < 0 {
        t.sec--
        nsec += 1e9
    }
    t.nsec = nsec
    return t
}
```

Functions accept `Time` by value too:

```go
func div(t Time, d Duration) (qmod2 int, r Duration)
```

The *only* pointer-semantic methods on `Time` are the decode hooks — the exception, not a contradiction:

```go
func (t *Time) UnmarshalBinary(data []byte) error
func (t *Time) GobDecode(data []byte) error
func (t *Time) UnmarshalJSON(data []byte) error
func (t *Time) UnmarshalText(data []byte) error
```

---

## User-defined pointer type: `os.File` (pointer)

The constructor returns `*File`, committing the whole API to pointer semantics — `File` values are always shared, never copied:

```go
func Open(name string) (file *File, err error) {
    return OpenFile(name, O_RDONLY, 0)
}
```

Every method respects this — including ones that never mutate. `Chdir` mutates nothing but still takes a `*File` receiver for consistency:

```go
func (f *File) Chdir() error {
    if f == nil {
        return ErrInvalid
    }
    if e := syscall.Fchdir(f.fd); e != nil {
        return &PathError{"chdir", f.name, e}
    }
    return nil
}
```

Free functions accept `*File` too:

```go
func epipecheck(file *File, e error) {
    if e == syscall.EPIPE {
        if atomic.AddInt32(&file.nepipe, 1) >= 10 {
            sigpipe()
        }
    } else {
        atomic.StoreInt32(&file.nepipe, 0)
    }
}
```

A `File` owns an OS resource (a file descriptor); copying it would be incorrect. That's the textbook case for pointer semantics. When given a `*File`, do not copy the pointed-to value — results are undefined.