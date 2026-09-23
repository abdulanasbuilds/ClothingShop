# ClothingShop

A reusable, client-ready clothing e-commerce website template built by **Abdul Anas (@abdulanasbuilds)**.

This repository is not intended to represent one permanent clothing brand. It is a **reusable starting point for future clothing-industry client projects**: the visual system, responsive layouts, styling foundations, routing structure, UI primitives, and Cloudflare deployment setup can be customized into a different brand without rebuilding the project from zero.

> **Template philosophy:** build the foundation once, then customize the brand, content, products, imagery, messaging, routes, and business requirements for each client.

---

## What This Repository Is

**ClothingShop** is a React + Vite frontend template designed around a modern fashion / clothing storefront aesthetic.

The repository currently provides:

- A responsive clothing/fashion visual system
- Reusable UI primitives based on Radix UI
- Tailwind CSS 4 integration
- Custom CSS for the storefront visual language
- Responsive desktop/tablet/mobile breakpoints
- Wouter client-side routing
- Error-boundary protection
- Theme-provider infrastructure
- Product, collection, article/blog, contact, about, and storefront-oriented layout styling
- Image-driven editorial sections
- Motion and reveal effects with reduced-motion support
- Cloudflare Workers static-asset deployment
- SPA fallback routing through Wrangler
- Long-lived caching for hashed assets
- TypeScript type checking
- Prettier formatting
- A patched Wouter dependency used by the project

The template is intentionally **frontend-first**. It is not currently a complete production commerce backend, inventory system, payment processor, CMS, customer database, or order-management platform.

Those capabilities can be added when a particular client actually needs them.

---

## Intended Use

The primary use case is **rapid client customization**.

A typical project lifecycle is:

1. Start from this repository.
2. Duplicate/fork the template for a clothing client.
3. Replace the template identity with the client's brand.
4. Replace imagery and product content.
5. Adjust navigation and routes to the client's business.
6. Connect the required contact, ordering, payment, CMS, or commerce systems.
7. Configure the client's domain and deployment environment.
8. Run the production checks.
9. Launch.

This makes the repository a **base template**, not a finished one-size-fits-all clothing store.

---

## Current Architecture

The application is a client-rendered React SPA.

```
React
  ↓
Vite
  ↓
dist/public
  ↓
Cloudflare Workers Static Assets
  ↓
Cloudflare edge delivery
```

The Worker itself is deliberately minimal. It passes incoming requests to the Cloudflare Assets binding, while Wrangler handles SPA fallback routing.

### Frontend

- **React 19**
- **TypeScript**
- **Vite 7**
- **Wouter** for client-side routing
- **Tailwind CSS 4**
- **Radix UI** primitives
- **Lucide React** icons
- **Framer Motion**
- **React Hook Form**
- **Zod**
- **Recharts**
- **Embla Carousel**
- **Sonner**
- **Streamdown**

### Tooling

- **pnpm**
- **TypeScript**
- **Prettier**
- **Vite**
- **Vitest**
- **ESBuild**
- **Wrangler**

### Deployment

- **Cloudflare Workers**
- Cloudflare Static Assets
- SPA fallback through Wrangler's `not_found_handling: "single-page-application"`

There is **no Express application server in the current deployment architecture**.

---

## Repository Structure

```
ClothingShop/
├── client/
│   ├── public/
│   │   ├── __manus__/
│   │   ├── _headers
│   │   └── .gitkeep
│   │
│   └── src/
│       ├── components/
│       │   ├── ui/
│       │   ├── ErrorBoundary.tsx
│       │   ├── ManusDialog.tsx
│       │   └── Map.tsx
│       │
│       ├── contexts/
│       ├── hooks/
│       ├── lib/
│       ├── pages/
│       │   ├── Home.tsx
│       │   └── NotFound.tsx
│       │
│       ├── App.tsx
│       ├── const.ts
│       ├── index.css
│       └── main.tsx
│
├── patches/
│   └── wouter@3.7.1.patch
│
├── shared/
│   └── const.ts
│
├── worker/
│   └── index.ts
│
├── components.json
├── package.json
├── pnpm-lock.yaml
├── template.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── wrangler.jsonc
├── CLOUDFLARE.md
└── .prettierrc
```

---

## Important: Template State

This repository should be understood as a **reusable visual/template foundation**, not as a finished Shopify-style commerce engine.

The current route configuration in `client/src/App.tsx` includes:

- `/` → Home
- `/404` → Not Found
- A final fallback → Not Found

The current `Home.tsx` is still an example implementation. The stylesheet, component library, responsive layout system, and storefront-oriented design language provide the foundation for expanding the template into a complete client website.

That distinction matters.

