import Vue from 'vue'
import Router from 'vue-router'
import Boards from './views/Boards.vue'
import Board from './views/Board.vue'
import Login from './views/Login.vue'

import store from './store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'boards',
      component: Boards,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/board/:boardId',
      name: 'board',
      props: true,
      component: Board,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(route => route.meta.requiresAuth) &&
    !store.getters.loggedIn
  ) {
    store.state.reroute = { name: to.name, params: to.params }
    return next({ name: 'login' })
  }
  next()
})

export default router
