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
                            type="number"
                            required
                            @input="$v.ruc.$touch()"
                            @blur="$v.ruc.$touch()"
                            @focusout="verificar_ruc"
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
                        id="imagen"
                        v-model="file"
                        :error-messages="urlErrors"
                        @input="$v.file.$touch()"
                        @blur="$v.file.$touch()"
                        @change="verificarimagen"
                        accept="image/x-png"
                        label="Logo de la empresa (PNG)"
                    ></v-file-input>
                    <h3 class="black--text">Categoria</h3>
                    <v-row>
                        <v-col
                        md="3">
                            <v-checkbox
                            class="d-inline"
                            v-model="categoria"
                            :error-messages="categoriaErrors"
                            @input="$v.categoria.$touch()"
                            @blur="$v.categoria.$touch()"
                            label="Calzado"
                            value="Calzado"
                            ></v-checkbox>
                        </v-col>
                        <v-col
                        md="3">
                            <v-checkbox
                            class="d-inline"
                            v-model="categoria"
                            :error-messages="categoriaErrors"
                            @input="$v.categoria.$touch()"
                            @blur="$v.categoria.$touch()"
                            label="Materia Prima"
                            value="Materia Prima"
                            ></v-checkbox>
                        </v-col>
                        <v-col
                        md="3">
                            <v-checkbox
                            class="d-inline"
                            v-model="categoria"
                            :error-messages="categoriaErrors"
                            @input="$v.categoria.$touch()"
                            @blur="$v.categoria.$touch()"
                            label="Insumo"
                            value="Insumo"
                            ></v-checkbox>
                        </v-col>
                        <v-col
                        md="3">
                            <v-checkbox
                            class="d-inline"
                            v-model="categoria"
                            :error-messages="categoriaErrors"
                            @input="$v.categoria.$touch()"
                            @blur="$v.categoria.$touch()"
                            label="Suministro"
                            value="Suministro"
                            ></v-checkbox>
                        </v-col>
                    </v-row>
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
                    color="error"
                    class="mr-4 white--text mt-4"
                    @click="paso=paso-1"
                    >
                        Atras
                    </v-btn>
                    <v-btn
                    color="primary"
                    class="mr-4 black--text mt-4"
                    @click="registrar_empresa"
                    >
                        Registrar
                    </v-btn>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <div class="display-1" align="center">
                        <h3 class="my-2">La empresa se registro satisfactoriamente.</h3>
                        <v-icon size="60px" color="green">mdi-check-circle</v-icon>
                        <p class="base-body body-1 mt-10">Ingrese a la configuracion de la empresa creada y activela para que pueda ser vista por todos los usuarios.</p>
                        <v-btn
                        color="" class="black--text" @click="paso=1">
                            Crear nueva empresa
                        </v-btn>
                    </div>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-card>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'
