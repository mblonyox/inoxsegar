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
              <router-link class="navbar-item" exact-active-class="is-active" to="/tv">TVs</router-link>
              <router-link class="navbar-item" exact-active-class="is-active" to="/anime">Anime</router-link>
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
              <p class="control">
                <a class="button is-danger" @click.stop="doSignOut">
                  <span>Sign Out</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    computed: {
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
</style>

