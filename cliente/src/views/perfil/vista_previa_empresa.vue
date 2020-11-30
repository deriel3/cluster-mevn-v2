<template>
    <v-container>
        <v-btn
        class="error mx-3"
        :to="{'name':'configrar-empresa', 'params':{'ruc':ruc,'usuario':usuario}}">
            Volver
        </v-btn>
        <vistaportada
        :razon_social="empresa.razon_social"
        :portada="empresa.url_portada"
        :logo="empresa.url_logo"
        :cantidad_favoritos="empresa.cantidad_favoritos"></vistaportada>
        <v-row>
            <v-col
            md="3"
            cols="12"
            sm="6">
                <vistacontacto :forma_contacto="empresa.forma_contacto" :locaciones="empresa.locacion" :redes="empresa.redes"></vistacontacto>
            </v-col>
            <v-col
            md="9"
            cols="12"
            sm="6">
                <vistadescripcion :descripcion="empresa.descripcion" :categoria="empresa.categorias" :empresa_id="empresa._id"></vistadescripcion>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios'
import { EventBus } from '../../EventBus/EventBus'
import vistaportada from '../../components/configurar_empresa/vista-previa/vista-portada'
import vistacontacto from '../../components/configurar_empresa/vista-previa/vista-contacto'
import vistadescripcion from '../../components/configurar_empresa/vista-previa/vista-descripcion'
export default {
    components: {
        vistaportada,
        vistacontacto,
        vistadescripcion
    },
    data () {
        return {
            empresa: '',
            ruc: '',
            usuario: ''
        }
    },
    created () {
        this.ruc = this.$route.params.ruc
        this.usuario = this.$route.params.usuario
        this.obtener_data()
    },
    methods: {
        subir_data (data) {
            this.empresa = data
            console.log(data)
        },
        obtener_data () {
            let id = this.$store.state.user.id
            let token = this.$store.state.token
            let ruc = this.$route.params.ruc

            let option = {
                url: process.env.VUE_APP_URL_SERVER+'/api/vista-previa',
                method: "POST",
                headers: {
                    'access-token': token,
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                data: {
                    id: id,
                    ruc: ruc
                }
            }
            axios(option)
            .then( res => {
                let data = res.data
                switch (data.cod) {
                    case '200': this.subir_data(data.data[0])
                    break
                    case '403': EventBus.$emit('force_logout')
                }
            })
        }
    }
}
</script>