Do not assume that a styled product grid, checkout button, contact form, or product detail layout automatically means the corresponding backend business functionality exists.

For each client, functionality should be connected deliberately.

---

# Design System

The visual language is defined primarily in:

```
client/src/index.css
```

The stylesheet contains the core storefront design system, including:

- Typography
- Colors
- Spacing
- Buttons
- Navigation
- Hero sections
- Product cards
- Product grids
- Collection cards
- Editorial/story sections
- Reviews
- Feature sections
- Blog/article layouts
- Contact layouts
- Product detail layouts
- Footer
- Responsive breakpoints
- Hover interactions
- Reveal animations
- Reduced-motion behavior

### Typography

The current design uses:

- **DM Sans** for general interface/body text
- **Manrope** for headings and brand-oriented typography

These can be replaced for a client's brand.

### Visual direction

The current foundation leans toward:

- Editorial fashion
- Minimal luxury
- Large imagery
- High-contrast typography
- Generous whitespace
- Rounded image cards
- Dark/light contrast sections
- Subtle motion
- Mobile-responsive layouts

The visual direction should be treated as a starting point rather than a restriction.

---

# Routing

Routing is handled by **Wouter**.

The application uses a `<Switch>` with explicit routes and a fallback route.

The repository also contains a local patch:

```
patches/wouter@3.7.1.patch
```

The patch adds route-path collection to the Wouter `Switch`, exposing registered paths through `window.__WOUTER_ROUTES__`.

The patch is registered in `package.json` through pnpm's:

```json
"patchedDependencies": {
  "wouter@3.7.1": "patches/wouter@3.7.1.patch"
}
```

Do not remove the patch casually. If Wouter is upgraded, verify whether the patch still applies and whether its behavior is still required.

---

# Cloudflare Deployment

The production deployment is configured through:

```
wrangler.jsonc
```

Current configuration conceptually uses:

```json
{
  "main": "./worker/index.ts",
  "assets": {
    "binding": "ASSETS",
    "directory": "./dist/public",
    "not_found_handling": "single-page-application"
  }
}
```

The build output is:

```
dist/public
```

The Worker entry point is:

```
worker/index.ts
```

The Worker does not implement the storefront itself. It delegates asset requests to the Cloudflare Assets binding.

### SPA routing

SPA fallback is handled by Wrangler/Cloudflare through:

```
"not_found_handling": "single-page-application"
```

There is intentionally **no custom `_redirects` SPA fallback rule** in the current project.

Do not reintroduce a rule such as:

```
/* /index.html 200
```

without a specific reason. Cloudflare's SPA fallback configuration already handles this responsibility.

---

# Asset Caching

The project includes:

```
client/public/_headers
```

The current rules give hashed assets long-lived immutable caching while keeping `index.html` revalidatable.

