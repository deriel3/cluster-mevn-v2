<template>
    <v-container class="d-flex">
        <div class="px-5 py-5" align="center" style="width:100%">
            <v-card justify="space-around" width="500" class="mx-5">
                <v-card-title class="primary"><h1 class="py-3">Añadir nuevo color</h1></v-card-title>
                <v-color-picker
                class="mt-3"
                v-model="color"
                dot-size="25"
                hide-mode-switch
                mode="hexa"
                swatches-max-height="200"
                ></v-color-picker>
                <v-btn
                class="my-3 success"
                @click="guardar_imagen"
                >
                Añadir color
                </v-btn>
            </v-card>
            <v-card class="mx-5 mt-5">
                <v-row
                v-if="data_colores.length>0"> 
                    <v-col
                    class="px-10 py-5"
                    v-for="(item,index) in data_colores"
                    :key="index"
                    md="2"
                    sm="12"
                    cols="12"
                    >
                        <div
                        align="right"
                        :style="{backgroundColor:item.color}"
                        >
                        <v-btn
                        class="mx-3 my-3 red white--text"
                        @click="borrar_imagen(index)"
                        icon>
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        </div>
                    </v-col>
                </v-row>
                <div v-else class="text-center py-8"><v-icon>mdi-information-outline</v-icon><p>No hay ningun color registrado</p></div>
            </v-card>
        </div>
    </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
import { EventBus } from '../../EventBus/EventBus'
export default {
    mixins: [validationMixin],

    validations: {
      color: { required }
    },
    props: {
        colores: '',
        producto_id: '',
        empresa_id: ''
    },
    data ()
    {
        return {
            color: '',
            data_colores: this.colores
        }
    },
    methods: {
        guardar_imagen () {
            let segundos = new Date().getTime()
            let nuevo_color = {
                color: this.color,
                nombre: segundos
            }
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            let token = this.$store.state.token
            let option = {
                url: process.env.VUE_APP_URL_SERVER+"/api/add_color",
                method: 'POST',
                headers: {
                    'access-token':token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    id: id,
                    ruc: ruc,
                    color: nuevo_color,
                    producto_id: this.producto_id
                }
            }
            axios(option)
            .then(res => {
                let data = res.data
                switch (data.cod)
                {
                    case "200": this.$toast.success("Campos actualizados")
                    this.color = "#000000FF"
                    this.$emit("nuevo_color",nuevo_color)
                    break;
                    case "403": EventBus.$emit("force_logout")
                }
            })
        },
        borrar_imagen (index) {
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            let token = this.$store.state.token
            let option = {
                url: process.env.VUE_APP_URL_SERVER+"/api/eliminar_color",
                method: 'POST',
                headers: {
                    'access-token':token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    id: id,
                    ruc: ruc,
                    nombre: this.data_colores[index].nombre,
                    producto_id: this.producto_id,
                    empresa_id: this.empresa_id
                }
            }
            axios(option)
            .then(res => {
                let data = res.data
                switch (data.cod)
                {
                    case "200": this.$toast.success("Color eliminado")
                    this.$emit("eliminar_color",index)
                    break;
                    case "403": EventBus.$emit("force_logout")
                }
            })
        }
    }
}
</script>