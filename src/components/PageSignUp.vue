<template>
  <div id="signup" class="column is-4 is-offset-4 has-text-centered">
    <h3 class="title has-text-white">InoxSegar</h3>
    <p class="subtitle has-text-white">Pendaftaran akun baru.</p>
    <div class="box">
      <figure class="avatar">
        <img :src="avatar">
      </figure>
      <form @submit.prevent="onSubmit">
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" :class="{'is-danger': isValid.username == false}" type="text" v-model="username" placeholder="Nama Pengguna" autofocus="" autocomplete="username" required :disabled="pending">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
            <p class="help is-danger has-text-left">{{ isValid.usernameHelper }}</p>
          </div>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" :class="{'is-danger': isValid.email == false}" type="email" v-model="email" placeholder="Email" autocomplete="email" required :disabled="pending">
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
            <p class="help is-danger has-text-left">{{ isValid.emailHelper }}</p>
          </div>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" :class="{'is-danger': isValid.password == false}"  type="password" v-model="password" placeholder="Sandi" required :disabled="pending">
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
            <p class="help is-danger has-text-left">{{ isValid.passwordHelper }}</p>
          </div>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" :class="{'is-danger': isValid.confirmation == false}" type="password" v-model="confirmation" placeholder="Konfirmasi Sandi" required :disabled="pending">
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
            <p class="help is-danger has-text-left">{{ isValid.confirmationHelper }}</p>
          </div>
        </div>
        <hr>
        <div class="columns">
          <div class="column">
            <button type="submit" class="button is-block is-info is-large" :class="{'is-loading': pending}">
              <span>Daftar</span>
            </button>
          </div>
          <div class="column">
            <a class="button is-block is-large" @click="clearInputs">
              <span>Batal</span>
            </a>
          </div>
        </div>
      </form>
    </div>
    <p class="has-text-white">
      <router-link to="/sign-in">Masuk</router-link> &nbsp;·&nbsp;
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
        username: null,
        email: null,
        password: null,
        confirmation: null,
        isValid: {
          username: null,
          usernameHelper: '',
          email: null,
          emailHelper: '',
          password: null,
          passwordHelper: '',
          confirmation: null,
          confirmationHelper: ''
        }
      }
    },
    computed: {
      avatar () {
        if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.email)) {
          return 'https://www.gravatar.com/avatar/' + md5(this.email) + '?d=wavatar&s=150'
        } else return defaultAvatar
      },
      pending () {
        return this.$store.state.ui.pending
      }
    },
    methods: {
      onSubmit () {
        this.validateInput()
        if (this.isValid.email && this.isValid.username && this.isValid.password && this.isValid.confirmation) {
          this.$store.dispatch('register', {
            username: this.username,
            email: this.email,
            password: this.password
          })
        }
      },
      validateInput () {
        if (!this.username) {
          this.isValid.username = false
          this.isValid.usernameHelper = 'Nama Pengguna harus diisi!'
        } else if (this.username.length < 5) {
          this.isValid.username = false
          this.isValid.usernameHelper = 'Nama pengguna minimal 5 karakter!'
        } else if (!/^[a-zA-Z0-9_]*$/.test(this.username)) {
          this.isValid.username = false
          this.isValid.usernameHelper = 'Nama Pengguna hanya dapat huruf, angka atau underscore!'
        } else {
          this.isValid.username = true
          this.isValid.usernameHelper = ''
        }
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
        } else if (this.password.length < 8) {
          this.isValid.password = false
          this.isValid.passwordHelper = 'Sandi terlalu pendek, minimal 8 karakter!'
        } else {
          this.isValid.password = true
          this.isValid.passwordHelper = ''
        }
        if (!this.confirmation) {
          this.isValid.confirmation = false
          this.isValid.confirmationHelper = 'Konfirmasi sandi harus diisi!'
        } else if (this.confirmation !== this.password) {
          this.isValid.confirmation = false
          this.isValid.confirmationHelper = 'Konfirmasi sandi harus sama dengan sandi!'
        } else {
          this.isValid.confirmation = true
          this.isValid.confirmationHelper = ''
        }
      },
      clearInputs () {
        this.username = null
        this.email = null
        this.password = null
        this.confirmation = null
      }
    }
  }
</script>
