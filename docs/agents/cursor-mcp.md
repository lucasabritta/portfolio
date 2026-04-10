# Cursor MCP

This repository includes project-local Cursor MCP configuration in `.cursor/mcp.json`.

## Vercel MCP

The project is configured to use Vercel's official MCP server at `https://mcp.vercel.com`.

| Item | Detail |
|------|--------|
| Config file | `.cursor/mcp.json` |
| Official docs | <https://mcp.vercel.com/docs/project-configuration> |
| Optional helper | `npx add-mcp https://mcp.vercel.com` |

## Authentication

After opening the project in Cursor, the Vercel MCP server may show `Needs login`. Complete the OAuth flow in the browser when prompted. Credentials are not stored in the repository.

Until authentication succeeds, Vercel MCP tools will be unavailable.

## Optional project-scoped endpoint

Vercel supports a team and project scoped endpoint format:

`https://mcp.vercel.com/{team-slug}/{project-slug}`

Only change the URL in `.cursor/mcp.json` if this repository maps cleanly to a single Vercel team and project and that narrower default context is desired.
