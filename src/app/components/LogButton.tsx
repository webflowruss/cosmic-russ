'use client';

import { useState } from 'react';
import styles from '../page.module.css';
import config from '../../../next.config';

export default function LogButton() {
  const [message, setMessage] = useState<string>('');

  const fetchMessage = async () => {
    try {
      const response = await fetch(`${config.basePath}/api/hello`);
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  return (
    <div>
      <button 
        onClick={fetchMessage}
        className={styles.secondary}
      >
        Log Message
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
} 