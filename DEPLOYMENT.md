Rekova App — Deployment Guide

This repository is configured to publish the built static site to GitHub Pages (`gh-pages` branch) and includes a `public/CNAME` file so Pages will serve the site at `rekovarecovery.com`.

What I prepared for you:
- `.github/workflows/deploy-gh-pages.yml` — GitHub Action to build and publish `dist/` to `gh-pages` on push to `main`.
- `public/CNAME` — ensures GitHub Pages will use `rekovarecovery.com` as the site domain.
- `public/appguide/index.html` and `public/landing.html` — landing pages at `/appguide/` and `/landing.html`.
- `public/qr/index.html` — QR preview and download link.

Next steps you must perform (requires your GitHub and DNS access):

1) Push the repo to GitHub (create a repository and push `main`):

```bash
git add -A
git commit -m "Prepare site + GH Pages deployment"
git remote add origin git@github.com:<your-username>/<your-repo>.git
git push -u origin main
```

2) Wait for GitHub Action to run (Actions → Build and Deploy to GitHub Pages). It will build and publish `dist/` to the `gh-pages` branch.

3) Configure DNS for `rekovarecovery.com` to point at GitHub Pages (one-time):

- Add A records (IPv4) pointing to GitHub Pages IP addresses:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153

- (Optional) If using ALIAS/ANAME with apex domain, configure accordingly.

4) Validate Pages settings:
- In GitHub repo → Settings → Pages, set source to `gh-pages` branch and save. The `CNAME` file is already present.
- GitHub will provision TLS; allow a few minutes for cert issuance.

5) Confirm site:
- The app guide will be available at:
  - https://rekovarecovery.com/appguide/
  - fallback: https://<username>.github.io/<repo>/appguide/

QR code to point visitors to the public path (already prepared at /qr):
- High-res QR to place on stickers or prints:
  https://api.qrserver.com/v1/create-qr-code/?size=1200x1200&data=https://rekovarecovery.com/appguide

If you'd like, I can:
- Create a GitHub repo and push this code for you (I will need your GitHub repo URL or a personal access token; I cannot accept credentials here).
- Configure Netlify/Vercel instead (I'll add config files and a recommended workflow; you'll still need to connect your Git provider or provide deploy tokens).
- Create a printable PDF sticker with the QR and short instructions — tell me the sticker size and any wording.

If you're ready, paste the GitHub repo URL and I will show the exact commands to create the remote and push, or I can generate the print-ready QR sticker now.