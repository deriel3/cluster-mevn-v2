<template>
  <v-row>
    <v-col
      v-for="(n,index) in lista_empresas"
      :key="n._id"
      cols="12"
      md="3"
      sm="12"
    >
      <v-card class="pa-1" elevation="4" @click="empresa_seleccionada(index)">
        <v-img
        :src="imagen(index)"
        :lazy-src="lazy_imagen(index)"
        aspect-ratio="1"
        class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <div align="center" class="py-1">
        <v-rating
          readonly
          :empty-icon="$mdiStarOutline"
          :full-icon="$mdiStar"
          :half-icon="$mdiStarHalfFull"
          hover
          color="primary"
          length="5"
          size="30"
          :value="calificacion(n.cantidad_favoritos)"
        ></v-rating>
        </div>
        <div align="center" class="py-3">
          <img v-for="item in n.categorias" :key="index+item" :src="categoria(item)" :title="item" style="max-width:20px;" class="d-inline mr-5" alt="">
        </div>
      </v-card>
      <p class="subtitle-2 text-center font-weight-bold mt-2">{{n.razon_social | uppercase}}</p>
    </v-col>
  </v-row>

</template>
<script>
export default {
  props: {
    lista_empresas: ''
  },
  data () {
    return {
    }
  },
  methods: {
    calificacion (cantidad) {
      const max = 5000
      return (5*cantidad)/max
    },
    imagen (index) {
      if (this.lista_empresas[index].url_logo !== ''){
        let id = this.$store.state.user.id
        return process.env.VUE_APP_URL_SERVER+"/api/imagen/logo?id="+id+"&imagen="+this.lista_empresas[index].url_logo
      }
    },
    lazy_imagen (index) {
      if (this.lista_empresas[index].url_logo !== ''){
        let id = this.$store.state.user.id
        return process.env.VUE_APP_URL_SERVER+"/api/imagen/logo?id="+id+"&imagen="+this.lista_empresas[index].url_logo+"&width=10&height=10"
      }
    },
    categoria (orden) {
      switch (orden) {
          case 'Calzado': return process.env.VUE_APP_URL_SERVER+"/assets/iconos/categoria/calzado.png"
          break
          case 'Materia Prima': return process.env.VUE_APP_URL_SERVER+"/assets/iconos/categoria/cuero.png"
          break
          case 'Insumo': return process.env.VUE_APP_URL_SERVER+"/assets/iconos/categoria/insumo.png"
          break
          case 'Suministro': return process.env.VUE_APP_URL_SERVER+"/assets/iconos/categoria/suministro.png"
      }
    },
    empresa_seleccionada (index) {
      //enviar a vista de empresa
    }
  },
  filters: {
    uppercase (valor){
      if (valor !== '')
      {
        return valor.toUpperCase()
      }
    }
  }
}
</script>