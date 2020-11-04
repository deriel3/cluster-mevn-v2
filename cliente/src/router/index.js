import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/mi-perfil/:usuario',
    name: 'perfil',
    component:() => import(/* webpackChunkName: "perfil" */ '../views/Perfil-usuario.vue'),
    beforeEnter:(to,from,next)=>{
      if(!store.state.token){
          next('/')
      }
      else
      {
          next();
      }
    },
    children:[
      {
        path:'bienvenida',
        name:'bienvenida-persona',
        component:() => import(/* webpackChunkName: "bienvenida" */ '../views/perfil/bienvenida.vue'),
      },
      {
        path:'datos',
        name:'perfil-datos',
        component:() => import(/* webpackChunkName: "datos" */ '../views/perfil/datos_personales.vue'),
      },
      {
        path:'dispositivos',
        name:'dispositivos-persona',
        component:() => import(/* webpackChunkName: "dispositivo" */ '../views/perfil/dispositivos.vue'),
      },
      {
        path:'lista-favoritas',
        name:'favoritos-persona',
        component:() => import(/* webpackChunkName: "empresas-favoritas" */ '../views/perfil/empresas-favoritas.vue'),
      },
      {
        path:'mis-empresas',
        name:'mis-empresas-persona',
        component:() => import(/* webpackChunkName: "mi-empresa" */ '../views/perfil/mis-empresas.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if(to.hash){
        return{
            selector:to.hash
        }
    }
    else
    {
      return{
        x:0,y:0
      }
    }
  },
  base: process.env.BASE_URL,
  routes
})

export default router
