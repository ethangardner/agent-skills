---
name: go-value-pointer-semantics
description: Apply consistent value vs. pointer semantics when writing or reviewing Go code. Use this whenever you write a Go method receiver, design a Go struct or its constructor, decide between a value and pointer receiver, choose how a function passes or returns a custom type, or review Go for semantic consistency. Trigger it even when the user only says "write a Go type/method/API" or "is this idiomatic Go?" without naming semantics explicitly, since the value/pointer choice is implicit in almost every Go type. Do NOT use for non-Go languages.
---

# Go Value/Pointer Semantics

Choosing value vs. pointer semantics is one of the most consequential design decisions in Go, and it is implicit in nearly every type, method, and function you write. This skill encodes a single rule and the decision procedure for applying it.

## The core rule

**Pick a semantic per type at declaration time, then make every method, parameter, and return value for that type respect it.** A type is *value-semantic* or *pointer-semantic*; it is never both. APIs conform to the type's semantic — they do not get to change it.

Why this matters: a reader builds a mental model of the code by tracking how data flows. If a type is copied in one function and shared by pointer in the next, that model breaks, and bugs, data races, and aliasing surprises slip in unseen. Consistency is what keeps the model intact as the codebase and team grow. Inconsistent semantics for a single type is the thing to flag in review.

The trade-off being managed (Bill Kennedy's framing): value semantics keep data on the stack and reduce GC pressure, but require copies to be stored and tracked; pointer semantics keep one shared copy, but push data to the heap and add GC pressure. Neither is "better" — consistency is.

## Decision procedure

Decide the semantic when you **declare the type**, using this order:

1. **Built-in types** — numeric, string, bool. → **Value semantics.** Don't take pointers to share them without a strong, specific reason.

2. **Reference types** — slice, map, channel, func, interface (write `any`, not `interface{}`). → **Value semantics.** These already hold an internal pointer to a shared backing structure, so passing them by value is cheap and keeps the header on the stack. Don't use `*[]T`, `*map[K]V`, etc. (The main exception: handing a slice/map into an `Unmarshal` call.) This extends to modern additions: **iterator types** (`iter.Seq[T]`, `iter.Seq2[K,V]`) are func values and are value-semantic, and a **generic type parameter** carries the semantic of the type it resolves to — a `[]T` or `func(T)` parameter is still value-semantic regardless of `T`.

3. **Struct (user-defined) types** — this is where you actually decide. Ask: *is it reasonable and practical to make copies of this value as it moves between functions?*
    - **Yes** → **value semantics.** The data is small, self-contained, and a copy is a fine independent value (e.g. `time.Time`).
    - **No, or unsure** → **pointer semantics.** Choose this when mutations must be isolated to one shared instance, when copying would be incorrect (the value owns a resource like a file descriptor, mutex, or connection), or when you simply aren't 100% sure copying is safe. When in doubt, prefer pointer semantics.

## The constructor declares the choice

A factory/constructor function is the clearest signal of a type's semantic — write it first and let it commit you:

- Returns `T` (e.g. `func Now() Time`) → **value semantics** for the whole API.
- Returns `*T` (e.g. `func Open(name string) (*File, error)`) → **pointer semantics** for the whole API.

Once the constructor commits, everything follows.

## What "respecting the semantic" looks like

**Value-semantic type:** value receivers, value parameters, value returns — *even for mutation*. A mutating method takes a value receiver, mutates its own copy, and returns a new copy:

```go
// time.Time is value-semantic. Add mutates a copy and returns it.
func (t Time) Add(d Duration) Time {
    t.sec += int64(d / 1e9)
    // ...
    return t
}
```

**Pointer-semantic type:** pointer receivers, pointer parameters, pointer returns — *even for methods that don't mutate*. The non-mutating method still uses a pointer receiver to stay consistent:

```go
// *os.File is pointer-semantic. Chdir mutates nothing but still uses *File.
func (f *File) Chdir() error { /* ... */ }

// functions accept the pointer too
func epipecheck(file *File, e error) { /* ... */ }
```

When a function shares a `*T` with you, assume you may **not** copy the pointed-to value — copying a pointer-semantic value yields undefined behavior.

## The one standing exception: unmarshaling

**Unmarshaling always uses pointer semantics, regardless of the type's chosen semantic**, because it must write back into the caller's value. This is true even for value-semantic types like `time.Time`:

```go
func (t *Time) UnmarshalJSON(data []byte) error { /* ... */ }
func (ip *IP) UnmarshalText(text []byte) error { /* ... */ }
```

The same applies to `UnmarshalBinary`, `UnmarshalText`, `GobDecode`, and similar decode hooks. Outside of unmarshaling, a pointer receiver on an otherwise value-semantic type should raise a flag.

## Method existence

Add a method only when it is reasonable for a piece of data to *have that capability*. Methods give data behavior; that behavior is what lets functions accept different concrete types through interfaces (behavioral polymorphism). Modern Go (1.18+) adds **generics** as a second, parametric form of polymorphism — use interfaces when you're decoupling on *behavior* and type parameters when you're decoupling on *shape over many types*. Both still respect the chosen semantic: an interface holds whatever the concrete value's semantic is, and a type parameter inherits the semantic of the type that satisfies it. Don't attach methods that don't represent a genuine capability of the data.

## Modern Go (this guidance is timeless; the syntax around it is not)

The value/pointer *design decision* is version-agnostic and still correct on current Go. But the article predates generics, iterators, and the loop change, so keep these in mind:

- **`for range` is value-semantic by default (and safe since Go 1.22).** Ranging over a slice/array/map hands you a **copy** of each element — `for _, v := range xs { v.x = 1 }` mutates a copy and is a no-op on the backing data. To mutate in place, index (`xs[i].x = 1`) or range over pointers. Separately, as of Go 1.22 the loop variable is a fresh copy each iteration, so the old "capture in a goroutine" aliasing bug is gone — don't reintroduce the `v := v` workaround.
- **`net/netip` is the modern value-semantic exemplar.** For new code prefer `netip.Addr` (a small, comparable, copyable value type) over `net.IP` (`[]byte`). It's value semantics done right in modern Go.
- **`new(expr)` (Go 1.26)** returns a pointer to a value — handy when a pointer-semantic field needs initializing without a temporary. Don't hand-roll `x := v; &x`.
- **Compose with `use-modern-go`.** This skill decides *which semantic*; it does not dictate *which syntax*. When a `use-modern-go` skill (or equivalent modern-Go guidance) is available, defer to it for syntax-level choices — `any` over `interface{}`, `slices`/`maps`/`cmp` over hand-rolled loops, `for i := range n`, iterators, etc. — and apply this skill's semantic rules on top.

## Prototype-first workflow

When the right semantic isn't obvious, write a concrete working implementation first (one that could ship), learn what the data and transformations actually require, *then* refactor to decouple via interfaces. Don't abstract before you understand the data — every problem is a data-transformation problem, and the data dictates the semantics.

## When reviewing code

Scan for a single type being copied in one place and shared by pointer in another. Specifically flag:
- A pointer receiver on a type whose constructor returns `T` (and it isn't an unmarshal hook).
- A value receiver on a type whose constructor returns `*T`.
- `*[]T`, `*map[K]V`, `*chan T` parameters without a clear reason.
- Mixed value/pointer parameters or returns for the same type across an API.

## Worked examples from the standard library

For full annotated examples — `time.Time` (value), `net.IP`/`net.IPMask` (reference), and `os.File` (pointer), plus the reasoning behind each — read `references/stdlib-examples.md`.