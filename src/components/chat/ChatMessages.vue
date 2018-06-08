<template>
  <div>
    <template v-for="group in grouped">
      <div
        class="is-divider"
        :data-content="`${group.text} - ${formatTime(group.time)}`"
        v-if="group.type === 'system'"
      />
      <chat-grouped v-bind="group" v-else/>
    </template>
  </div>
</template>

<script>
import * as moment from 'moment'
import 'moment/locale/id'
import md5 from 'md5'
import defaultAvatar from '../../assets/mblonyox-logo-sm.png'
import ChatGrouped from './ChatGrouped'

moment.locale('id')

export default {
  data: () => ({
    now: moment()
  }),
  props: ['messages'],
  computed: {
    grouped() {
      const group = []
      for (const [index, message] of this.messages.entries()) {
        const before = this.messages[index - 1]
        if (message.type === 'system') {
          group.push(message)
        } else if (before && before.sender && before.sender._id === message.sender._id) {
          group[group.length - 1].texts.push({
            value: message.text,
            time: message.createdAt,
            fromNow: this.fromNow(message.createdAt)
          })
        } else {
          group.push({
            avatar: this.getAvatar(message.sender.email),
            username: message.sender.username,
            userId: message.sender._id,
            fromSelf: this.fromSelf(message.sender._id),
            texts: [{
              value: message.text,
              time: message.createdAt,
              fromNow: this.fromNow(message.createdAt)
            }]
          })
        }
      }
      return group
    },
    userId() {
      return this.$store.state.auth.user.id
    }
  },
  methods: {
    getAvatar(email) {
      if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email)) {
        return 'https://www.gravatar.com/avatar/' + md5(email) + '?d=wavatar&s=150'
      } else return defaultAvatar
    },
    fromSelf(id) {
      return id === this.userId
    },
    fromNow(time) {
      return moment(time).from(this.now)
    },
    formatTime(time) {
      return moment(time).format('LTS')
    }
  },
  components: {
    ChatGrouped
  },
  created() {
    setInterval(() => {
      this.now = moment()
    }, 5000)
  }
}
</script>
