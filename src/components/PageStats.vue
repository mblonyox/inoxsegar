<template>
  <div id="stats" style="margin-top: 3em">
    <div class="container">
      <div class="tabs is-centered is-boxed is-fullwidth">
        <ul>
          <li
            v-for="tab in tabs"
            :class="{'is-active': activeTab === tab}">
            <a @click="activeTab = tab">{{ tab }}</a>
          </li>
        </ul>
      </div>
      <div class="box" v-if="activeTab === 'Top'">

      </div>
      <div class="box" v-if="activeTab === 'Downloads'">
        <log-download v-if="isAdmin"/>
        <h1 v-else>Hanya admin.</h1>
      </div>
    </div>
  </div>
</template>

<script>
import LogDownload from './StatsLogDownload'

export default {
  data: () => ({
    tabs: [
      'Top',
      'Downloads',
      'Uploads',
      'Users'
    ],
    activeTab: 'Top'
  }),
  computed: {
    isAdmin() {
      return this.$store.state.auth.user.admin
    }
  },
  components: {
    LogDownload
  }
}
</script>