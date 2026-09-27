# Cloud Resume Frontend

Static resume website for the Cloud Resume Challenge.

The page renders Rafael Ferreira's resume and displays a visitor count by calling the public Azure Functions API. HTML, CSS, and JavaScript are intentionally dependency-free and deploy as static website files.

## Technology

- Semantic HTML
- Responsive, accessible CSS
- Browser JavaScript with Fetch API
- Azure Storage static website hosting

## Repository ownership

This repository is the single source of truth for the Cloud Resume frontend:

- HTML, CSS, JavaScript, and static assets
- Frontend deployment configuration and CI/CD

Python, Azure Functions, tests, and Bicep infrastructure belong in [cloud-resume-backend](https://github.com/rafaperin/cloud-resume-backend). Do not mirror frontend changes into the legacy mixed repository.

## Repository layout

```text
.
├── css/
│   └── style.css
├── js/
│   ├── language-selector.js
│   ├── theme-toggle.js
│   └── visitor-counter.js
├── CONTENT_STANDARDS.md
├── 404.html
├── index.html
├── resume.es.md
├── resume.md
└── resume.pt-BR.md
```

## Local preview

Serve the files from the repository root:

~~~sh
python3 -m http.server 8000
~~~

Open `http://localhost:8000` in a browser. The visitor-counter request requires the deployed backend API and may show its fallback state during local preview.

## Standards

See [FRONTEND_STANDARDS.md](FRONTEND_STANDARDS.md) for accessibility, responsive design, JavaScript safety, and review expectations. See [CONTENT_STANDARDS.md](CONTENT_STANDARDS.md) for synchronized content and localization requirements.

## CI/CD

Pull requests validate the required static files, JavaScript syntax, and a local HTTP preview. A push to `main` synchronizes only staged site files to the Azure Storage `$web` container through GitHub OIDC and deletes stale blobs, configures the Cloudflare `Link` header that advertises the Markdown resume, `llms.txt`, and ARD manifest, then purges affected cache entries and smoke-tests the public site. Azure infrastructure and the deployment identity are managed by the [backend repository](https://github.com/rafaperin/cloud-resume-backend).

## Languages

The language selector provides the resume in English, Portuguese, and Spanish, remembers a visitor’s selection locally, and updates page metadata and dynamic control labels. The same content is available to non-browser consumers in [English](resume.md), [Portuguese](resume.pt-BR.md), and [Spanish](resume.es.md) Markdown.

## Content-use policy

`robots.txt` permits search indexing and AI use at query time, while declining model training:

```text
Content-Signal: search=yes, ai-input=yes, ai-train=no
```

The deployment maintains a Cloudflare Response Header Transform Rule with the `Link` relations for `resume.md`, `llms.txt`, and `/.well-known/ard.json`. The `CLOUDFLARE_API_TOKEN` repository secret must have **Transform Rules: Edit** and the existing cache-purge permission for this step.
