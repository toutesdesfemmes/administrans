// Thin adapter over the self-hosted Umami tracker, loaded as a global by the script tag
// that vite.config.js injects at build time.
//
// Pageviews are not sent from here: the tracker tracks them itself, including client-side
// navigations (it patches history.pushState/replaceState). Only custom events are ours.
//
// `umami` is absent during the vite-ssg prerender (no window), when the build has no tracker
// env vars, before the deferred script has parsed, and when a blocker drops it: in all four
// cases the call below is a no-op.
const umami = () => (typeof window === 'undefined' ? null : window.umami)

export function trackEvent(name, data = {}) {
  umami()?.track(name, data)
}
