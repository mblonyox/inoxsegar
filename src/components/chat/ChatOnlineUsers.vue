<template>
  <div class="online-users level">
    <span>{{ users.length }} online:</span>
    <span class="image is-32x32" v-for="user in users">
      <img :src="getAvatar(user.email)" class="avatar" alt="avatar">
    </span>
  </div>
</template>

<script>
  import md5 from 'md5'
  import defaultAvatar from '../../assets/mblonyox-logo-sm.png'

  export default {
    props: ['users'],
    methods: {
      getAvatar(email) {
        if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email)) {
          return 'https://www.gravatar.com/avatar/' + md5(email) + '?d=wavatar&s=150'
        } else return defaultAvatar
      }
    }
  }
</script>

<style>
span.image {
  display: inline-block;
}

div.online-users {
  padding: 5px;
  overflow: hidden;
}
</style>