# Frontend, HTML, CSS, and JavaScript Best Practices

These standards apply to the static resume site in `frontend/`.

## HTML

- Use semantic elements such as `header`, `nav`, `main`, `section`, `article`, and `footer` to describe the page structure.
- Maintain a logical heading order with one `h1` per page. Use headings for sections, not for visual styling.
- Give every meaningful image useful `alt` text; use empty `alt` only for decorative images.
- Associate each form control with a visible `label`, make all controls keyboard-accessible, and use native elements before adding ARIA.
- Set the document language, viewport metadata, descriptive title, and concise meta description.
- Link CSS in `css/style.css` and JavaScript in `js/visitor-counter.js` using `defer`. Do not add inline styles or inline event handlers.

## CSS

- Organize rules from global foundations to layout, components, and responsive overrides. Keep selectors shallow and component-scoped.
- Use custom properties for repeated colors, spacing, typography, shadows, and breakpoints.
- Prefer class selectors and a consistent naming convention such as component names with `__element` and `--modifier` forms.
- Build mobile-first layouts with flexible units (`rem`, `%`, `fr`, `minmax`) and add media queries only when the design needs them.
- Do not use `!important` except for a documented, unavoidable interoperability case.
- Preserve visible focus indicators, sufficient color contrast, readable line length, and spacing that supports touch interaction.
- Avoid styling by tag position, deeply coupled selectors, and fixed dimensions that break on narrow screens or increased text size.

## JavaScript

- Keep scripts focused on behavior. Use HTML and CSS for content and presentation.
- Use `const` by default and `let` only when reassignment is necessary. Avoid `var` and implicit globals.
- Prefer small functions with clear names and one responsibility. Keep DOM selectors near the behavior that uses them.
- Wait for the DOM with `defer`; do not rely on scripts executing before the document is ready.
- Use `fetch` with explicit error handling, timeouts or cancellation where appropriate, and user-facing fallback states.
- Never place secrets, privileged keys, or security decisions in browser code. The visitor counter endpoint must accept untrusted callers safely.
- Render untrusted data with `textContent` or safe DOM APIs. Do not inject it with `innerHTML`.
- Keep network URLs and other deploy-specific settings in a small, documented configuration point.

## Quality and review

- Test the page at narrow and wide viewports, with keyboard-only navigation, and with browser zoom enabled.
- Verify that the page works when the visitor-counter request is slow, fails, or returns malformed data.
- Keep the site fast: minimize assets, avoid unnecessary libraries, and serve appropriately sized images.
- A review should confirm semantic structure, accessibility, responsive behavior, safe DOM updates, and a clear empty/error state for dynamic content.
