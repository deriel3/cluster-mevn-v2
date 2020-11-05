<template>
        <v-card>
            <v-img
            max-height="500"
            class="align-end justify-end"
            :src="imagen()">
                <v-card-title class="white--text justify-center ">
                    <v-img
                    max-width="200px"
                    class="rounded-circle"
                    src="../../assets/empresas/5fa042a12a7aaf41507d48ec/10726678794.png">
                    </v-img>
                </v-card-title>
            </v-img>
        </v-card>
</template>
<script>
export default {
    methods:{
        imagen (){
            let imagen = require("../../assets/Foto/hero-image1.png")
            return imagen
        }
    }
}
</script>