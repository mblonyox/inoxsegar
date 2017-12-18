<template>
  <div id="activate-account" class="column is-4 is-offset-4 has-text-centered">
    <h3 class="title has-text-white">InoxSegar</h3>
    <p class="subtitle has-text-white">Masukkan kode aktivasi yang diterima melalui email.</p>
    <div class="box">
      <figure class="avatar">
        <img :src="avatar">
      </figure>
      <p class="subtitle has-text-black">Kode Aktivasi telah dikirim ke email anda: <a :href="'mailto:'+email" class="has-text-info">{{ email }}</a>.</p>
      <hr>
      <form>
        <div class="control has-icons-left">
          <input type="text" class="input is-large" v-model="kode" placeholder="Kode Aktivasi">
          <span class="icon is-small is-left">
            <i class="fa fa-key"></i>
          </span>
          <p class="help is-danger has-text-left" v-if="!isValid.kode">{{ isValid.kodeHelper }}</p>
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

export default {
  data () {
    return {
      kode: null,
      isValid: {
        kode: null,
        kodeHelper: ''
      }
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
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
    }
  }
}
</script>

<style>
#activate-account .box {
  margin-top: 5rem;
}
#activate-account .avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
#activate-account .avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
#activate-account p.subtitle {
  padding-top: 1rem;
}
#activate-account .button {
  width: 100%;
}
</style>

