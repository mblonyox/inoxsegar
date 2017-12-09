<template>
  <div id="login" class="column is-4 is-offset-4">
    <h3 class="title has-text-grey">InoxSegar</h3>
    <p class="subtitle has-text-grey">Silahkan
      <i>login</i> untuk melanjutkan.</p>
    <div class="box">
      <figure class="avatar">
        <img src="">
      </figure>
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
        <input type="submit" class="button is-block is-info is-large" value="Login">
      </form>
    </div>
    <p class="has-text-grey-lighter">
      <router-link to="/auth/signup">Daftar Baru</router-link> &nbsp;·&nbsp;
      <router-link to="/auth/reset-password">Lupa Sandi</router-link> &nbsp;·&nbsp;
    </p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        email: null,
        password: null
      }
    },
    methods: {
      onSubmit () {
        let credentials = {email: this.email, password: this.password}
        let redirectTo = this.$route.query.redirect
        this.validateInput()
        this.$store.dispatch('authenticate', {credentials, redirectTo})
      },
      validateInput () {

      }
    }

  }
</script>
