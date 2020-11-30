<template>
    <v-row>
        <v-col md="4" sm="12" cols="12" v-for="(item, index) in productos" :key="item._id">
            <v-card >
                <v-img
                v-bind:id="index"
                height="400px"
                :src="getImage(index)"
                :lazy-src="getLazyImage(index)"
                >
                <v-app-bar
                    flat
                    color="rgba(0, 0, 0, 0)"
                >
                    <v-spacer></v-spacer>
                    <span v-if="item.estado===1" class="green px-3 white--text">Activo</span>
                    <span v-else class="red px-3 white--text">Inactivo</span>
                </v-app-bar>
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
                <v-card-text>
                    <div class="font-weight-bold ml-8 mb-2 black--text text-center">
                        <span>{{item.codigo | uppercase}}</span>
                        <h1>{{item.nombre | uppercase}}</h1>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn icon
                     :to="{'name':'configurar-producto', 'params':{'ruc':ruc,'usuario':usuario,'codigo':item.codigo}}">
                        <v-icon>mdi-cog</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import store from '../../store/index'
export default {
    props: {
        productos: ''
    },
    data () {
        return {
            ruc: '',
            usuario: ''
        }
    },
    
    created () {
        this.ruc = this.$route.params.ruc
        this.usuario = this.$route.params.usuario
    },
    methods: {
        getImage(ind)
        {
            if ( this.productos[ind].codigo.toLowerCase() !== '' && this.productos[ind].imagen_portada.toLowerCase() !== '')
            {
                let id = this.$store.state.user.id
                let ruc = this.$route.params.ruc
                return process.env.VUE_APP_URL_SERVER+"/api/imagen/producto?id="+id+"&imagen="+this.productos[ind].imagen_portada.toLowerCase()+"&ruc="+ruc+"&codigo="+this.productos[ind].codigo.toLowerCase()
            }
        },
        getLazyImage (ind) {
            if ( this.productos[ind].codigo.toLowerCase() !== '' && this.productos[ind].imagen_portada.toLowerCase() !== '')
            {
                let id = this.$store.state.user.id
                let ruc = this.$route.params.ruc
                return process.env.VUE_APP_URL_SERVER+"/api/imagen/producto?id="+id+"&imagen="+this.productos[ind].imagen_portada.toLowerCase()+"&ruc="+ruc+"&codigo="+this.productos[ind].codigo.toLowerCase()+"&width=10&height=10"
            }
        }
    },
    filters: {
        uppercase (valor){
            return valor.toUpperCase()
        }
    }
}
</script>