import styles from "./page.module.css";
import LogButton from "./components/LogButton";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Cosmic is Awesome!!</h1>
        <LogButton />
      </main>
    </div>
  );
}
