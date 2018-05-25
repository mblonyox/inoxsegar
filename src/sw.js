self.addEventListener('push', e => {
  // const option = {
  //   body: e.data ? e.data.text() : 'Push with no message.',
  //   icon: '/static/img/icons/favicon-96x96.png',
  //   vibrate: [500,200,300]
  // }
  console.log(e)
})
