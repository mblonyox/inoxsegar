<template>
  <div id="signin" class="column is-4 is-offset-4 has-text-centered">
    <h3 class="title has-text-white">InoxSegar</h3>
    <p class="subtitle has-text-white">Silahkan
      <i>login</i> untuk melanjutkan.</p>
    <div class="box">
      <figure class="avatar">
        <img :src="avatar">
      </figure>
      <form @submit.prevent="onSubmit">
        <div class="field">
          <div class="control">
            <input class="input is-large" :class="{'is-danger': isValid.email == false}" type="email" placeholder="Email" autofocus="" v-model="email" required :disabled="pending">
          </div>
          <p class="help is-danger has-text-left" v-if="!isValid.email">{{ isValid.emailHelper }}</p>
        </div>
        <div class="field">
          <div class="control">
            <input class="input is-large" :class="{'is-danger': isValid.password == false}" type="password" placeholder="Sandi" v-model="password" required :disabled="pending">
          </div>
          <p class="help is-danger has-text-left" v-if="!isValid.password">{{ isValid.passwordHelper }}</p>
        </div>
        <div class="notification is-danger" v-if="error">
          <button class="delete" @click.prevent="closeError"></button>
          <span>{{ error }}</span>
        </div>
        <div class="field has-text-left">
          <label class="checkbox">
            <input type="checkbox"> Ingat saya
          </label>
        </div>
        <button type="submit" class="button is-block is-info is-large" :class="{'is-loading': pending}">
          <span>Login</span>
        </button>
      </form>
    </div>
    <p class="has-text-white">
      <router-link to="/sign-up">Daftar Baru</router-link> &nbsp;·&nbsp;
      <router-link to="/reset-password">Lupa Sandi</router-link> &nbsp;·&nbsp;
      <router-link to="/help">Bantuan</router-link>
    </p>
  </div>
</template>

<script>
import md5 from 'md5'
import defaultAvatar from '../assets/mblonyox-logo-sm.png'

export default {
  data () {
    return {
      email: null,
      password: null,
      isValid: {
        email: null,
        emailHelper: '',
        password: null,
        passwordHelper: ''
      }
    }
  },
  computed: {
    avatar () {
      if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.email)) {
        return 'https://www.gravatar.com/avatar/' + md5(this.email) + '?d=wavatar&s=150'
      } else return defaultAvatar
    },
    error () {
      return this.$store.state.auth.error
    },
    pending () {
      return this.$store.state.auth.pending
    }
  },
  methods: {
    onSubmit () {
      this.closeError()
      let credentials = { email: this.email, password: this.password }
      let redirectTo = this.$route.query.redirect
      this.validateInput()
      if (this.isValid.email && this.isValid.password) this.$store.dispatch('authenticate', { credentials, redirectTo })
    },
    validateInput () {
      if (!this.email) {
        this.isValid.email = false
        this.isValid.emailHelper = 'Email harus diisi!'
      } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.email)) {
        this.isValid.email = false
        this.isValid.emailHelper = 'Email tidak valid!'
      } else {
        this.isValid.email = true
        this.isValid.emailHelper = ''
      }
      if (!this.password) {
        this.isValid.password = false
        this.isValid.passwordHelper = 'Sandi harus diisi!'
      } else {
        this.isValid.password = true
        this.isValid.passwordHelper = ''
      }
    },
    closeError () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style>
#signin .box {
  margin-top: 5rem;
}
#signin .avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
#signin .avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
#signin p.subtitle {
  padding-top: 1rem;
}
#signin .button {
  width: 100%;
}
</style>
