<template>
    <v-container>
        <v-row>
            <v-col
            md="3"
            sm="12"
            cols="12">
                <filtro @filtro_evento="filtro_evento" ></filtro>
            </v-col>
            <v-col
            md="9"
            sm="12"
            cols="12">
                <h1 class="display-2 text-center font-weight-bold mb-10">Empresas Registradas</h1>
                <div v-if="!filtro">
                    <listaempresas :lista_empresas="lista_empresas"></listaempresas>
                    <infinite @infinite="infinitehandler" class="mt-15">
                        <div slot="no-more">No hay mas empresas.</div>
                        <div slot="spinner">Cargando datos.</div>
                        <div slot="no-results">No hay mas empresas.</div>
                    </infinite>
                </div>
                <div v-else>
                    <listaempresas :lista_empresas="lista_filtrada"></listaempresas>
                </div>
            </v-col>
            
        </v-row>
    </v-container>
</template>
<script>
import listaempresas from '../../components/publico/proveedor/listaempresas'
import filtro from '../../components/publico/proveedor/filtro'
import axios from 'axios'
import infinite from 'vue-infinite-loading'
export default {
    components: {
        listaempresas,
        filtro,
        infinite
    },
    data () {
        return {
            filtro: false,
            lista_empresas: '',
            lista_completa: '',
            lista_filtrada: '',
            pagina: 0
        }
    }, 
    created () {
        this.obtener_empresas()
    },
    methods: {
        infinitehandler($state)
        {
            this.pagina++
            const option = {
                url: process.env.VUE_APP_URL_SERVER+"/api/obt_empresas?pagina="+this.pagina,
                method: 'GET'
            }
            axios(option)
            .then( res => {
                let data = res.data
                if(data.data.length>0)
                    {
                        this.lista_empresas=this.lista_empresas.concat(data.data)
                        $state.loaded()
                    }
                    else
                    {
                        $state.complete()
                    }
            })
        },
        subir_data (data) {
            this.lista_empresas = data
        },
        subir_data_completa (data) {
            this.lista_completa = data
        },
        obtener_empresas () {
            this.pagina++
            const option = {
                url: process.env.VUE_APP_URL_SERVER+"/api/obt_empresas?pagina="+this.pagina,
                method: 'GET'
            }
            axios(option)
            .then( res => {
                let data = res.data
                if (data.data.length > 0)
                {    
                    this.subir_data(data.data)
                }
            })
            const option2 = {
                url: process.env.VUE_APP_URL_SERVER+"/api/obt_empresas/todo",
                method: 'GET'
            }
            axios(option2)
            .then( res => {
                let data = res.data
                if (data.data.length > 0)
                {    
                    this.subir_data_completa(data.data)
                }
            })
        },
        filtro_evento (tipo,filtros) {
            this.lista_filtrada = ''
            let temp_completo = this.lista_completa
            if (tipo == '1') {
                this.lista_filtrada = temp_completo.filter(item => {
                    return item.razon_social.indexOf(filtros) !== -1
                })
                this.filtro = true
            }
            else if (tipo == '2') {
                let tmp_filtro = ''
                tmp_filtro = temp_completo.filter(item => {
                    return item.categorias.filter(categoria => {return categoria.indexOf(filtros.categoria) !== -1}).length > 0
                })
                this.lista_filtrada = tmp_filtro.filter(item => {
                    return item.precios.filter(precio => {return precio.dato >= filtros.min && precio.dato <= filtros.max }).length > 0
                })
                this.filtro = true
            }
            else {
                this.filtro = false
            }
        }
    }
}
</script>