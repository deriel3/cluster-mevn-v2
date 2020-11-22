<template>
    <v-card
    class="orange lighten-5">
        <v-container class="py-5 px-5">
            <h1 class="title">Descripcion:</h1>
            <p class="body-1">{{descripcion}}</p>
            <h1 class="title mb-2">Categoria: </h1>
            <img :src="imagen(1, 'Calzado')" title="Calzado" style="max-width:40px;" v-bind:class="{'icono-deseleccionado':is_calzado}" class="d-inline mr-5" alt="">
            <img :src="imagen(2, 'Materia Prima')" title="Materia Prima" style="max-width:40px" v-bind:class="{'icono-deseleccionado':is_cuero}" class="d-inline mr-5" alt="">
            <img :src="imagen(3, 'Insumo')" title="Insumo" style="max-width:40px" v-bind:class="{'icono-deseleccionado':is_insumo}" class="d-inline mr-5" alt="">
            <img :src="imagen(4, 'Suministro')" title="Suministro" style="max-width:40px" v-bind:class="{'icono-deseleccionado':is_suministro}" class="d-inline mr-5" alt="">
            <v-divider class="my-5"></v-divider>
            <h1 class="display-6">Productos:</h1>
            <v-container>
                <div v-if="lista_productos.length > 0">
                    <v-row>
                        <v-col
                        v-for="(item,index) in lista_productos" :key="index"
                        md="4"
                        sm="12"
                        cols="12">
                            <carproducto :producto="item.array"></carproducto>
                        </v-col>
                        
                    </v-row>
                    <infiniteloading @infinite="infinitehandler">
                        <div slot="no-more">No hay mas productos.</div>
                        <div slot="spinner">Cargando datos.</div>
                        <div slot="no-results">No hay mas productos.</div>
                    </infiniteloading>
                </div>
                <div v-else class="text-center py-8"><v-icon>mdi-information-outline</v-icon><p>No hay ningun producto registrado</p></div>
            </v-container>
        </v-container>
    </v-card>
</template>
<script>
import carproducto from './vista-cardproducto'
import infiniteloading from 'vue-infinite-loading'
import axios from 'axios'
import { EventBus } from '../../../EventBus/EventBus'
export default {
    props: {
        descripcion: '',
        categoria: ''
    },
    components: {
        carproducto,
        infiniteloading
    },
    data () {
        return {
            lista_productos: '',
            is_calzado: true,
            is_cuero: true,
            is_insumo: true,
            is_suministro: true,
            pagina:0,
            lista_completa:[],
            lista_filtro:"",
            lista_vista:[],
        }
    },
    created () {
        this.obtener_productos()
    },
    beforeUpdate () {
        if (typeof this.categoria !== 'undefined')
        {
            for (let i = 0; i<this.categoria.length; i++)
            {
                switch (this.categoria[i])
                {
                    case "Calzado": this.is_calzado = false
                    break
                    case "Materia Prima": this.is_cuero = false
                    break
                    case "Insumo": this.is_insumo = false
                    break
                    case "Suministro": this.is_suministro = false
                }
            }
        }
    },
    methods:{
        obtener_productos () {
            let id = this.$store.state.user.id
            let token = this.$store.state.token
            let ruc = this.$route.params.ruc
            this.pagina++
            let option = {
                url: process.env.VUE_APP_URL_SERVER+'/api/vista_obtenerproducto',
                method: "POST",
                headers: {
                    'access-token': token,
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                data:{
                    id: id,
                    ruc: ruc,
                    pagina: this.pagina
                }
            }
            axios(option)
            .then(res => {
                let data = res.data
                switch(data.cod)
                {
                    case '200':this.lista_productos = data.data
                    break
                    case '201': this.$toast.error("Ocurrio un erro de coneccion recargue la pagina")
                    break
                    case '403': EventBus.$emit("force_logout")
                }
            })
        },
        imagen (orden, categoria) {
            
            switch (orden) {
                case 1: return process.env.VUE_APP_URL_SERVER+"/assets/iconos/categoria/calzado.png"
                break
                case 2: return process.env.VUE_APP_URL_SERVER+"/assets/iconos/categoria/cuero.png"
                break
                case 3: return process.env.VUE_APP_URL_SERVER+"/assets/iconos/categoria/insumo.png"
                break
                case 4: return process.env.VUE_APP_URL_SERVER+"/assets/iconos/categoria/suministro.png"
            }
        },
        infinitehandler($state)
        {
            let id = this.$store.state.user.id
            let token = this.$store.state.token
            let ruc = this.$route.params.ruc
            this.pagina++
            let option = {
                url: process.env.VUE_APP_URL_SERVER+'/api/vista_obtenerproducto',
                method: "POST",
                headers: {
                    'access-token': token,
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                data:{
                    id: id,
                    ruc: ruc,
                    pagina: this.pagina
                }
            }
            axios(option)
            .then(res => {
                let data = res.data
                switch(data.cod)
                {
                    case '200':
                    if(data.data.length>0)
                    {
                        this.lista_productos=this.lista_productos.concat(data.data)
                        $state.loaded()
                    }
                    else
                    {
                        $state.complete()
                    }
                    break
                    case '201': this.$toast.error("Ocurrio un erro de coneccion recargue la pagina")
                    break
                    case '403': EventBus.$emit("force_logout")
                }
            })
        },
    }
}
</script>
<style>
.icono-deseleccionado{
    opacity: 0.3;
}
</style>