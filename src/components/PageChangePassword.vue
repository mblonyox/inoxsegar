<template>
  <div id="reset-password" class="column is-4 is-offset-4 has-text-centered">
    <h3 class="title has-text-white">InoxSegar</h3>
    <p class="subtitle has-text-white">Ubah sandi.</p>
    <div class="box">
      <figure class="avatar">
        <img :src="avatar">
      </figure>
      <div v-if="success">
        <h4 class="is-size-4">Sandi telah berhasil diubah.<br> Silakan mencoba masuk dengan sandi yang baru.</h4>
        <router-link to="/sign-in" class="button is-block is-info is-large">Masuk</router-link>
      </div>
      <form @submit.prevent="onSubmit" v-else>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" :class="{'is-danger': isValid.password == false}" type="password" v-model="password" placeholder="Sandi Baru" required :disabled="pending">
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
        <button type="submit" class="button is-block is-info is-large" :class="{'is-loading': pending}">
          <span>Ubah sandi.</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import md5 from 'md5'
  import defaultAvatar from '../assets/mblonyox-logo-sm.png'
  import { BaseService } from '../helpers/api-service'

  export default {
    data: () => ({
      password: '',
      confirmation: '',
      isValid: {
        password: true,
        passwordHelper: '',
        confirmation: true,
        confirmationHelper: ''
      },
      success: false
    }),
    computed: {
      avatar() {
        if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.email)) {
          return 'https://www.gravatar.com/avatar/' + md5(this.email) + '?d=wavatar&s=150'
        } else return defaultAvatar
      },
      pending() {
        return this.$store.state.ui.pending
      }
    },
    methods: {
      validate() {
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
      onSubmit() {
        this.validate()
        if (this.isValid.password && this.isValid.confirmation) {
          BaseService.doRequest({
            url: 'change_password',
            method: 'POST',
            body: { password: this.password, token: this.$route.query.token }
          }).then(({result}) => {
            if (result.body.success) this.success = true
          })
        }
      }
    }
  }
</script>
