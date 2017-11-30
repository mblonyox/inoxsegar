import Vue from 'vue'
import Router from 'vue-router'
import LayoutMain from '@/components/LayoutMain'
import PageHome from '@/components/PageHome'
import PageMovie from '@/components/PageMovie'
import PageTv from '@/components/PageTv'
import PageAnime from '@/components/PageAnime'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: LayoutMain,
      children: [
        {
          path: '',
          name: 'PageHome',
          component: PageHome
        },
        {
          path: 'movie',
          name: 'PageMovie',
          component: PageMovie
        },
        {
          path: 'tv',
          name: 'PageTv',
          component: PageTv
        },
        {
          path: 'anime',
          name: 'PageAnime',
          component: PageAnime
        }
      ]
    }
  ]
})
