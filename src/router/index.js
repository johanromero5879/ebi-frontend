import Vue from 'vue'
import VueRouter from 'vue-router'
import Panel from '../views/Panel.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/ingresar' 
  },
  {
    path: '/ingresar',
    component: Login
  },
  {
    path: '/panel',
    component: Panel
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
