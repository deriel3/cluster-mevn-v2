<template>
    <div class="mx-auto" style="width:80%">
        <form class="my-5">
                <v-text-field
                v-model="password_antigua"
                :error-messages="oldpasswordErrors"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Contraseña antigua"
                required
                @input="$v.password_antigua.$touch()"
                @blur="$v.password_antigua.$touch()"
                @click:append="show1 = !show1"
                ></v-text-field>
                <v-text-field
                v-model="password"
                :error-messages="newpasswordErrors"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Nueva contraseña"
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
                color="error"
                @click="actualizar_contrasena"
                >
                    Cambiar contraseña
                </v-btn>
        </form>
    </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, sameAs } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
    mixins: [validationMixin],

    validations: {
      password_antigua: { required },
      password: { required, minLength: minLength(8) },
      confirmar_password: { required, sameAsPassword: sameAs('password') }
    },
    data () {
        return {
            password_antigua: '',
            password: '',
            confirmar_password: '',
            show1: false,
            show2: false
        }
    },
    computed: {
        oldpasswordErrors(){
            const errors = []
            if(!this.$v.password_antigua.$dirty) return errors
            !this.$v.password_antigua.required && errors.push("El campo es obligatorio")
            return errors
        },
        newpasswordErrors(){
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
    },
    methods: {
        reiniciar () {
            this.password_antigua = ''
            this.password = ''
            this.confirmar_password = ''
        },
        actualizar_contrasena () {
            this.$v.$touch()
            if(!this.$v.$error)
            {
                let token = this.$store.state.token
                let id = this.$store.state.user.id
                let option = {
                    url: process.env.VUE_APP_URL_SERVER+"/api/cambio_contrasena",
                    method: 'POST',
                    headers: {
                        'access-token':token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: {
                        id: id,
                        antigua: this.password_antigua,
                        nueva_contraseña: this.password
                    }
                }
                axios(option)
                .then(res => {
                    let data = res.data
                    if(data.cod === '200') {
                        this.$toast.success('Contraseña actualizada')
                    }
                    else {
                        this.$toast.error('No se pudo cambiar la contraseña')
                    }
                    this.reiniciar()
                })
            }
        }
    }
}
</script>