export interface KanjiCard {
  kanji: string;
  meaning: string;
  kunyomi: string[];
  onyomi: string[];
  examples: {
    japanese: string;
    english: string;
  }[];
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

export interface Kanji {
  id: string;
  character: string;
  meaning: string;
  kunyomi: string[];
  onyomi: string[];
  examples: {
    word: string;
    reading: string;
    meaning: string;
  }[];
  jlptLevel: number;
  strokeCount: number;
  frequency: number;
  srsLevel: number;
  lastReviewed: Date | null;
  nextReview: Date | null;
}

export interface SRSLevel {
  level: number;
  interval: number; // in days
  name: string;
}

export const SRS_LEVELS: SRSLevel[] = [
  { level: 0, interval: 0, name: 'New' },
  { level: 1, interval: 1, name: 'Learning' },
  { level: 2, interval: 3, name: 'Review 1' },
  { level: 3, interval: 7, name: 'Review 2' },
  { level: 4, interval: 14, name: 'Review 3' },
  { level: 5, interval: 30, name: 'Review 4' },
  { level: 6, interval: 90, name: 'Mastered' }
]; 