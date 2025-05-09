import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import styles from './NotificationBarCharts.module.css';

interface NotificationBarChartsProps {
  data: Array<{
    date: string;
    email: number;
    ipn: number;
    platform: number;
    external: number;
    knockGuides: number;
    knockWorkflows: number;
    bespoke: number;
    inApp: number;
    iterableBillingInapp: number;
    postmark: number;
    toastNotifications: number;
    dashboardFloating: number;
    inAppHorizontalBanners: number;
  }>;
  timeGranularity: 'daily' | 'monthly' | 'quarterly';
}

const NotificationBarCharts: React.FC<NotificationBarChartsProps> = ({ data, timeGranularity }) => {
  const formatTimeKey = (key: string) => {
    if (timeGranularity === 'quarterly') {
      const [year, quarter] = key.split('-Q');
      return `Q${quarter} ${year}`;
    }
    
    const date = new Date(key);
    switch (timeGranularity) {
      case 'daily':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case 'monthly':
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      default:
        return key;
    }
  };

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const groupedData = React.useMemo(() => {
    const groups = new Map<string, any>();
    
    data.forEach(item => {
      const date = new Date(item.date);
      let key: string;
      
      switch (timeGranularity) {
        case 'daily':
          key = date.toISOString().split('T')[0];
          break;
        case 'monthly':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        case 'quarterly':
          const quarter = Math.floor(date.getMonth() / 3) + 1;
          key = `${date.getFullYear()}-Q${quarter}`;
          break;
        default:
          key = date.toISOString().split('T')[0];
      }
      
      if (!groups.has(key)) {
        groups.set(key, {
          timeKey: key,
          email: 0,
          ipn: 0,
          platform: 0,
          external: 0,
          knockGuides: 0,
          knockWorkflows: 0,
          bespoke: 0,
          inApp: 0,
          iterableBillingInapp: 0,
          postmark: 0,
          toastNotifications: 0,
          dashboardFloating: 0,
          inAppHorizontalBanners: 0
        });
      }
      
      const group = groups.get(key);
      group.email += item.email;
      group.ipn += item.ipn;
      group.platform += item.platform;
      group.external += item.external;
      group.knockGuides += item.knockGuides;
      group.knockWorkflows += item.knockWorkflows;
      group.bespoke += item.bespoke;
      group.inApp += item.inApp;
      group.iterableBillingInapp += item.iterableBillingInapp;
      group.postmark += item.postmark;
      group.toastNotifications += item.toastNotifications;
      group.dashboardFloating += item.dashboardFloating;
      group.inAppHorizontalBanners += item.inAppHorizontalBanners;
    });
    
    return Array.from(groups.values()).sort((a, b) => a.timeKey.localeCompare(b.timeKey));
  }, [data, timeGranularity]);

  const maxTotal = Math.max(...groupedData.map(d => d.platform + d.external));

  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <h3 className={styles.title}>Total Notification Volume</h3>
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={groupedData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timeKey"
                tickFormatter={formatTimeKey}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={formatValue}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => [value.toLocaleString(), '']}
                labelFormatter={formatTimeKey}
              />
              <Legend />
              <Bar dataKey="email" name="Email" fill="#6B7AFF" stackId="a" />
              <Bar dataKey="ipn" name="IPN" fill="#33E0FF" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <h3 className={styles.title}>Platform vs Non-platform powered Notifications</h3>
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={groupedData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timeKey"
                tickFormatter={formatTimeKey}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={formatValue}
                tick={{ fontSize: 12 }}
                domain={[0, maxTotal]}
              />
              <Tooltip
                formatter={(value: number) => [value.toLocaleString(), '']}
                labelFormatter={formatTimeKey}
              />
              <Legend />
              <Bar dataKey="platform" name="Platform-powered" fill="#6B7AFF" stackId="b" />
              <Bar dataKey="external" name="Non-platform-powered" fill="#8A7AD9" stackId="b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <h3 className={styles.title}>IPN by Source</h3>
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={groupedData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timeKey"
                tickFormatter={formatTimeKey}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={formatValue}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => [value.toLocaleString(), '']}
                labelFormatter={formatTimeKey}
              />
              <Legend />
              <Bar dataKey="knockGuides" name="Knock Guides" fill="#6B7AFF" stackId="c" />
              <Bar dataKey="knockWorkflows" name="Knock Workflows" fill="#33E0FF" stackId="c" />
              <Bar dataKey="bespoke" name="Bespoke" fill="#8A7AD9" stackId="c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <h3 className={styles.title}>Knock Notifications by Channel Name</h3>
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={groupedData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timeKey"
                tickFormatter={formatTimeKey}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={formatValue}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => [value.toLocaleString(), '']}
                labelFormatter={formatTimeKey}
              />
              <Legend />
              <Bar dataKey="inApp" name="In-app" fill="#6B7AFF" stackId="c" />
              <Bar dataKey="iterableBillingInapp" name="Iterable Billing In-app" fill="#33E0FF" stackId="c" />
              <Bar dataKey="postmark" name="Postmark" fill="#8A7AD9" stackId="c" />
              <Bar dataKey="toastNotifications" name="Toast Notifications" fill="#FF5E5E" stackId="c" />
              <Bar dataKey="dashboardFloating" name="Dashboard Floating" fill="#00D4FF" stackId="c" />
              <Bar dataKey="inAppHorizontalBanners" name="In-app Horizontal Banners" fill="#4353FF" stackId="c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default NotificationBarCharts; 