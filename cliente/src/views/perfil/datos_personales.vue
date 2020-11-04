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
            <v-tab>Dispositivos</v-tab>
            <v-tab>Favoritos</v-tab>
            <v-tab>Mis empresas</v-tab>
            <v-tab><v-icon>mdi-cog</v-icon></v-tab>
        </v-tabs>
        </v-img>
        
        <v-card-text>
        <div class="font-weight-bold ml-8 mb-2">
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <div>
                        <h1 class="d-inline">Datos Personales</h1>
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
                <v-tab-item>
                    <div>
                        <h1 class="d-inline">Empresas Favoritas</h1>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <div>
                        <h1 class="d-inline">Mis empresas</h1>
                        <v-dialog
                        v-model="dialog_empresa"
                        max-width="700">
                            <template v-slot:activator="{on,attrs}">
                                <v-btn class="d-inline float-right"
                                fab
                                small
                                @click="anadir_empresa"
                                v-bind="attrs"
                                v-on="on"
                                >
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                            <registro></registro>
                        </v-dialog>
                    </div>
                    <empresas v-if="lista_empresas.length>0"></empresas>
                    <div v-else class="text-center my-8"><v-icon>mdi-information-outline</v-icon><p>No hay ninguna empresa registrada</p></div>
                </v-tab-item>
                <v-tab-item>
                    <div>
                        <h1 class="d-inline">Configuracion de cuenta</h1>
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
import axios from 'axios'
import { EventBus } from '../../EventBus/EventBus'
export default {
    components:{
        formulario,
        tabla,
        empresas,
        registro: registro_empresa
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
                this.modal_empresa = false
            }
            else
            {
                
            }
        }
    }
}
</script>