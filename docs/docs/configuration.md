---
sidebar_position: 4
---

# Configuration

All settings are under **Obsidian → Settings → SQL Plugin**.

| Setting | Description |
|---------|-------------|
| **Supabase Project URL** | The full URL of your Supabase project, e.g. `https://xyzcompany.supabase.co` |
| **Supabase Anon Key** | The `anon`/`public` API key from your project's Settings → API page |

Settings are persisted in your vault's `.obsidian/plugins/obsidian-sql-plugin/data.json`.

:::warning
`data.json` contains your credentials. It is listed in `.gitignore` and should never be committed.
:::

## Changing credentials

Simply update the fields in Settings — the plugin reinitialises the Supabase client immediately on save.
