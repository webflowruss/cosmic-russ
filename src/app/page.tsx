'use client';

import { useState } from 'react';
import styles from './page.module.css';
import MetricCard from './components/MetricCard';
import NotificationBarCharts from './components/NotificationBarCharts';
import { mockDashboardData } from './data/mockDashboardData';

export default function Home() {
  const [timeRange, setTimeRange] = useState('30d');
  const [timeGranularity, setTimeGranularity] = useState<'daily' | 'monthly' | 'quarterly'>('daily');

  const { currentMetrics, previousPeriodMetrics, timeSeriesData } = mockDashboardData;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Notification Platform Dashboard</h1>
          <div className={styles.controls}>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className={styles.select}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        <div className={styles.metricsGrid}>
          <MetricCard
            title="Total Notifications"
            value={currentMetrics.total}
            previousValue={previousPeriodMetrics.total}
          />
          <MetricCard
            title="Total Customers Notified"
            value={currentMetrics.totalCustomers}
            previousValue={previousPeriodMetrics.totalCustomers}
          />
          <MetricCard
            title="Email Notifications"
            value={currentMetrics.byChannel.email}
            previousValue={previousPeriodMetrics.byChannel.email}
          />
          <MetricCard
            title="IPN Notifications"
            value={currentMetrics.byChannel.ipn}
            previousValue={previousPeriodMetrics.byChannel.ipn}
          />
          <MetricCard
            title="Platform-Powered"
            value={currentMetrics.bySource.platform}
            previousValue={previousPeriodMetrics.bySource.platform}
          />
          <MetricCard
            title="Non-platform-powered"
            value={currentMetrics.bySource.external}
            previousValue={previousPeriodMetrics.bySource.external}
          />
        </div>

        <div className={styles.timeGranularity}>
          <button
            className={`${styles.granularityButton} ${timeGranularity === 'daily' ? styles.active : ''}`}
            onClick={() => setTimeGranularity('daily')}
          >
            Daily
          </button>
          <button
            className={`${styles.granularityButton} ${timeGranularity === 'monthly' ? styles.active : ''}`}
            onClick={() => setTimeGranularity('monthly')}
          >
            Monthly
          </button>
          <button
            className={`${styles.granularityButton} ${timeGranularity === 'quarterly' ? styles.active : ''}`}
            onClick={() => setTimeGranularity('quarterly')}
          >
            Quarterly
          </button>
        </div>

        <div className={styles.charts}>
          <NotificationBarCharts 
            data={timeSeriesData} 
            timeGranularity={timeGranularity}
          />
        </div>
      </main>
    </div>
  );
}
