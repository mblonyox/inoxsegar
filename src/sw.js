/* eslint-disable no-undef */
self.addEventListener('push', event => {
  const data = event.data.json()
  console.log('Push received', data)
  self.registration.showNotification(data.title, {
    body: data.body,
    image: data.image,
    icon: '/static/img/icons/favicon-96x96.png',
    data: {
      url: data.url
    }
  })
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(clientList => {
    let found = false
    for (let i = 0; i < clientList.length; i++) {
      if (clientList[i].url === event.notification.data.url) {
        found = true
        clientList[i].focus()
        break
      }
    }
    if (!found) {
      if (clientList.length > 0) {
        clientList[0].navigate(event.notification.data.url)
      } else {
        clients.openWindow(event.notification.data.url)
      }
    }
  }))
})
