import Vue from 'vue'
import VueRouter from 'vue-router'
import addUsuario from '../views/addUsuario.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Almacenes from '../views/Almacenes.vue'
import addLibros from '../views/addLibros.vue'
import editoriales from '../views/Editoriales.vue'
import movimientos from '../views/Movimientos.vue'
import kardex from '../views/Kardex.vue'

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
    path: '/home',
    component: Home,
    children: [
      { 
        path: 'crear_usuario',
        component: addUsuario
      },
      {
        path:'almacenes',
        component: Almacenes
      },
      {
        path:'crear_libro',
        component: addLibros
      },
      {
        path: 'editoriales',
        component: editoriales
      },
      {
        path: 'kardex',
        component: kardex
      },
      {
        path: 'movimientos',
        component: movimientos
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
