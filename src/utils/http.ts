import { config, type ApiConfig } from '../config';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetchJSONOptions extends Omit<RequestInit, 'body'> {
  method?: HttpMethod;
  body?: unknown;
  timeoutMs?: number;
  retryCount?: number;
}

export class HttpError extends Error {
  constructor(
    message: string,
    public readonly response: Response,
    public readonly data: unknown
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

const ABSOLUTE_URL_REGEX = /^https?:\/\//i;

const toNumber = (value: string | number | undefined, fallback: number): number => {
  if (value === undefined) return fallback;
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

const baseApiConfig: ApiConfig = {
  ...config.api,
  timeoutMs: toNumber(config.api.timeoutMs, 8000),
  retryCount: toNumber(config.api.retryCount, 2)
};

const resolveUrl = (path: string, apiConfig: ApiConfig): string => {
  if (ABSOLUTE_URL_REGEX.test(path)) {
    return path;
  }

  const sanitizedBase = apiConfig.baseUrl.replace(/\/+$/, '');
  const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${sanitizedBase}${sanitizedPath}`;
};

const getHeaders = (headers?: HeadersInit): Headers => {
  const result = new Headers(headers ?? {});
  if (!result.has('Accept')) {
    result.set('Accept', 'application/json');
  }
  return result;
};

const withTimeout = (timeoutMs: number, signal?: AbortSignal | null) => {
  const controller = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  if (timeoutMs > 0) {
    timeoutId = setTimeout(() => {
      controller.abort(new DOMException('Request timed out', 'AbortError'));
    }, timeoutMs);
  }

  if (signal) {
    signal.addEventListener(
      'abort',
      () => {
        controller.abort(signal.reason);
      },
      { once: true }
    );
  }

  const cleanup = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  controller.signal.addEventListener('abort', cleanup, { once: true });

  return { controller, cleanup };
};

const tryParseJson = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get('content-type') ?? '';
  if (response.status === 204 || !contentType.includes('application/json')) {
    return undefined;
  }

  try {
    return await response.json();
  } catch (error) {
    console.warn('Failed to parse JSON response', error);
    return undefined;
  }
};

export async function fetchJSON<T = unknown>(path: string, options: FetchJSONOptions = {}): Promise<T> {
  const {
    method = 'GET',
    body,
    headers,
    timeoutMs = baseApiConfig.timeoutMs,
    retryCount = baseApiConfig.retryCount,
    signal,
    ...rest
  } = options;

  const url = resolveUrl(path, baseApiConfig);
  const computedHeaders = getHeaders(headers);
  const payload =
    body === undefined || body === null
      ? undefined
      : typeof body === 'string' || body instanceof FormData
      ? body
      : JSON.stringify(body);

  if (payload && typeof payload === 'string' && !computedHeaders.has('Content-Type')) {
    computedHeaders.set('Content-Type', 'application/json');
  }

  let lastError: unknown;

  for (let attempt = 0; attempt <= retryCount; attempt += 1) {
    const { controller, cleanup } = withTimeout(timeoutMs, signal ?? undefined);

    try {
      const response = await fetch(url, {
        method,
        body: payload,
        headers: computedHeaders,
        signal: controller.signal,
        ...rest
      });

      cleanup();

      if (!response.ok) {
        const errorData = await tryParseJson(response);
        throw new HttpError(response.statusText, response, errorData);
      }

      const data = (await tryParseJson(response)) as T;
      return data;
    } catch (error) {
      cleanup();
      lastError = error;

      const isAbortError = error instanceof DOMException && error.name === 'AbortError';
      const shouldRetry = attempt < retryCount && !isAbortError;

      if (!shouldRetry) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 150 * (attempt + 1)));
    }
  }

  throw lastError ?? new Error('Request failed without specific error');
}

export function mockJsonResponse<T>(factory: () => T, delayMs = 350): Promise<T> {
  if (delayMs <= 0) {
    return Promise.resolve(factory());
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(factory());
    }, delayMs);
  });
}