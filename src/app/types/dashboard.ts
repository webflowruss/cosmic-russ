export type NotificationChannel = 'email' | 'ipn';

export type NotificationSource = 'platform' | 'external';

export interface NotificationMetrics {
  total: number;
  byChannel: {
    [key in NotificationChannel]: number;
  };
  bySource: {
    [key in NotificationSource]: number;
  };
  timeSeries: {
    timestamp: string;
    email: number;
    ipn: number;
    platform: number;
    external: number;
  }[];
}

export interface DashboardData {
  currentMetrics: {
    total: number;
    totalCustomers: number;
    byChannel: {
      email: number;
      ipn: number;
    };
    bySource: {
      platform: number;
      external: number;
    };
  };
  previousPeriodMetrics: {
    total: number;
    totalCustomers: number;
    byChannel: {
      email: number;
      ipn: number;
    };
    bySource: {
      platform: number;
      external: number;
    };
  };
  timeSeriesData: Array<{
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
} 