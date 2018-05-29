import { NoNotify } from '../helpers/api-service'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  const rawData = window.atob(base64)
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)))
}

async function registerPush() {
  const registration = await navigator.serviceWorker.ready
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: window.vapidKey
  })
  return NoNotify.doRequest({
    url: 'push/register',
    method: 'POST',
    body: {
      subscription: JSON.stringify(subscription)
    }
  })
    .catch(() => {
      subscription.unsubscribe()
    })
}

async function unregisterPush() {
  const registration = await navigator.serviceWorker.ready
  const subscription = await registration.pushManager.getSubscription()

  if (!subscription) return

  return subscription.unsubscribe()
    .then(() => {
      return NoNotify.doRequest({
        url: 'push/unregister',
        method: 'POST',
        body: {
          subscription: JSON.stringify(subscription)
        }
      })
    })
}

(async function() {
  const response = await fetch('/api/push/vapid-key')
  const key = await response.text()

  window.vapidKey = urlBase64ToUint8Array(key)
  window.registerPush = registerPush
  window.unregisterPush = unregisterPush
})()
