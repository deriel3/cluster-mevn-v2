<template>
    <v-container>
        <v-btn color="error" :to="{'name':'configrar-empresa', 'params':{'usuario':usuario , 'ruc':ruc}}" class="my-3">
            Volver
        </v-btn>
        <v-btn color="success" class="my-3 mx-3">
            Vista Previa
        </v-btn>
        <v-card>
            <v-card-title class="text-center"><h2> {{ruc}} - Codigo de producto: {{ codigo | uppercase}}</h2></v-card-title>
            <v-tabs color="primary" 
            v-model="tab">
                <v-tab>Multimedia</v-tab>
                <v-tab>Informacion del producto</v-tab>
                <v-tab>Colores</v-tab>
                <v-tab><v-icon>mdi-cog</v-icon></v-tab>
            </v-tabs>
            <v-card-text>
                <div class="font-weight-bold mb-2">
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <div class="grey lighten-3 py-5">
                            <h1 class="d-inline ml-8 display-1">Imagen de Portada</h1>
                        </div>
                        <portada :imagen_portada="imagen_portada" :id="id" @cambio_portada="cambio_portada"></portada>
                        <div class="grey lighten-3 py-5">
                            <h1 class="d-inline ml-8 display-1">Galeria de imagenes</h1>
                        </div>
                        <galeria :galeria="galeria" :empresa_id="empresa_id" :producto_id="id" @actualizar_galeria="actualizar_galeria" @eliminar_imagen="eliminar_imagen"></galeria>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="grey lighten-3 py-5">
                            <h1 class="d-inline ml-8 display-1">Datos principales del producto</h1>
                        </div>
                        <formulariodatos
                        :producto_id="id"
                        :empresa_id="empresa_id"
                        :nombre="nombre"
                        :descripcion="descripcion"
                        :marca="marca"
                        :categoria="categoria"
                        :tipo_producto="tipo_producto"
                        :tipo_calzado="tipo_calzado"
                        :material="material"
                        :genero="genero"
                        ></formulariodatos>
                        <div class="grey lighten-3 py-5">
                            <h1 class="d-inline ml-8 display-1">Rango de precios</h1>
                            <v-btn icon class="float-right mx-15 primary black--text" @click="agregar_precio"><v-icon>mdi-plus</v-icon></v-btn>
                        </div>
                        <precios :precios="precios" :producto_id="id" @actualizar_length_precios="actualizar_length_precios"></precios>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="grey lighten-3 py-5">
                            <h1 class="d-inline ml-8 display-1">Colores disponibles</h1>
                        </div>
                        <colores :colores="colores" :producto_id="id" :empresa_id="empresa_id" @nuevo_color="nuevo_color" @eliminar_color="eliminar_color"></colores>
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
import portada from '../../components/configurar_producto/portada'
import galeria from '../../components/configurar_producto/galeria'
import formulariodatos from '../../components/configurar_producto/datosprincipales'
import precios from '../../components/configurar_producto/precios'
import colores from '../../components/configurar_producto/colores'
export default {
    components: {
        formulariodatos,
        portada,
        galeria,
        precios,
        colores
    },
    data () {
        return {
            usuario: '',
            ruc: '',
            codigo: '',
            tab: '',
            empresa_id: '',
            nombre: '',
            descripcion: '',
            marca: '',
            categoria: '',
            tipo_producto: '',
            tipo_calzado: '',
            material: '',
            genero: '',
            galeria: '',
            id: '',
            imagen_portada: '',
            precios: '',
            colores: ''
        }
    },
    created () {
        this.usuario = this.$route.params.usuario
        this.ruc = this.$route.params.ruc
        this.codigo = this.$route.params.codigo
        this.obtener_datos()
    },
    filters: {
        uppercase (valor){
            return valor.toUpperCase()
        }
    },
    methods: {
        eliminar_color (index)
        {
            this.colores.splice(index,1)
        },
        nuevo_color (color) {
            this.colores.push(color)
        },
        actualizar_length_precios (lista_nueva) {
            this.precios = lista_nueva
        },
        agregar_precio () {
            if(this.precios.length <= 1)
            {
                let precio = {
                    precio: '',
                    descripcion: ''
                }
                this.precios.push(precio)
            }
            else
            {
                this.$toast.error("Solo puede guardar 2 precios")
            }
        },
        cambio_portada (nueva_url) {
            this.imagen_portada = nueva_url
        },
        eliminar_imagen (index) {
            this.galeria.splice(index, 1);
            console.log(this.galeria)
        },
        actualizar_galeria (imagen) {
            this.galeria.push(imagen)
        },
        subirdata (data, empresa_id) {
            this.id = data._id
            this.nombre = data.nombre
            this.descripcion = data.descripcion
            this.marca = data.marca
            this.categoria = data.categoria
            this.tipo_producto = data.tipo_producto
            this.tipo_calzado = data.tipo_calzado
            this.material = data.material
            this.genero = data.genero
            this.galeria = data.galeria
            this.empresa_id = empresa_id
            this.imagen_portada = data.imagen_portada
            this.precios = data.precios
            this.colores = data.colores
        },
        obtener_datos () {
            let id = this.$store.state.user.id
            let token = this.$store.state.token
            let option = {
                url: process.env.VUE_APP_URL_SERVER+'/api/obtener_producto/'+id+'/'+this.ruc+'/'+this.codigo,
                method: "POST",
                headers: {
                    'access-token': token,
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
            }
            axios(option)
            .then( res => {
                let data = res.data
                switch (data.cod)
                {
                    case "200": this.subirdata(data.data, data.empresa_id)
                    break
                    case "403": EventBus.$emit("force_logout")
                }
            })
        }
    }
}
</script>