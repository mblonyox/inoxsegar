<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
        <img src="../assets/mblonyox-logo.png" alt="inox-logo"><span class="inox-logo is-size-3 has-text-weight-bold">InoxSegar</span>
        </router-link>
        <button class="button navbar-burger">
          <span/>
          <span/>
          <span/>
        </button>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" exact-active-class="is-active" to="/">Beranda</router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Koleksi</a>
            <div class="navbar-dropdown is-boxed">
              <router-link class="navbar-item" exact-active-class="is-active" to="/movie">Movies</router-link>
              <router-link class="navbar-item" exact-active-class="is-active" to="/series">Series</router-link>
            </div>
          </div>
          <router-link class="navbar-item" exact-active-class="is-active" to="/files">Files</router-link>
          <router-link class="navbar-item" exact-active-class="is-active" to="/forum">Forum</router-link>
          <router-link class="navbar-item" exact-active-class="is-active" to="/stats">Stats</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <router-link class="button is-success" to="/upload">
                  <span class="icon">
                    <i class="fa fa-upload"></i>
                  </span>
                  <span>Upload</span>
                </router-link>
              </p>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">{{ username }}</a>
            <div class="navbar-dropdown is-right">
              <router-link 
                class="navbar-item"
                exact-active-class="is-active"
                :to="{name: 'PageUser', params: {id: userId }}"
              >
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img class="avatar" :src="avatar" alt="my-avatar">
                    </figure>
                  </div>
                  <div class="media-content">
                    <b>{{ username }}</b>
                    <p>{{ email }}</p>
                  </div>
                </div>
              </router-link>
              <hr class="navbar-divider">
              <a @click.prevent="doSignOut" class="navbar-item">Keluar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
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
      userId () {
        return this.$store.state.auth.user.id
      },
      username () {
        return this.$store.state.auth.user.username
      },
      email () {
        return this.$store.state.auth.user.email
      },
      isAdmin () {
        return this.$store.state.auth.user.admin
      }
    },
    methods: {
      doSignOut () {
        this.$store.dispatch('signOut')
      }
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lobster');

.inox-logo {
  font-family: 'Lobster', cursive;
}

img.avatar {
  border-radius: 50%;
  max-height: 48px;
}
</style>

