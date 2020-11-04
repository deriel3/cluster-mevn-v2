<template>
    <v-row>
        <v-col
        v-for="item in lista_empresa"
        :key="item"
        class="d-flex child-flex"
        md="6">
            <v-card width="400">
                <v-img
                height="200px"
                src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
                >
                <v-app-bar
                    flat
                    color="rgba(0, 0, 0, 0)"
                >
                    <v-spacer></v-spacer>
                    <span class="green px-3 white--text">Activo</span>
                    <span class="red px-3 white--text">Inactivo</span>
                </v-app-bar>
                </v-img>
                <v-card-text>
                    <div class="font-weight-bold ml-8 mb-2 black--text text-center">
                        <span>20124545486</span>
                        <h1>Pieles real S.A.C.</h1>
                    </div>
                    <v-row >
                        <v-col
                        class="text-center "
                        md="6">
                            <v-btn 
                            x-large>
                                <span>Configurar </span> 
                                <v-icon>mdi-cog</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col
                        class="text-center"
                        md="6">
                            <v-btn 
                            x-large>
                                <span>Vista Previa </span> 
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: {
        lista_empresa: ''
    }
}
</script>