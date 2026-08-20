# Nerds Department

Nerds Department is a nonprofit learning community for energetic school students and university students who want to learn, build meaningful projects, and gain experience that feels like real work.

The repository contains the multilingual project website and its shared volunteer application flow.

## Local preview

The site is static and has no build step:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` deploys the site whenever changes are pushed to `main`. GitHub Pages must use **GitHub Actions** as its source in the repository settings.

## Volunteer applications

Every volunteer call on the website sends applicants to one Google Form. The English, Russian, and Kazakh views share the same application destination, while the selected site language is saved in the visitor's browser and can also be shared with `?lang=ru` or `?lang=kk`.
