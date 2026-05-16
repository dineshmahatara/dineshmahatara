// =====================================================================
// NOTICEHUB SERVICE WORKER BACKGROUND INTERACTION ENGINE
// =====================================================================
self.addEventListener('push', function(event) {
  let payload = { title: 'NoticeHub System Broadcast', body: 'New company announcement published.' };
  
  if (event.data) {
    try {
      payload = event.data.json();
    } catch (e) {
      payload.body = event.data.text();
    }
  }

  const options = {
    body: payload.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/3602/3602149.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3602/3602149.png',
    vibrate: [100, 50, 100],
    data: { dateOfArrival: Date.now() },
    actions: [
      { action: 'open', title: 'Open NoticeHub Console' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
