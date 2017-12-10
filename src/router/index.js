import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Import Layout Components
import LayoutMain from '@/components/LayoutMain'
import LayoutPlain from '@/components/LayoutPlain'

// Import Page Components
import PageHome from '@/components/PageHome'
import PageMovie from '@/components/PageMovie'
import PageTv from '@/components/PageTv'
import PageAnime from '@/components/PageAnime'
import PageSignIn from '@/components/PageSignIn'
import PageSignUp from '@/components/PageSignUp'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: LayoutMain,
      meta: { authenticated: true },
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
    },
    {
      path: '/auth',
      component: LayoutPlain,
      children: [
        {
          path: 'sign-in',
          component: PageSignIn
        },
        {
          path: 'sign-up',
          component: PageSignUp
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.authenticated) && !store.state.auth.loggedIn) next({path: '/auth/sign-in', query: {redirect: to.fullPath}})
  else next()
})

export default router
