<template>
    <v-container class="d-flex">
        <div class="px-5 py-5" align="center" style="width:100%">
            <v-card justify="space-around" width="60%" class="mx-5">
                <v-card-text>
                    <v-row v-for="item in data_locacion" :key="item._id">
                        <v-col
                        md="6"
                        s="12"
                        cols="6">
                            <v-select
                            v-model="item.tipo_sede"
                            :items="sede"
                            label="Tipo de sede"
                            required
                            ></v-select>
                        </v-col>
                        <v-col
                        md="6"
                        s="12"
                        cols="6">
                            <v-text-field
                            v-model="item.direccion"
                            label="Direccion"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <small>*Para eliminar deje en blanco el campo direccion</small>
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
        locaciones: ''
    },

    data () {
        console.log(this.locaciones)
        return {
            data_locacion: this.locaciones,
            sede:["Planta de produccion", "Tienda propia", "Tienda externa", "Otro"]
        }
    },
    
    methods: {
        borrar_vacios () {
            this.data_locacion = this.data_locacion.filter(item => {
                return item.tipo_sede !== '' && item.direccion !== ''
            })
            this.$emit("actualizar_length_locaciones",this.data_locacion)
            
        },
        guardar_cambio () {
            this.borrar_vacios()
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            let token = this.$store.state.token
            let option = {
                url: process.env.VUE_APP_URL_SERVER+"/api/act_locacion",
                method: 'POST',
                headers: {
                    'access-token':token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    id: id,
                    ruc: ruc,
                    locacion: this.data_locacion
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