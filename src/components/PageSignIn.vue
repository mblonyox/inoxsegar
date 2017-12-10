<template>
  <div id="login" class="column is-4 is-offset-4">
    <h3 class="title has-text-grey">InoxSegar</h3>
    <p class="subtitle has-text-grey">Silahkan
      <i>login</i> untuk melanjutkan.</p>
    <div class="box">
      <figure class="avatar">
        <img src="">
      </figure>
      <div class="notification is-danger" v-if="error">
          <button class="delete" @click="closeError"></button>
          <span>{{ error }}</span>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="field">
          <div class="control">
            <input class="input is-large" type="email" placeholder="Your Email" autofocus="" v-model="email">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input is-large" type="password" placeholder="Your Password" v-model="password">
          </div>
        </div>
        <div class="field">
          <label class="checkbox">
            <input type="checkbox"> Remember me
          </label>
        </div>
        <a class="button is-block is-info is-large" :class="{'is-loading': pending}" @click="onSubmit">
          <input type="submit" style="display:none">
          <span>Login</span>
        </a>
      </form>
    </div>
    <p class="has-text-grey-lighter">
      <router-link to="/auth/sign-up">Daftar Baru</router-link> &nbsp;·&nbsp;
      <router-link to="/auth/reset-password">Lupa Sandi</router-link> &nbsp;·&nbsp;
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
      validateInput () {

      },
      closeError () {
        this.$store.dispatch('clearError')
      }
    }

  }
</script>