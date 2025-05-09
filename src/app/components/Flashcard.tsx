import { useState } from 'react';
import { Kanji, SRS_LEVELS } from '../types/kanji';
import styles from './Flashcard.module.css';

interface FlashcardProps {
  kanji: Kanji;
  onUpdateSRS: (kanjiId: string, newLevel: number) => void;
  onNext: () => void;
}

export default function Flashcard({ kanji, onUpdateSRS, onNext }: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(false);
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

  const handleResponse = (correct: boolean) => {
    const newLevel = correct 
      ? Math.min(kanji.srsLevel + 1, SRS_LEVELS.length - 1)
      : Math.max(0, kanji.srsLevel - 1);
    
    onUpdateSRS(kanji.id, newLevel);
    setShowAnswer(false);
    onNext();
  };

  return (
    <div className={styles.flashcard}>
      <div 
        className={`${styles.card} ${showAnswer ? styles.flipped : ''}`}
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <div className={styles.front}>
          <div className={styles.character} onClick={playAudio}>
            {kanji.character}
          </div>
          <div className={styles.hint}>
            Click to reveal answer
          </div>
        </div>
        <div className={styles.back}>
          <div className={styles.character} onClick={playAudio}>
            {kanji.character}
          </div>
          <div className={styles.details}>
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
            <div className={styles.example}>
              <span className={styles.word}>{kanji.examples[0].word}</span>
              <span className={styles.reading}>{kanji.examples[0].reading}</span>
              <span className={styles.meaning}>{kanji.examples[0].meaning}</span>
            </div>
          </div>
        </div>
      </div>

      {showAnswer && (
        <div className={styles.controls}>
          <button
            className={`${styles.button} ${styles.incorrect}`}
            onClick={() => handleResponse(false)}
          >
            Incorrect
          </button>
          <button
            className={`${styles.button} ${styles.correct}`}
            onClick={() => handleResponse(true)}
          >
            Correct
          </button>
        </div>
      )}
    </div>
  );
} 