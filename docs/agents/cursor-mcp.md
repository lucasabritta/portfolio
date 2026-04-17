# Cursor MCP

## Vercel MCP

Official docs: [Vercel MCP project configuration](https://mcp.vercel.com/docs/project-configuration).

| Item                        | Detail                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| Recommended config location | **User/global** `%USERPROFILE%\.cursor\mcp.json` (Windows) or `~/.cursor/mcp.json` (macOS/Linux) |
| Optional helper             | `npx add-mcp https://mcp.vercel.com` (use `-g` for global across projects)                       |

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

**The Vercel MCP can read projects and deployments (and build logs); it cannot change dashboard settings** such as Root Directory or “include files outside root.” Apply those in the [project General settings](https://vercel.com/lucasabritta-4868s-projects/portfolio/settings/general) (adjust team/project in the URL if needed).

### Recommended (no root shim)

1. **Root Directory** → **`apps/frontend`**
2. Enable **Include files outside the Root Directory in the Build Step** (needed for **`file:../../packages/...`**).
3. Framework preset: **Next.js**. Optional overrides: **`apps/frontend/vercel.json`**.

Then remove the repository **root** `package.json`, **`yarn.lock`**, and the **root** `vercel.json` install/build overrides if you added them only for detection.

### Fallback (repo root still `.` on Vercel)

If Root Directory is still the **repository root**, keep the **root** `vercel.json` (including **`outputDirectory`: `apps/frontend/.next`**) plus minimal **root** `package.json` / **`yarn.lock`** so `vercel build` detects **Next.js**, runs install/build under **`apps/frontend`**, and Vercel still finds **`.next`** under the monorepo path. This is a compatibility shim until you switch to the recommended layout above.
