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
import PageSeriesIndex from '@/components/PageSeriesIndex'
import PageNewSeries from '@/components/PageNewSeries'
import PageSeries from '@/components/PageSeries'
import PageSignIn from '@/components/PageSignIn'
import PageSignUp from '@/components/PageSignUp'
import PageUpload from '@/components/PageUpload'
import PageActivateAccount from '@/components/PageActivateAccount'
import PageFiles from '@/components/PageFiles'
import PageUser from '@/components/PageUser'
import PageMovie from '@/components/PageMovie'
import PageResetPassword from '@/components/PageResetPassword'
import PageChangePassword from '@/components/PageChangePassword'
import PageForumIndex from '@/components/PageForumIndex'
import PageStats from '@/components/PageStats'

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
          meta: { title: 'Beranda' },
          component: PageHome
        },
        {
          path: 'movie',
          name: 'PageMovies',
          meta: { title: 'Movies' },
          component: PageMovies
        },
        {
          path: 'movie/new',
          name: 'PageNewMovie',
          meta: { title: 'Tambah Movie' },
          component: PageNewMovie
        },
        {
          path: 'series',
          name: 'PageSeriesIndex',
          meta: { title: 'Series' },
          component: PageSeriesIndex
        },
        {
          path: 'series/new',
          name: 'PageNewSeries',
          meta: { title: 'Tambah Series' },
          component: PageNewSeries
        },
        {
          path: 'series/:id',
          name: 'PageSeries',
          meta: { title: 'Series:' },
          component: PageSeries,
          props: true
        },
        {
          path: 'upload',
          name: 'PageUpload',
          meta: { title: 'Unggah' },
          component: PageUpload
        },
        {
          path: 'files',
          name: 'PageFiles',
          meta: { title: 'Files' },
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
          meta: { title: 'Movie:' },
          component: PageMovie,
          props: true
        },
        {
          path: 'forum',
          name: 'PageForumIndex',
          meta: { title: 'Forum' },
          component: PageForumIndex
        },
        {
          path: 'stats',
          name: 'PageStats',
          meta: { title: 'Stats' },
          component: PageStats
        }
      ]
    },
    {
      path: '/',
      component: LayoutPlain,
      children: [
        {
          path: 'sign-in',
          meta: { authenticated: false, title: 'Masuk' },
          component: PageSignIn
        },
        {
          path: 'sign-up',
          meta: { authenticated: false, title: 'Daftar' },
          component: PageSignUp
        },
        {
          path: 'activate-account',
          meta: { authenticated: true, title: 'Aktivasi' },
          component: PageActivateAccount
        },
        {
          path: 'reset-password',
          meta: { authenticated: false, title: 'Atur Ulang Sandi' },
          component: PageResetPassword
        },
        {
          path: 'change-password',
          meta: { authenticated: false, title: 'Ganti Sandi' },
          component: PageChangePassword
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

router.afterEach((to, from) => {
  if (to.meta.title) {
    window.document.title = `InoxSegar - ${to.meta.title}`
  } else {
    window.document.title = `InoxSegar`
  }
})

export default router
