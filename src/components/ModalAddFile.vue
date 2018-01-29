<template>
  <div class="modal" :class="active ? 'is-active' : '' ">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Tambah File</p>
        <button class="delete" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama File</th>
              <th>Ukuran</th>
              <th>Uploader</th>
              <th>Tanggal</th>
              <th>Pilih</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in files" :key="file.id">
              <td>{{ files.indexOf(file) + 1}}</td>
              <td>{{ file.name }}</td>
              <td>{{ humanFilesize(file.size) }}</td>
              <td>{{ file.uploader.username }}</td>
              <td>{{ (new Date(file.date)).toLocaleString('id-ID') }}</td>
              <td><input type="radio" v-model="selected" name="file" :value="file._id"></td>
            </tr>
          </tbody>
        </table>
      </section>
      <footer class="modal-card-foot">
        <button class="is-success button" @click="onSubmit">Tambah</button>
        <button class="button" @click="close">Batal</button>
      </footer>
    </div>
  </div>
</template>

<script>
import serverUrl from '../helpers/backend-url'
import filesize from 'filesize'

export default {
  data () {
    return {
      files: [],
      selected: null
    }
  },
  props: ['active'],
  methods: {
    close () {
      this.$emit('update:active', false)
    },
    humanFilesize (bytes) {
      return filesize(bytes)
    },
    onSubmit () {
      this.$emit('submit', this.selected)
      this.selected = null
      this.close()
    }
  },
  mounted () {
    fetch(serverUrl + 'api/file', {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        'x-access-token': this.$store.state.auth.token
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          this.files = json.data.files
        }
      })
  }
}
</script>
