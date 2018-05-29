<template>
  <div class="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen is-one-fifth-fullhd" >
    <router-link :to="{name: 'Page' + type, params: {id: item._id}}">
      <div class="card item-card">
        <div class="card-image">
          <figure class="image is-3by4">
            <v-lazy-image 
              :src="item.poster"
              :src-placeholder="noPoster"
            />
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <p class="title is-5 item-title" >{{item.title}}</p>
            <p class="subtitle">({{item.year}}) <span class="is-pulled-right"> <span class="icon"><i class="fa fa-star gold"></i></span> {{item.imdbRating || '??'}}/10</span></p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import noPoster from '../assets/no-poster.jpg'
import VLazyImage from 'v-lazy-image'

export default {
  props: ['item', 'type'],
  computed: {
    noPoster() {
      return noPoster
    }
  },
  components: {
    VLazyImage
  }
}
</script>

<style scoped>
.item-card {
  border-radius: 10px;
}
.item-card img {
  border-radius: 10px 10px 0 0;
}
.item-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 1.5;
}
.gold {
  color: gold;
}
</style>