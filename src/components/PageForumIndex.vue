<template>
  <div id="forum" style="margin-top: 3em">
    <div class="container">
        <div class="columns">
          <div class="column is-3">
            <router-link class="button is-primary is-large is-block" to="/forum/new">Topik Baru</router-link>
          </div>
          <div class="column is-9">
            <div class="box content">
              <article class="topic" v-for="topic in topics" :key="topic._id">
                <h4 class="is-size-4">{{topic.title}}</h4>
                <div class="media">
                  <div class="media-left">
                    <p class="image is-32x32">
                      <img src="http://bulma.io/images/placeholders/128x128.png" alt="avatar">
                    </p>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p><router-link :to="'/user/' + topic.author._id">{{topic.author.username}}</router-link> pada {{topic.created_at}}</p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    topics: [
      {
        title: 'Topik 1',
        author: {
          _id: 'asdadadas',
          username: 'user1'
        },
        created_at: '2017-01-20',
        replies: []
      },
      {
        title: 'Topik 2',
        author: {
          _id: 'asdadadas',
          username: 'user1'
        },
        created_at: '2017-01-21',
        replies: []
      },
      {
        title: 'Topik 3',
        author: {
          _id: 'asdadadas',
          username: 'user1'
        },
        created_at: '2017-01-22',
        replies: []
      }
    ]
  })

}
</script>

<style>
article.topic {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6e6e6
}
.media-left img {
  border-radius: 50%;
}
</style>
