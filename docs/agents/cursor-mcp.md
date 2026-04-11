# Cursor MCP

## Vercel MCP

The Vercel MCP server URL is `https://mcp.vercel.com`. Official docs: [Vercel MCP project configuration](https://mcp.vercel.com/docs/project-configuration).

| Item | Detail |
|------|--------|
| Recommended config location | **User/global** `%USERPROFILE%\.cursor\mcp.json` (Windows) or `~/.cursor/mcp.json` (macOS/Linux) |
| Optional helper | `npx add-mcp https://mcp.vercel.com` (use `-g` for global across projects) |

This repository does **not** commit `.cursor/mcp.json`. Keeping Vercel (and OAuth-backed MCP servers) in your **user-level** `mcp.json` means:

- You sign in once per machine; Cursor stores tokens in its own app data, not in the repo.
- No MCP definitions or accidental secrets are pushed with the project.

Example user `mcp.json` entry (URL only — no tokens):

```json
{
  "mcpServers": {
    "vercel": {
      "url": "https://mcp.vercel.com"
    }
  }
}
```

## Authentication

After adding the server, Cursor may show **Needs login**. Complete the OAuth flow when prompted. Credentials stay in Cursor’s local storage, not in git.

Until authentication succeeds, authenticated Vercel MCP tools will be unavailable.

## Optional project-scoped endpoint

Vercel supports a team- and project-scoped URL:

`https://mcp.vercel.com/{team-slug}/{project-slug}`

Use that as the `url` in your **user** `mcp.json` only if you want a narrower default context and this repo maps cleanly to one Vercel team and project.
