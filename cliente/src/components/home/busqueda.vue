<template>
    <div class="grey lighten-2 mt-5">
        <v-container>
            <div class="display-1 container" align="center">
                <h2 class="mt-5 mb-5">Busque el producto que desee</h2>
            </div>
            <v-row>
                <v-col
                style="width:100%"
                class="d-flex child-flex"
                md="3"
                sm="12">
                    <v-hover v-slot:default="{hover}">
                        <v-img src="../../assets/Foto/categorias/calzado-banner.png"
                        lazy-src="../../assets/Foto/categorias/lazy-calzado-banner.png"
                        class="grey lighten-2"
                        hover
                        >
                        <v-fade-transition>
                            <v-overlay v-if="hover"
                            absolute
                            color="#010101">
                            <v-btn
                            class="black--text"
                            color="primary"
                            to="/buscar/calzado">
                                Buscar Calzados
                            </v-btn>
                            </v-overlay>
                        </v-fade-transition>
                        </v-img>
                    </v-hover>
                </v-col>
                <v-col
                style="width:100%"
                class="d-flex child-flex"
                md="3"
                sm="12">
                    <v-hover v-slot:default="{hover}">
                        <v-img src="../../assets/Foto/categorias/cuero-banner.png"
                        lazy-src="../../assets/Foto/categorias/lazy-cuero-banner.png"
                        class="grey lighten-2"
                        hover
                        >
                        <v-fade-transition>
                            <v-overlay v-if="hover"
                            absolute
                            color="#010101">
                            <v-btn
                            class="black--text"
                            color="primary"
                            to="/buscar/calzado">
                                Buscar Materias Primas
                            </v-btn>
                            </v-overlay>
                        </v-fade-transition>
                        </v-img>
                    </v-hover>
                </v-col>
                <v-col
                style="width:100%"
                class="d-flex child-flex"
                md="3"
                sm="12">
                    <v-hover v-slot:default="{hover}">
                        <v-img src="../../assets/Foto/categorias/insumo-banner.png"
                        lazy-src="../../assets/Foto/categorias/lazy-insumo-banner.png"
                        class="grey lighten-2"
                        hover
                        >
                        <v-fade-transition>
                            <v-overlay v-if="hover"
                            absolute
                            color="#010101">
                            <v-btn
                            class="black--text"
                            color="primary"
                            to="/buscar/calzado">
                                Buscar Insumos
                            </v-btn>
                            </v-overlay>
                        </v-fade-transition>
                        </v-img>
                    </v-hover>
                </v-col>
                <v-col
                style="width:100%"
                class="d-flex child-flex"
                md="3"
                sm="12">
                    <v-hover v-slot:default="{hover}">
                        <v-img src="../../assets/Foto/categorias/suministro-banner.png"
                        lazy-src="../../assets/Foto/categorias/lazy-suministro-banner.png"
                        class="grey lighten-2"
                        hover
                        >
                        <v-fade-transition>
                            <v-overlay v-if="hover"
                            absolute
                            color="#010101">
                            <v-btn
                            class="black--text"
                            color="primary"
                            to="/buscar/calzado">
                                Buscar Suministros
                            </v-btn>
                            </v-overlay>
                        </v-fade-transition>
                        </v-img>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isActive:false
        }
    }
}
</script>