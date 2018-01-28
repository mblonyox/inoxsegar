import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Import Layout Components
import LayoutMain from '@/components/LayoutMain'
import LayoutPlain from '@/components/LayoutPlain'

// Import Page Components
import PageHome from '@/components/PageHome'
import PageMovies from '@/components/PageMovies'
import PageNewMovie from '@/components/PageNewMovie'
import PageTv from '@/components/PageTv'
import PageAnime from '@/components/PageAnime'
import PageSignIn from '@/components/PageSignIn'
import PageSignUp from '@/components/PageSignUp'
import PageUpload from '@/components/PageUpload'
import PageActivateAccount from '@/components/PageActivateAccount'
import PageFiles from '@/components/PageFiles'
import PageUser from '@/components/PageUser'
import PageMovie from '@/components/PageMovie'

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
          name: 'PageMovies',
          component: PageMovies
        },
        {
          path: 'movie/new',
          name: 'PageNewMovie',
          component: PageNewMovie
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
        },
        {
          path: 'upload',
          name: 'PageUpload',
          component: PageUpload
        },
        {
          path: 'files',
          name: 'PageFiles',
          component: PageFiles
        },
        {
          path: 'user/:id',
          name: 'PageUser',
          component: PageUser
        },
        {
          path: 'movie/:id',
          name: 'PageMovie',
          component: PageMovie,
          props: true
        }
      ]
    },
    {
      path: '/',
      component: LayoutPlain,
      children: [
        {
          path: 'sign-in',
          meta: { authenticated: false },
          component: PageSignIn
        },
        {
          path: 'sign-up',
          meta: { authenticated: false },
          component: PageSignUp
        },
        {
          path: 'activate-account',
          meta: { authenticated: true },
          component: PageActivateAccount
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.authenticated)) {
    if (store.state.auth.loggedIn) {
      if (store.state.auth.user.active) {
        if (to.path === '/activate-account') next('/')
        else next()
      } else if (to.path === '/activate-account') next()
      else next('/activate-account')
    } else next({path: '/sign-in', query: {redirect: to.fullPath}})
  } else if (to.matched.some(route => route.meta.authenticated === false) && store.state.auth.loggedIn) next({path: '/'})
  else next()
})

export default router
