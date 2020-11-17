<template>
    <v-card>
        <v-card-title><h1>Registro de producto</h1></v-card-title>
        <v-card-text>
            <v-text-field
            v-model="codigo"
            :error-messages="codigoErrors"
            @focusout="verificar_codigo"
            label="Codigo de producto"
            required
            @input="$v.codigo.$touch()"
            @blur="$v.codigo.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="marca"
            :error-messages="marcaErrors"
            label="Marca"
            required
            @input="$v.marca.$touch()"
            @blur="$v.marca.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="nombre"
            :error-messages="nombreErrors"
            label="Nombre del producto"
            required
            @input="$v.nombre.$touch()"
            @blur="$v.nombre.$touch()"
            ></v-text-field>
            <v-textarea
            v-model="descripcion"
            :error-messages="descripcionErrors"
            label="Descripcion del producto"
            required
            @input="$v.descripcion.$touch()"
            @blur="$v.descripcion.$touch()"
            ></v-textarea>
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
                <v-file-input
                v-model="imagen_portada"
                :error-messages="imagenErrors"
                @input="$v.imagen_portada.$touch()"
                @blur="$v.imagen_portada.$touch()"
                accept="image/x-png"
                label="Foto del producto (PNG)"
                ></v-file-input>
                <v-btn
                color="primary"
                class="black--text mt-5"
                @click="guardar">
                    Guardar Producto
                </v-btn>
        </v-card-text>
    </v-card>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'
import { EventBus } from '../../EventBus/EventBus'
export default {
    mixins: [validationMixin],

    validations: {
        codigo: {required},
        marca: {required},
        nombre: {required},
        descripcion: {required},
        categoria: {required},
        imagen_portada: {required}
    },
    data () {
        return {
            codigo: '',
            marca: '',
            nombre: '',
            descripcion: '',
            categoria: '',
            imagen_portada: {}
        }
    },
    computed: {
        codigoErrors () {
            const errors = []
            !this.$v.codigo.required && errors.push("Ingrese un codigo.")
            return errors
        },
        marcaErrors () {
            const errors = []
            !this.$v.marca.required && errors.push("Ingrese una marca.")
            return errors
        },
        nombreErrors () {
            const errors = []
            !this.$v.nombre.required && errors.push("Ingrese un nombre.")
            return errors
        },
        descripcionErrors () {
            const errors = []
            !this.$v.descripcion.required && errors.push("Ingrese una descripcion.")
            return errors
        },
        categoriaErrors () {
            const errors = []
            !this.$v.categoria.required && errors.push("Seleccione una categoria.")
            return errors
        },
        imagenErrors () {
            const errors = []
            !this.$v.imagen_portada.required && errors.push("Ingrese una imagen.")
            return errors
        }
    },
    methods: {
        vaciar () {
            this.codigo = ''
            this.marca = ''
            this.nombre = ''
            this.descripcion = ''
            this.categoria = ''
            this.imagen_portada = {}
        },
        verificar_codigo()
        {
            let token = this.$store.state.token
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            let option= {
                url: process.env.VUE_APP_URL_SERVER+"/api/vercodigo",
                method: 'POST',
                headers: {
                    'access-token':this.$store.state.token,
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                data: {
                    ruc: ruc,
                    codigo: this.codigo,
                    id: id
                }
            }
            axios(option)
            .then(res => {
                let data = res.data
                if(data.cod=="500")
				{
					this.$toast.error("Codigo ya registrado");
                    this.codigo=""
				}
				if(data.cod=="200")
				{
					this.$toast.success("Codigo correcto");
                }
                if(data.cod=="403")
                {
                    EventBus.$emit('force_logout',1);
                }
            })
        },
        verificar () {
            this.$v.codigo.$touch()
            this.$v.marca.$touch()
            this.$v.nombre.$touch()
            this.$v.descripcion.$touch()
            this.$v.categoria.$touch()
            this.$v.imagen_portada.$touch()
        },
        guardar () {
            this.verificar()
            if ( !this.$v.codigo.$error &&
            !this.$v.marca.$error &&
            !this.$v.nombre.$error &&
            !this.$v.descripcion.$error &&
            !this.$v.categoria.$error &&
            !this.$v.imagen_portada.$error)
            {
                let segundos = new Date().getTime()
                let id = this.$store.state.user.id
                let token = this.$store.state.token
                let ruc = this.$route.params.ruc
                let parameter = new FormData()
                parameter.append('id',id)
                parameter.append('codigo',this.codigo)
                parameter.append('marca',this.marca)
                parameter.append('nombre',this.nombre)
                parameter.append('descripcion',this.descripcion)
                parameter.append('categoria',this.categoria)
                parameter.append('ruc', ruc)
                parameter.append('segundo',segundos)
                parameter.append('image', this.imagen_portada)
                const option = {
                    url: process.env.VUE_APP_URL_SERVER+"/api/nuevo_producto/"+id,
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
                        case "200":this.$toast.success("Producto registrado")
                        let producto = {
                            nombre: this.nombre,
                            codigo: this.codigo,
                            imagen_portada: segundos+"-p-"+this.codigo+".png",
                            estado: 0
                        }
                        this.$emit("agregar-producto",producto)
                        this.vaciar()
                        break;
                        case "201":this.$toast.error("Error al registrar")
                        this.vaciar()
                        break;
                        case "403": EventBus.$emit("force_logout",1)
                    }
                })
            }
        }
    }
}
</script>