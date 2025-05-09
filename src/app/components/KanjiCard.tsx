import { useState } from 'react';
import { Kanji, SRS_LEVELS } from '../types/kanji';
import styles from './KanjiCard.module.css';

interface KanjiCardProps {
  kanji: Kanji;
  onUpdateSRS: (kanjiId: string, newLevel: number) => void;
}

export default function KanjiCard({ kanji, onUpdateSRS }: KanjiCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    try {
      const utterance = new SpeechSynthesisUtterance(kanji.kunyomi[0]);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  const handleSRSUpdate = (newLevel: number) => {
    onUpdateSRS(kanji.id, newLevel);
  };

  return (
    <div className={styles.card}>
      <div className={styles.mainContent}>
        <div 
          className={styles.character}
          onClick={playAudio}
          title="Click to hear pronunciation"
        >
          {kanji.character}
        </div>
        <div className={styles.basicInfo}>
          <h3>{kanji.meaning}</h3>
          <div className={styles.readings}>
            <div className={styles.reading}>
              <span className={styles.label}>Kunyomi:</span>
              <span>{kanji.kunyomi.join('、')}</span>
            </div>
            <div className={styles.reading}>
              <span className={styles.label}>Onyomi:</span>
              <span>{kanji.onyomi.join('、')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.srsControls}>
        <div className={styles.srsInfo}>
          <span className={styles.srsLevel}>
            {SRS_LEVELS[kanji.srsLevel].name}
          </span>
          {kanji.nextReview && (
            <span className={styles.nextReview}>
              Next: {new Date(kanji.nextReview).toLocaleDateString()}
            </span>
          )}
        </div>
        <div className={styles.srsButtons}>
          {kanji.srsLevel < SRS_LEVELS.length - 1 && (
            <button
              onClick={() => handleSRSUpdate(kanji.srsLevel + 1)}
              className={styles.srsButton}
            >
              Correct
            </button>
          )}
          {kanji.srsLevel > 0 && (
            <button
              onClick={() => handleSRSUpdate(Math.max(0, kanji.srsLevel - 1))}
              className={`${styles.srsButton} ${styles.incorrect}`}
            >
              Incorrect
            </button>
          )}
        </div>
      </div>

      <button
        className={styles.detailsButton}
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {showDetails && (
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>JLPT Level:</span>
            <span>N{kanji.jlptLevel}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Strokes:</span>
            <span>{kanji.strokeCount}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Frequency Rank:</span>
            <span>#{kanji.frequency}</span>
          </div>
          <div className={styles.examples}>
            <h4>Example Words:</h4>
            {kanji.examples.map((example, index) => (
              <div key={index} className={styles.example}>
                <span className={styles.word}>{example.word}</span>
                <span className={styles.reading}>{example.reading}</span>
                <span className={styles.meaning}>{example.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 