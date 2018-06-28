<template>
  <div class="message chat">
    <div class="message-header" @click="toggleHide" style="cursor: pointer;">
      <p :class="{badge}" :data-badge="badge">Chat </p>
      <button class="button is-rounded is-primary is-outlined">
        <span class="icon">
          <i class="fa fa-angle-down" aria-hidden="true" v-if="!hidden"></i>
          <i class="fa fa-angle-up" aria-hidden="true" v-else></i>
        </span>
      </button>
    </div>
    <template v-if="!hidden">
      <chat-online-users :users="users" />
      <div class="message-body" ref="chatWindow">
        <chat-messages :messages="chats"/>
      </div>
      <div class="field">
        <p class="control">
          <textarea
            rows="3"
            class="textarea"
            v-model.trim="input"
            placeholder="Tulis pesan..."
            @keyup.enter.exact="sendMessage"
            :disabled="pending"
            ref="chatInput"
          />
          <button class="button is-fullwidth" @click="sendMessage" :disabled="pending">Kirim</button>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import io from 'socket.io-client'
import ChatMessages from './ChatMessages'
import ChatOnlineUsers from './ChatOnlineUsers'
import { RefreshToken } from '../../helpers/api-service'

export default {
  data: () => ({
    hidden: true,
    users: [],
    chats: [],
    input: '',
    pending: false,
    badge: 0
  }),
  computed: {
    token() {
      return this.$store.state.auth.token
    }
  },
  methods: {
    connect() {
      const socket = io('', {
        path: '/api/socket'
      })

      socket.on('connect', () => {
        socket
          .emit('authenticate', {token: this.token})
          .on('online_users', (users) => {
            this.users = users
          })
          .on('authenticated', () => {
            socket.on('old_messages', (messages) => {
              this.chats = messages
              this.$nextTick(() => {
                if (!this.hidden) this.scrollBottom()
              })
            })
              .on('new_message', (message) => {
                this.chats.push(message)
                if (this.hidden) this.badge++
                else this.$nextTick(this.scrollBottom)
              })
              .on('system_message', (message) => {
                this.chats.push({type: 'system', ...message})
              })
          })
          .on('unauthorized', () => {
            RefreshToken.doSingleRequest({})
              .then(({success}) => {
                if (success) {
                  socket.emit('authenticate', {token: this.token})
                } else {
                  socket.close()
                }
              })
          })
      })

      return socket
    },
    sendMessage() {
      if (this.input.length) {
        this.pending = true
        this.socket.emit('send_message', this.input, (message) => {
          this.pending = false
          this.input = ''
          this.chats.push(message)
          this.$nextTick(() => {
            if (!this.hidden) {
              this.scrollBottom()
              this.$refs.chatInput.focus()
            }
          })
        })
      }
    },
    toggleHide() {
      this.hidden = !this.hidden
      this.badge = 0
      this.$nextTick(() => {
        if (!this.hidden) this.scrollBottom()
      })
    },
    scrollBottom() {
      const element = this.$refs.chatWindow
      element.scrollTop = element.scrollHeight
    }
  },
  components: {
    ChatMessages,
    ChatOnlineUsers
  },
  mounted() {
    this.socket = this.connect()
  }
}
</script>

<style>
.chat {
  width: 400px;
  position: fixed;
  bottom: 0;
  right: 10px;
}

.chat .message-body {
  overflow-y: scroll;
  max-height: 400px;
}
</style>
