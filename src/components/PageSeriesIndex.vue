<template>
  <section id="series" class="container">
    <h1 class="title">Koleksi Serial
      <router-link class="button is-success" to="/series/new" v-if="isAdmin">
        <span class="icon">
          <i class="fa fa-plus"></i>
        </span>
        <span>Baru</span>
      </router-link>
    </h1>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input type="text" class="input" placeholder="Cari...">
            </p>
            <p class="control">
              <button class="button">
                Cari
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <subscribe-button topic="series" />
        </div>
        <div class="level-item">
          <div class="select">
            <select>
              <option value="">Urutkan</option>
              <option value="donwload">Unduhan</option>
              <option value="released">Tgl Rilis</option>
              <option value="added">Tgl Ditambahkan</option>
              <option value="rating">Rating IMDB</option>
              <option value="like">Suka</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="columns is-multiline">
        <card-poster v-for="set in series" :item="set" type="Series" :key="set._key"/>
      </div>
      <infinite-loading @infinite="infiniteHandler" />
    </div>
  </section>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { NoNotify } from '../helpers/api-service'
import SubscribeButton from './SubscribeButton'
import CardPoster from './CardPoster'

export default {
  data() {
    return {
      series: [],
      page: 0
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.auth.user.admin
    }
  },
  methods: {
    infiniteHandler($state) {
      this.page++
      NoNotify.doRequest({
        url: 'series',
        query: {
          page: this.page
        }
      })
        .then(({result}) => result.body)
        .then(body => {
          if (body.success) {
            this.series = this.series.concat(body.data.series)
            $state.loaded()
            if (body.data.series.length < 20) {
              $state.complete()
            }
          }
        })
    }
  },
  components: {
    InfiniteLoading,
    SubscribeButton,
    CardPoster
  }
}
</script>

<style>
  #series {
    margin-top: 3rem;
  }
</style>