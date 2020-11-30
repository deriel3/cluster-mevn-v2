<template>
    <v-container>
        <v-btn color="error" :to="{'name':'perfil-datos', 'params':{'usuario':usuario}}" class="my-3">
            Volver
        </v-btn>
        <v-btn color="success" class="my-3 mx-3"
        :to="{'name':'vista-previa-empresa', 'params':{'ruc':ruc,'usuario':usuario}}">
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
                        <div class="grey lighten-3 py-5 px-5">
                            <h3 class="d-inline display-2">Actualizar logo</h3>
                        </div>
                        <logo :url_logo="url_logo" @cambio_logo="cambio_logo"> </logo>
                        <div class="grey lighten-3 py-5 px-5">
                            <h3 class="d-inline  display-2">Actualizar imagen de portada</h3>
                        </div>
                        <portada :portada="portada_envio" @cambio_portada="act_portada"></portada>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="grey lighten-3 py-5 px-5">
                            <h3 class="d-inline  display-2">Datos de la empresa</h3>
                        </div>
                        <datos :ruc="ruc" :razon_social="razon_social" :categoria="categorias" :nombre_comercial="nombre_comercial" :descripcion="descripcion"></datos>
                        <div class="grey lighten-3 py-5 px-5">
                            <h3 class="d-inline  display-2">Precios promedio de la empresa:</h3>
                            
                        </div>
                        <v-btn icon class="float-right mt-2 primary black--text" @click="agregar_precios"><v-icon>mdi-plus</v-icon></v-btn>
                        <precios :precios="precios" @actualizar_length_precio="act_length_precio"></precios>
                        <div class="grey lighten-3 py-5 px-5">
                            <h3 class="d-inline  display-2">Locaciones</h3>
                        </div>
                        <v-btn icon class="float-right mt-2 primary black--text" @click="agregar_locacion"><v-icon>mdi-plus</v-icon></v-btn>
                        <formlocacion :locaciones="locacion" @actualizar_length_locaciones="act_length_locacion"></formlocacion>
                        <div class="grey lighten-3 py-5 px-5">
                            <h3 class="d-inline  display-2">Contactos</h3>
                        </div>
                        <v-btn icon class="float-right mt-2 primary black--text" @click="agregar_contacto"><v-icon>mdi-plus</v-icon></v-btn>
                        <formcontacto :contactos="forma_contacto" @actualizar_length_contacto="act_length_contacto"></formcontacto>
                        <div class="grey lighten-3 py-5 px-5">
                            <h3 class="d-inline  display-2">Redes Sociales</h3>
                        </div>
                        <redes :facebook ="redes_sociales.facebook" :instagram="redes_sociales.instagram" :paginaweb="redes_sociales.paginaweb" :whats="redes_sociales.whats" @cambiar_redes="cambiar_redes"></redes>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="grey lighten-3 py-5 px-5">
                            <h3 class="d-inline  display-2">Productos</h3>
                        </div>
                        <v-dialog
                            v-model="dialog_producto"
                            max-width="700">
                                <template v-slot:activator="{on,attrs}">
                                    <v-btn  class="d-inline float-right mr-1 mt-1"
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
                        <br>
                        <listaproducto v-if="producto.length > 0" :productos="producto"></listaproducto>
                        
                        <div v-else class="text-center my-8"><v-icon>mdi-information-outline</v-icon><p>No hay ninguna producto registrado</p></div>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="grey lighten-3 py-5 px-5">
                            <v-row>
                                <v-col md="8" cols="8">
                                    <div class="">
                                        <h3 class="display-2">Activar Empresa</h3>
                                        <small>Active la empresa para que este pueda ser vista y visitada por los compradores de la pagina.
                                            Tenga en cuenta que la cantidad de informacion registrada influye en las visitas de su empresa.
                                        </small>
                                    </div>
                                </v-col>
                                <v-col md="4" cols="4" align="center" class="mt-3">
                                    <v-btn class="success" @click="cambiar_estado(1)"  v-if="estado==0"> Activar</v-btn>
                                    <v-btn v-else class="error" @click="cambiar_estado(0)">Desactivar</v-btn>
                                </v-col>
                            </v-row>
                        </div>
                        <div class=" py-5 px-5">
                            <v-row>
                                <v-col md="8" cols="8">
                                    <div class="">
                                        <h3 class="display-2 red--text">Borrar Empresa</h3>
                                        <small class="red--text">Al borrar la empresa perdera toda la informacion registrada sin posibilidad de recuperarla.
                                        </small>
                                    </div>
                                </v-col>
                                <v-col md="4" cols="4" align="center" class="mt-3">
                                    <v-btn class="error" @click="borrar_empresa()"> Borrar</v-btn>
                                </v-col>
                            </v-row>
                        </div>
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
import redes from '../../components/configurar_empresa/redes'
import precios from '../../components/configurar_empresa/precios'
export default {
    components: {
        logo,
        portada,
        datos: datos_empresa,
        formlocacion,
        formcontacto,
        listaproducto,
        registro,
        redes,
        precios
    },
    data () {
        return {
            empresa_id: '',
            usuario: '',
            tab: '',
            ruc: '',
            razon_social: '',
            categorias: '',
            estado: '',
            forma_contacto: '',
            precios: '',
            locacion: '',
            nombre_comercial: '',
            descripcion: '',
            redes_sociales: '',
            producto: '',
            url_logo: '',
            portada_envio:'',
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
        borrar_empresa () {
            let id = this.$store.state.user.id
            let token = this.$store.state.token
            let option = {
                url: process.env.VUE_APP_URL_SERVER+'/api/borrar_empresa',
                method: "POST",
                headers: {
                    'access-token': token,
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                data: {
                    id: id,
                    empresa_id: this.empresa_id
                }
            }
            axios(option)
            .then(res => {
                let data = res.data
                switch (data.cod)
                {
                    case '200': this.$toast.success("empresa eliminada")
                    this.$router.push({'name':'perfil', params:{usuario:this.usuario}})
                    break
                    case '403': EventBus.$emit('force_logout')
                }
            })
        },
        cambiar_redes (nuevas_redes) {
            this.redes_sociales = nuevas_redes
        },
        cambiar_estado (estado) {
            let mensaje = 'Empresa {estado} satisfactoriamente.'
            if (estado === 1) {
                mensaje = mensaje.replace('{estado}', 'activada')
            } 
            else {
                mensaje = mensaje.replace('{estado}', 'desactivada')
            }
            let id = this.$store.state.user.id
            let token = this.$store.state.token
            let ruc = this.$route.params.ruc
            let option = {
                url: process.env.VUE_APP_URL_SERVER+'/api/empresa_estado',
                method: "POST",
                headers: {
                    'access-token': token,
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                data: {
                    id: id,
                    estado: estado,
                    ruc: ruc
                }
            }
            axios(option)
            .then(res => {
                let data = res.data
                switch (data.cod)
                {
                    case '200': this.$toast.success(mensaje)
                    this.estado = estado
                    break
                    case '403': EventBus.$emit('force_logout')
                }
            })
        },
        cambio_logo (nueva_url) {
            this.url_logo=nueva_url
        },
        agregar_producto (producto) {
            this.producto.push(producto)
        },
        act_length_precio (array) {
            this.precios = array
        },
        act_length_contacto (array) {
            this.forma_contacto = array
        },
        act_length_locacion (array) {
            
            this.locacion = array
        },
        agregar_precios () {
            console.log(this.precios)
            let precio = {
                dato: ''
            }
            this.precios.push(precio)
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
        act_portada (nueva_url) {
            this.portada_envio=nueva_url
        },
        ingresar_datos (datos) {
            this.empresa_id = datos[0]._id
            this.razon_social = datos[0].razon_social
            this.categorias = datos[0].categorias
            this.estado = datos[0].estado
            this.forma_contacto = datos[0].forma_contacto
            this.locacion = datos[0].locacion
            this.nombre_comercial = datos[0].nombre_comercial
            this.producto = datos[0].producto
            this.url_logo = datos[0].url_logo
            this.portada_envio = datos[0].url_portada
            this.descripcion = datos[0].descripcion
            this.precios = datos[0].precios
            this.redes_sociales = {
                'facebook': datos[0].redes.facebook,
                'instagram': datos[0].redes.instagram,
                'paginaweb': datos[0].redes.paginaweb,
                'whats': datos[0].redes.whats
            }
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