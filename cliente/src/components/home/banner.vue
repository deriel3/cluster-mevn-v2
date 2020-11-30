<template>
  <v-parallax 
    height="650"
    :src=url
  >
    <v-responsive>
      <v-container fill-height class="py-12" style="width:100%">
        <v-responsive class="d-flex align-center justify-center" style="height:100%; width:100%">
          <v-row align="center">
            <v-col md="5" cols="12" class="px-10 py-10" style="background-color:rgba(191,191,191,0.6)">
              <div class="display-2 mb-4">
                <h3 class="black--text font-weight-black font-weight-bold">CLUSTER DIGITAL DE CALZADO</h3>
              </div>
              <h3 class="black--text">Calzados, Materias Primas, Insumos y Suministros</h3>
              <p class="base-body black--text  text-left mb-10">
                Conecte con las mejores empresas del pais dedicadas al sector productivo de calzado y conexos. 
              </p>
              <v-btn class="accent mr-3 mt-1"
                  title
                  to="/proveedor"
              >
                  <span>Proveedor</span>
              </v-btn>
              <v-btn class="secondary mt-1"
                  title
                  to="/comprador"
              >
                  <span>Comprador</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-responsive>
      </v-container>
    </v-responsive>
  </v-parallax>
</template>
<script>
export default {
  data () {
    return {
      lista_banner: [
        {
          src:require("../../assets/Foto/hero-image1.png"),
          lazy: require('../../assets/Foto/lazy-hero-image1.png')
        },
        {
          src:require("../../assets/Foto/hero-image2.png"),
          lazy: require('../../assets/Foto/lazy-hero-image1.png')
        },
        {
          src:require("../../assets/Foto/hero-image3.png"),
          lazy: require('../../assets/Foto/lazy-hero-image1.png')
        },
        {
          src:require("../../assets/Foto/hero-image4.png"),
          lazy: require('../../assets/Foto/lazy-hero-image1.png')
        }
      ],
      url: ""
    }
  },
  created(){
    this.url=this.lista_banner[Math.floor(Math.random()*3)+1].src
  }
}
</script>