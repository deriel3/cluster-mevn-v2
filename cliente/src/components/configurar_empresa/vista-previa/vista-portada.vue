<template>
    <v-container>
    <v-row justify="space-around">
      <v-card
      width ="100%"
      >
        <v-hover>
            <template v-slot:default="{ hover }">
                <v-img id="banner-portada"
                class="d-flex align-end"
                max-height="450px"
                :src="imagen()"
                >
                <v-fade-transition>
                    <v-overlay
                        v-if="hover"
                        absolute
                        color="#ffffff"
                    >
                        <v-btn :to="{'name':'configrar-empresa', 'params':{'ruc':ruc,'usuario':usuario}}" >Cambiar Portada</v-btn>
                    </v-overlay>
                    </v-fade-transition>
                </v-img>
            </template>
        </v-hover>
        <div class="orange lighten-5" style="height:280px">
            <v-card-title
            class="justify-center d-block" style="padding:0px; position:relative; top:-80px" >
            <v-hover>
              <template v-slot:default="{ hover }">
                  <div align="center">
                    <v-avatar size="250" style="border:5px solid #FFE0B2">
                        <img
                            alt="Logo"
                            :src="imagen_logo()"
                        >
                        <v-fade-transition>
                        <v-overlay
                            v-if="hover"
                            absolute
                            color="#ffffff"
                        >
                            <v-btn :to="{'name':'configrar-empresa', 'params':{'ruc':ruc,'usuario':usuario}}" >Cambiar logo</v-btn>
                        </v-overlay>
                        </v-fade-transition>
                    </v-avatar>
                </div>
              </template>
            </v-hover>
            <div style="width=100%" align="center">
              <h2 class="text-center mt-5">{{ razon_social | uppercase}}</h2>
              <v-chip class="ma-2" color="primary" text-color="black">Seguidores: {{cantidad_favoritos}}</v-chip>
            </div>
          </v-card-title>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import $ from 'jquery'
export default {
  props: {
    portada: '',
    logo: '',
    razon_social: '',
    cantidad_favoritos: ''
  },
  data () {
      return {
          usuario: this.$store.state.user.usuario,
          ruc: this.$route.params.ruc,
          bannerh: 100,
          lastscroll: 0
      }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    imagen () {
      if ( this.portada === 'default' )
      {
        return process.env.VUE_APP_URL_SERVER+"/assets/fotos-default/default-portada.png"
      }
      else
      {
        let id = this.$store.state.user.id
        return process.env.VUE_APP_URL_SERVER+"/assets/empresas/"+id+"/"+this.portada
      }
    },
    imagen_logo () {
        let id = this.$store.state.user.id
        return process.env.VUE_APP_URL_SERVER+"/assets/empresas/"+id+"/"+this.logo
    },
    handleScroll () {
      var scroll = $(window).scrollTop();

      //450 desaparace banner - 380 se mueve logo

      
    }
  },
  filters: {
    uppercase (valor){
        if (typeof valor != 'undefined')
        {  
          return valor.toUpperCase()
        }
        else
        {
          return ''
        }
    }
  }
}
</script>