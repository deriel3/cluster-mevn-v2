<template>
    <v-row>
        <v-col md="4" sm="12" cols="12" v-for="(item, index) in productos" :key="item._id">
            <v-card >
                <v-img
                v-bind:id="index"
                height="400px"
                :src="getImage(index)"
                >
                <v-app-bar
                    flat
                    color="rgba(0, 0, 0, 0)"
                >
                    <v-spacer></v-spacer>
                    <span v-if="item.estado==='1'" class="green px-3 white--text">Activo</span>
                    <span v-else class="red px-3 white--text">Inactivo</span>
                </v-app-bar>
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
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            return process.env.VUE_APP_URL_SERVER+"/assets/empresas/"+id+"/"+ruc+"-"+this.productos[ind].codigo.toLowerCase()+"/"+this.productos[ind].imagen_portada.toLowerCase()
        }
    },
    filters: {
        uppercase (valor){
            return valor.toUpperCase()
        }
    }
}
</script>