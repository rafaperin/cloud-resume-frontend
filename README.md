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
│   └── visitor-counter.js
├── 404.html
└── index.html
```

## Local preview

Serve the files from the repository root:

~~~sh
python3 -m http.server 8000
~~~

Open `http://localhost:8000` in a browser. The visitor-counter request requires the deployed backend API and may show its fallback state during local preview.

## Standards

See [FRONTEND_STANDARDS.md](FRONTEND_STANDARDS.md) for accessibility, responsive design, JavaScript safety, and review expectations.

## CI/CD

Pull requests validate the required static files, JavaScript syntax, and a local HTTP preview. A push to `main` deploys only staged site files to the Azure Storage `$web` container through GitHub OIDC, purges the affected Cloudflare cache entries, and smoke-tests the public site. Azure infrastructure and the deployment identity are managed by the [backend repository](https://github.com/rafaperin/cloud-resume-backend).
