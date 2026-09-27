# Content Practices

These standards apply to all public content in the Cloud Resume frontend repository.

## Source consistency

- Treat the rendered HTML, Markdown resumes, `llms.txt`, metadata, structured discovery files, and social assets as one public content set.
- When changing any resume fact, role, project milestone, skill, certification, contact detail, date, or public URL in `index.html`, update every related Markdown resume and discovery document in the same change.
- Keep page title, meta description, Open Graph metadata, Twitter metadata, canonical links, `llms.txt`, `robots.txt`, and `sitemap.xml` accurate whenever the public site structure, description, or canonical URL changes.
- Do not publish an incomplete translation or use a machine translation without human review for professional terminology, names, dates, and credentials.

## Languages

- Public resume content must be available in English (`en`), Portuguese (`pt-BR`), and Spanish (`es`). English is the progressive-enhancement fallback.
- Every visible, translatable string in the language selector must have an equivalent value in all three supported locales.
- Maintain `resume.md`, `resume.pt-BR.md`, and `resume.es.md` together with the rendered resume. They must express the same facts, although grammar and idiomatic wording may differ by language.
- Set the document `lang` attribute to the selected locale and provide controls with localized labels and accessible names.
- Preserve proper names, organization names, product names, URLs, technical identifiers, and official certification titles unless an established localized form exists.

## Review and validation

- Review content changes for factual consistency across all language variants and machine-readable documents.
- Verify the language selector with keyboard navigation and at narrow and wide viewports. Confirm it persists the selected language and that dynamic controls and fallback states use the selected language.
- CI must verify that all localized Markdown files, language-selector assets, and locale keys exist before deployment.
