<template>
  <div id="reset-password" class="column is-6 is-offset-3 has-text-centered">
    <h3 class="title has-text-white">InoxSegar</h3>
    <p class="subtitle has-text-white">Atur ulang sandi.</p>
    <div class="box">
      <figure class="avatar">
        <img :src="avatar">
      </figure>
      <form @submit.prevent="onSubmitEmail">
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" type="email" placeholder="Email" autofocus="" v-model="email" required :disabled="pending">
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
        </div>
      </form>
    </div>
    <p class="has-text-white">
      <router-link to="/sign-in">Masuk</router-link> &nbsp;·&nbsp;
      <router-link to="/sign-up">Daftar Baru</router-link> &nbsp;·&nbsp;
      <router-link to="/help">Bantuan</router-link>
    </p>
  </div>
</template>

<script>
  import md5 from 'md5'
  import defaultAvatar from '../assets/mblonyox-logo-sm.png'

  export default {
    computed: {
      avatar () {
        if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.email)) {
          return 'https://www.gravatar.com/avatar/' + md5(this.email) + '?d=wavatar&s=150'
        } else return defaultAvatar
      },
      pending () {
        return this.$store.state.auth.pending
      }
    }
  }
</script>
