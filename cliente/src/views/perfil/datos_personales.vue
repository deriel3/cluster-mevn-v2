<template>
    <v-card :loading="loaded">
        <v-img
        class="align-end"
        height="300"
        :src=url
        >
        <v-card-title class="white--text align-end ">
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
        <v-tabs color="primary" 
        v-model="tab">
            <v-tab>Datos Personales</v-tab>
            <v-tab>Favoritos</v-tab>
            <v-tab>Mis empresas</v-tab>
            <v-tab><v-icon>mdi-cog</v-icon></v-tab>
        </v-tabs>
        </v-img>
        
        <v-card-text>
        <div class="font-weight-bold mb-2">
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <div>
                        <h1 class="d-inline ml-8">Datos Personales</h1>
                        <v-btn class="d-inline float-right"
                        icon
                        @click="editar=!editar">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </div>
                    <formulario :usuario="datos_usuario" :editar="editar" @loading="loading"></formulario>
                </v-tab-item>
                <v-tab-item>
                    <div>
                        <h1 class="d-inline ml-8">Empresas Favoritas</h1>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <div>
                        <h1 class="d-inline ml-8">Mis empresas</h1>
                        <v-dialog
                        v-model="dialog_empresa"
                        max-width="700">
                            <template v-slot:activator="{on,attrs}">
                                <v-btn  class="float-right"
                                :disabled="lista_empresas.length==6"
                                fab
                                small
                                v-bind="attrs"
                                v-on="on"
                                >
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                            <registro></registro>
                        </v-dialog>
                    </div>
                    <br>
                    <empresas v-if="lista_empresas.length>0" :lista_empresa="lista_empresas"></empresas>
                    <div v-else class="text-center my-8"><v-icon>mdi-information-outline</v-icon><p>No hay ninguna empresa registrada</p></div>
                </v-tab-item>
                <v-tab-item>
                    <div class="ml-8">
                        <h1 class="d-inline">Configuracion de cuenta</h1>
                    </div>
                    <configuracion></configuracion>
                </v-tab-item>
                <v-tab-item>
                    <div>
                        <h1 class="">Dispositivos Activos</h1>
                    </div>
                    <tabla :lista_dispositivos="lista_dispositivos" :mac_actual="mac_actual"></tabla>
                    <div align="center">
                        <v-btn
                        justify="center"
                        color="error"
                        >
                            Cerrar todas las sesiones
                        </v-btn>
                    </div>
                </v-tab-item>
            </v-tabs-items>

            
        </div>
        </v-card-text>
    </v-card>
</template>
<script>
import registro_empresa from '../../components/perfil-persona/datos-personales/registro_empresa'
import formulario from '../../components/perfil-persona/datos-personales/formulario-datos'
import tabla from '../../components/perfil-persona/datos-personales/dispositivos'
import empresas from '../../components/perfil-persona/datos-personales/lista-empresas'
import configuracion from '../../components/perfil-persona/datos-personales/cambio_contrasena'
import axios from 'axios'
import { EventBus } from '../../EventBus/EventBus'
export default {
    components:{
        formulario,
        tabla,
        empresas,
        registro: registro_empresa,
        configuracion
    },
    data () {
        return {
            tab:null,
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
            lista_dispositivos: '',
            lista_empresas: '',
            mac_actual: '',
            editar: false,
            dialog_empresa: false
        }
    },
    created()
    {
        this.usuario=this.$route.params.usuario
        this.url=this.lista_banner[Math.floor(Math.random()*3)+1].src
        this.obtener_data_usuario()
        EventBus.$on("nueva_empresa",empresa => {
            this.nueva_empresa(empresa)
        })
    },
    methods:{
        nueva_empresa(empresa)
        {
            let nueva_empresa = {
                ruc: empresa.ruc,
                razon_social: empresa.razon_social,
                url_logo: empresa.url_logo
            }
            this.lista_empresas.push(nueva_empresa)
        },
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
                console.log(res.data)
                switch (res.data.cod)
                {
                    case "200": this.datos_usuario = res.data.data
                    this.lista_dispositivos = res.data.data.sesiones_dispositivos
                    this.mac_actual = res.data.mac_actual
                    this.lista_empresas=res.data.empresa
                    break
                    case "403": EventBus.$emit("force_logout")
                }
            })
        },
        anadir_empresa()
        {
            if (this.lista_empresas.length === 6)
            {
                this.$toast.error("No se puede crear mas de 6 empresas en una cuenta gratis")
                console.log(this.dialog_empresa)
                this.dialog_empresa = false
                console.log(this.dialog_empresa)
            }
        }
    }
}
</script>