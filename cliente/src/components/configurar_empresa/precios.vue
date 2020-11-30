<template>
    <v-container class="d-flex">
        <div class=" py-1" align="center" style="width:100%">
            <v-card justify="space-around" width="75%" >
                <v-card-text>
                    <v-row>
                        <v-col v-for="item in data_precios" :key="item.id"
                        md="4"
                        s="12"
                        cols="6">
                            <v-text-field
                            v-model="item.dato"
                            label="Precio"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <small>*Para eliminar deje el campo de precio en blanco</small>
                    <br>
                    <v-btn
                    color="primary" class="black--text" @click="guardar_cambio">
                        Guardar Cambio
                    </v-btn>
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>
<script>
import axios from 'axios'
import { EventBus } from '../../EventBus/EventBus'
export default {
    props: {
        precios: ''
    },

    data () {
        return {
            data_precios: this.precios
        }
    },
    
    methods: {
        borrar_vacios () {
            this.data_precios = this.data_precios.filter(item => {
                return item.dato !== ''
            })
            this.$emit("actualizar_length_precio",this.data_precios)
            
        },
        guardar_cambio () {
            this.borrar_vacios()
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            let token = this.$store.state.token
            let option = {
                url: process.env.VUE_APP_URL_SERVER+"/api/act_precios_empresa",
                method: 'POST',
                headers: {
                    'access-token':token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    id: id,
                    ruc: ruc,
                    precios: this.data_precios
                }
            }
            axios(option)
            .then(res => {
                let data = res.data
                switch (data.cod)
                {
                    case "200": this.$toast.success("Campos actualizados")
                    break;
                    case "403": EventBus.$emit("force_logout")
                }
            })
        }
    }
}
</script>