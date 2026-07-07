---
sidebar_position: 3
---

# Usage

## Opening the Query Runner

Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (macOS) to open the Command Palette and type:

```
Open SQL Query Runner
```

## Running a query

1. Type any SQL in the textarea.
2. Click **Run Query** or press `Ctrl+Enter` / `Cmd+Enter`.
3. Results appear as a scrollable table below.

:::info
Large result sets are scrollable — the table header stays sticky so you always see column names.
:::

### Example queries

```sql
-- List all tables in your schema
select table_name
from information_schema.tables
where table_schema = 'public';
```

```sql
-- Fetch the first 10 rows from a table
select * from my_table limit 10;
```

```sql
-- Count rows
select count(*) from my_table;
```

## NULL values

Cells containing `NULL` are displayed as the italic text `NULL` in a muted colour.

## Error handling

If the query fails, the full Supabase/Postgres error message is shown in red below the button.
