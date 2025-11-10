import { useCallback } from 'react';
import { config } from '../config';
import { fetchJSON, mockJsonResponse } from '../utils/http';
import { useAsyncResource } from './useAsyncResource';

export interface StatMetric {
  id: string;
  label: string;
  value: number;
  unit?: string;
  change?: string;
  trend?: 'up' | 'down' | 'flat';
}

export interface StatsSnapshot {
  updatedAt: string;
  metrics: StatMetric[];
  notes?: string;
}

const DEFAULT_BASE_URL = 'https://example.com/api';

const shouldUseMockData = config.api.baseUrl === DEFAULT_BASE_URL;

const createMockStatsSnapshot = (): StatsSnapshot => ({
  updatedAt: new Date().toISOString(),
  metrics: [
    {
      id: 'posts_published',
      label: 'Posts published',
      value: 32,
      change: '+3 this quarter',
      trend: 'up'
    },
    {
      id: 'rf_hours',
      label: 'RF lab hours',
      value: 128,
      unit: 'hrs',
      change: '+14 hrs last 30 days',
      trend: 'up'
    },
    {
      id: 'contracts',
      label: 'Active contracts',
      value: 2,
      change: '1 onboarding',
      trend: 'flat'
    }
  ],
  notes: 'Telemetry will stream from the external API once provisioned.'
});

const loadStatsSnapshot = async (): Promise<StatsSnapshot> => {
  if (shouldUseMockData) {
    return mockJsonResponse(createMockStatsSnapshot);
  }

  try {
    return await fetchJSON<StatsSnapshot>('/stats');
  } catch (error) {
    console.warn('Falling back to mock stats snapshot', error);
    return createMockStatsSnapshot();
  }
};

export function useStatsSnapshot() {
  const fetcher = useCallback(() => loadStatsSnapshot(), []);
  return useAsyncResource(fetcher, []);
}
