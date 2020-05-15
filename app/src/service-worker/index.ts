export const CACHE_NAME = 'shri-ci-v1';

import { update, fromCacheOrNetwork } from './helpers';

self.addEventListener('install', function(event:any) {
    //Service worker installed
    self.skipWaiting();
});

self.addEventListener('activate', function(event: any) {
    //позволяет клиентской странице, загруженной в той же области видимости, обходиться без перезагрузки для использования сервис-воркером.
    event.waitUntil(clients.claim());

    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (CACHE_NAME !== cache) {
                        return caches.delete(cache);
                    }
                }),
            );
        }),
    );
});

self.addEventListener('fetch', function(event:any) {
    //Server worker fetch
    event.respondWith(fromCacheOrNetwork(event.request));
    event.waitUntil(update(event.request));
});
