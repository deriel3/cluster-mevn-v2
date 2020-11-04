<template>
    <div class="mx-15">
        <form class="my-5 px-15">
                <v-row>
                    <v-col
                    md="6"
                    s="12">
                        <v-text-field
                        :disabled="!editar"
                        v-model="usuario.nombre"
                        :error-messages="nameErrors"
                        :counter="20"
                        label="Nombre"
                        required
                        @input="$v.nombre.$touch()"
                        @blur="$v.nombre.$touch()"
                        ></v-text-field>
                    </v-col>
                    <v-col
                    md="6"
                    s="12">
                        <v-text-field
                        :disabled="!editar"
                        v-model="usuario.apellido"
                        :error-messages="apellidoErrors"
                        :counter="20"
                        label="Apellido"
                        required
                        @input="$v.apellido.$touch()"
                        @blur="$v.apellido.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-text-field
                :disabled="!editar"
                v-model="usuario.correo_electronico"
                :error-messages="emailErrors"
                label="Correo electronico"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                ></v-text-field>
                <v-radio-group v-model="usuario.genero"
                :disabled="!editar"
                :error-messages="generoErrors"
                @change="$v.genero.$touch()"
                @blur="$v.genero.$touch()">
                    <template v-slot:label>
                        <div>Genero:</div>
                    </template>
                    <v-radio class="mt-2"
                    color="primary"
                    :label="'Hombre'"
                    :value="'Hombre'"
                    ></v-radio>
                    <v-radio
                    :label="'Mujer'"
                    :value="'Mujer'"></v-radio>
                </v-radio-group>
                <v-select
                :disabled="!editar"
                    v-model="usuario.pais"
                    :items="items"
                    :error-messages="paisErrors"
                    label="Pais"
                    required
                    @change="$v.pais.$touch()"
                    @blur="$v.pais.$touch()"
                ></v-select>
                <v-btn
                :disabled="!editar"
                color="primary"
                @click="guardar_cambios">
                    Guardar Cambios
                </v-btn>
            </form>
    </div>
    
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import axios from 'axios'
import { EventBus } from '../../../EventBus/EventBus'
export default {
    mixins: [validationMixin],

    validations: {
      nombre: { required, maxLength: maxLength(20) },
      apellido: { required, maxLength: maxLength(20) },
      email: { required, email },
      genero: { required },
      pais: { required }
    },
    props:{
        usuario: '',
        editar: false,
    },
    data: () => ({
        nombre: '',
        apellido: '',
        email: '',
        pais: null,
        items: [],
        genero: '',
    }),
    created () {
        this.obtener_pais()
    },
    computed: {
        generoErrors(){
            this.genero = this.usuario.genero
            const errors = []
            if(!this.$v.genero.$dirty) return errors
            !this.$v.genero.required && errors.push('Seleccione una opcion')
            return errors
        },
        paisErrors () {
            this.pais = this.usuario.pais
            const errors = []
            if (!this.$v.pais.$dirty) return errors
            !this.$v.pais.required && errors.push('Seleccione un pais')
            return errors
        },
        nameErrors () {
            this.nombre = this.usuario.nombre
            const errors = []
            if (!this.$v.nombre.$dirty) return errors
            !this.$v.nombre.maxLength && errors.push('El campo no debe exceder mas da los 20 caracteres.')
            !this.$v.nombre.required && errors.push('El campo obligatorio.')
            return errors
        },
        apellidoErrors() {
            this.apellido = this.usuario.apellido
            const errors = []
            if (!this.$v.apellido.$dirty) return errors
            !this.$v.apellido.maxLength && errors.push('El campo no debe exceder mas da los 20 caracteres.')
            !this.$v.apellido.required && errors.push('El campo obligatorio.')
            return errors
        },
        emailErrors () {
            this.email = this.usuario.correo_electronico
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Ingrese un correo valido')
            !this.$v.email.required && errors.push('El campo obligatorio.')
            return errors
        },
    },
    methods: {
        guardar_cambios () {
            this.$emit("loading")
            this.$v.$touch()
            let id = this.$store.state.user.id
            let token = this.$store.state.token
            const option ={
                url: process.env.VUE_APP_URL_SERVER+"/api/actualizar_datos",
                method: 'POST',
                headers: {
                    'access-token':token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    id: id,
                    persona: {
                        nombre: this.nombre,
                        apellido: this.apellido,
                        correo: this.email,
                        genero: this.genero,
                        pais: this.pais
                    }
                }
            }
            axios(option)
            .then(res => {
                switch (res.data.cod)
                {
                    case "200": this.$toast.success("Datos actualizados")
                    break
                    case "403": EventBus.$emit('force_logout')
                }
                this.$emit("loading")
            })
        },
        obtener_pais () {
            const option={
                url: 'https://restcountries.eu/rest/v2/all',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
            axios(option)
            .then(res=>{
                let nombre=[]
                let data=res.data
                for(let i=0; i<data.length;i++)
                {
                    nombre.push(data[i].name)
                }
                this.items=nombre
            })
        }
    }
}
</script>