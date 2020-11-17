<template>
    <v-container class="d-flex">
        <div class="px-5 py-5" align="center" style="width:100%">
            <v-card justify="space-around" width="50%" class="mx-5">
                <v-card-text v-if="data_precios.length > 0">
                    <v-row
                    
                    v-for="(item) in data_precios" :key="item._id">
                        <v-col
                        md="4"
                        sm="12"
                        cols="12">
                            <v-text-field
                            v-model="item.precio"
                            label="Precio"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        md="8"
                        sm="12"
                        cols="12">
                            <v-textarea
                            rows="4"
                            v-model="item.descripcion"
                            label="Descripcion del precio"
                            required
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <small>*Para eliminar deje en blanco el campo precio</small>
                    <br>
                    <v-btn
                    color="primary" class="black--text" @click="actualizar_datos" >
                        Guardar Cambio
                    </v-btn>
                </v-card-text>
                <v-card-text v-else>
                    <div class="text-center py-8"><v-icon>mdi-information-outline</v-icon><p>No hay ningun precio registrado</p></div>
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
        precios: '',
        producto_id: ''    
    },
    data () {
        return {
            data_precios: this.precios
        }
    },
    methods: {
        borrar_vacios () {
            this.data_precios = this.data_precios.filter(item => {
                return item.precio !== '' && item.descripcion !== ''
            })
            this.$emit("actualizar_length_precios",this.data_precios)
        },
        actualizar_datos () {
            this.borrar_vacios()
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            let token = this.$store.state.token
            let option = {
                url: process.env.VUE_APP_URL_SERVER+"/api/act_precios",
                method: 'POST',
                headers: {
                    'access-token':token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    id: id,
                    ruc: ruc,
                    precios: this.data_precios,
                    producto_id: this.producto_id
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