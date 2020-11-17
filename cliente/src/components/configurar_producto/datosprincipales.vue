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
                            @change="actualizar_select"
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
                            @change="actualizar_select"
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
                            @change="actualizar_select"
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
                            @change="actualizar_select"
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
                            :error-messages="tipo_productoErrors"
                            @input="$v.data_tipo_producto.$touch()"
                            @blur="$v.data_tipo_producto.$touch()"
                            ></v-select>
                        </v-col>
                        <v-col
                        md="6" 
                        sm="12" 
                        cols="12">
                            <v-select v-if="!disabled_tipocalzado"
                            v-model="data_tipo_calzado"
                            :items="items_tipocalzado"
                            label="Familia del producto"
                            required
                            :error-messages="tipo_calzadoErrors"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col
                        md="6" 
                        sm="12" 
                        cols="12">
                            <v-select
                            v-if="!disabled_genero"
                            v-model="data_genero"
                            :items="items_genero"
                            label="Genero"
                            required
                            :error-messages="generoErrors"
                            ></v-select>
                        </v-col>
                        <v-col
                        md="6" 
                        sm="12" 
                        cols="12">
                            <v-select
                            v-if="!disabled_material"
                            v-model="data_material"
                            :items="items_material"
                            label="Material"
                            required
                            :error-messages="materialErrors"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-btn
                    color="primary" class="black--text" @click="actualizar_datos" >
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
        producto_id: '',
        nombre: '',
        descripcion: '',
        marca: '',
        categoria: '',
        tipo_producto: '',
        tipo_calzado: '',
        material: '',
        genero: ''    
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
            data_descripcion: this.descripcion,
            data_marca: this.marca,
            data_categoria: this.categoria,
            data_tipo_producto: this.tipo_producto,
            data_tipo_calzado: this.tipo_calzado,
            data_material: this.material,
            data_genero: this.genero,
            items_tipocalzado: [],
            items_tipoproducto: [],
            items_genero: [],
            items_material: [],
            disabled_tipocalzado: false,
            disabled_genero: false,
            disabled_material: false
        }
    },
    created () {
        this.cargar_datos()
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
            if (!this.$v.data_genero.$dirty) return errors
            !this.$v.data_genero.required && errors.push('Seleccione una opcion.')
            return errors
        }
    },
    methods: {
        cargar_datos () {
            switch(this.data_categoria)
            {
                case 'Calzado':
                this.items_tipoproducto = dataJson[0].calzado[0].linea_calzado
                this.items_tipocalzado = dataJson[0].calzado[0].tipo_calzado
                this.items_genero = ["Hombre", "Mujer", "Unisex"]
                this.items_material = ["Cuero", "Sintetico", "Textil", "Otro"]
                this.disabled_tipocalzado = false
                this.disabled_genero = false
                this.disabled_material = false
                break;
                case 'Materia Prima':
                this.items_tipoproducto = dataJson[0].materia_prima[0].acabado_cuero
                this.items_tipocalzado = dataJson[0].materia_prima[0].tipo_cuero
                this.items_material = ["Cuero", "Sintetico", "Textil", "Otro"]
                this.disabled_tipocalzado = false
                this.disabled_material = false
                this.disabled_genero = true
                break;
                case 'Insumo':
                this.items_tipoproducto = dataJson[0].insumo[0].tipo_insumo
                this.items_material = ["Cuero", "Sintetico", "Textil", "Otro"]
                this.disabled_material = false
                this.disabled_genero = true
                this.disabled_tipocalzado = true
                
                break;
                case 'Suministro':
                this.items_tipoproducto = dataJson[0].suministro[0].tipo_suministro
                this.disabled_tipocalzado = true
                this.disabled_genero = true
                this.disabled_material = true
                break
            }
        },
        actualizar_select () {
            switch(this.data_categoria)
            {
                case 'Calzado':
                this.items_tipoproducto = dataJson[0].calzado[0].linea_calzado
                this.items_tipocalzado = dataJson[0].calzado[0].tipo_calzado
                this.items_genero = ["Hombre", "Mujer", "Unisex"]
                this.items_material = ["Cuero", "Sintetico", "Textil", "Otro"]
                this.disabled_tipocalzado = false
                this.disabled_genero = false
                this.disabled_material = false
                this.data_tipo_producto = ""
                this.data_tipo_calzado = ""
                this.data_genero = ""
                this.data_material = ""
                break;
                case 'Materia Prima':
                this.items_tipoproducto = dataJson[0].materia_prima[0].acabado_cuero
                this.items_tipocalzado = dataJson[0].materia_prima[0].tipo_cuero
                this.items_material = ["Cuero", "Sintetico", "Textil", "Otro"]
                this.disabled_tipocalzado = false
                this.disabled_material = false
                this.disabled_genero = true
                this.data_tipo_producto = ""
                this.data_tipo_calzado = ""
                this.data_genero = "default"
                this.data_material = ""
                break;
                case 'Insumo':
                this.items_tipoproducto = dataJson[0].insumo[0].tipo_insumo
                this.items_material = ["Cuero", "Sintetico", "Textil", "Otro"]
                this.disabled_material = false
                this.disabled_genero = true
                this.disabled_tipocalzado = true
                this.data_tipo_producto = ""
                this.data_tipo_calzado = "default"
                this.data_genero = "default"
                this.data_material = ""
                break;
                case 'Suministro':
                this.items_tipoproducto = dataJson[0].suministro[0].tipo_suministro
                this.disabled_tipocalzado = true
                this.disabled_genero = true
                this.disabled_material = true
                this.data_tipo_producto = ""
                this.data_tipo_calzado = "default"
                this.data_genero = "default"
                this.data_material = "default"
                break
            }
        },
        validar_formulario () {
            this.$v.data_marca.$touch()
            this.$v.data_nombre.$touch()
            this.$v.data_descripcion.$touch()
            this.$v.data_categoria.$touch()
            this.$v.data_tipo_producto.$touch()
            this.$v.data_tipo_calzado.$touch()
            this.$v.data_genero.$touch()
            this.$v.data_material.$touch()
            return (!this.$v.data_marca.$error &&
            !this.$v.data_nombre.$error &&
            !this.$v.data_descripcion.$error &&
            !this.$v.data_categoria.$error &&
            !this.$v.data_tipo_producto.$error &&
            !this.$v.data_tipo_calzado.$error &&
            !this.$v.data_genero.$error &&
            !this.$v.data_material.$error )
        },
        actualizar_datos () {
            if (this.validar_formulario()) {
                let id = this.$store.state.user.id
                let ruc = this.$route.params.ruc

                let token = this.$store.state.token
                let option = {
                    url: process.env.VUE_APP_URL_SERVER+"/api/act_cabproducto",
                    method: 'POST',
                    headers: {
                        'access-token':token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: {
                        id: id,
                        ruc: ruc,
                        producto_id: this.producto_id,
                        nombre: this.data_nombre,
                        descripcion: this.data_descripcion,
                        marca: this.data_marca,
                        categoria: this.data_categoria,
                        tipo_producto: this.data_tipo_producto,
                        tipo_calzado: this.data_tipo_calzado,
                        material: this.data_material,
                        genero: this.data_genero
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