import { EventBus } from '../../../EventBus/EventBus'
import $ from 'jquery'
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
      persona: { required , maxLength: maxLength(250)},
      categoria: {required}
    },
    data () {
        return{
            lazy_image: {},
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
            medio_contacto:["Correo electronico", "Telefono", "Celular", "Fax", "Pagina web", "Otro"],
            categoria: [],
            ruc_creado: ''
        }
    },
    computed: {
        categoriaErrors(){
            const errors = []
            !this.$v.categoria.required && errors.push("Seleccione por lo menos una opcion")
            return errors
        },
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
            if(!this.$v.tipo_sede.$dirty) return errors
            !this.$v.tipo_sede.required && errors.push('El campo obligatorio.')
            return errors
        },
        tipodispositivoErrors(){
            const errors = []
            if(!this.$v.tipo_dispositivo.$dirty) return errors
            !this.$v.tipo_dispositivo.required && errors.push('El campo obligatorio.')
            return errors
        },
        contactoErrors(){
            const errors = []
            if(!this.$v.contacto.$dirty) return errors
            !this.$v.contacto.required && errors.push('El campo obligatorio.')
            return errors
        },
        urlErrors(){
            const errors = []
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
        verificarimagen (e) {
            const file = e;
            if(file && typeof file.type !== 'undefined')
            {
                const validImageTypes = 'image/png';
                if (validImageTypes !== file.type) {
                    this.file = {}
                    this.$toast.error('Solo se acepta formato PNG')
                }
            }
        },
        Configurar_empresa_creada(){
            
        },
        verificar_ruc () {
            if(this.ruc.length==11)
            {
                let token = this.$store.state.token
                let id = this.$store.state.user.id

                let ruc= this.ruc
                let option = {
                    url: process.env.VUE_APP_URL_SERVER+"/api/ver_empresa",
                    method: 'POST',
                    headers:{
                        'access-token':token,
                        'Accept':'application/json',
                        'Content-type':'application/json'
                    },
                    data: {
                        ruc: ruc,
                        id: id
                    }
                }
                axios(option)
                .then(res => {
                    let data = res.data
                    if(data.cod=="500")
                    {
                        this.$toast.error("RUC ya registrado");
                        this.ruc=""
                    }
                    if(data.cod=="200")
                    {
                        this.$toast.success("RUC correcto");
                    }
                    if(data.cod=="403")
                    {
                        EventBus.$emit('force_logout',1);
                    }
                })
            }
        },
        siguiente() {
            this.validar_paso1()
            if( !this.$v.ruc.$error &&
            !this.$v.razon_social.$error && 
            !this.$v.nombre_comercial.$error &&
            !this.$v.file.$error &&
            !this.$v.categoria.$error)
            {
                this.paso = 2
            }
        },
        validar_paso1(){
            this.$v.categoria.$touch()
            this.$v.ruc.$touch()
            this.$v.razon_social.$touch()
            this.$v.nombre_comercial.$touch()
            this.$v.file.$touch()  
        },
        validar_paso2() {
            this.$v.tipo_sede.$touch()
            this.$v.direccion.$touch()
            this.$v.tipo_dispositivo.$touch()
            this.$v.contacto.$touch()
            this.$v.persona.$touch()
        },
        reiniciar(){
            this.ruc = '',
            this.razon_social = '',
            this.nombre_comercial = '',
            this.file = {},
            this.url = '',
            this.tipo_sede = '',
            this.direccion = '',
            this.tipo_dispositivo = '',
            this.contacto = '',
            this.persona = '',
            this.categorias = [""],
            this.paso = 3
        },
        registrar_empresa() {
            this.validar_paso2()
            if( !this.$v.tipo_sede.$error &&
            !this.$v.direccion.$error && 
            !this.$v.tipo_dispositivo.$error &&
            !this.$v.contacto.$error &&
            !this.$v.persona.$error )
            {
                let segundos= new Date().getTime();
                let id = this.$store.state.user.id
                let token = this.$store.state.token
                let parameter = new FormData();
                parameter.append('id',id)
                parameter.append('ruc',this.ruc)
                parameter.append('razon_social',this.razon_social)
                parameter.append('nombre_comercial',this.nombre_comercial)
                for(let i=0;i < this.categoria.length; i++) {
                    parameter.append('categoria',this.categoria[i])
                }
                parameter.append('accion',1)
                parameter.append('segundo', segundos)
                parameter.append('image', this.file)
                parameter.append('tipo_sede', this.tipo_sede)
                parameter.append('direccion', this.direccion)
                parameter.append('tipo_dispositivo', this.tipo_dispositivo)
                parameter.append('contacto', this.contacto)
                parameter.append('persona', this.persona)
                const option = {
                    url: process.env.VUE_APP_URL_SERVER+"/api/nueva-empresa/"+id,
                    method: 'POST',
                    headers: {
                        'access-token':token,
                        'content-type': 'multipart/form-data'
                    },
                    data:parameter
                }
                axios(option)
                .then(res => {
                    let data = res.data
                    switch(data.cod)
                    {
                        case "200":this.$toast.success('Empresa creada')
                        let empresa_creada = {
                            ruc: this.ruc,
                            url_logo: segundos+"-"+this.ruc+".png",
                            razon_social: this.razon_social
                        }
                        EventBus.$emit('nueva_empresa',empresa_creada);
                        this.ruc_creado = this.ruc
                        break;
                        case "201":this.$toast.error("Error al registrar")
                        break
                        case "202":this.$toast.error("Solo se pueden crear 6 empresas por usuario")
                        break;
                        case "403":EventBus.$emit('force_logout',1);
                    }
                    this.reiniciar()
                })
            }
        }
    }
}
</script>