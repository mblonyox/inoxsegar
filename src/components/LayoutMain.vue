<template>
  <div id="main">
    <navbar-component/>
    <main>
      <router-view/>
    </main>
    <chat-container/>
  </div>
</template>

<script>
import NavbarComponent from './NavbarComponent'
import ChatContainer from './chat/ChatContainer'

export default {
  components: {
    NavbarComponent,
    ChatContainer
  }
}
</script>
