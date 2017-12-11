<template>
  <div id="signup" class="column is-6 is-offset-3 has-text-centered">
    <h3 class="title has-text-white">InoxSegar</h3>
    <p class="subtitle has-text-white">Pendaftaran akun baru.</p>
    <div class="box">
      <form>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" type="text" placeholder="Nama Pengguna" autofocus="" required>
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" type="email" placeholder="Email" autofocus="" required>
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" type="password" placeholder="Sandi" autofocus="" required>
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" type="password" placeholder="Konfirmasi Sandi" autofocus="" required>
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </div>
        </div>
        <hr>
        <button type="submit" class="button is-block is-info" :class="{'is-loading': pending}">
          <span>Daftar</span>
        </button>
      </form>
    </div>
    <p class="has-text-white">
      <router-link to="/sign-in">Masuk</router-link> &nbsp;·&nbsp;
      <router-link to="/reset-password">Lupa Sandi</router-link> &nbsp;·&nbsp;
      <router-link to="/help">Bantuan</router-link>
    </p>
  </div>
</template>


<style>
#signup p.subtitle {
  padding-top: 1rem;
}
</style>
