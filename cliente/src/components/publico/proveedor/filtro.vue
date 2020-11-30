<template>
    <v-card elevation="3" class="grey lighten-3">
        <h1 class="text-center title py-5">Filtrar empresas</h1>
        <div class="px-3">
            <h4 class="subtitle-1 mb-2">Razon Social:</h4>
            <v-text-field
            :disabled=" tipo_filtro === 2 "
            v-model="filtro_razon_social"
            solo
            @keyup="filtrar_razon_social"
            ></v-text-field>
        </div>
        <v-divider class="mx-3 mb-3"></v-divider>
        <div class="px-3">
            <h4 class="subtitle-1 mb-2">Categoria:</h4>
            <v-select
            :disabled=" tipo_filtro === 1 "
            v-model="filtro_categoria"
            :items="item"
            solo
            @change="filtrar_categoria"
            >
            </v-select>
        </div>
        <div class="px-3">
            <div>
                <v-slider
                :disabled=" tipo_filtro === 1 "
                v-model="min"
                label="Precio Minimo"
                thumb-color="red"
                thumb-label="always"
                max="9999"
                min="0"
                @change="filtrar_categoria"
                @click="validar_cambio()"
                ></v-slider>
                <v-slider
                :disabled=" tipo_filtro === 1 "
                v-model="max"
                label="Precio Maximo"
                thumb-color="blue"
                thumb-label="always"
                max="9999"
                min="0"
                @change="filtrar_categoria"
                @click="validar_cambio()"
                ></v-slider>
            </div>
            <div class="pb-3">
                <small > Producto entre S/.{{min}} y S/.{{max}}</small>
            </div>
        </div>
        <div class="px-3" align="center">
            <v-btn class="error mb-3" @click="reiniciar_filtro">Reiniciar Filtros</v-btn>
        </div>
    </v-card>
</template>
<script>
export default {
    data () {
        return {
            tipo_filtro: 0,
            item: ["Calzado", "Materia Prima", "Insumo", "Suministro"],
            filtro_razon_social: '',
            filtro_categoria: '',
            min: 0,
            max: 9999
        }
    },
    methods: {
        validar_cambio ()
        {
            if (this.min > this.max)
            {
                this.$toast.error("El precio minimo no puede ser mayor al precio maximo")
                this.min = 0
                this.max = 9999
            }
        },
        prefiltro (tipo) {
            if (tipo === '1') {
                this.filtro_categoria = ''
                this.filtro_producto = ''
                this.filtro_calzado = ''
                this.filtro_material = ''
                this.filtro_genero = ''
                this.min = ''
                this.max = 9999
                this.tipo_filtro = 1
            }
            else {
                this.filtro_razon_social = ''
                this.tipo_filtro = 2
            }
        },
        filtrar_razon_social () {
            if (this.filtro_razon_social !== '') {
                this.prefiltro('1')
                this.$emit('filtro_evento','1',this.filtro_razon_social)
            }
            else {
                this.tipo_filtro = 0
                this.$emit('filtro_evento','0','')
            }
        },
        filtrar_categoria () {
            this.prefiltro("2")
            let filtro = {
                categoria: this.filtro_categoria,
                min: this.min,
                max: this.max
            }
            this.$emit('filtro_evento','2',filtro)
        },
        reiniciar_filtro() {
            this.filtro_categoria = ''
            this.min = ''
            this.max = 9999
            this.filtro_razon_social = ''
            this.tipo_filtro = 0
            this.$emit('filtro_evento','0','')
        }
    }
}
</script>