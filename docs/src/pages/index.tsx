import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <div className="container margin-vert--xl">
          <div className="row">
            <div className="col col--4">
              <h3>🔌 Connect to Supabase</h3>
              <p>Paste your project URL and anon key in the plugin settings — no extra software needed.</p>
            </div>
            <div className="col col--4">
              <h3>🗄️ Run SQL Queries</h3>
              <p>Open the SQL Query Runner from the Command Palette (Ctrl/Cmd+P) and write any SQL statement.</p>
            </div>
            <div className="col col--4">
              <h3>📊 See Results Instantly</h3>
              <p>Results are rendered as a scrollable table right inside your Obsidian vault.</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
