<template>
  <div id="activate-account" class="column is-4 is-offset-4 has-text-centered">
    <h3 class="title has-text-white">InoxSegar</h3>
    <p class="subtitle has-text-white">Masukkan kode aktivasi yang diterima melalui email.</p>
    <div class="box">
      <figure class="avatar">
        <img :src="avatar">
      </figure>
      <p class="subtitle has-text-black">Kode Aktivasi telah dikirim ke email anda: <a :href="'mailto:'+email" class="has-text-info">{{ email }}</a>.</p>
      <p class="subtitle has-text-black">Belum menerima email? <a class="has-text-info" @click="resendActivation" v-if="!sendingMail">Kirim Ulang</a> <span v-else><i class="fa fa-spinner fa-pulse fa-fw"></i></span></p>
      <hr>
      <form @submit.prevent="activate">
        <div class="control has-icons-left">
          <input type="text" class="input is-large" v-model="kode" placeholder="Kode Aktivasi">
          <span class="icon is-small is-left">
            <i class="fa fa-key"></i>
          </span>
          <p class="help is-danger has-text-left" v-if="!isValid.kode">{{ isValid.kodeHelper }}</p>
        </div>
        <div class="notification is-danger" v-if="error">
          <button class="delete" @click.prevent="closeError"></button>
          <span>{{ error }}</span>
        </div>
        <button type="submit" class="button is-block is-info is-large" :class="{'is-loading': pending}">
          <span>Aktivasi</span>
        </button>
      </form>
    </div>
    <p class="has-text-white">
      Bukan {{ username }}? <a @click="signOut">Keluar.</a>
    </p>
  </div>
</template>

<script>
import md5 from 'md5'
import defaultAvatar from '../assets/mblonyox-logo-sm.png'
import serverUrl from '../helpers/backend-url'

export default {
  data () {
    return {
      kode: null,
      isValid: {
        kode: null,
        kodeHelper: ''
      },
      sendingMail: false
    }
  },
  computed: {
    avatar () {
      if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.email)) {
        return 'https://www.gravatar.com/avatar/' + md5(this.email) + '?d=wavatar&s=150'
      } else return defaultAvatar
    },
    username () {
      return this.$store.state.auth.user.username
    },
    email () {
      return this.$store.state.auth.user.email
    },
    pending () {
      return this.$store.state.auth.pending
    },
    error () {
      return this.$store.state.auth.error
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
    },
    activate () {
      this.$store.dispatch('activate', this.kode)
    },
    resendActivation () {
      this.sendingMail = true
      let httpHeaders = new Headers({
        'x-access-token': this.$store.state.auth.token
      })
      fetch(serverUrl + 'api/resend_activation', {
        method: 'GET',
        mode: 'cors',
        headers: httpHeaders
      })
        .then(response => response.json())
        .then(data => {
          this.sendingMail = false
          if (data.success) {
            this.$notify({
              group: 'system',
              title: 'Email aktivasi.',
              text: data.message,
              type: 'success'
            })
          } else {
            this.$store.commit('setAuthError', data.message)
          }
        })
        .catch(err => {
          this.sendingMail = false
          this.$store.commit('setAuthError', err.message)
        })
    },
    closeError () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
