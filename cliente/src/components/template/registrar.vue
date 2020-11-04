<template>
    <v-card :loading="is_loading">
          <div>
            <v-stepper alt-labels v-model="paso">
                <v-stepper-header>
                    <v-stepper-step step="1" :complete="paso>1">
                        Datos Personales
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="2" :complete="paso>2" >
                        Datos de usuario
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
                                v-model="nombre"
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
                                v-model="apellido"
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
                        v-model="email"
                        :error-messages="emailErrors"
                        label="Correo electronico"
                        required
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                        ></v-text-field>
                        <v-radio-group v-model="genero"
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
                        v-model="pais"
                        :items="items"
                        :error-messages="paisErrors"
                        label="Pais"
                        required
                        @change="$v.pais.$touch()"
                        @blur="$v.pais.$touch()"
                        ></v-select>
                        <v-btn
                        color="primary"
                        class="mr-4 black--text mt-4"
                        @click="siguiente"
                        >
                        Continuar
                        </v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <v-text-field
                        v-model="usuario"
                        :error-messages="usuarioErrors"
                        label="Usuario"
                        required
                        @input="$v.usuario.$touch()"
                        @blur="$v.usuario.$touch()"
                        ></v-text-field>
                        <v-text-field
                        v-model="password"
                        :error-messages="passwordErrors"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        label="Contraseña"
                        required
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        @click:append="show1 = !show1"
                        ></v-text-field>
                        <v-text-field
                        v-model="confirmar_password"
                        :error-messages="confirmarErrors"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show2 ? 'text' : 'password'"
                        label="Confirmar Contraseña"
                        required
                        @input="$v.confirmar_password.$touch()"
                        @blur="$v.confirmar_password.$touch()"
                        @click:append="show2 = !show2"
                        ></v-text-field>
                        <v-btn
                        color="primary"
                        class="mr-4 black--text mt-4"
                        @click="registrar"
                        >
                        Registrar
                        </v-btn>
                        <v-btn
                        color="danger"
                        class="mr-4 black--text mt-4"
                        @click="paso=paso-1"
                        >
                        Atras
                        </v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <div class="display-1" align="center">
                            <h3 class="my-2">Tu registro fue satisfactorio</h3>
                            <v-icon size="60px" color="green">mdi-check-circle</v-icon>
                            <p class="base-body body-1 mt-10">Ahora ingresa a tu cuenta y disfruta de toda la funcionalidad que te ofrecemos.</p>
                            <v-btn
                            color="primary" class="black--text" @click="inicio">
                                Iniciar Sesion
                            </v-btn>
                            <p class="base-body body-1 mt-10">Si no sabes que hacer ahora has click <a class="blue--text">Aqui</a></p>
                        </div>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
          </div>
        </v-card>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
    mixins: [validationMixin],

    validations: {
      nombre: { required, maxLength: maxLength(20) },
      apellido: { required, maxLength: maxLength(20) },
      email: { required, email },
      genero: { required },
      pais: { required },
      usuario:{ required },
      password: { required, minLength: minLength(8) },
      confirmar_password: { required, sameAsPassword: sameAs('password') }
    },
    data(){
        return{
            nombre: '',
            apellido: '',
            email: '',
            pais: null,
            items: [],
            genero: '',
            usuario: '',
            password: '',
            confirmar_password: '',
            paso: 1,
            show1: false,
            show2: false,
            is_loading:false
        }
    },
    created(){
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
    },
    computed: {
      usuarioErrors(){
        const errors = []
        if(!this.$v.usuario.$dirty) return errors
        !this.$v.usuario.required && errors.push('El campo obligatorio.')
        return errors
      },
      passwordErrors(){
        const errors = []
        if(!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('La contraseña debe ser minimo de 8 caracteres.')
        !this.$v.password.required && errors.push('El campo obligatorio.')
        return errors
      },
      confirmarErrors(){
        const errors = []
        if(!this.$v.confirmar_password.$dirty) return errors
        !this.$v.confirmar_password.sameAsPassword && errors.push('La contraseña no coincide.')
        !this.$v.confirmar_password.required && errors.push('El campo obligatorio.')
        return errors
      },
      generoErrors(){
        const errors = []
        if(!this.$v.genero.$dirty) return errors
        !this.$v.genero.required && errors.push('Seleccione una opcion')
        return errors
      },
      paisErrors () {
        const errors = []
        if (!this.$v.pais.$dirty) return errors
        !this.$v.pais.required && errors.push('Seleccione un pais')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.nombre.$dirty) return errors
        !this.$v.nombre.maxLength && errors.push('El campo no debe exceder mas da los 20 caracteres.')
        !this.$v.nombre.required && errors.push('El campo obligatorio.')
        return errors
      },
      apellidoErrors() {
        const errors = []
        if (!this.$v.apellido.$dirty) return errors
        !this.$v.apellido.maxLength && errors.push('El campo no debe exceder mas da los 20 caracteres.')
        !this.$v.apellido.required && errors.push('El campo obligatorio.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Ingrese un correo valido')
        !this.$v.email.required && errors.push('El campo obligatorio.')
        return errors
      },
    },
    methods: {
      inicio () {
          this.$emit("inicio")
      },
      siguiente () {
        this.validar_datos_personales()
        if(!this.$v.nombre.$error &&
        !this.$v.apellido.$error &&
        !this.$v.email.$error &&
        !this.$v.genero.$error &&
        !this.$v.pais.$error)
        {
            this.paso=2
        }
      },
      validar_datos_personales ()
      {
          this.$v.nombre.$touch()
          this.$v.apellido.$touch()
          this.$v.email.$touch()
          this.$v.genero.$touch()
          this.$v.pais.$touch()
      },
      registrar () {
          this.validar_datos_usuario()
          if(!this.$v.usuario.$error &&
          !this.$v.password.$error &&
          !this.$v.confirmar_password.$error)
          {
            this.is_loading=true
            const option={
                url: process.env.VUE_APP_URL_SERVER+"/api/registrar",
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data:{
                    nombre:this.nombre,
                    apellido:this.apellido,
                    genero:this.genero,
                    correo_electronico:this.email,
                    pais:this.pais,
                    usuario:this.usuario,
                    contraseña:this.password
                }
            }
            axios(option)
            .then(res=>{
                this.is_loading=false
                this.paso=3
            })
          }
      },
      validar_datos_usuario ()
      {
          this.$v.usuario.$touch()
          this.$v.password.$touch()
          this.$v.confirmar_password.$touch()
      }
    },
}
</script>