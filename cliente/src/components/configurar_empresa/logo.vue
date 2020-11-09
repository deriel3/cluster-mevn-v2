<template>
    <v-container class="d-flex">
        <div class="px-5 py-5" align="center" style="width:100%">
            <v-card justify="space-around" width="500" class="mx-5">
                <v-card-title class="primary"><h1 class="py-3">Logo actual</h1></v-card-title>
                <v-img
                max-width="350px"
                :src="imagen()">
                </v-img>
                <v-card-title class="primary"><h1 class="py-3">Nuevo Logo</h1></v-card-title>
                <v-file-input
                v-model="file"
                :error-messages="urlErrors"
                @input="$v.file.$touch()"
                @blur="$v.file.$touch()"
                @change="vista_previa_cambio"
                accept="image/x-png"
                label="Nuevo logo (PNG)"
                ></v-file-input>
                <v-img
                v-if="vista"
                width="350px"
                max-width="350px"
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
                    url: process.env.VUE_APP_URL_SERVER+"/api/act_logo/"+id,
                    method: 'POST',
                    headers: {
                        'access-token':token,
                        'content-type': 'multipart/form-data'
                    },
                    data: parameter
                }
                axios(option)
                .then(res => {
                    console.log(res.data)
                })
            }
        },
        imagen () {
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            let imagen = require("../../assets/empresas/"+id+"/"+ruc+".png")
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