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
                <v-tab>Informacion del producto</v-tab>
                <v-tab>Multimedia</v-tab>
                <v-tab>Colores</v-tab>
                <v-tab><v-icon>mdi-cog</v-icon></v-tab>
            </v-tabs>
            <v-card-text>
                <div class="font-weight-bold mb-2">
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <div class="grey lighten-3 py-5">
                            <h1 class="d-inline ml-8 display-1">Datos principales del producto</h1>
                        </div>
                        <formulariodatos></formulariodatos>
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
import formulariodatos from '../../components/configurar_producto/datosprincipales'
export default {
    components: {
        formulariodatos
    },
    data () {
        return {
            usuario: '',
            ruc: '',
            codigo: '',
            tab: ''
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
        obtener_datos () {
            
        }
    }
}
</script>