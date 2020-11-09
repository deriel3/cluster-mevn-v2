<template>
    <v-container class="d-flex">
        <div class="px-5 py-5" align="center" style="width:100%">
            <v-card justify="space-around"  class="mx-5">
                <v-card-title class="primary"><h1 class="py-3">Portada actual</h1></v-card-title>
                <v-img v-if="portada !== 'default'"
                max-width="1200px"
                max-height="500px"
                :src="imagen()">
                </v-img>
                <small v-else>No posee una portada registrada</small>
                <v-card-title class="primary"><h1 class="py-3">Nueva portada</h1></v-card-title>
                <v-file-input
                style="width:50%"
                v-model="file"
                :error-messages="urlErrors"
                @input="$v.file.$touch()"
                @blur="$v.file.$touch()"
                @change="vista_previa_cambio"
                accept="image/x-png"
                label="Nueva portada (PNG)"
                ></v-file-input>
                <v-img
                v-if="vista"
                max-width="1200px"
                max-height="500px"
                :src="vista_previa">
                </v-img>
                <v-btn
                class="my-3 success"
                @click="guardar_logo"
                >
                Guardar Cambio
                </v-btn>
            </v-card>
        </div>
    </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
    props: {
        portada: ''
    },
    mixins: [validationMixin],

    validations: {
      file: { required }
    },
    methods: {
        guardar_logo () {
            this.$v.file.$touch()
            if (!this.$v.file.$error) { 
                let id = this.$store.state.user.id
                let ruc = this.$route.params.ruc
                let token = this.$store.state.token
                let parameter = new FormData();
                parameter.append('id', id)
                parameter.append('ruc',ruc)
                parameter.append('accion',2)
                parameter.append('image', this.file)
                let option = {
                    url: process.env.VUE_APP_URL_SERVER+"/api/act_portada/"+id,
                    method: 'POST',
                    headers: {
                        'access-token':token,
                        'content-type': 'multipart/form-data'
                    },
                    data: parameter
                }
                axios(option)
                .then(res => {
                    this.$emit("cambio")
                })
            }
        },
        imagen () {
            
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            let imagen = require("../../assets/empresas/"+id+"/portada-"+ruc+".png")
            return imagen
        },
        vista_previa_cambio (e) {
            const file = e;
            if(typeof file !== 'undefined')
            {
                if(this.file)
                {
                    this.vista_previa = URL.createObjectURL(file);
                    this.vista = true
                }
                else
                {
                    this.vista = false
                }
            }
            else
            {
                this.vista = false
            }
        }
    },
    data ()
    {
        return {
            file: {},
            vista_previa: '',
            vista: false
        }
    },
    computed: {
        urlErrors(){
            const errors = []
            if(!this.$v.file.$dirty) return errors
            !this.$v.file.required && errors.push('El campo obligatorio.')
            return errors
        },
    }
    
}
</script>