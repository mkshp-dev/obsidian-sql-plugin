---
sidebar_position: 2
---

# Supabase Setup

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project.
2. Wait for it to be provisioned (≈ 1 minute).

## 2. Get your credentials

In your project dashboard go to **Settings → API**:

| Value | Where to find it |
|-------|-----------------|
| **Project URL** | Under *Project URL* |
| **Anon Key** | Under *Project API keys → anon / public* |

## 3. Create the `exec_sql` helper function

The plugin calls a Postgres function named `exec_sql` to run arbitrary queries.  
Run this SQL **once** in the Supabase SQL Editor:

```sql
-- Creates a function that executes arbitrary SQL and returns rows as JSON.
-- ⚠️  This grants significant power — restrict it via RLS or a separate role.
create or replace function exec_sql(query text)
returns json
language plpgsql
security definer
as $$
declare
  result json;
begin
  execute 'select json_agg(t) from (' || query || ') t' into result;
  return coalesce(result, '[]'::json);
end;
$$;
```

:::caution Security
`security definer` runs with the function owner's privileges.  
Only give your anon key to trusted users, or restrict it further with Row Level Security.
:::

## 4. Enter credentials in Obsidian

Open **Obsidian → Settings → SQL Plugin** and fill in the URL and Anon Key.  
The plugin will immediately initialize the Supabase client.
