# Cursor MCP

## Vercel MCP

Official docs: [Vercel MCP project configuration](https://mcp.vercel.com/docs/project-configuration).

| Item | Detail |
|------|--------|
| Recommended config location | **User/global** `%USERPROFILE%\.cursor\mcp.json` (Windows) or `~/.cursor/mcp.json` (macOS/Linux) |
| Optional helper | `npx add-mcp https://mcp.vercel.com` (use `-g` for global across projects) |

This repository does **not** commit `.cursor/mcp.json`. Keeping Vercel (and OAuth-backed MCP servers) in your **user-level** `mcp.json` means:

- You sign in once per machine; Cursor stores tokens in Cursor’s local storage, not in the repo.
- No MCP definitions or accidental secrets are pushed with the project.

### Global vs project-scoped URL

- **Global** (any team/project until the tool asks for context): `https://mcp.vercel.com`
- **Project-scoped** (default context for this app): `https://mcp.vercel.com/{team-slug}/{project-slug}`

For **this** GitHub repo’s Vercel project, use the **team + project** URL so deployment/build tools default to the right place:

```json
{
  "mcpServers": {
    "vercel": {
      "url": "https://mcp.vercel.com/lucasabritta-4868s-projects/portfolio"
    }
  }
}
```

If your team slug or project name differs, replace the path segments accordingly (see the Vercel project URL: `vercel.com/<team>/<project>/…`).

## Authentication

After adding the server, Cursor may show **Needs login**. Complete the OAuth flow when prompted.

Until authentication succeeds, authenticated Vercel MCP tools will be unavailable.

## Vercel project settings (this repo)

Deployments expect the Next.js app root to be **`apps/frontend`** (not the repository root):

1. **Project → Settings → General → Root Directory** → set to **`apps/frontend`**.
2. Enable **Include files outside the Root Directory in the Build Step** so Yarn can resolve **`file:../../packages/resume-content`** and **`file:../../packages/storybook`** during install/build.
3. Framework preset: **Next.js** (default `yarn install` / `yarn build` from `apps/frontend/package.json`). Optional overrides live in **`apps/frontend/vercel.json`**.

With that configuration you do **not** need a root `package.json` / `yarn.lock` “shim” for framework detection.
