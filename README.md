# Bit Trade Net

Bit Trade Net is a responsive React + TypeScript client-portal frontend built with Vite.

## Stack

- React
- TypeScript
- Vite
- React Router
- Lucide React
- GitHub Pages + GitHub Actions

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

This repository is configured for a static Vite build. The included workflow builds `dist/` and publishes it through GitHub Pages.

In GitHub:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main`.
4. Open the URL shown by the Pages deployment.

The app uses normal client-side navigation with a fallback to the dashboard route.

## Important implementation note

This repository is a frontend client-portal implementation. It does not contain a server, payment processor, custody system, blockchain transaction signer, or real withdrawal execution. Connect those functions only through a properly secured backend and clearly represent transaction/account status accurately.

Do not place private API keys, wallet seed phrases, passwords, or other secrets in this repository.
