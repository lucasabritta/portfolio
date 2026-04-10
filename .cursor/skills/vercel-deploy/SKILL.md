---
name: vercel-deploy
description: >-
  Aligns Next.js changes with Vercel-native deployment: build output, env vars,
  previews, and minimal vercel.json. Use when the user mentions Vercel,
  production deploy, preview URLs, edge/runtime config, or environment
  variables for hosting.
---

# Vercel-native deploys

## Principles

- **Framework preset**: Next.js on Vercel should use the default build (`yarn build` or the install command Vercel detects from `package.json`).
- **Avoid unnecessary `vercel.json`**: Add only redirects, headers, rewrites, or region settings when there is a concrete requirement.
- **Secrets**: Store in the Vercel project dashboard (Production / Preview / Development). Never commit API keys or tokens.

## Checklist for changes that affect production

1. **Build locally** with the same command CI uses (`yarn build` unless documented otherwise).
2. **Environment**: For new `process.env.*` usage, confirm variables exist for Preview and Production on Vercel; use `NEXT_PUBLIC_*` only for values that must ship to the browser.
3. **Runtime**: If using Edge or Node.js runtime features, ensure `export const runtime` / `export const preferredRegion` match product needs and Vercel limits.
4. **Previews**: Expect every PR to get a preview URL when GitHub integration is enabled; verify critical flows on preview before merging risky changes.

## When the user asks “why did deploy fail?”

- Compare Vercel build logs with local `yarn build`.
- Check missing env vars, Node version mismatch (Vercel project settings vs `package.json` engines), and incompatible imports (native modules, file system assumptions).

## Done when

- Local build passes and the change is compatible with documented env vars.
- Any new public env var naming is explained briefly for humans updating Vercel settings.
