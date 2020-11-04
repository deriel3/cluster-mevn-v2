<template>
    <v-card>
        <v-stepper alt-labels v-model="paso">
            <v-stepper-header >
                <v-stepper-step step="1" :complete="paso>1">
                    <div class="text-center">
                        <span>Datos de empresa</span>
                    </div>
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="paso>2" >
                    <div class="text-center">
                        <span>Datos de contacto</span>
                    </div>
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">
                    Informacion
                </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-row>
                        <v-col
                        md="6"
                        s="12">
                            <v-text-field
                            v-model="ruc"
                            :error-messages="rucErrors"
                            :counter="11"
                            label="Ruc"
                            required
                            @input="$v.ruc.$touch()"
                            @blur="$v.ruc.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        md="6"
                        s="12">
                            <v-text-field
                            v-model="razon_social"
                            :error-messages="razonsocialErrors"
                            :counter="250"
                            label="Razon Social"
                            required
                            @input="$v.razon_social.$touch()"
                            @blur="$v.razon_social.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-text-field
                    v-model="nombre_comercial"
                    :error-messages="nombrecomercialErrors"
                    label="Nombre comercial"
                    required
                    @input="$v.nombre_comercial.$touch()"
                    @blur="$v.nombre_comercial.$touch()"
                    ></v-text-field>
                    <v-file-input
                        v-model="file"
                        :error-messages="urlErrors"
                        @input="$v.file.$touch()"
                        @blur="$v.file.$touch()"
                        accept="image/x-png"
                        label="Logo de la empresa (PNG)"
                    ></v-file-input>
                    <v-btn
                    color="primary"
                    class="mr-4 black--text mt-4"
                    @click="siguiente"
                    >
                        Continuar
                    </v-btn>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <h3>Locacion</h3>
                    <v-row>
                        <v-col
                        md="6">
                            <v-select
                            v-model="tipo_sede"
                            :items="sede"
                            :error-messages="tiposedeErrors"
                            label="Tipo de sede"
                            required
                            @change="$v.tipo_sede.$touch()"
                            @blur="$v.tipo_sede.$touch()"
                            ></v-select>
                        </v-col>
                        <v-col
                        md="6">
                            <v-text-field
                            v-model="direccion"
                            :error-messages="direccionErrors"
                            :counter="500"
                            label="Direccion"
                            required
                            @input="$v.direccion.$touch()"
                            @blur="$v.direccion.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <h3>Contactos</h3>
                    <v-row>
                        <v-col
                        md="4">
                            <v-select
                            v-model="tipo_dispositivo"
                            :items="medio_contacto"
                            :error-messages="tipodispositivoErrors"
                            label="Medio de contacto"
                            required
                            @change="$v.tipo_dispositivo.$touch()"
                            @blur="$v.tipo_dispositivo.$touch()"
                            ></v-select>
                        </v-col>
                        <v-col
                        md="4">
                            <v-text-field
                            v-model="contacto"
                            :error-messages="contactoErrors"
                            label="Contacto"
                            required
                            @input="$v.contacto.$touch()"
                            @blur="$v.contacto.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        md="4">
                            <v-text-field
                            v-model="persona"
                            :error-messages="personaErrors"
                            :counter="250"
                            label="Persona de contacto"
                            required
                            @input="$v.persona.$touch()"
                            @blur="$v.persona.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <p class="caption">* En la seccion de configuracion de empresa podra añadir mas locaciones y contactos.</p>
                    <v-btn
                    color="danger"
                    class="mr-4 black--text mt-4"
                    @click="paso=paso-1"
                    >
                        Atras
                    </v-btn>
                </v-stepper-content>
                <v-stepper-content step="3">
                    
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-card>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
    mixins: [validationMixin],

    validations: {
      ruc: { required, maxLength: maxLength(11) , minLength: minLength(11) },
      razon_social: { required, maxLength: maxLength(250) },
      nombre_comercial: { required, maxLength: maxLength(250)},
      file: { required},
      tipo_sede:{ required },
      direccion: { required , maxLength: maxLength(500) },
      tipo_dispositivo: {required},
      contacto: { required },
      persona: { required , maxLength: maxLength(250)}
    },
    data () {
        return{
            paso: 1,
            ruc: '',
            razon_social: '',
            nombre_comercial: '',
            file: {},
            url: '',
            tipo_sede: '',
            direccion: '',
            tipo_dispositivo: '',
            contacto: '',
            persona: '',
            sede:["Planta de produccion", "Tienda propia", "Tienda externa", "Otro"],
            medio_contacto:["Correo electronico", "Telefono", "Celular", "Fax", "Pagina web", "Otro"]
        }
    },
    computed: {
        direccionErrors () {
            const errors = []
            if (!this.$v.direccion.$dirty) return errors
            !this.$v.direccion.maxLength && errors.push('El campo no debe exceder mas da los 500 caracteres.')
            !this.$v.direccion.required && errors.push('El campo obligatorio.')
            return errors
        },
        personaErrors () {
            const errors = []
            if (!this.$v.persona.$dirty) return errors
            !this.$v.persona.maxLength && errors.push('El campo no debe exceder mas da los 250 caracteres.')
            !this.$v.persona.required && errors.push('El campo obligatorio.')
            return errors
        },
        tiposedeErrors(){
            const errors = []
            console.log(this.$v.tipo_sede)
            if(!this.$v.tipo_sede.$dirty) return errors
            !this.$v.tipo_sede.required && errors.push('El campo obligatorio.')
            return errors
        },
        tipodispositivoErrors(){
            const errors = []
            console.log(this.$v.tipo_dispositivo)
            if(!this.$v.tipo_dispositivo.$dirty) return errors
            !this.$v.tipo_dispositivo.required && errors.push('El campo obligatorio.')
            return errors
        },
        contactoErrors(){
            const errors = []
            console.log(this.$v.contacto)
            if(!this.$v.contacto.$dirty) return errors
            !this.$v.contacto.required && errors.push('El campo obligatorio.')
            return errors
        },
        urlErrors(){
            const errors = []
            console.log(this.$v.file)
            if(!this.$v.file.$dirty) return errors
            !this.$v.file.required && errors.push('El campo obligatorio.')
            return errors
        },
        rucErrors () {
            const errors = []
            if (!this.$v.ruc.$dirty) return errors
            !this.$v.ruc.minLength && errors.push('El campo no debe ser menor a 11 caracteres')
            !this.$v.ruc.maxLength && errors.push('El campo no debe exceder mas da los 11 caracteres.')
            !this.$v.ruc.required && errors.push('El campo obligatorio.')
            return errors
        },
        razonsocialErrors () {
            const errors = []
            if (!this.$v.razon_social.$dirty) return errors
            !this.$v.razon_social.maxLength && errors.push('El campo no debe exceder mas da los 250 caracteres.')
            !this.$v.razon_social.required && errors.push('El campo obligatorio.')
            return errors
        },
        nombrecomercialErrors () {
            const errors = []
            if (!this.$v.nombre_comercial.$dirty) return errors
            !this.$v.nombre_comercial.maxLength && errors.push('El campo no debe exceder mas da los 20 caracteres.')
            !this.$v.nombre_comercial.required && errors.push('El campo obligatorio.')
            return errors
        },
    },
    methods: {
        siguiente()
        {
            //this.validar_paso1()
            if( !this.$v.ruc.$error &&
            !this.$v.razon_social.$error && 
            !this.$v.nombre_comercial.$error &&
            !this.$v.file.$error)
            {
                this.paso = 2
            }
        },
        validar_paso1(){
            this.$v.ruc.$touch()
            this.$v.razon_social.$touch()
            this.$v.nombre_comercial.$touch()
            this.$v.file.$touch()  
        }
    }
}
</script>