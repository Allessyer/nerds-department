# Nerds Department

Nerds Department is a nonprofit learning community for energetic school students and university students who want to learn, build meaningful projects, and gain experience that feels like real work.

The repository contains the project website and the public volunteer application flow.

## Local preview

The site is static and has no build step:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` deploys the site whenever changes are pushed to `main`. GitHub Pages must use **GitHub Actions** as its source in the repository settings.

## Volunteer applications

The website sends applicants to the GitHub issue form in `.github/ISSUE_TEMPLATE/volunteer.yml`. Applications are public by design so contributors can discover one another and collaborate.
