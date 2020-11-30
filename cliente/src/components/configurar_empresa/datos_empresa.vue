<template>
    <v-container class="d-flex">
        <div class="px-3 py-5" align="center" style="width:100%">
            <v-card justify="space-around"  class="">
                <v-card-text>
                    <v-row>
                        <v-col
                        md="6"
                        s="12">
                            <v-text-field
                            v-model="data_ruc"
                            label="Ruc"
                            disabled
                            ></v-text-field>
                        </v-col>
                        <v-col
                        md="6"
                        s="12">
                            <v-text-field
                            v-model="data_razon_social"
                            :error-messages="razonsocialErrors"
                            :counter="250"
                            label="Razon Social"
                            required
                            @input="$v.data_razon_social.$touch()"
                            @blur="$v.data_razon_social.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-text-field
                    :counter="250"
                    v-model="data_nombre_comercial"
                    :error-messages="nombrecomercialErrors"
                    label="Nombre comercial"
                    required
                    @input="$v.data_nombre_comercial.$touch()"
                    @blur="$v.data_nombre_comercial.$touch()"
                    ></v-text-field>
                    <v-textarea
                    :counter="500"
                    v-model="data_descripcion"
                    :error-messages="descripcionErrors"
                    label="Descripcion de la empresa"
                    required
                    @input="$v.data_descripcion.$touch()"
                    @blur="$v.data_descripcion.$touch()"
                    ></v-textarea>
                    <h3 class="black--text">Categoria</h3>
                    <v-row>
                        <v-col
                        md="3">
                            <v-checkbox
                            class="d-inline"
                            v-model="data_categoria"
                            :error-messages="categoriaErrors"
                            @input="$v.data_categoria.$touch()"
                            @blur="$v.data_categoria.$touch()"
                            label="Calzado"
                            value="Calzado"
                            ></v-checkbox>
                        </v-col>
                        <v-col
                        md="3">
                            <v-checkbox
                            class="d-inline"
                            v-model="data_categoria"
                            :error-messages="categoriaErrors"
                            @input="$v.data_categoria.$touch()"
                            @blur="$v.data_categoria.$touch()"
                            label="Materia Prima"
                            value="Materia Prima"
                            ></v-checkbox>
                        </v-col>
                        <v-col
                        md="3">
                            <v-checkbox
                            class="d-inline"
                            v-model="data_categoria"
                            :error-messages="categoriaErrors"
                            @input="$v.data_categoria.$touch()"
                            @blur="$v.data_categoria.$touch()"
                            label="Insumo"
                            value="Insumo"
                            ></v-checkbox>
                        </v-col>
                        <v-col
                        md="3">
                            <v-checkbox
                            class="d-inline"
                            v-model="data_categoria"
                            :error-messages="categoriaErrors"
                            @input="$v.data_categoria.$touch()"
                            @blur="$v.data_categoria.$touch()"
                            label="Suministro"
                            value="Suministro"
                            ></v-checkbox>
                        </v-col>
                    </v-row>
                    <v-btn
                    color="primary" class="black--text" @click="guardar_datos">
                        Guardar Cambio
                    </v-btn>
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'
import { EventBus } from '../../EventBus/EventBus'
export default {
    props: {
        ruc: '',
        razon_social: '',
        nombre_comercial: '',
        categoria: '',
        descripcion: ''    
    },
    mixins: [validationMixin],

    validations: {
      data_razon_social: { required, maxLength: maxLength(250) },
      data_nombre_comercial: { required, maxLength: maxLength(250)},
      data_categoria: {required},
      data_descripcion: {required, maxLength: maxLength(500)}
    },
    data () {
        return {
            data_ruc: this.ruc,
            data_razon_social: this.razon_social,
            data_nombre_comercial: this.nombre_comercial,
            data_categoria: this.categoria,
            data_descripcion: this.descripcion
        }
    },
    
    computed: {
        descripcionErrors () {
            const errors = []
            if (!this.$v.data_descripcion.$dirty) return errors
            !this.$v.data_descripcion.maxLength && errors.push('El campo no debe exceder mas da los 500 caracteres.')
            !this.$v.data_descripcion.required && errors.push('El campo obligatorio.')
            return errors
        },
        razonsocialErrors () {
            const errors = []
            if (!this.$v.data_razon_social.$dirty) return errors
            !this.$v.data_razon_social.maxLength && errors.push('El campo no debe exceder mas da los 250 caracteres.')
            !this.$v.data_razon_social.required && errors.push('El campo obligatorio.')
            return errors
        },
        nombrecomercialErrors () {
            const errors = []
            if (!this.$v.data_nombre_comercial.$dirty) return errors
            !this.$v.data_nombre_comercial.maxLength && errors.push('El campo no debe exceder mas da los 20 caracteres.')
            !this.$v.data_nombre_comercial.required && errors.push('El campo obligatorio.')
            return errors
        },
        categoriaErrors(){
            const errors = []
            !this.$v.data_categoria.required && errors.push("Seleccione por lo menos una opcion")
            return errors
        },
    },
    methods: {
        validar () {
            this.$v.data_razon_social.$touch()
            this.$v.data_nombre_comercial.$touch()
            this.$v.data_categoria.$touch()
            this.$v.data_descripcion.$touch()
        },
        guardar_datos () {
            this.validar ()
            if( !this.$v.data_razon_social.$error &&
                !this.$v.data_nombre_comercial.$error &&
                !this.$v.data_categoria.$error &&
                !this.$v.data_descripcion.$error
            )
            {
                let id = this.$store.state.user.id
                let token = this.$store.state.token
                let option = {
                    url: process.env.VUE_APP_URL_SERVER+"/api/act_datos",
                    method: 'POST',
                    headers: {
                        'access-token':token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: {
                        id: id,
                        ruc: this.data_ruc,
                        razon_social: this.data_razon_social,
                        nombre_comercial: this.data_nombre_comercial,
                        descripcion: this.data_descripcion,
                        categorias: this.data_categoria
                    }
                }
                axios(option)
                .then(res => {
                    let data = res.data
                    switch (data.cod)
                    {
                        case "200": this.$toast.success("Campos actualizados")
                        break;
                        case "403": EventBus.$emit("force_logout")
                    }
                })
            }
        }
    }
}
</script>