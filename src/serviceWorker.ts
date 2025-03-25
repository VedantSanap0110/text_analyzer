/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

interface SyncEvent extends ExtendableEvent {
  readonly tag: string;
}

const CACHE_NAME = 'e-commerce-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css'
];

// Install Service Worker
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event: ExtendableEvent) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});

// Fetch Event
self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Background Sync
self.addEventListener('sync', (event: Event) => {
  const syncEvent = event as SyncEvent;
  if (syncEvent.tag === 'syncOrders') {
    syncEvent.waitUntil(syncOrders());
  }
});

// Push Notification
self.addEventListener('push', (event: PushEvent) => {
  const options: NotificationOptions = {
    body: event.data?.text() ?? 'No payload',
    icon: '/icon-192.png',
    badge: '/icon-192.png'
  };

  event.waitUntil(
    self.registration.showNotification('E-commerce PWA', options)
  );
});

async function syncOrders() {
  try {
    const failedOrders = await getFailedOrders();
    await Promise.all(failedOrders.map(order => sendOrderToServer(order)));
  } catch (error) {
    console.error('Error syncing orders:', error);
  }
}

// Helper functions (to be implemented based on your data structure)
async function getFailedOrders(): Promise<any[]> {
  // Implement getting failed orders from IndexedDB
  return [];
}

async function sendOrderToServer(order: any): Promise<void> {
  // Implement sending order to server
  return Promise.resolve();
}