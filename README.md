# Obsidian SQL Plugin

Run SQL queries on your Supabase database directly from Obsidian.

## Development

```bash
npm install
npm run dev      # watch mode
npm run build    # production build
```

## Features

- Connect to Supabase via URL + Anon Key
- Run raw SQL queries from a modal (Command Palette → "Open SQL Query Runner")
- Results displayed as a formatted table in the modal
- Settings panel to save your Supabase URL and Key (stored in Obsidian's `data.json`)

## Documentation

Full documentation lives in `docs/` and is built with Docusaurus.  
It auto-deploys to GitHub Pages when you push to the `Dev` branch.
