# Web Performance Technique Checklist

A categorized menu of techniques to pull from once an audit's diagnostic
phase (see `SKILL.md`) has identified which category actually applies.
Organized around three diagnostic questions, plus layout stability as a
fourth, separate concern.

## 1. What's the browser doing that could be done later?

- Avoid blocking the main thread; break up long tasks (over 50ms) with
  `requestIdleCallback` or `scheduler.yield()`.
- Reduce the number of network requests and defer non-critical assets.
- Use native `loading="lazy"` for images and iframes below the fold.
- Use the facade pattern for non-critical widgets (e.g. chat widgets) —
  render a lightweight placeholder and load the real thing on interaction.
- Dynamically load assets not needed until user interaction (e.g. a search
  suggestions library).
- Use worker threads for heavy computation (complex filtering of long
  lists, data processing).
- Use `fetchpriority="low"` to de-prioritize assets that are in the initial
  viewport but not critical (icons in a collapsed accordion, off-canvas
  carousel images).
- Flag any render-blocking assets served from a third party — these are
  single points of failure.
- Use the `content-visibility` CSS property to skip an element's rendering
  work (layout and paint) until it's needed.
- Use CSS containment to let the browser reason about a subtree without
  considering state outside it.
- Use `IntersectionObserver` to lazy-initialize components only when they
  enter the viewport, rather than initializing everything on load.
- Defer analytics and tag-manager scripts — they're almost never on the
  critical path. Load with `async`/`defer`, or delay until after `load` or
  first interaction.
- Code-split at the route level so users don't pay for JS on routes they
  never visit.

## 2. What's the browser doing that needs to happen sooner?

- Check backend response time via TTFB — target under 0.8s.
- Confirm HSTS is enabled on the domain.
- Check first contentful paint — target under 1.8s.
- Find the assets in the critical path and check whether they're
  discoverable in the initial HTML:
  - The LCP element should have `fetchpriority="high"`.
  - Never lazy-load an image likely to be the LCP element.
  - Critical assets (fonts, hero images) should be in the source HTML, not
    hidden behind a CSS `url()` or injected via JavaScript.
- Check for a graceful fallback while web fonts load:
  - Preload critical fonts with `<link rel="preload">` and the
    `crossorigin` attribute.
  - Preconnect to font domains hosted elsewhere, or use `103 Early Hints`.
- Preload external CSS files with `103 Early Hints` where supported.
- Confirm images have explicit `width`/`height` or a set aspect ratio.
- Consider self-hosting critical assets to avoid extra domain connections.
- Consider speculation rules to prerender the likely next page (prerender
  on `:hover`/`:focus` as a middle ground between prefetch and prerender).
- Inline critical CSS directly into `<head>` to unblock first render — no
  round trip should be required for above-the-fold content.
- If a page depends on an API call for meaningful content, initiate that
  call as early as possible — ideally server-side rather than waiting for
  client JS to boot and fire it.
- For server-rendered pages, consider streaming HTML so the browser can
  start parsing and downloading subresources before the response completes.
- Preconnect to required third-party domains.

## 3. What's being done that isn't needed at all?

- Check whether the page is loading more than it needs.
- Use WOFF2 for fonts; prefer variable fonts.
- Confirm dependencies are tree-shaken.
- Confirm text-based assets are served compressed, and with the best
  available compression — Brotli meaningfully outperforms gzip for text.
- Check for ETag usage — differentiating resource representations improves
  caching efficiency.
- Check whether shared compression dictionaries are in use.
- Confirm the page is eligible for back/forward cache (bfcache).
- Check caching headers — long `max-age` on versioned/hashed assets,
  `stale-while-revalidate` for content that changes but tolerates brief
  staleness.
- Confirm assets are served from a CDN.
- Check code-splitting and keep bundles under roughly 50kb compressed.
- Check for any remaining HTTP/1.1-only connections.
- Avoid layout thrashing — don't read a layout property (e.g.
  `offsetHeight`) immediately before writing a style change; batch reads
  before writes, or use `requestAnimationFrame`.
- Use `{ passive: true }` for scroll/touch listeners.
- Debounce/throttle heavy handlers on `resize`/`scroll`.
- Audit and remove unused CSS (PurgeCSS, DevTools Coverage tab) — even a
  few hundred KB of dead CSS delays rendering.
- Serve images in modern formats (AVIF > WebP > JPEG/PNG) with responsive
  `srcset`/`sizes` so mobile doesn't download desktop-sized assets.
- Avoid `@import` inside CSS files — it creates serial fetch chains;
  combine into one file or use `<link>` tags.
- Audit `document.querySelectorAll` calls in hot paths (scroll/animation
  frames) — cache results or use a more targeted approach.
- Be skeptical of polyfills — audit what's genuinely still needed for the
  actual browser support target and strip the rest.
- Watch for memory leaks — uncleaned event listeners and timers keep
  objects alive and degrade long sessions.
- Use `will-change` sparingly, only on elements about to animate, and
  remove it once the animation completes.
- Prefer CSS transitions/transforms over JS-driven animation — transforms
  and opacity can animate entirely on the compositor thread.
- Bind event listeners only when needed; avoid loading extra styles until
  they're needed.
- Use the `@scope` CSS at-rule to target elements in specific subtrees
  instead of overly specific selectors; avoid complex selectors generally.

## 4. Layout stability (CLS)

- Find media and dynamic content that doesn't reserve space for itself via
  `height`/`width` or `aspect-ratio`.
- Avoid inserting content above existing content after load (banners,
  cookie notices, injected ads); if it must appear, reserve the space
  upfront with a min-height placeholder.
- Use `font-display: optional` for non-critical fonts to prevent shift
  entirely, or `font-display: swap` with a closely matched fallback stack.
  Tune the fallback with `size-adjust`, `ascent-override`, and
  `descent-override` to minimize shift on swap.
- Be careful with animations that change layout properties (`width`,
  `height`, `top`, `margin`) — these trigger reflow and can shift
  surrounding content. Prefer transforms.
- Give dynamic embeds (ads, iframes, third-party widgets) a fixed container
  size — unfilled space is a better outcome than shifting content below it.
- Use DevTools' paint-flashing and layout-shift highlighting to visually
  confirm the source of a shift.

## Supporting tools

- Search Console — identify pages with poor Core Web Vitals and group by
  shared issue type so a fix's impact is magnified across the site.
- PageSpeed Insights — quick performance tips and baseline metrics.
- Yellow Lab Tools — compression and request-count issues.
- Treo (or equivalent RUM dashboard) — distribution of real-user CWV data.
- Lighthouse treemap — dependency size, candidates for tree-shaking.
- bundlejs.com / bundlephobia.com — lighter dependency alternatives.
- capo.js — optimize `<head>` tag ordering.

## Third-party script hygiene

- Analyze TTFB, LCP, and interaction-event subparts to locate the real
  bottleneck rather than optimizing broadly.
- Place third-party tags after `document` complete where possible.
- Periodically audit the tag manager for scripts that can be removed.
- Maintain an owner and purpose for each third-party tag.
- Limit duplicate-function third parties (e.g. one analytics provider per
  site) and periodically review polyfill usage.
