<template>
  <div class="field">
    <input id="switchMedium" type="checkbox" name="switchMedium" class="switch is-medium" :checked="registered && subscribed" @click="toggleSwitch">
    <label for="switchMedium">Notifikasi</label>
  </div>
</template>

<script>
import { NoNotify } from '../helpers/api-service'

export default {
  data: () => ({
    registered: false
  }),
  computed: {
    subscribed() {
      return this.$store.getters.isSubscribed(this.topic)
    }
  },
  props: ['topic'],
  methods: {
    toggleSwitch() {
      if (this.subscribed) this.unsubscribe()
      else this.subscribe()
    },
    subscribe() {
      if (!this.registered) {
        window.registerPush()
          .then(() => {
            this.registered = true
          })
      }
      NoNotify.doRequest({
        url: 'push/subscribe',
        method: 'POST',
        body: {topic: this.topic}
      })
        .then(state => state.result.body)
        .then(body => {
          if (body.success) this.$store.commit('pushSubscription', this.topic)
        })
    },
    unsubscribe() {
      NoNotify.doRequest({
        url: 'push/unsubscribe',
        method: 'POST',
        body: {topic: this.topic}
      })
        .then(state => state.result.body)
        .then(body => {
          if (body.success) this.$store.commit('removeSubscription', this.topic)
        })
    }
  },
  async mounted() {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()

    this.registered = !!subscription
  }
}
</script>
