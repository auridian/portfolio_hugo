export type ApiEnvironment = 'development' | 'staging' | 'production';

const apiEnvironment = (import.meta.env.VITE_API_ENV as ApiEnvironment | undefined) ?? 'development';

export const config = {
  api: {
    environment: apiEnvironment,
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://example.com/api',
    timeoutMs: Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 8000),
    retryCount: Number(import.meta.env.VITE_API_RETRY_COUNT ?? 2)
  }
};

export type ApiConfig = typeof config.api;
