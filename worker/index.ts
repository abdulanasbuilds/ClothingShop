/**
 * Cloudflare Worker entry point for the Wearix React SPA.
 *
 * The application is a client-rendered Vite build. Cloudflare serves the
 * generated files from dist/public through the ASSETS binding, while the
 * Wrangler config provides SPA fallback routing for Wouter.
 */
export default {
  async fetch(request: Request, env: { ASSETS: { fetch: (request: Request) => Promise<Response> } }) {
    return env.ASSETS.fetch(request);
  },
};
