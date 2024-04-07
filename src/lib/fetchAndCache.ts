const fetchAndCache = async ({
  url,
  cacheName,
  cacheKey,
}: {
  url: string;
  cacheName?: string;
  cacheKey?: string;
}): Promise<Response> => {
  const cache = await caches.open(cacheName || 'marvel-api-cache');
  const cacheKeyName = cacheKey || url;
  const cachedResponse: Response | undefined = await cache.match(cacheKeyName);

  if (cachedResponse) {
    return cachedResponse;
  }

  const response: Response = await fetch(url);

  await cache.put(cacheKeyName, response.clone());

  return response;
};

export default fetchAndCache;
