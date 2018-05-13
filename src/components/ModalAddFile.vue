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
import filesize from 'filesize'
import { NoNotify } from '../helpers/api-service'

export default {
  data() {
    return {
      files: [],
      selected: null
    }
  },
  props: ['active'],
  methods: {
    close() {
      this.$emit('update:active', false)
    },
    humanFilesize(bytes) {
      return filesize(bytes)
    },
    onSubmit() {
      this.$emit('submit', this.selected)
      this.selected = null
      this.close()
    }
  },
  mounted() {
    NoNotify.doRequest({
      url: 'file',
      query: {
        nonkoleksi: true
      }
    })
      .then(state => state.result.body)
      .then(body => {
        if (body.success) {
          this.files = body.data.files
        }
      })
  }
}
</script>