Conceptually:

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: no-cache
```

This is appropriate for Vite's fingerprinted production assets.

---

# Local Development

## Requirements

Use a modern Node.js version compatible with the project's Vite/TypeScript toolchain and pnpm.

The repository declares:

```
pnpm@10.4.1
```

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

The Vite development server is configured to expose the application on the local network.

---

# Useful Commands

### Development

```bash
pnpm dev
```

### Type checking

```bash
pnpm check
```

### Production build

```bash
pnpm build
```

### Cloudflare-specific production build

```bash
pnpm build:cloudflare
```

### Local Cloudflare preview

```bash
pnpm preview
```

### Deploy

```bash
pnpm deploy
```

### Format

```bash
pnpm format
```

---

# Client Customization Workflow

When using this template for a real clothing business, customize in this order.

## 1. Brand identity

Replace:

- Brand name
- Wordmark
- Logo
- Favicon
- Brand colors
- Typography
- Tone of voice
- Social links
- Contact information

Do not leave template branding in the finished client project.

## 2. Business positioning

Replace generic messaging with the client's actual:

- Target customer
- Product category
- Value proposition
- Location
- Delivery area
- Ordering process
- Return policy
- Customer-service channels

The website should represent the actual business rather than merely looking like a clothing website.

## 3. Navigation

Build navigation around the client's real catalog.

For example:

```
New Arrivals
Men
Women
Collections
Sale
About
Contact
```

The exact navigation should depend on the client's inventory and business model.

## 4. Product catalog

Replace placeholder/example content with real:

- Product names
- Prices
- Sale prices
- Sizes
- Colors
- Product descriptions
- Product images
- Availability
- Categories
- Collection assignments

## 5. Photography

Replace all template imagery with properly licensed client imagery or appropriately licensed assets.

Do not launch a client project with random stock imagery that misrepresents the products.

## 6. Conversion path

Decide how customers actually purchase.

Possible models include:

- WhatsApp ordering
- Direct phone ordering
- Payment-link checkout
- Full e-commerce checkout
- Marketplace handoff
- In-store pickup
- Delivery request

The frontend should be connected to the client's real sales process.

## 7. Trust

Add the information a real customer needs before purchasing:

- Business location
- Contact information
- Delivery information
- Returns/exchanges
- Payment methods
- Customer reviews
- Social proof
- Brand story
- Clear product information

## 8. SEO

Before launch, customize:

- Page titles
- Meta descriptions
- Open Graph metadata
- Canonical URLs
- Image alt text
- Heading hierarchy
- Structured data where appropriate
- Sitemap
- Robots directives
- Local/business information where relevant

## 9. Domain

Connect the client's production domain only after the site has been tested on its final deployment environment.

---

# Recommended Client Project Boundary

This template should stay focused on being a **reusable frontend foundation**.

Do not automatically add:

- Authentication
- Database
- Inventory management
- Payment processing
- Admin dashboard
- CMS
- Customer accounts
- Order tracking
- Delivery management

unless a client actually requires them.

When those requirements appear, they should be introduced as deliberate project capabilities rather than hidden inside the base template.

This keeps the template easier to reuse, customize, maintain, and deploy.

---

# Quality-Control Checklist

Before using a customized version for a client, verify:

### Content

- [ ] Client brand name is correct
- [ ] All placeholder content is removed
- [ ] Product information is accurate
- [ ] Contact information is correct
- [ ] Pricing is correct
- [ ] Policies are supplied by the client
- [ ] Images are licensed/authorized

### UI

- [ ] Desktop layout checked
- [ ] Tablet layout checked
- [ ] Mobile layout checked
- [ ] Navigation works
- [ ] Buttons have real destinations/actions
- [ ] Forms work or are intentionally connected later
- [ ] No broken images
- [ ] No overflow
- [ ] No console errors
- [ ] Reduced-motion behavior remains accessible

### SEO

- [ ] Page titles
- [ ] Meta descriptions
- [ ] Canonical URLs
- [ ] Open Graph data
- [ ] Alt text
- [ ] Heading hierarchy
- [ ] Sitemap
- [ ] Robots configuration
- [ ] Structured data where appropriate

### Production

- [ ] `pnpm install --frozen-lockfile` works
- [ ] `pnpm check` passes
- [ ] `pnpm build` passes
- [ ] Cloudflare deployment works
- [ ] Direct navigation to SPA routes works
- [ ] Refreshing routes works
- [ ] Production assets load correctly
- [ ] Custom domain works
- [ ] HTTPS works
- [ ] No development-only URLs remain

---

# Important Template Maintenance Rules

### Keep the base template clean

Do not permanently add client-specific content to the base repository.

If a client needs:

- A special payment integration
- A unique CMS
- Custom authentication
- Client-specific APIs
- A custom dashboard
- A unique order workflow

build those changes in the client's derived project unless they are genuinely reusable across future clothing projects.

### Avoid unnecessary dependencies

Every dependency increases maintenance cost.

Before adding a library, ask:

1. Does the template actually need it?
2. Will multiple future clients benefit from it?
3. Can the requirement be solved with the existing stack?
4. Does it increase deployment complexity?
5. Does it create a new security or maintenance burden?

### Keep deployment simple

The current architecture intentionally uses a lightweight Cloudflare Worker + Static Assets model.

Do not reintroduce an application server merely because a development tool generated one.

---

# Template vs. Client Project

Think of this repository as the **base layer**:

```
ClothingShop
│
├── Design system
├── Layout foundation
├── UI primitives
├── Routing foundation
├── Responsive behavior
├── Animation foundation
├── Cloudflare deployment
└── Development tooling
```

A client project becomes:

```
ClothingShop
    +
Client Brand
    +
Client Content
    +
Client Products
    +
Client Business Rules
    +
Required Integrations
    +
Production Configuration
```

That separation is important.

The goal is not to make every clothing business identical.

The goal is to **remove repetitive engineering work while preserving enough flexibility to make every client site feel custom-built.**

---

# License

The repository currently declares the **MIT License** in `package.json`.

Before distributing or reselling a customized version, review the licensing terms of:

- This repository
- Third-party dependencies
- Fonts
- Images
- Icons
- Any external assets used in the client project

The MIT declaration in this repository does not automatically grant rights to third-party assets incorporated into a client site.

---

## Maintainer

**Abdul Anas**  
**@abdulanasbuilds**

Built as part of a reusable collection of industry-specific website foundations for client work.

**Principle:** build the reusable foundation once; customize it properly for the business that actually pays for it.
