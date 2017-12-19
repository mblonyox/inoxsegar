<template>
  <div id="plain">
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <router-view/>
      </div>
    </section>
  </div>
</template>

<style>
#plain .box {
  margin-top: 5rem;
}
#plain .avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
#plain .avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
#plain p.subtitle {
  padding-top: 1rem;
}
#plain .button {
  width: 100%;
}
</style>
