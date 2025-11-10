import { useCallback } from 'react';
import { config } from '../config';
import { fetchJSON, mockJsonResponse } from '../utils/http';
import { useAsyncResource } from './useAsyncResource';

export type NowEntryStatus = 'active' | 'paused' | 'queued';

export interface NowEntry {
  id: string;
  title: string;
  summary: string;
  status: NowEntryStatus;
  startedAt?: string;
}

export interface NowFeed {
  updatedAt: string;
  entries: NowEntry[];
}

const DEFAULT_BASE_URL = 'https://example.com/api';

const shouldUseMockData = config.api.baseUrl === DEFAULT_BASE_URL;

const createMockNowFeed = (): NowFeed => ({
  updatedAt: new Date().toISOString(),
  entries: [
    {
      id: 'orb-refresh',
      title: 'Orb interface refinements',
      summary: 'Dialing in spoke choreography and responsive fallbacks for the homepage orb.',
      status: 'active',
      startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString()
    },
    {
      id: 'contract-notes',
      title: 'Contracting playbook notes',
      summary: 'Drafting reusable patterns from recent consulting engagements and filing them into the /meta log.',
      status: 'active',
      startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 16).toISOString()
    },
    {
      id: 'rf-lab',
      title: 'RF Lab hardware experiments',
      summary: 'Testing updated feedlines on the bench to prep future build logs.',
      status: 'paused'
    }
  ]
});

const loadNowFeed = async (): Promise<NowFeed> => {
  if (shouldUseMockData) {
    return mockJsonResponse(createMockNowFeed);
  }

  try {
    return await fetchJSON<NowFeed>('/now');
  } catch (error) {
    console.warn('Falling back to mock now feed', error);
    return createMockNowFeed();
  }
};

export function useNowFeed() {
  const fetcher = useCallback(() => loadNowFeed(), []);

  return useAsyncResource(fetcher, []);
}
