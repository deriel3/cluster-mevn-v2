<template>
    <v-container>
        <vistaportada
        :razon_social="empresa.razon_social"
        :portada="empresa.url_portada"
        :logo="empresa.url_logo"
        :cantidad_favoritos="empresa.cantidad_favoritos"></vistaportada>
        <vistaproducto :producto="producto" :redes="empresa.redes"></vistaproducto>
    </v-container>
</template>
<script>
import vistaportada from '../../components/configurar_empresa/vista-previa/vista-portada'
import vistaproducto from '../../components/configurar_empresa/vista-previa-producto/vista-producto'
import axios from 'axios'
import { EventBus } from '../../EventBus/EventBus'
export default {
    components: {
        vistaportada,
        vistaproducto
    },
    data () {
        return {
            empresa: {
                razon_social :'',
                url_portada :'',
                url_logo :'',
                cantidad_favoritos :'',
                redes: ''
            },
            producto: ''
        }
    },
    created () {
        this.obtener_producto()
    },
    methods: {
        subirdata (data) {
            this.empresa.razon_social = data.razon_social
            this.empresa.url_portada = data.url_portada
            this.empresa.url_logo = data.url_logo
            this.empresa.cantidad_favoritos = data.cantidad_favoritos
            this.empresa.redes = data.redes
            this.producto = data.producto[0]
        },
        obtener_producto () {
            let codigo = this.$route.params.codigo
            let id = this.$store.state.user.id
            let token = this.$store.state.token
            let ruc = this.$route.params.ruc
            let option = {
                url: process.env.VUE_APP_URL_SERVER+'/api/vista_obtenerunproducto',
                method: "POST",
                headers: {
                    'access-token': token,
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                data: {
                    id: id,
                    ruc: ruc,
                    codigo: codigo
                }
            }
            axios(option)
            .then(res => {
                let data = res.data
                switch (data.cod)
                {
                    case '200':
                        if (data.data[0].producto.length > 0)
                        {
                            this.subirdata(data.data[0])
                        }
                    break
                    case '403': EventBus.$emit('force_logout')
                }
            })
        }
    }
}
</script>