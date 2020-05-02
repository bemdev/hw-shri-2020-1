import { CACHE_NAME } from './index';

export function update(request: any) {
    return caches.open(CACHE_NAME).then(function(cache) {
        fetch(request).then(response => {
            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            if (request.method === 'GET') {
                const responseToCache = response.clone();
                cache.put(request, responseToCache);
            }
            return;
        });
    });
}

export function fromCacheOrNetwork(request:any) {
    return caches.open(CACHE_NAME).then(cache => {
        return cache.match(request).then(matching => {
            return matching || fetch(request);
        });
    });
}
