<template>
  <div class="online-users level">
    <div class="level-left">
      <span class="level-item">{{ users.length }} online:</span>
    </div>
    <div class="level-right">
      <span class="image is-32x32 tooltip is-tooltip-bottom level-item" v-for="user in users" :data-tooltip="user.username" >
        <img :src="getAvatar(user.email)" class="avatar" alt="avatar">
      </span>
    </div>
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

.chat div.online-users {
  padding: 5px;
  margin-bottom: 0.5rem;
}
</style>