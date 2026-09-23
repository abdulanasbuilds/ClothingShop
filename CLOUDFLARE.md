# Cloudflare Pages deployment

This project is a static Vite/React SPA and is compatible with Cloudflare Pages.

Use these settings:

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `pnpm install --frozen-lockfile && pnpm run build:cloudflare` |
| Build output directory | `dist/public` |
| Node version | 22 or newer |
|

The `client/public/_redirects` file keeps all Wouter routes working on direct navigation and refresh. The `client/public/_headers` file applies long-lived caching to hashed assets while keeping `index.html` revalidatable.

The Cloudflare build intentionally runs Vite only. It does not bundle or start the optional Express development server, so the deployed site remains edge-compatible and does not require Node runtime APIs at request time.
