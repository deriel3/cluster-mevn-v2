<template>
    <v-container>
        <v-btn color="error" :to="{'name':'perfil-datos', 'params':{'usuario':usuario}}" class="my-3">
            Volver
        </v-btn>
        <v-btn color="success" class="my-3 mx-3">
            Vista Previa
        </v-btn>
        <v-card>
            <v-card-title class="text-center"><h2> {{ruc}} - {{razon_social | uppercase}}</h2></v-card-title>
            <v-tabs color="primary" 
            v-model="tab">
                <v-tab>Multimedia</v-tab>
                <v-tab>Datos de empresa y contactos</v-tab>
                <v-tab>Productos</v-tab>
                <v-tab><v-icon>mdi-cog</v-icon></v-tab>
            </v-tabs>
            <v-card-text>
                <div class="font-weight-bold mb-2">
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <div class="grey lighten-3 py-5">
                            <h1 class="d-inline ml-8 display-1">Actualizar logo</h1>
                        </div>
                        <logo > </logo>
                        <div class="grey lighten-3 py-5">
                            <h1 class="d-inline ml-8 display-1">Actualizar imagen de portada</h1>
                        </div>
                        <portada :portada="portada" @cambio="act_portada"></portada>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="grey lighten-3 py-5">
                            <h1 class="d-inline ml-8 display-1">Datos de la empresa</h1>
                        </div>
                        <datos :ruc="ruc" :razon_social="razon_social" :categoria="categorias" :nombre_comercial="nombre_comercial" :descripcion="descripcion"></datos>
                        <div class="grey lighten-3 py-5">
                            <h1 class="d-inline ml-8 display-1">Locaciones</h1>
                            <v-btn icon class="float-right mx-15 primary black--text" @click="agregar_locacion"><v-icon>mdi-plus</v-icon></v-btn>
                        </div>
                        <formlocacion :locaciones="locacion" @actualizar_length_locaciones="act_length_locacion"></formlocacion>
                        <div class="grey lighten-3 py-5">
                            <h1 class="d-inline ml-8 display-1">Contactos</h1>
                            <v-btn icon class="float-right mx-15 primary black--text" @click="agregar_contacto"><v-icon>mdi-plus</v-icon></v-btn>
                        </div>
                        <formcontacto :contactos="forma_contacto" @actualizar_length_contacto="act_length_contacto"></formcontacto>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="grey lighten-3 py-5">
                            <h1 class="d-inline ml-8 display-1">Productos</h1>
                            <v-dialog
                            v-model="dialog_producto"
                            max-width="700">
                                <template v-slot:activator="{on,attrs}">
                                    <v-btn  class="d-inline float-right mr-10"
                                    :disabled="producto==6"
                                    fab
                                    small
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                                <registro @agregar-producto="agregar_producto"></registro>
                            </v-dialog>
                        </div>
                        <listaproducto v-if="producto.length > 0" :productos="producto"></listaproducto>
                        <div v-else class="text-center my-8"><v-icon>mdi-information-outline</v-icon><p>No hay ninguna producto registrado</p></div>
                    </v-tab-item>
                    <v-tab-item>
                        <h1>Activar o desactivar empresa</h1>
                    </v-tab-item>
                </v-tabs-items>
            </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
import axios from 'axios'
import { EventBus } from '../../EventBus/EventBus'
import logo from '../../components/configurar_empresa/logo'
import portada from '../../components/configurar_empresa/portada'
import datos_empresa from '../../components/configurar_empresa/datos_empresa'
import formlocacion from '../../components/configurar_empresa/locaciones'
import formcontacto from '../../components/configurar_empresa/contactos'
import listaproducto from '../../components/configurar_empresa/listaproducto'
import registro from '../../components/configurar_empresa/registroproducto'
export default {
    components: {
        logo,
        portada,
        datos: datos_empresa,
        formlocacion,
        formcontacto,
        listaproducto,
        registro
    },
    data () {
        return {
            usuario: '',
            tab: '',
            ruc: '',
            razon_social: '',
            categorias: '',
            estado: '',
            forma_contacto: '',
            locacion: '',
            nombre_comercial: '',
            descripcion: '',
            producto: '',
            url_logo: '',
            portada:'',
            dialog_producto: false
        }
    },
    filters: {
        uppercase (valor){
            return valor.toUpperCase()
        }
    },
    created() {
        this.ruc = this.$route.params.ruc
        this.usuario = this.$store.state.user.usuario
        this.obtener_datos();
    },
    methods: {
        agregar_producto (producto) {
            console.log(producto)
            this.producto.push(producto)
        },
        act_length_contacto (array) {
            this.forma_contacto = array
        },
        act_length_locacion (array) {
            
            this.locacion = array
        },
        agregar_contacto () {
            if(this.forma_contacto.length <= 2)
            {
                let nuevo_contacto ={
                    tipo_dispositivo: '',
                    contacto: '',
                    persona: ''
                }
                this.forma_contacto.push(nuevo_contacto)
            }
            else
            {
                this.$toast.error("Solo puede guardar maximo 3 contactos")
            }
        },
        agregar_locacion () {
            
            if(this.locacion.length <= 4)
            {
                let nueva_locacion ={
                    tipo_sede: "",
                    direccion: ""
                }
                this.locacion.push(nueva_locacion)
            }
            else
            {
                this.$toast.error("Solo puede guardar maximo 5 locaciones")
            }
        },
        act_portada () {
            this.portada=this.ruc
        },
        ingresar_datos (datos) {
            this.razon_social = datos[0].razon_social
            this.categorias = datos[0].categorias
            this.estado = datos[0].estado
            this.forma_contacto = datos[0].forma_contacto
            this.locacion = datos[0].locacion
            this.nombre_comercial = datos[0].nombre_comercial
            this.producto = datos[0].producto
            this.url_logo = datos[0].url_logo
            this.portada = datos[0].url_portada
            this.descripcion = datos[0].descripcion
        },
        obtener_datos () {
            let ruc = this.ruc
            let id = this.$store.state.user.id
            let token = this.$store.state.token
            let option = {
                url: process.env.VUE_APP_URL_SERVER+"/api/"+id+"/obt_empresa/"+ruc,
                method: 'GET',
                headers: {
                    'access-token':token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    id: id,
                    ruc: ruc
                }
            }
            axios(option)
            .then(res => {
                let data = res.data
                switch (data.cod)
                {
                    case "200": this.ingresar_datos(data.data)
                    break
                    case "403": EventBus.$emit("force_logout")
                }
            })
        }
    }
}
</script>