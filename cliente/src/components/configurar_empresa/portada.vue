<template>
    <v-container class="d-flex">
        <div class=" py-5" align="center" style="width:100%">
            <v-card justify="space-around"  class="">
                <v-card-title class="primary"><h2 class="py-3">Portada actual</h2></v-card-title>
                <v-img v-if="portada !== 'default'"
                max-width="1200px"
                max-height="500px"
                :lazy-src="lazy_imagen()"
                :src="imagen()">
                <template v-slot:placeholder>
                    <v-row
                        class="fill-height ma-0"
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
                <small v-else>No posee una portada registrada</small>
                <v-card-title class="primary"><h2 class="py-3">Nueva portada</h2></v-card-title>
                <v-file-input
                style="width:70%"
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
import { EventBus } from '../../EventBus/EventBus'
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
                let segundo = new Date().getTime()
                let id = this.$store.state.user.id
                let ruc = this.$route.params.ruc
                let token = this.$store.state.token
                let parameter = new FormData();
                parameter.append('id', id)
                parameter.append('ruc',ruc)
                parameter.append('accion',2)
                parameter.append('segundo', segundo)
                parameter.append('url_anterior', this.portada)
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
                    let data = res.data
                    switch (data.cod)
                    {
                        case '200': this.$toast.success("Portada actualizada")
                        let nueva_url = segundo+'-portada'+ruc+".png"
                        this.$emit("cambio_portada", nueva_url)
                        this.reiniciar()
                        break
                        case "403": EventBus.$emit("force_logout")
                    }
                })
            }
        },
        reiniciar () {
            this.vista = false
            this.file = ''
        },
        imagen () {
            if (this.portada !== '')
            {
                let id = this.$store.state.user.id
                return process.env.VUE_APP_URL_SERVER+"/api/imagen/logo?id="+id+"&imagen="+this.portada
            }
        },
        lazy_imagen () {
            if (this.portada !== '')
            {
                let id = this.$store.state.user.id
                return process.env.VUE_APP_URL_SERVER+"/api/imagen/logo?id="+id+"&imagen="+this.portada+"&width=10&height=10"
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