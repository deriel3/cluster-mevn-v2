<template>
    <v-container class="d-flex">
        <div class="px-5 py-5" align="center" style="width:100%">
            <v-card justify="space-around" width="500" class="mx-5">
                <v-card-title class="primary"><h1 class="py-3">Añadir imagen a galeria</h1></v-card-title>
                <v-file-input
                v-model="file"
                :error-messages="urlErrors"
                @input="$v.file.$touch()"
                @blur="$v.file.$touch()"
                @change="vista_previa_cambio"
                accept="image/x-png"
                label="Nueva imagen (PNG)"
                ></v-file-input>
                <v-img
                v-if="vista"
                width="350px"
                max-width="350px"
                :src="vista_previa">
                </v-img>
                <v-btn
                class="my-3 success"
                @click="guardar_imagen"
                >
                Añadir imagen
                </v-btn>
            </v-card>
            <v-card class="mx-5 mt-5">
                <v-row
                v-if="galeria.length>0"> 
                    <v-col
                    class="px-10 py-5"
                    v-for="(item,index) in galeria"
                    :key="index"
                    md="4"
                    sm="12"
                    cols="12"
                    >
                        <v-img
                        align="right"
                        min-width="300px"
                        min-height="200px"
                        :src="imagen(index)">
                        <v-btn
                        class="mx-3 my-3 red white--text"
                        @click="borrar_imagen(index)"
                        icon>
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        </v-img>
                    </v-col>
                </v-row>
                <div v-else class="text-center py-8"><v-icon>mdi-information-outline</v-icon><p>No hay ninguna imagen en la galeria</p></div>
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
        galeria: '',
        empresa_id: '',
        producto_id: ''
    },
    data ()
    {
        return {
            file: {},
            vista_previa: '',
            vista: false
        }
    },
    methods: {
        borrar_imagen (index) {
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            let codigo = this.$route.params.codigo
            let ruta = this.galeria[index].url_imagen
            let empresa_id = this.empresa_id
            let token = this.$store.state.token
            const option = {
                url: process.env.VUE_APP_URL_SERVER+"/api/eliminar_imagengaleria",
                method: 'POST',
                headers: {
                    'access-token':token,
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                data: {
                    id: id,
                    ruta: ruta,
                    empresa_id: empresa_id,
                    ruc: ruc,
                    codigo: codigo,
                    producto_id: this.producto_id
                }
            }
            axios(option)
            .then( res => {
                let data = res.data
                switch(data.cod)
                {
                    case "200":this.$toast.success('Imagen eliminada de la galeria')
                    this.$emit("eliminar_imagen",index)
                    break;
                    case "201":this.$toast.error('Hubo un problema al eliminar la imagen')
                    break;
                    case "403": EventBus.$emit("force_logout")
                }
            })
        },
        guardar_imagen () {
            this.$v.file.$touch()
            if (!this.$v.file.$error) { 
                let segundos = new Date().getTime()
                let nombre = Math.floor((Math.random() * 999) + 1); 
                let id = this.$store.state.user.id
                let ruc = this.$route.params.ruc
                let token = this.$store.state.token
                let codigo = this.$route.params.codigo
                let parameter = new FormData();
                parameter.append('id', id)
                parameter.append('ruc', ruc)
                parameter.append('codigo', codigo)
                parameter.append('producto_id', this.producto_id)
                parameter.append('empresa_id', this.empresa_id)
                parameter.append('nombre', nombre)
                parameter.append('image', this.file)
                const option = {
                    url: process.env.VUE_APP_URL_SERVER+"/api/act_galeria/"+id,
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
                    switch (data.cod) {
                        case "200": this.$toast.success("Imagen agregada a la galeria del producto.")
                        this.file = ""
                        this.vista = false
                        let imagen = {
                            url_imagen:nombre+"-"+codigo+".png"
                        }
                        this.$emit('actualizar_galeria',imagen)
                        break
                        case "403": EventBus.$emit('force_logout')
                    }
                })
            }
        },
        imagen (index) {
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            let codigo = this.$route.params.codigo
            return process.env.VUE_APP_URL_SERVER+"/assets/empresas/"+id+"/"+ruc+"-"+codigo.toLowerCase()+"/galeria/"+this.galeria[index].url_imagen.toLowerCase()
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