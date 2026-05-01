import {
	App,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ─── Settings ────────────────────────────────────────────────────────────────

interface SqlPluginSettings {
	supabaseUrl: string;
	supabaseKey: string;
}

const DEFAULT_SETTINGS: SqlPluginSettings = {
	supabaseUrl: "",
	supabaseKey: "",
};

// ─── Plugin ───────────────────────────────────────────────────────────────────

export default class SqlPlugin extends Plugin {
	settings: SqlPluginSettings;
	supabase: SupabaseClient | null = null;

	async onload() {
		await this.loadSettings();
		this.initSupabase();

		// Command: open query runner modal
		this.addCommand({
			id: "open-sql-query-runner",
			name: "Open SQL Query Runner",
			callback: () => {
				if (!this.supabase) {
					new Notice(
						"SQL Plugin: Please configure your Supabase URL and Key in Settings first."
					);
					return;
				}
				new SqlQueryModal(this.app, this.supabase).open();
			},
		});

		// Settings tab
		this.addSettingTab(new SqlSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.initSupabase();
	}

	initSupabase() {
		const { supabaseUrl, supabaseKey } = this.settings;
		if (supabaseUrl && supabaseKey) {
			this.supabase = createClient(supabaseUrl, supabaseKey);
		} else {
			this.supabase = null;
		}
	}
}

// ─── SQL Query Modal ──────────────────────────────────────────────────────────

class SqlQueryModal extends Modal {
	private supabase: SupabaseClient;
	private textarea: HTMLTextAreaElement;
	private resultContainer: HTMLDivElement;

	constructor(app: App, supabase: SupabaseClient) {
		super(app);
		this.supabase = supabase;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.addClass("sql-query-modal");

		contentEl.createEl("h2", { text: "SQL Query Runner" });

		// Query input
		this.textarea = contentEl.createEl("textarea", {
			placeholder: "SELECT * FROM your_table LIMIT 20;",
			cls: "sql-textarea",
		});

		// Run button
		const runBtn = contentEl.createEl("button", {
			text: "Run Query",
			cls: "mod-cta sql-run-btn",
		});
		runBtn.addEventListener("click", () => this.runQuery());

		// Keyboard shortcut: Ctrl/Cmd + Enter
		this.textarea.addEventListener("keydown", (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
				e.preventDefault();
				this.runQuery();
			}
		});

		// Results container
		this.resultContainer = contentEl.createDiv({ cls: "sql-results" });
	}

	async runQuery() {
		const sql = this.textarea.value.trim();
		if (!sql) {
			new Notice("Please enter a SQL query.");
			return;
		}

		this.resultContainer.empty();
		this.resultContainer.createEl("p", { text: "Running…", cls: "sql-running" });

		try {
			// Supabase exposes raw SQL via the RPC `exec_sql` or the PostgREST /rpc endpoint.
			// We use the `rpc` helper with a user-defined function called `exec_sql`.
			// See docs/usage.md for how to create the function in your Supabase project.
			const { data, error } = await this.supabase.rpc("exec_sql", {
				query: sql,
			});

			this.resultContainer.empty();

			if (error) {
				this.resultContainer.createEl("pre", {
					text: `Error: ${error.message}`,
					cls: "sql-error",
				});
				return;
			}

			if (!data || (Array.isArray(data) && data.length === 0)) {
				this.resultContainer.createEl("p", { text: "Query returned no rows." });
				return;
			}

			this.renderTable(Array.isArray(data) ? data : [data]);
		} catch (err: unknown) {
			this.resultContainer.empty();
			const msg = err instanceof Error ? err.message : String(err);
			this.resultContainer.createEl("pre", {
				text: `Unexpected error: ${msg}`,
				cls: "sql-error",
			});
		}
	}

	renderTable(rows: Record<string, unknown>[]) {
		if (rows.length === 0) return;

		const columns = Object.keys(rows[0]);
		const wrapper = this.resultContainer.createDiv({ cls: "sql-table-wrapper" });
		const table = wrapper.createEl("table", { cls: "sql-table" });

		// Header
		const thead = table.createEl("thead");
		const headerRow = thead.createEl("tr");
		for (const col of columns) {
			headerRow.createEl("th", { text: col });
		}

		// Body
		const tbody = table.createEl("tbody");
		for (const row of rows) {
			const tr = tbody.createEl("tr");
			for (const col of columns) {
				const val = row[col];
				tr.createEl("td", {
					text: val === null ? "NULL" : String(val),
					cls: val === null ? "sql-null" : "",
				});
			}
		}
	}

	onClose() {
		this.contentEl.empty();
	}
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────

class SqlSettingTab extends PluginSettingTab {
	plugin: SqlPlugin;

	constructor(app: App, plugin: SqlPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h2", { text: "SQL Plugin — Supabase Settings" });

		new Setting(containerEl)
			.setName("Supabase Project URL")
			.setDesc("Found in your Supabase project → Settings → API → Project URL")
			.addText((text) =>
				text
					.setPlaceholder("https://xyzcompany.supabase.co")
					.setValue(this.plugin.settings.supabaseUrl)
					.onChange(async (value) => {
						this.plugin.settings.supabaseUrl = value.trim();
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Supabase Anon Key")
			.setDesc(
				"Found in Supabase → Settings → API → Project API Keys (anon / public)"
			)
			.addText((text) => {
				text
					.setPlaceholder("your-anon-key")
					.setValue(this.plugin.settings.supabaseKey)
					.onChange(async (value) => {
						this.plugin.settings.supabaseKey = value.trim();
						await this.plugin.saveSettings();
					});
				text.inputEl.type = "password";
				return text;
			});

		containerEl.createEl("hr");
		containerEl.createEl("p", {
			text: "⚠️  Credentials are stored in your local Obsidian vault (data.json). Never share that file.",
			cls: "sql-settings-warning",
		});
	}
}
