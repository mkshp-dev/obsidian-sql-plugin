// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Obsidian SQL Plugin",
  tagline: "Run SQL queries on Supabase from your Obsidian vault",
  favicon: "img/favicon.ico",

  // GitHub Pages deployment config
  url: "https://mkshp-dev.github.io",
  baseUrl: "/obsidian-sql-plugin/",

  organizationName: "mkshp-dev",
  projectName: "obsidian-sql-plugin",
  trailingSlash: false,

  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/mkshp-dev/obsidian-sql-plugin/tree/Dev/docs/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "SQL Plugin",
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://github.com/mkshp-dev/obsidian-sql-plugin",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              { label: "Getting Started", to: "/docs/intro" },
              { label: "Supabase Setup", to: "/docs/supabase-setup" },
              { label: "Usage", to: "/docs/usage" },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/mkshp-dev/obsidian-sql-plugin",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} mkshp-dev. Built with Docusaurus.`,
      },
      prism: {
        theme: require("prism-react-renderer").themes.github,
        darkTheme: require("prism-react-renderer").themes.dracula,
        additionalLanguages: ["sql"],
      },
    }),
};

module.exports = config;
