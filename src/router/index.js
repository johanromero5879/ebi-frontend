import Vue from 'vue'
import VueRouter from 'vue-router'
import Panel from '../views/Panel.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Almacenes from '../views/Almacenes.vue'

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
  },
  {
    path: '/home',
    component: Home,
    children: [
      { 
        path: 'panel',
        component: Panel
      },
      {
        path:'almacenes',
        component: Almacenes
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
