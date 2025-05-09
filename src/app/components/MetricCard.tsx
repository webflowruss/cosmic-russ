import styles from './MetricCard.module.css';

interface MetricCardProps {
  title: string;
  value: number;
  previousValue: number;
  formatValue?: (value: number) => string;
}

export default function MetricCard({ 
  title, 
  value, 
  previousValue,
  formatValue = (v) => v.toLocaleString()
}: MetricCardProps) {
  const change = ((value - previousValue) / previousValue) * 100;
  const isPositive = change >= 0;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.value}>{formatValue(value)}</div>
      <div className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
      </div>
    </div>
  );
} 