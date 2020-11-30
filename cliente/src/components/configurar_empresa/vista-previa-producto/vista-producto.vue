<template>
    <div class="px-15 py-10">
        <v-btn
        class="error mr-3"
        :to="{'name':'vista-previa-empresa', 'params':{'ruc':ruc,'usuario':usuario}}">
            Volver
        </v-btn>
        <v-btn
        class="primary black--text"
        :to="{name:'configurar-producto', params:{'usuario':usuario, 'ruc':ruc, 'codigo':producto.codigo}}"
        >
            Editar
        </v-btn>
        <v-row>
            <v-col
            md="6"
            sm="6"
            cols="12">
                <v-img
                    max-height="600px"
                    :src="portada_actual">
                </v-img>
                <v-row class="">
                <v-col
                md="12"
                sm="12"
                cols="12">
                    <v-row>
                        <v-col
                        v-for="(item,index) in producto.galeria"
                        :key="index"
                        cols="6"
                        md="3"
                        >
                            <v-card
                            class="d-flex align-center"
                            height="100"
                            @click="seleccion(index)"
                            >
                                <v-img
                                height="100%"
                                :src="galeria(index)"
                                :lazy-src="lazy_galeria(index)"
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
                                </v-img>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            </v-col>
            <v-col
            md="6"
            sm="6"
            cols="12">
                <div align="center">
                    <h2 class="display-1 font-weight-bold text-center mb-5"> {{producto.codigo}}</h2>
                    <small class="body-1 font-weight-bold">{{producto.nombre}}</small>
                    <v-img width="30" class="mb-3" :src="imagen_categoria()"></v-img>
                    <p class="text-justify mx-5">{{producto.descripcion}}</p>
                    <v-row class="mb-2">
                        <v-col
                        md="6"
                        sm="6"
                        cols="6">
                            <small class="body-1 grey--text">Tipo de producto:</small>
                            <div v-if="producto.tipo_producto === '' || producto.tipo_producto === 'default'">
                                <p class="mt-5">No registro tipo de producto</p>
                            </div>
                            <div v-else>
                                <p v-if="producto.tipo_producto !== 'default'" class="mt-5">{{producto.tipo_producto}}</p>
                            </div>
                        </v-col>
                        <v-col
                        md="6"
                        sm="6"
                        cols="6">
                            <small class="body-1 grey--text">Familia de producto:</small>
                            <div v-if="producto.tipo_calzado === '' || producto.tipo_calzado === 'default'">
                                <p class="mt-5">No registro familia de producto</p>
                            </div>
                            <div v-else>
                                <p v-if="producto.tipo_calzado !== 'default'" class="mt-5">{{producto.tipo_calzado}}</p>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="mb-2">
                        <v-col
                        md="6"
                        sm="6"
                        cols="6">
                            <small class="body-1 grey--text">Material:</small>
                            <div v-if="producto.material === '' || producto.material === 'default'">
                                <p class="mt-5">No registro tipo de material</p>
                            </div>
                            <div v-else>
                                <img :src="imagen_material()" style="width:25px"  class="mt-5" alt="">
                            </div>
                        </v-col>
                        <v-col
                        md="6"
                        sm="6"
                        cols="6">
                            <small class="body-1 grey--text">Genero:</small>
                            <div v-if="producto.genero === '' || producto.genero === 'default'">
                                <p class="mt-5">No registro genero</p>
                            </div>
                            <div v-else>
                                <img :src="imagen_genero()" style="width:25px" class="mt-5" alt="">
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="mb-2">
                        <v-col
                        md="6"
                        sm="6"
                        cols="6">
                            <small class="body-1 grey--text">Precios:</small>
                            <div v-if="producto.precios.length === 0">
                                <p class="mt-5">No registro precios</p>
                            </div>
                            <div v-else>
                                <p class="mt-5" v-for="item in producto.precios" :key="item._id">S/.{{item.precio}} {{item.descripcion}}<br></p>
                            </div>
                        </v-col>
                        <v-col
                        md="6"
                        sm="6"
                        cols="6">
                            <small class="body-1 grey--text">Colores:</small>
                            <div v-if="producto.colores.length === 0">
                                <p class="mt-5">No registro colores</p>
                            </div>
                            <div v-else class="mt-5">
                                <small v-for="item in producto.colores" :key="item._id" ><div align="right" class="d-inline mr-2  px-2" :style="{backgroundColor:item.color}"></div></small>
                            </div>
                        </v-col>
                    </v-row>
                    <v-btn
                    dark
                    target="_blank"
                    :href="redes.facebook"
                    color="blue"
                    class="my-3"
                    width="100%"
                    depressed
                    >
                        <v-icon class="mr-1">mdi-facebook</v-icon>
                        Contactar por Facebook
                    </v-btn>
                    <br>
                    <v-btn
                    dark
                    target="_blank"
                    color="pink"
                    :href="redes.instagram"
                    class="my-3"
                    width="100%"
                    depressed
                    >
                        <v-icon class="mr-1">mdi-instagram</v-icon>
                        Contactar por Instagram
                    </v-btn>
                    <br>
                    <v-btn
                    dark
                    target="_blank"
                    color="green"
                    :href="redes.whats"
                    width="100%"
                    class="my-3"
                    depressed
                    >
                        <v-icon class="mr-1">mdi-whatsapp</v-icon>
                        Contactar por whast up
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props: {
        producto: '',
        redes: ''
    },
    data () {
        return {
            portada_actual: '',
            is_active:false,
            index_actual: '',
            ruc: '',
            usuario: '',
            prevRoute: null
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.prevRoute = from
        })
    },
    created () {
        this.ruc = this.$route.params.ruc
        this.usuario = this.$route.params.usuario
    },
    beforeUpdate () {
        this.portada()
    },
    methods:{
        portada () {
            if( this.is_active === false)
            {
                
                let id = this.$store.state.user.id
                let ruc = this.$route.params.ruc
                let codigo = this.$route.params.codigo
                this.portada_actual = process.env.VUE_APP_URL_SERVER+"/assets/empresas/"+id+"/"+ruc+"-"+codigo.toLowerCase()+"/"+this.producto.imagen_portada.toLowerCase()
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
        },
        galeria (index) {
            if (this.producto.galeria[index].url_imagen !== '')
            {
                let id = this.$store.state.user.id
                let ruc = this.$route.params.ruc
                let codigo = this.$route.params.codigo
                return process.env.VUE_APP_URL_SERVER+"/api/imagen/galeria?id="+id+"&imagen="+this.producto.galeria[index].url_imagen.toLowerCase()+"&ruc="+ruc+"&codigo="+codigo.toLowerCase()
            }
        },
        lazy_galeria (index) {
            if (this.producto.galeria[index].url_imagen !== '')
            {
                let id = this.$store.state.user.id
                let ruc = this.$route.params.ruc
                let codigo = this.$route.params.codigo
                return process.env.VUE_APP_URL_SERVER+"/api/imagen/galeria?id="+id+"&imagen="+this.producto.galeria[index].url_imagen.toLowerCase()+"&ruc="+ruc+"&codigo="+codigo.toLowerCase()+"&width=10&height=10"
            }
        },
        seleccion (index) {
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            let codigo = this.$route.params.codigo
            if (this.index_actual === index) { 
                this.is_active = false
                this.portada_actual = process.env.VUE_APP_URL_SERVER+"/assets/empresas/"+id+"/"+ruc+"-"+codigo.toLowerCase()+"/"+this.producto.imagen_portada.toLowerCase()
                this.index_actual = ''
            }
            else { 
                this.is_active = true 
                this.index_actual=index
                this.portada_actual = process.env.VUE_APP_URL_SERVER+"/assets/empresas/"+id+"/"+ruc+"-"+codigo.toLowerCase()+"/galeria/"+this.producto.galeria[index].url_imagen
            }
        }
    }
}
</script>
<style>
.seleccionado {
    background-color: rgba(2,2,2,0.3)
}
</style>