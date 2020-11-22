<template>
    <div class="px-15 py-10">
        <v-row>
            <v-col
            md="6"
            sm="6"
            cols="12">
                <v-img
                    src="https://picsum.photos/350/165">
                </v-img>
                <v-row class="hidden-sm-and-down">
                <v-col
                md="12"
                sm="12"
                cols="12">
                <v-item-group active-class="primary">
                    <v-container>
                    <v-row>
                        <v-col
                        v-for="n in 12"
                        :key="n"
                        cols="6"
                        md="3"
                        >
                        <v-item v-slot="{ toggle }">
                            <v-card
                            class="d-flex align-center py-1 px-1"
                            dark
                            height="100"
                            @click="toggle"
                            >
                                <v-img
                                height="100%"
                                src="https://picsum.photos/350/165">
                                </v-img>
                            </v-card>
                        </v-item>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-item-group>
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
                    <p class="text-left px-15">{{producto.descripcion}}</p>
                    <v-row class="mb-2">
                        <v-col
                        md="6"
                        sm="6"
                        cols="6">
                            <small class="body-1 grey--text">Tipo de producto:</small>
                            <p class="mt-5">{{producto.tipo_producto}}</p>
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
                                <small v-if="producto.tipo_calzado !== 'default'" class="mt-5">{{producto.tipo_calzado}}</small>
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
                    color="blue"
                    class="my-3"
                    width="70%"
                    depressed
                    >
                        <v-icon class="mr-1">mdi-facebook</v-icon>
                        Contactar por Facebook
                    </v-btn>
                    <br>
                    <v-btn
                    dark
                    color="pink"
                    class="my-3"
                    width="70%"
                    depressed
                    >
                        <v-icon class="mr-1">mdi-instagram</v-icon>
                        Contactar por Instagram
                    </v-btn>
                    <br>
                    <v-btn
                    dark
                    color="green"
                    width="70%"
                    class="my-3"
                    depressed
                    >
                        <v-icon class="mr-1">mdi-whatsapp</v-icon>
                        Contactar por whast up
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row class="hidden-md-and-up">
            <v-col
            md="6"
            sm="6"
            cols="12">
            <v-item-group active-class="primary">
                <v-container>
                <v-row>
                    <v-col
                    v-for="n in 12"
                    :key="n"
                    cols="6"
                    md="3"
                    >
                    <v-item v-slot="{ toggle }">
                        <v-card
                        class="d-flex align-center py-1 px-1"
                        dark
                        height="100"
                        @click="toggle"
                        >
                            <v-img
                            height="100%"
                            src="https://picsum.photos/350/165">
                            </v-img>
                        </v-card>
                    </v-item>
                    </v-col>
                </v-row>
                </v-container>
            </v-item-group>
            </v-col>
        </v-row>
        
    </div>
</template>
<script>
export default {
    props: {
        producto: ''
    },
    methods:{
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
    }
}
</script>