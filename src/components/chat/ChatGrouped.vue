<template>
  <div class="media">
    <figure class="media-left" v-if="fromSelf">
      <p class="image is-32x32">
        <img :src="avatar" class="avatar" alt="avatar">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <div class="is-clearfix">
          <router-link 
            :to="{name: 'PageUser', params: {id: userId }}"
            :class="{'is-pulled-right': !fromSelf }"
          >{{username}}</router-link>
        </div>
        <template v-for="text in texts">
            <div class="notification" :class="{'is-primary': fromSelf, 'is-info': !fromSelf}">
              <p>{{text.value}}</p>
              <small class="is-pulled-right is-6">{{text.fromNow}}</small>
            </div>
        </template>
      </div>
    </div>
    <figure class="media-right" v-if="!fromSelf">
        <p class="image is-32x32">
          <img :src="avatar" class="avatar" alt="avatar">
        </p>
      </figure>
  </div>
</template>

<script>

export default {
  props: [ 'avatar', 'username', 'userId', 'fromSelf', 'texts' ]
}
</script>

<style>
.chat .notification {
  padding: 1rem 1.25rem 2rem 1.25rem;
}

.chat .notification:not(:last-child) {
  margin-bottom: 0.5rem;
}
.chat img.avatar {
  border-radius: 50%;
}
</style>
