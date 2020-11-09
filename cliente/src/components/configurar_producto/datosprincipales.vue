<template>
    <v-container class="d-flex">
        <div class="px-5 py-5" align="center" style="width:100%">
            <v-card justify="space-around" width="50%" class="mx-5">
                <v-card-text>
                    <v-text-field
                    v-model="data_marca"
                    :error-messages="marcaErrors"
                    label="Marca"
                    required
                    @input="$v.data_marca.$touch()"
                    @blur="$v.data_marca.$touch()"
                    ></v-text-field>
                    <v-text-field
                    v-model="data_nombre"
                    :error-messages="nombreErrors"
                    label="Nombre del producto"
                    required
                    @input="$v.data_nombre.$touch()"
                    @blur="$v.data_nombre.$touch()"
                    ></v-text-field>
                    <v-textarea
                    v-model="data_descripcion"
                    :error-messages="descripcionErrors"
                    label="Descripcion del producto"
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
                    <v-row>
                        <v-col
                        md="6" 
                        sm="12" 
                        cols="12">
                            <v-select
                            v-model="data_tipo_producto"
                            :items="items_tipoproducto"
                            label="Tipo de producto"
                            required
                            ></v-select>
                        </v-col>
                        <v-col
                        md="6" 
                        sm="12" 
                        cols="12">
                            <v-select
                            v-model="data_tipo_calzado"
                            :items="items_tipocalzado"
                            label="Familia del producto"
                            required
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col
                        md="6" 
                        sm="12" 
                        cols="12">
                            <v-select
                            v-model="data_genero"
                            :items="items_tipoproducto"
                            label="Genero"
                            required
                            ></v-select>
                        </v-col>
                        <v-col
                        md="6" 
                        sm="12" 
                        cols="12">
                            <v-select
                            v-model="data_material"
                            :items="items_tipocalzado"
                            label="Material"
                            required
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-btn
                    color="primary" class="black--text" >
                        Guardar Cambio
                    </v-btn>
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
import { EventBus } from '../../EventBus/EventBus'
import dataJson from '../../../../server/src/models/archivos/lineas.json'
export default {
    props: {
        nombre: '',
        descripcion: '',
        marca: '',
        categoria: '',
        tipo_producto: '',
        tipo_calzado: '',
        material: '',
        genero: '',    
    },
    mixins: [validationMixin],

    validations: {
        data_nombre: {required},
        data_descripcion: {required},
        data_marca: {required},
        data_categoria: {required},
        data_tipo_producto: {required},
        data_tipo_calzado: {required},
        data_material: {required},
        data_genero: {required}
    },
    data () {
        return {
            data_nombre: this.nombre,
            data_descripcion: this.data_descripcion,
            data_marca: this.data_marca,
            data_categoria: this.data_categoria,
            data_tipo_producto: this.data_tipo_producto,
            data_tipo_calzado: this.data_tipo_calzado,
            data_material: this.data_material,
            data_genero: this.data_genero,
            items_tipoproducto: [],
            items_tipocalzado: []
        }
    },
    
    computed: {
        nombreErrors () {
            const errors = []
            if (!this.$v.data_nombre.$dirty) return errors
            !this.$v.data_nombre.required && errors.push('Ingrese un nombre correcto.')
            return errors
        },
        descripcionErrors () {
            const errors = []
            if (!this.$v.data_descripcion.$dirty) return errors
            !this.$v.data_descripcion.required && errors.push('Ingrese una descripcion correcta.')
            return errors
        },
        marcaErrors () {
            const errors = []
            if (!this.$v.data_marca.$dirty) return errors
            !this.$v.data_marca.required && errors.push('Ingrese una marca correcta.')
            return errors
        },
        categoriaErrors(){
            const errors = []
            !this.$v.data_categoria.required && errors.push("Seleccione una opcion")
            return errors
        },
        tipo_productoErrors () {
            const errors = []
            if (!this.$v.data_tipo_producto.$dirty) return errors
            !this.$v.data_tipo_producto.required && errors.push('Seleccione una opcion.')
            return errors
        },
        tipo_calzadoErrors () {
            const errors = []
            if (!this.$v.data_tipo_calzado.$dirty) return errors
            !this.$v.data_tipo_calzado.required && errors.push('Seleccione una opcion.')
            return errors
        },
        materialErrors () {
            const errors = []
            if (!this.$v.data_material.$dirty) return errors
            !this.$v.data_material.required && errors.push('Seleccione una opcion.')
            return errors
        },
        generoErrors(){
            const errors = []
            !this.$v.data_genero.required && errors.push("Seleccione una opcion")
            return errors
        }
    },
    methods: {
    }
}
</script>