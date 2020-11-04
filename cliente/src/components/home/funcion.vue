<template>
    <v-container id="funciona">
        <div class="display-1 container" align="center">
            <h1 class="mt-5 mb-5">¿Como Funciona?</h1>
            <v-divider width="10%" style="max-height:10px;height:10px" class="primary"></v-divider>
        </div>
        
        <br>  
        <v-carousel 
            class="mx-auto"
            style="width:50%;"
        >
            <v-carousel-item >
                <v-sheet
                    class="pt-10"
                    align="middle"
                    justify="middle"
                    fill-height fluid
                    color="grey lighten-2"
                    height="100%"
                    tile
                >
                  <v-img 
                  width="15%"
                  lazy-src="../../assets/Foto/pasos/lazy-registro.svg"
                  src="../../assets/Foto/pasos/registro.svg">
                  
                  </v-img>
                  <v-container class="mt-3">
                    <div class="display-2">
                      <p class="black--text">Realice el registro de su empresa y sus productos</p>
                    </div>
                    <div class="display-5">
                      <p class="black--text">Ingrese toda la informacion requerida de su empresa y sus productos en los formularios de registro.</p>
                    </div>
                  </v-container>
                </v-sheet>
            </v-carousel-item>
            <v-carousel-item>
              <v-sheet
                    class="pt-10"
                    align="middle"
                    justify="middle"
                    fill-height fluid
                    color="grey lighten-2"
                    height="100%"
                    tile
                >
                  <v-img 
                  width="15%"
                  lazy-src="../../assets/Foto/pasos/lazy-filtro.svg"
                  src="../../assets/Foto/pasos/filtro.svg">
                  </v-img>
                  <v-container class="mt-3">
                    <div class="display-2">
                      <p class="black--text">Llene los filtros requeridos para su busqueda</p>
                    </div>
                    <div class="display-5">
                      <p class="black--text">Ingrese todos los filtros deseados para mejorar su busqueda.</p>
                    </div>
                  </v-container>
                </v-sheet>
            </v-carousel-item>
            <v-carousel-item>
              <v-sheet
                    class="pt-10"
                    align="middle"
                    justify="middle"
                    fill-height fluid
                    color="grey lighten-2"
                    height="100%"
                    tile
                >
                  <v-img 
                  width="15%"
                  lazy-src="../../assets/Foto/pasos/lazy-lupa.svg"
                  src="../../assets/Foto/pasos/lupa.svg">
                  </v-img>
                  <v-container class="mt-3">
                    <div class="display-2">
                      <p class="black--text">Seleccione el resultado deseado de su busqueda</p>
                    </div>
                    <div class="display-5">
                      <p class="black--text">Posterior a la busqueda seleccione el resultado que mas le interese.</p>
                    </div>
                  </v-container>
                </v-sheet>
            </v-carousel-item>
            <v-carousel-item>
              <v-sheet
                    class="pt-10"
                    align="middle"
                    justify="middle"
                    fill-height fluid
                    color="grey lighten-2"
                    height="100%"
                    tile
                >
                  <v-img 
                  width="15%"
                  lazy-src="../../assets/Foto/pasos/lazy-contacto.svg"
                  src="../../assets/Foto/pasos/contacto.svg">
                  </v-img>
                  <v-container class="mt-3">
                    <div class="display-2">
                      <p class="black--text">Contacte con la empresa</p>
                    </div>
                    <div class="display-5">
                      <p class="black--text">Ingrese al perfil de la empresa y podra observar los datos de contacto.</p>
                    </div>
                  </v-container>
                </v-sheet>
            </v-carousel-item>
            <v-carousel-item>
              <v-sheet
                    class="pt-10"
                    align="middle"
                    justify="middle"
                    fill-height fluid
                    color="grey lighten-2"
                    height="100%"
                    tile
                >
                  <v-img 
                  width="15%"
                  lazy-src="../../assets/Foto/pasos/lazy-valorar.svg"
                  src="../../assets/Foto/pasos/valorar.svg">
                  </v-img>
                  <v-container class="mt-3">
                    <div class="display-2">
                      <p class="black--text">Valore la atencion de su vendedor</p>
                    </div>
                    <div class="display-5">
                      <p class="black--text">Ingrese al perfil de la empresa y valore la atencion recibida</p>
                    </div>
                  </v-container>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
    </v-container>
</template>