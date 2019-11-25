import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import(/* webpackChunkName: "Quiz" */ '../views/Quiz.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
