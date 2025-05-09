import { RoadmapItem } from '../types/roadmap';
import styles from './GanttChart.module.css';

interface GanttChartProps {
  items: RoadmapItem[];
  onUpdate: (item: RoadmapItem) => void;
}

export default function GanttChart({ items, onUpdate }: GanttChartProps) {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  const getQuarterPosition = (year: number, quarter: string) => {
    const yearIndex = years.indexOf(year);
    const quarterIndex = quarters.indexOf(quarter);
    return (yearIndex * 4 + quarterIndex) * 100; // 100px per quarter
  };

  const getQuarterWidth = (effort: number) => {
    return Math.max(effort * 20, 50); // Minimum 50px width, scale with effort
  };

  return (
    <div className={styles.ganttContainer}>
      <div className={styles.timeline}>
        {years.map(year => (
          <div key={year} className={styles.yearHeader}>
            {quarters.map(quarter => (
              <div key={`${year}-${quarter}`} className={styles.quarterHeader}>
                {quarter} {year}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.chart}>
        {items.map(item => (
          <div key={item.id} className={styles.itemRow}>
            <div className={styles.itemInfo}>
              <h3>{item.title}</h3>
              <span className={styles.owner}>{item.owner}</span>
            </div>
            <div className={styles.timelineRow}>
              <div
                className={`${styles.itemBar} ${styles[item.status.toLowerCase().replace(' ', '')]}`}
                style={{
                  left: `${getQuarterPosition(item.year, item.quarter)}px`,
                  width: `${getQuarterWidth(item.effort)}px`,
                }}
                title={`${item.title} - ${item.status} (${item.progress}%)`}
              >
                <div 
                  className={styles.progressBar}
                  style={{ width: `${item.progress}%` }}
                />
                <span className={styles.itemTitle}>{item.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 