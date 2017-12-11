<template>
  <div id="signin" class="column is-4 is-offset-4 has-text-centered">
    <h3 class="title has-text-white">InoxSegar</h3>
    <p class="subtitle has-text-white">Silahkan
      <i>login</i> untuk melanjutkan.</p>
    <div class="box">
      <figure class="avatar">
        <img src="../assets/mblonyox-logo-sm.png">
      </figure>
      <form @submit.prevent="onSubmit">
        <div class="field">
          <div class="control">
            <input class="input is-large" type="email" placeholder="Email" autofocus="" v-model="email" required>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input is-large" type="password" placeholder="Sandi" v-model="password" required>
          </div>
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
export default {
  data () {
    return {
      email: null,
      password: null,
      isValid: false
    }
  },
  computed: {
    error () {
      return this.$store.state.auth.error
    },
    pending () {
      return this.$store.state.auth.pending
    }
  },
  methods: {
    onSubmit () {
      let credentials = { email: this.email, password: this.password }
      let redirectTo = this.$route.query.redirect
      this.validateInput()
      this.$store.dispatch('authenticate', { credentials, redirectTo })
    },
    validateInput () {},
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
