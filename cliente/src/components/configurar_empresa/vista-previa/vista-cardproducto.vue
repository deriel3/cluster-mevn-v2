<template>
    <v-card>
        <v-img
        :src="imagen()"
        :lazy-src="lazy_imagen()"
        height="300px"
        >
            <template v-slot:placeholder>
                <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
                >
                    <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                    ></v-progress-circular>
                </v-row>
            </template>        
            <v-app-bar
            flat
            color="rgba(0,0,0,0)">
                <v-btn color="black"
                class="primary"
                icon
                :to="{name:'configurar-producto', params:{'usuario':usuario, 'ruc':ruc, 'codigo':producto.codigo}}"
                >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-app-bar>
        </v-img>

        <v-card-title>
            <h1 class="title text-center" style="width:100%">{{producto.nombre}}</h1>
            <div align="center" style="width:100%">
                <img :src="imagen_categoria()" style="width:30px" class="mt-3" alt="">
            </div>
        </v-card-title>

        <v-card-subtitle>
            <v-row class="text-center">
                <v-col
                md="6"
                sm="6"
                cols="6">
                    <p class="mb-0 font-weight-bold">Tipo de Producto:</p>
                    <div v-if="producto.tipo_producto === ''">
                        <small>No registro tipo de producto</small>
                    </div>
                    <div v-else>
                        <small>{{producto.tipo_producto}}</small>
                    </div>
                </v-col>
                <v-col
                md="6"
                sm="6"
                cols="6">
                    <p class="mb-0 font-weight-bold">Familia de producto:</p>
                    <div v-if="producto.tipo_calzado === '' || producto.tipo_calzado === 'default'">
                        <small>No registro familia de producto</small>
                    </div>
                    <div v-else>
                        <small v-if="producto.tipo_calzado !== 'default'">{{producto.tipo_calzado}}</small>
                    </div>
                </v-col>
            </v-row>
             <v-row class="text-center">
                <v-col
                md="6"
                sm="6"
                cols="6">
                    <p class="mb-0 font-weight-bold">Material:</p>
                    <div v-if="producto.material === '' || producto.material === 'default'">
                        <small>No registro tipo de material</small>
                    </div>
                    <div v-else>
                        <img :src="imagen_material()" style="width:25px"  class="mt-3" alt="">
                    </div>
                </v-col>
                <v-col
                md="6"
                sm="6"
                cols="6">
                    <p class="mb-0 font-weight-bold">Genero:</p>
                    <div v-if="producto.genero === '' || producto.genero === 'default'">
                        <small>No registro genero</small>
                    </div>
                    <div v-else>
                        <img :src="imagen_genero()" style="width:25px" class="mt-3" alt="">
                    </div>
                </v-col>
            </v-row>
            <v-row class="text-center">
                <v-col
                md="6"
                sm="6"
                cols="6">
                    <p class="mb-0 font-weight-bold">Precios:</p>
                    <div v-if="producto.precios.length === 0">
                        <small>No registro precios</small>
                    </div>
                    <div v-else>
                        <small v-for="item in producto.precios" :key="item._id">S/.{{item.precio}} {{item.descripcion}}<br></small>
                    </div>
                </v-col>
                <v-col
                md="6"
                sm="6"
                cols="6">   
                    <p class="mb-0 font-weight-bold">Colores:</p>
                    <div v-if="producto.colores.length === 0">
                        <small>No registro colores</small>
                    </div>
                    <div v-else>
                        <small v-for="item in producto.colores" :key="item._id" ><div align="right" class="d-inline mr-2 px-2" :style="{backgroundColor:item.color}"></div></small>
                    </div>
                </v-col>
            </v-row>
        </v-card-subtitle>
        <v-card-actions>
            <v-spacer></v-spacer>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        v-bind="attrs"
                        v-on="on"
                        color="black"
                        icon
                        >
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item link :to="{name:'vista-previa-producto', params:{'usuario':usuario, 'ruc':ruc, 'codigo':producto.codigo}}">
                            <v-list-item-title>Mas informacion</v-list-item-title>
                        </v-list-item>
                        <v-list-item link to="/">
                            <v-list-item-title>Contactar</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    props: {
        producto: ''
    },
    data () {
        return {
            usuario: this.$route.params.usuario,
            ruc: this.$route.params.ruc
        }
    },
    methods: {
        imagen () {
            if ( this.producto.imagen_portada.toLowerCase() !== '' && this.producto.imagen_portada.toLowerCase() !== '')
            {
                let id = this.$store.state.user.id
                let ruc = this.$route.params.ruc
                let codigo = this.producto.codigo
                return process.env.VUE_APP_URL_SERVER+"/api/imagen/producto?id="+id+"&imagen="+this.producto.imagen_portada.toLowerCase()+"&ruc="+ruc+"&codigo="+codigo.toLowerCase()
            }
        },
        lazy_imagen () {
            if ( this.producto.imagen_portada.toLowerCase() !== '' && this.producto.imagen_portada.toLowerCase() !== '')
            {
                let id = this.$store.state.user.id
                let ruc = this.$route.params.ruc
                let codigo = this.producto.codigo
                return process.env.VUE_APP_URL_SERVER+"/api/imagen/producto?id="+id+"&imagen="+this.producto.imagen_portada.toLowerCase()+"&ruc="+ruc+"&codigo="+codigo.toLowerCase()+"&width=10&height=10"
            }
        },
        imagen_categoria () {
            switch (this.producto.categoria)
            {
                case 'Calzado':return process.env.VUE_APP_URL_SERVER+"/assets/iconos/categoria/calzado.png"
                break
                case 'Materia Prima':return process.env.VUE_APP_URL_SERVER+"/assets/iconos/categoria/cuero.png"
                break
                case 'Insumo':return process.env.VUE_APP_URL_SERVER+"/assets/iconos/categoria/insumo.png"
                break
                case 'Suministro':return process.env.VUE_APP_URL_SERVER+"/assets/iconos/categoria/suministro.png"
            }
        },
        imagen_material () {
            switch (this.producto.material)
            {
                case 'Cuero': return process.env.VUE_APP_URL_SERVER+"/assets/iconos/material/cuero.png"
                break
                case 'Sintetico': return process.env.VUE_APP_URL_SERVER+"/assets/iconos/material/sintetico.png"
                break
                case 'Textil': return process.env.VUE_APP_URL_SERVER+"/assets/iconos/material/textil.png"
                break
                case 'Otro': return process.env.VUE_APP_URL_SERVER+"/assets/iconos/material/otro.png"
            }
        },
        imagen_genero () {
            switch (this.producto.genero)
            {
                case 'Hombre': return process.env.VUE_APP_URL_SERVER+"/assets/iconos/genero/hombre.png"
                break
                case 'Mujer': return process.env.VUE_APP_URL_SERVER+"/assets/iconos/genero/mujer.png"
                break
                case 'Unisex': return process.env.VUE_APP_URL_SERVER+"/assets/iconos/genero/unisex.png"
            }
        }
    },
    filters: {
        uppercase (valor){
            if (typeof valor != 'undefined')
            {  
                return valor.toUpperCase()
            }
        }
    }
}
</script>