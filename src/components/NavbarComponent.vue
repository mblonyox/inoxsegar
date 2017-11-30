<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" exact-active-class="is-active" to="/">
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
          <router-link class="navbar-item" exact-active-class="is-active" to="/movie">Movies</router-link>
          <router-link class="navbar-item" exact-active-class="is-active" to="/tv">TVs</router-link>
          <router-link class="navbar-item" exact-active-class="is-active" to="/anime">Anime</router-link>
        </div>
        <div class="navbar-end">

        </div>
      </div>
    </div>
  </nav>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Lobster');

.inox-logo {
  font-family: 'Lobster', cursive;
}
</style>

