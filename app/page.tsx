import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>I want to ride my bike</h1>

        <p className={styles.description}>Strictly for touring purposes only</p>

        <div className={styles.grid}>
          <Link passHref href="/cycles" className={styles.card}>
            <h2>Cycles &rarr;</h2>
            <p>Look at a list of the cycles I&apos;ve done</p>
          </Link>

          <Link passHref href="/cycles" className={styles.card}>
            <h2>...still Cycles &rarr;</h2>
            <p>That&apos;s the only page on the website</p>
          </Link>

          <Link passHref href="/cycles" className={styles.card}>
            <h2>No, seriously</h2>
            <p>There aren&apos;t any other pages my friend</p>
          </Link>

          <Link passHref href="/cycles" className={styles.card}>
            <h2>Didn&apos;t like any of the other links?</h2>
            <p>Ok, click this one.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
