<template>
    <v-card :loading="is_loading">
        <v-container>
            <form @keypress.enter="iniciar_sesion">
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
                <div align="center">
                    <v-btn
                    color="primary"
                    class="black--text mr-3"
                    @click="iniciar_sesion">
                        Ingresar
                    </v-btn>
                    <v-btn
                    text
                    class="black--text">
                        Recuperar contraseña
                    </v-btn>
                </div>
            </form>
        </v-container>
    </v-card>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'
import store from '../../store/index'
import { EventBus } from '../../EventBus/EventBus'
export default {
    mixins: [validationMixin],

    validations: {
      usuario:{ required },
      password: { required, minLength: minLength(8) }
    },
    data(){
        return{
            usuario: '',
            password: '',
            show1: false,
            is_loading: false
        }
    },
    computed: {
      usuarioErrors () {
        const errors = []
        if(!this.$v.usuario.$dirty) return errors
        !this.$v.usuario.required && errors.push('El campo obligatorio.')
        return errors
      },
      passwordErrors () {
        const errors = []
        if(!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('La contraseña debe ser minimo de 8 caracteres.')
        !this.$v.password.required && errors.push('El campo obligatorio.')
        return errors
      }
    },
    methods:{
        iniciar_sesion () {
            this.validar()
            if(!this.$v.usuario.$error &&
            !this.$v.password.$error)
            {    
                this.is_loading=true
                const option={
                    url: process.env.VUE_APP_URL_SERVER+"/api/iniciar_sesion",
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data:{
                        usuario: this.usuario,
                        contraseña: this.password
                    }
                }
                axios(option)
                .then(res=>{
                    let data=res.data
                    if(data.cod==200)
                    {
                        store.commit("SET_USER", {usuario: this.usuario, id: data.id})
                        store.commit("SET_TOKEN", data.token)
                        EventBus.$emit('loged', this.usuario);
        
                        this.usuario = ''
                        this.password = ''

                        this.$toast.success("Sesion iniciada");
                        this.$emit("cierre_overlay")
                    }
                    else
                    {
                        this.usuario = ''
                        this.password = ''
                        this.$toast.error("Usuario o contraseña erroneos");
                    }
                    this.is_loading=true
                })
            }
        },
        validar () {
            this.$v.usuario.$touch()
            this.$v.password.$touch()
        }
    }
}
</script>