<template>
    <v-container class="d-flex">
        <div class="py-5" align="center" style="width:100%">
            <v-card justify="space-around" width="500" class="">
                <v-card-title class="primary"><h2 class="py-3">Logo actual</h2></v-card-title>
                <v-img
                class="my-3"
                height="350px"
                :src="imagen()"
                :lazy-src="lazyimagen()">
                <template v-slot:placeholder>
                    <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                    >
                        <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                        ></v-progress-circular>
                    </v-row>
                </template>
                </v-img>
                <v-card-title class="primary"><h2 class="py-3">Nuevo Logo</h2></v-card-title>
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
import { EventBus } from '../../EventBus/EventBus'
export default {
    mixins: [validationMixin],

    validations: {
      file: { required }
    },
    props:{
        url_logo: ''
    },
    methods: {
        reiniciar () {
            this.file = ''
            this.vista = false
        },
        guardar_logo () {
            this.$v.file.$touch()
            if (!this.$v.file.$error) { 
                let segundos = new Date().getTime()
                let id = this.$store.state.user.id
                let ruc = this.$route.params.ruc
                let token = this.$store.state.token
                let parameter = new FormData();
                parameter.append('id', id)
                parameter.append('ruc',ruc)
                parameter.append('accion',2)
                parameter.append('segundo',segundos)
                parameter.append('url_anterior',this.url_logo)
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
                    let data = res.data
                    switch (data.cod)
                    {
                        case "200": this.$toast.success("Logo actualizado")
                        let nueva_url = segundos+"-"+ruc+".png"
                        this.$emit("cambio_logo",nueva_url)
                        this.reiniciar()
                        break
                        case "403": EventBus.$emit("force_logout")
                    }
                })
            }
        },
        imagen () {
            if (this.url_logo !== '')
            {
            let id = this.$store.state.user.id
            return process.env.VUE_APP_URL_SERVER+"/api/imagen/logo?id="+id+"&imagen="+this.url_logo
            }
        },
        lazyimagen () {
            if (this.url_logo !== '')
            {
            let id = this.$store.state.user.id
            return process.env.VUE_APP_URL_SERVER+"/api/imagen/logo?id="+id+"&imagen="+this.url_logo+"&width=10&height=10"
            }
        },
        vista_previa_cambio (e) {
            const file = e;
            if(typeof file !== 'undefined' && typeof file.type !== 'undefined')
            {
                if(this.file)
                {
                    const validImageTypes = 'image/png';
                    if (validImageTypes === file.type) {
                        this.vista_previa = URL.createObjectURL(file);
                        this.vista = true
                        
                    }
                    else
                    {
                        this.file = {}
                        this.$toast.error('Solo se acepta formato PNG')
                        this.vista = false
                    }
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