<template>
    <v-container class="d-flex">
        <div class="px-5 py-5" align="center" style="width:100%">
            <v-card justify="space-around" width="500" class="mx-5">
                <v-card-title class="primary"><h1 class="py-3">Imagen de portada actual</h1></v-card-title>
                <v-img
                max-width="350px"
                :src="imagen()">
                </v-img>
                <v-card-title class="primary"><h1 class="py-3">Nueva imagen de portada</h1></v-card-title>
                <v-file-input
                v-model="file"
                :error-messages="urlErrors"
                @input="$v.file.$touch()"
                @blur="$v.file.$touch()"
                @change="vista_previa_cambio"
                accept="image/x-png"
                label="Nueva Portada (PNG)"
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
import { EventBus } from '../../EventBus/EventBus'
export default {
    mixins: [validationMixin],

    validations: {
      file: { required }
    },
    props: {
        imagen_portada: '',
        id: ''
    },
    methods: {
        guardar_logo () {
            this.$v.file.$touch()
            if (!this.$v.file.$error) { 
                let segundos = new Date().getTime()
                let id = this.$store.state.user.id
                let ruc = this.$route.params.ruc
                let token = this.$store.state.token
                let codigo = this.$route.params.codigo
                let parameter = new FormData();
                parameter.append('id', id)
                parameter.append('codigo_producto', this.id)
                parameter.append('ruc',ruc)
                parameter.append('accion',2)
                parameter.append('codigo',codigo)
                parameter.append('segundo', segundos)
                parameter.append('url_anterior',this.imagen_portada)
                parameter.append('image', this.file)
                let option = {
                    url: process.env.VUE_APP_URL_SERVER+"/api/act_prodportada/"+id,
                    method: 'POST',
                    headers: {
                        'access-token':token,
                        'content-type': 'multipart/form-data'
                    },
                    data: parameter
                }
                axios(option)
                .then(res => {
                    let data = res.data
                    switch (data.cod)
                    {
                        case "200": this.$toast.success("Imagen de portada actualizada")
                        let nueva_url = segundos+"-p-"+codigo+".png"
                        this.vista = false
                        this.file = {}
                        this.$emit("cambio_portada",nueva_url)
                        break
                        case "403": EventBus.$emit("force_logout")
                    }
                })
            }
        },
        imagen () {
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            let codigo = this.$route.params.codigo
            return process.env.VUE_APP_URL_SERVER+"/assets/empresas/"+id+"/"+ruc+"-"+codigo.toLowerCase()+"/"+this.imagen_portada.toLowerCase()
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