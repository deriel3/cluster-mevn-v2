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
        path:'cuenta',
        name:'perfil-datos',
        component:() => import(/* webpackChunkName: "datos" */ '../views/perfil/datos_personales.vue'),
      }
    ]
  },
  {
    path: '/mi-perfil/:usuario/empresa/:ruc/configurar',
    name:'configrar-empresa',
    component:() => import(/* webpackChunkName: "configurar-empresa" */ '../views/perfil/configurar_empresa.vue'),
    beforeEnter:(to,from,next)=>{
      if(!store.state.token){
          next('/')
      }
      else
      {
          next();
      }
    }
  },
  {
    path: '/mi-perfil/:usuario/empresa/:ruc/configurar/:codigo',
    name: 'configurar-producto',
    component:() => import(/* webpackChunkName: "configurar-producto" */ '../views/perfil/configurar_producto.vue'),
    beforeEnter:(to,from,next)=>{
      if(!store.state.token){
          next('/')
      }
      else
      {
          next();
      }
    }
  },
  {
    path: '/mi-perfil/:usuario/empresa/:ruc/vista-previa',
    name: 'vista-previa-empresa',
    component:() => import(/* webpackChunkName: "vista-previa-empresa" */ '../views/perfil/vista_previa_empresa.vue'),
    beforeEnter:(to,from,next)=>{
      if(!store.state.token){
          next('/')
      }
      else
      {
          next();
      }
    }
  },
  {
    path: '/mi-perfil/:usuario/empresa/:ruc/:codigo/vista-previa',
    name: 'vista-previa-producto',
    component: () => import(/* webpackChunkName: "vista-previa-producto" */ '../views/perfil/vista_previa_producto.vue'),
    beforeEnter:(to,from,next)=>{
      if(!store.state.token){
          next('/')
      }
      else
      {
          next();
      }
    }
  },
  {
    path: '/empresas',
    name: 'empresas',
    component: () => import(/*webpackChunkName: "empresas" */ '../views/publico/empresas.vue')
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
