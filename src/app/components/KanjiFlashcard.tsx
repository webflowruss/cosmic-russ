"use client";

import { useState } from 'react';
import { KanjiCard } from '../types/kanji';
import styles from './KanjiFlashcard.module.css';

interface KanjiFlashcardProps {
  card: KanjiCard;
  onNext: () => void;
}

export default function KanjiFlashcard({ card, onNext }: KanjiFlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setShowExamples(false);
    onNext();
  };

  return (
    <div className={styles.flashcardContainer}>
      <div 
        className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`}
        onClick={handleFlip}
      >
        <div className={styles.front}>
          <div className={styles.kanji}>{card.kanji}</div>
          <div className={styles.level}>{card.level}</div>
        </div>
        <div className={styles.back}>
          <div className={styles.meaning}>{card.meaning}</div>
          <div className={styles.readings}>
            <div className={styles.readingSection}>
              <h4>Kunyomi:</h4>
              <p>{card.kunyomi.join('、')}</p>
            </div>
            <div className={styles.readingSection}>
              <h4>Onyomi:</h4>
              <p>{card.onyomi.join('、')}</p>
            </div>
          </div>
          {showExamples ? (
            <div className={styles.examples}>
              {card.examples.map((example, index) => (
                <div key={index} className={styles.example}>
                  <p className={styles.japanese}>{example.japanese}</p>
                  <p className={styles.english}>{example.english}</p>
                </div>
              ))}
            </div>
          ) : (
            <button 
              className={styles.showExamples}
              onClick={(e) => {
                e.stopPropagation();
                setShowExamples(true);
              }}
            >
              Show Examples
            </button>
          )}
        </div>
      </div>
      <button className={styles.nextButton} onClick={handleNext}>
        Next Card
      </button>
    </div>
  );
} 