import { DashboardData } from '../types/dashboard';

interface DashboardData {
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

// Generate mock data for the last 12 months
const generateTimeSeriesData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Base values with some randomness
    const baseEmail = 5000 + Math.random() * 2000;
    const baseIPN = 3000 + Math.random() * 1500;
    const basePlatform = 4000 + Math.random() * 1800;
    const baseExternal = 4000 + Math.random() * 1700;
    
    // IPN breakdowns
    const knockGuides = baseIPN * 0.4 + Math.random() * 500;
    const knockWorkflows = baseIPN * 0.35 + Math.random() * 400;
    const bespoke = baseIPN * 0.25 + Math.random() * 300;
    
    // Channel breakdowns
    const inApp = baseIPN * 0.35 + Math.random() * 400;
    const iterableBillingInapp = baseIPN * 0.25 + Math.random() * 300;
    const postmark = baseIPN * 0.15 + Math.random() * 200;
    const toastNotifications = baseIPN * 0.1 + Math.random() * 150;
    const dashboardFloating = baseIPN * 0.1 + Math.random() * 150;
    const inAppHorizontalBanners = baseIPN * 0.05 + Math.random() * 100;
    
    data.push({
      date: date.toISOString().split('T')[0],
      email: Math.round(baseEmail),
      ipn: Math.round(baseIPN),
      platform: Math.round(basePlatform),
      external: Math.round(baseExternal),
      knockGuides: Math.round(knockGuides),
      knockWorkflows: Math.round(knockWorkflows),
      bespoke: Math.round(bespoke),
      inApp: Math.round(inApp),
      iterableBillingInapp: Math.round(iterableBillingInapp),
      postmark: Math.round(postmark),
      toastNotifications: Math.round(toastNotifications),
      dashboardFloating: Math.round(dashboardFloating),
      inAppHorizontalBanners: Math.round(inAppHorizontalBanners)
    });
  }
  
  return data.reverse();
};

export const mockDashboardData: DashboardData = {
  currentMetrics: {
    total: 1250000,
    totalCustomers: 850000,
    byChannel: {
      email: 750000,
      ipn: 500000
    },
    bySource: {
      platform: 800000,
      external: 450000
    }
  },
  previousPeriodMetrics: {
    total: 1100000,
    totalCustomers: 780000,
    byChannel: {
      email: 650000,
      ipn: 450000
    },
    bySource: {
      platform: 700000,
      external: 400000
    }
  },
  timeSeriesData: generateTimeSeriesData()
}; 