<template>
    <v-app-bar 
      app
      color="primary"
      height="100"
    >

      <div class="d-flex align-center container ml-5" >
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2 hidden-md-and-up"
          contain
          src="../../assets/Foto/FootClust.png"
          transition="scale-transition"
          width="200"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="250"
          src="../../assets/Foto/FootClust.png"
          width="150"
          
        />
      </div>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = true"></v-app-bar-nav-icon>
      <v-btn class="mr-2 ml-2 hidden-sm-and-down"
        rounded
        text
        to="/"
      >
        <span>Inicio</span>
      </v-btn>
      <v-btn class="mr-2 ml-2 hidden-sm-and-down"
        rounded
        text
        to="/#funciona"
      >
        <span>¿Como Funciona?</span>
      </v-btn>
      
      <v-btn class="mr-2 ml-2 hidden-sm-and-down"
        rounded
        text
        to="/empresas"
      >
        <span>Empresas</span>
      </v-btn>
      <v-btn class="mr-2 ml-2 hidden-sm-and-down"
        rounded
        text
        to="/Productos"
      >
        <span>Productos</span>
      </v-btn>
      <v-btn class="mr-2 ml-2 hidden-sm-and-down"
        rounded
        text
        to="/buscar"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu v-if="is_loged"
        offset-y
      >
        <template v-slot:activator="{on,attrs}">
          <v-btn
          class="hidden-sm-and-down"
            outlined
            color="success"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-account
            </v-icon>
            {{usuario_loged}}
          </v-btn>
        </template>
        <v-list >
          <v-list-item align="center">
            <v-btn
            style="width:100%"
            text
            class="black--text"
            @click="perfil">
            Mi Perfil
            </v-btn>
          </v-list-item>
          <v-list-item align="center">
            <v-btn
            style="width:100%"
            text
            class="red--text"
            @click="cerrar_sesion">
            Cerrar Sesion
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-dialog v-else
      transition="fab-transition"
      v-model="dialog"
      max-width="600px"
      >
        <template v-slot:activator="{on,attrs}">
          <v-btn class="mr-2 ml-2 green darken-1 hidden-sm-and-down"
            elevation="5"
            color="white"
            rounded
            outlined
            text
            v-bind="attrs"
            v-on="on"
          >
            <span>Iniciar Sesion</span>
          </v-btn>
        </template>
        <div align="center" class="pt-5 pb-5 primary display-3">
          <h4 v-if="tipo_formulario">Inicio de Sesion</h4>
          <h4 v-else>Registro</h4>
        </div>
        <inicio v-if="tipo_formulario" @cierre_overlay="cierre_overlay"></inicio>
        <registro v-else @inicio="cambio_vista"></registro>
        <div align="center" class="pt-5 pb-5 primary">
          <span v-if="tipo_formulario">No posee una cuenta? <a class="blue--text" @click="tipo_formulario=!tipo_formulario">Registrarme</a></span>
          <span v-else>Ya esta registrado? <a class="blue--text" @click="tipo_formulario=!tipo_formulario">Inicie Sesion</a></span>
        </div>
      </v-dialog>
      <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      height="1000"
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item to="/">
              <span>Inicio</span>
            </v-list-item>

            <v-list-item to="/#funciona">
              <span>¿Como Funciona?</span>
            </v-list-item>
  
            <v-list-item to="empresas">
              <span>Empresas</span>
            </v-list-item>
            
            <v-list-item to="productos">
              <span>Productos</span>
            </v-list-item>
            <v-list-item to="buscar">
              <v-icon>mdi-magnify</v-icon>
            </v-list-item>
            <v-list-item>
              <v-menu v-if="is_loged"
        offset-y
      >
        <template v-slot:activator="{on,attrs}">
          <v-btn
            outlined
            color="success"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-account
            </v-icon>
            {{usuario_loged}}
          </v-btn>
        </template>
        <v-list >
          <v-list-item align="center">
            <v-btn
            style="width:100%"
            text
            class="black--text"
            @click="perfil">
            Mi Perfil
            </v-btn>
          </v-list-item>
          <v-list-item align="center">
            <v-btn
            style="width:100%"
            text
            class="red--text"
            @click="cerrar_sesion">
            Cerrar Sesion
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-dialog v-else
      transition="fab-transition"
      v-model="dialog"
      max-width="600px"
      >
        <template v-slot:activator="{on,attrs}">
          <v-btn class="mr-2 ml-2 green darken-1 "
            elevation="5"
            color="white"
            rounded
            outlined
            text
            v-bind="attrs"
            v-on="on"
          >
            <span>Iniciar Sesion</span>
          </v-btn>
        </template>
        <div align="center" class="pt-5 pb-5 primary display-3">
          <h4 v-if="tipo_formulario">Inicio de Sesion</h4>
          <h4 v-else>Registro</h4>
        </div>
        <inicio v-if="tipo_formulario" @cierre_overlay="cierre_overlay"></inicio>
        <registro v-else @inicio="cambio_vista"></registro>
        <div align="center" class="pt-5 pb-5 primary">
          <span v-if="tipo_formulario">No posee una cuenta? <a class="blue--text" @click="tipo_formulario=!tipo_formulario">Registrarme</a></span>
          <span v-else>Ya esta registrado? <a class="blue--text" @click="tipo_formulario=!tipo_formulario">Inicie Sesion</a></span>
        </div>
      </v-dialog>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-app-bar>
</template>
<script>
import registro from '../template/registrar'
import inicio_sesion from '../template/inicio_sesion'
import { EventBus } from '../../EventBus/EventBus'
import axios from 'axios'
import store from '../../store/index'
export default {
  data () {
    return {
      is_loged:false,
      usuario_loged: '',
      drawer: false,
      group: null,
      dialog: false,
      tipo_formulario: true
    }
  },
  created(){
    // emitir event bus para login y logout
    this.validar_login()
    EventBus.$on("loged", usuario => {
      this.is_loged=true
      this.usuario_loged=usuario
    })
    EventBus.$on('force_logout', () => {
      this.cerrar_sesion()
    })
  },
  components:{
    registro,
    inicio: inicio_sesion
  },
  methods:{
    perfil(){
      this.$router.push({name:"perfil", params:{usuario:this.usuario_loged}})
    },
    validar_login () {
      let usuario=this.$store.state.user;
      if(typeof usuario === 'object' && usuario !== null && usuario.usuario !== '')
      {
        this.is_loged=true
        this.usuario_loged=usuario.usuario
      }
    },
    cambio_vista () {
      this.tipo_formulario=!this.tipo_formulario
    },
    cierre_overlay(){
      this.dialog=false
    },
    cerrar_sesion () {
      let id = store.state.user.id
      let option={
        url: process.env.VUE_APP_URL_SERVER+"/api/logout",
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
          id:id
        }
      }
      axios(option)
      .then(res => {
        let data = res.data
        if(data.cod==200)
        {
          store.commit("DELETE_USER")
          store.commit("DELETE_TOKEN")
          this.usuario_loged = ''
          this.is_loged = false
          let currentURL = this.$router.currentRoute
          if(currentURL.name!="home")
          {
            this.$router.push({name:'home'})
          }
          this.$toast.success("Sesion Cerrada");
        }
      })
    }
  }
}
</script>
