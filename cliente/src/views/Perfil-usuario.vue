<template>
    <div>
        <v-tabs centered color="primary" height="100px" class=""
        style="position:fixed; z-index:1"
        v-model="tab">
            <v-tab :to="{name:'bienvenida-persona'}">Bienvenida</v-tab>
            <v-tab :to="{name:'perfil-datos'}">Mi Cuenta</v-tab>
        </v-tabs>
        <v-container>
            <v-row class="mt-16">
                <v-col md="8" class="mt-8">
                    <v-card>
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </v-card>
                </v-col>
                <v-col md="4" class="mt-8">
                    <v-hover v-slot:default="{hover}">
                        <v-card
                        rounded
                        hover
                        outlined
                        class="mb-3"
                        :elevation="hover ? 10:2"
                        :class="{'on-hover':hover}"
                        to="indicadores">
                            <v-img src="../assets/Foto/perfil-persona/fondo-indicador.png"
                            height="200px"
                            lazy-src="../assets/Foto/categorias/lazy-calzado-banner.png"
                            class="grey lighten-2 align-center text-center"
                            style="cursor:pointer"
                            >
                            <span class="display-1 primary  font-weight-black px-2 py-2">Indicadores de producto</span>
                            </v-img>    
                        </v-card>
                    </v-hover>
                    <v-hover v-slot:default="{hover}">
                        <v-card
                        rounded
                        hover
                        outlined
                        class="mb-3"
                        :elevation="hover ? 10:2"
                        :class="{'on-hover':hover}"
                        to="indicadores">
                            <v-img src="../assets/Foto/perfil-persona/fondo-cliente.png"
                            height="200px"
                            lazy-src="../assets/Foto/categorias/lazy-calzado-banner.png"
                            class="grey lighten-2 align-center text-center"
                            style="cursor:pointer"
                            >
                            <span class="display-1 primary font-weight-black px-2 py-2">Mis conecciones</span >
                            </v-img>    
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
]
export default {
    
    data() {
        return {
            tab: 0,
            width: 2,
            radius: 10,
            padding: 8,
            lineCap: 'round',
            gradient: gradients[5],
            value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
            gradientDirection: 'top',
            gradients,
            fill: false,
            type: 'trend',
            autoLineWidth: false
        }
    },
    created(){
        let actual=this.$route.name
        if(actual === 'perfil')
        {
            this.$router.push({name:'bienvenida-persona'})
        }
    }
}
</script>
<style>
.fade-enter, .fade-leave-to{
  opacity : 0;
  transform: translateX(2em)
}
.fade-enter-active, .fade-leave-active{
  transition: all .3s ease;
}
</style>