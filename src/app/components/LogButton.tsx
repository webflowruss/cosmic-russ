'use client';

import styles from '../page.module.css';

export default function LogButton() {
  return (
    <button 
      onClick={() => console.log("Hello from Next.js!")}
      className={styles.secondary}
    >
      Log Message
    </button>
  );
} 