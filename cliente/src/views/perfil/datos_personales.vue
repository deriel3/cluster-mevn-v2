<template>
    <v-card :loading="loaded">
        <v-img
        class="align-end"
        height="200px"
        :src=url
        >
        <v-card-title class="white--text align-end">
            <v-avatar size="56">
            <img
                class="white"
                alt="user"
                src="../../assets/Foto/perfil-persona/datos-personales/usuario.svg"
            >
            </v-avatar>
            <p class="ml-3">
                {{usuario}}
            </p>
        </v-card-title>
        </v-img>
        <v-fabs>
            
        </v-fabs>
        <v-card-text>
        <div class="font-weight-bold ml-8 mb-2">
            <div>
                <h1 class="d-inline">Datos Personales</h1>
                <v-btn class="d-inline float-right"
                icon
                @click="editar=!editar">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </div>
            <formulario :usuario="datos_usuario" :editar="editar" @loading="loading"></formulario>
        </div>
        </v-card-text>
    </v-card>
</template>
<script>
import formulario from '../../components/perfil-persona/datos-personales/formulario-datos'
import axios from 'axios'
import { EventBus } from '../../EventBus/EventBus'
export default {
    components:{
        formulario
    },
    data () {
        return {
            loaded: false,
            usuario:"",
            lista_banner: [
                {
                src:require("../../assets/Foto/perfil-persona/datos-personales/1.png")
                },
                {
                src:require("../../assets/Foto/perfil-persona/datos-personales/2.png")
                },
                {
                src:require("../../assets/Foto/perfil-persona/datos-personales/3.png")
                },
                {
                src:require("../../assets/Foto/perfil-persona/datos-personales/1.png")
                }
            ],
            url: '',
            items: [],
            datos_usuario: '',
            editar: false
        }
    },
    created()
    {
        this.usuario=this.$route.params.usuario
        this.url=this.lista_banner[Math.floor(Math.random()*3)+1].src
        
        this.obtener_data_usuario()
    },
    methods:{
        loading () {
            this.loading = !this.loading
        },
        obtener_data_usuario () {
            let token = this.$store.state.token
            let id = this.$store.state.user.id
            const option={
                url: process.env.VUE_APP_URL_SERVER+"/api/mi-perfil/"+id,
                method: 'GET',
                headers: {
                    'access-token':token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
            axios(option)
            .then(res => {
                switch (res.data.cod)
                {
                    case "200": this.datos_usuario=res.data.data
                    break
                    case "403": EventBus.$emit("force_logout")
                }
            })
        }
    }
}
</script>