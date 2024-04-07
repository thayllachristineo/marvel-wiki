import fetchAndCache from './fetchAndCache';

describe('fetchAndCache', () => {
  beforeAll(() => {
    global.caches = {
      // @ts-expect-error this is a mock
      open: jest.fn(() => ({
        match: jest.fn(),
        put: jest.fn(),
      })),
    };
  });

  it('should return cached response if available', async () => {
    const mockCachedResponse = new Response('Cached Response');
    const mockCacheMatch = jest.fn(() => Promise.resolve(mockCachedResponse));
    (global.caches.open as jest.Mock).mockReturnValue({
      match: mockCacheMatch,
    });

    const response = await fetchAndCache({ url: 'https://example.com' });

    expect(response).toBe(mockCachedResponse);
    expect(global.caches.open).toHaveBeenCalledWith('marvel-api-cache');
    expect(mockCacheMatch).toHaveBeenCalledWith('https://example.com');
  });

  it('should fetch and cache response if not available in cache', async () => {
    const mockResponse = new Response('Fresh Response');
    global.fetch = jest.fn(() => Promise.resolve(mockResponse));

    const mockCachePut = jest.fn();
    (global.caches.open as jest.Mock).mockReturnValue({
      match: jest.fn(() => undefined),
      put: mockCachePut,
    });

    const response = await fetchAndCache({ url: 'https://example.com' });

    expect(response).toBe(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith('https://example.com');
    expect(global.caches.open).toHaveBeenCalledWith('marvel-api-cache');
    expect(mockCachePut).toHaveBeenCalled();
  });

  it('should use custom cache name and key if provided', async () => {
    const mockResponse = new Response('Fresh Response');
    global.fetch = jest.fn(() => Promise.resolve(mockResponse));

    const mockCachePut = jest.fn();
    (global.caches.open as jest.Mock).mockReturnValue({
      match: jest.fn(() => undefined),
      put: mockCachePut,
    });

    const response = await fetchAndCache({
      url: 'https://example.com',
      cacheName: 'custom-cache',
      cacheKey: 'custom-key',
    });

    expect(response).toBe(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith('https://example.com');
    expect(global.caches.open).toHaveBeenCalledWith('custom-cache');
    expect(mockCachePut).toHaveBeenCalled();
  });
});
