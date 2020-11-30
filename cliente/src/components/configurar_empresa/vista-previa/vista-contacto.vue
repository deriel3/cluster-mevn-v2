<template>
    <v-card
    class="orange lighten-5">
        <v-container class="py-5 px-5">
            <h1 class="text-left title font-weight-bold">Ubicanos: </h1>
            <v-responsive class="white mr-auto mb-3" style="max-width:50px">
                <v-divider class="grey"></v-divider>
            </v-responsive>
            <v-row v-for="item in locaciones" :key="item._id">
                <v-col
                md="4"
                sm="6"
                cols="6"
                >
                    <span class="body-2 font-weight-black">{{item.tipo_sede}}</span>
                </v-col>
                <v-col
                md="8"
                sm="6"
                cols="6"
                >
                    <span class="body-2">{{item.direccion | uppercase}}</span>
                </v-col>
            </v-row>
            <h1 class="text-left title font-weight-bold">Contactanos: </h1>
            <v-responsive class="white mr-auto mb-3" style="max-width:50px">
                <v-divider class="grey"></v-divider>
            </v-responsive>
            <v-row v-for="item in forma_contacto" :key="item+'s'">
                <v-col
                md="4"
                sm="4"
                cols="4"
                >
                    <span class="body-2 font-weight-black">{{item.tipo_dispositivo}}</span>
                </v-col>
                <v-col
                md="5"
                sm="4"
                cols="4"
                >
                    <span class="body-2">{{item.contacto}}</span>
                </v-col>
                <v-col
                md="3"
                sm="4"
                cols="4"
                >
                    <span class="body-2">{{item.persona | uppercase}}</span>
                </v-col>
            </v-row>
            <h1 class="text-left title font-weight-bold">Siguenos: </h1>
            <v-responsive class="white mr-auto mb-3" style="max-width:50px">
                <v-divider class="grey"></v-divider>
            </v-responsive>
            <div align="center">
                <v-btn
                dark
                :href="redes.facebook"
                color="blue"
                target="_blank"
                class="ma-1"
                min-width="40px"
                width="40px"
                depressed
                >
                    <v-icon>mdi-facebook</v-icon>
                </v-btn>
                <v-btn
                dark
                :href="redes.instagram"
                color="pink"
                target="_blank"
                class="ma-1"
                min-width="40px"
                width="40px"
                depressed
                >
                    <v-icon>mdi-instagram</v-icon>
                </v-btn>
                <v-btn
                dark
                target="_blank"
                color="green"
                class="ma-1"
                :href="redes.whats"
                min-width="40px"
                width="40px"
                depressed
                >
                    <v-icon>mdi-whatsapp</v-icon>
                </v-btn>
                <v-btn
                dark
                :href="redes.paginaweb"
                color="black"
                target="_blank"
                class="ma-1"
                min-width="40px"
                width="40px"
                depressed
                >
                    <v-icon>mdi-cloud</v-icon>
                </v-btn>
            </div>
        </v-container>
    </v-card>
</template>
<script>
export default {
    props: {
        forma_contacto: '',
        locaciones: '',
        redes: '' 
    },
    filters: {
        uppercase (valor){
            return valor.toUpperCase()
        }
    }
}
</script>
