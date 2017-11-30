<template>
  <div id="main">
    <navbar-component/>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import NavbarComponent from './NavbarComponent'

export default {
  components: {NavbarComponent}
}
</script>
