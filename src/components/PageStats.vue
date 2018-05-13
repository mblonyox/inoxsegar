<template>
  <div id="stats" style="margin-top: 3em">
    <div class="container">
      <div v-if="isAdmin">
        <h1 class="title">Log Download</h1>
        <hr>
        <div class="box">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>User</th>
                <th>File</th>
                <th>Ukuran</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in logs" :key="log._id">
                <td>{{ (new Date(log.createdAt)).toLocaleString('id-ID') }}</td>
                <td><router-link :to="{name: 'PageUser', params: {id: log.user._id }}" v-if="log.user">{{ log.user.username }}</router-link> </td>
                <td>{{ log.target.name }}</td>
                <td>{{ humanFilesize(log.target.size) }}</td>
              </tr>
              <tr>
                <td colspan="4">
                  <infinite-loading @infinite="infiniteHandler" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <h1 class="title"> Halaman ini hanya untuk admin.</h1>
      </div>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { NoNotify } from '../helpers/api-service'
import filesize from 'filesize'

export default {
  data: () => ({
    logs: [],
    page: 0
  }),
  computed: {
    isAdmin() {
      return this.$store.state.auth.user.admin
    }
  },
  methods: {
    humanFilesize(bytes) {
      return filesize(bytes)
    },
    infiniteHandler($state) {
      this.page++
      NoNotify.doRequest({
        url: 'log_download',
        query: {
          page: this.page
        }
      })
        .then(status => status.result.body)
        .then(body => {
          if (body.success) {
            this.logs = this.logs.concat(body.data.logs)
            $state.loaded()
            if (body.data.logs.length < 100) {
              $state.complete()
            }
          }
        })
    }
  },
  components: {
    InfiniteLoading
  }
}
</script>

