<template>
    <v-row>
        <v-col
        v-for="(item,index) in lista_empresa"
        :key="item.id"
        cols="12"
        lg="6"
        md="12"
        sm="12">
            <v-card >
                <v-img
                v-bind:id="index"
                height="400px"
                :lazy-src="getLazyImage(index)"
                :src="getImage(index)"
                >
                <v-app-bar
                    flat
                    color="rgba(0, 0, 0, 0)"
                >
                    <v-spacer></v-spacer>
                    <span v-if="item.estado=== 1 " class="green px-3 white--text">Activo</span>
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
                    <div class="font-weight-bold mb-2 black--text text-center">
                        <span>{{item.ruc | uppercase}}</span>
                        <h1>{{item.razon_social | uppercase}}</h1>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn icon
                     :to="{'name':'configrar-empresa', 'params':{'ruc':item.ruc,'usuario':usuario}}">
                        <v-icon>mdi-cog</v-icon>
                    </v-btn>
                     <v-spacer></v-spacer>
                    <v-btn icon
                     :to="{'name':'vista-previa-empresa', 'params':{'ruc':item.ruc,'usuario':usuario}}">
                        <v-icon>mdi-eye</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import store from '../../../store/index'
export default {
    props: {
        lista_empresa: ''
    },
    data() {
        return {
            usuario: this.$store.state.user.usuario
        }
    },
    methods:{
        getImage(ind)
        {
            let id = this.$store.state.user.id
            return process.env.VUE_APP_URL_SERVER+"/api/imagen/logo?id="+id+"&imagen="+this.lista_empresa[ind].url_logo
        },
        getLazyImage(ind)
        {
            let id = this.$store.state.user.id
            return process.env.VUE_APP_URL_SERVER+"/api/imagen/logo?id="+id+"&imagen="+this.lista_empresa[ind].url_logo+"&width=10&height=10"
        }
    },
    filters: {
        uppercase (valor){
            return valor.toUpperCase()
        }
    }
}
</script>