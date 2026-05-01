---
sidebar_position: 1
slug: /intro
---

# Introduction

**Obsidian SQL Plugin** lets you run SQL queries against your [Supabase](https://supabase.com) database without leaving Obsidian.

## What you get

| Feature | Details |
|---------|---------|
| SQL Query Runner | A modal dialog accessible from the Command Palette |
| Result Table | Scrollable HTML table rendered inline |
| Secure Settings | Credentials stored locally in `data.json`, never committed |
| One dependency | Uses `@supabase/supabase-js` — no other external tools needed |

## Quick start

1. Install the plugin (see [Supabase Setup](./supabase-setup)).
2. Open **Settings → SQL Plugin** and paste your Supabase URL and Anon Key.
3. Press `Ctrl/Cmd+P` → **Open SQL Query Runner**.
4. Type your SQL and press **Run Query** or `Ctrl/Cmd+Enter`.

:::tip
Use `Ctrl+Enter` (Windows/Linux) or `Cmd+Enter` (macOS) inside the query box as a keyboard shortcut to run the query without reaching for the mouse.
:::
