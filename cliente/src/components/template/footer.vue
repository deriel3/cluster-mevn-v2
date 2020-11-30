<template>
    <v-footer class="pt-10"
    color="primary">
    <v-row class=" align-start justify-center">
        <v-col
        class="px-5"
        md="4"
        sm="12"
        cols="12"
        >
            <h1 class="headline font-weight-bold mb-4 text-left">¿Quienes Somos?</h1>
            <v-responsive class="white mr-auto mb-6" style="max-width:20px">
                <v-divider class="black"></v-divider>
            </v-responsive>
            <v-img
             class="mb-4"
            max-width="300px"
            src="../../assets/Foto/FootClust.png">
            </v-img>
            <p class="base-body body-1 black--text text-left">
                Somos una empresa especializada en brindar soluciones innovadoras y tecnologicas al sector calzado y conexas.
            </p>
        </v-col>
        <v-col
        class="px-5"
        cols="12"
        sm="12"
        md="4"
        >
            <h1 class="headline font-weight-bold mb-4 text-left"> Nuestros Enlaces</h1>
            <v-responsive class="white mr-auto mb-6" style="max-width:20px">
                <v-divider class="black"></v-divider>
            </v-responsive>
            <v-row>
                <v-col
                class="px-3"
                sm="6"
                cols="6"
                md="6">
                    <v-btn
                    width="100%"
                    class="d-block"
                    text>
                        <p>Inicio</p>
                    </v-btn>
                    <v-btn
                    width="100%"
                    class="d-block"
                    text>
                        <p>¿Como Funciona?</p>
                    </v-btn>
                    <v-btn
                    width="100%"
                    class="d-block"
                    text>
                        <p>Proveedor</p>
                    </v-btn>
                    <v-btn
                    width="100%"
                    class="d-block"
                    text>
                        <p>Comprador</p>
                    </v-btn>
                </v-col>
                <v-col
                class="px-3"
                
                sm="6"
                cols="6"
                md="6">
                        <v-btn
                    width="100%"
                    class="d-block"
                    text>
                        <p>Inicio</p>
                    </v-btn>
                    <v-btn
                    width="100%"
                    class="d-block"
                    text>
                        <p>¿Como Funciona?</p>
                    </v-btn>
                    <v-btn
                    width="100%"
                    class="d-block"
                    text>
                        <p>Proveedor</p>
                    </v-btn>
                    <v-btn
                    width="100%"
                    class="d-block"
                    text>
                        <p>Comprador</p>
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
        <v-col
        class="px-5"
        cols="12"
        sm="12"
        md="4"
        >
            <h1 class="headline font-weight-bold mb-4 text-left">Contactanos</h1>
            <v-responsive class="white mr-auto mb-6" style="max-width:20px">
                <v-divider class="black"></v-divider>
            </v-responsive>
            <v-row>
                <v-col
                md="6"
                cols="6">
                    <div class="body-2 font-weight-bold mb-0 text-left">Telefono:</div>
                    <p class="base-body body-1 black--text text-left mb-2">
                        999 555 444
                    </p>
                    <div class="body-2 font-weight-bold mb-0 text-left">Direccion:</div>
                    <p class="base-body body-1 black--text text-left mb-2">
                        Cll. ejemplo Z-11
                    </p>
                    <div class="body-2 font-weight-bold mb-0 text-left">Correo:</div>
                    <p class="base-body body-1 black--text text-left mb-2">
                        ejemplo@ejemplo.c
                    </p>
                </v-col>
                
                <v-col
                justify="center"
                align="center"
                cols="6"
                md="6">
                    <p class="base-body body-1 black--text text-center mb-2">Reciba nuevas noticias</p>
                    <v-btn
                        class="green"
                        text
                    >
                        <span>Registrarme</span>
                    </v-btn>
                </v-col>
            </v-row>
            <h1 class="headline font-weight-bold mb-4 text-left">Siguenos</h1>
            <v-responsive class="white mr-auto mb-6" style="max-width:20px">
                <v-divider class="black"></v-divider>
            </v-responsive>
            <v-btn
            dark
            color="blue"
            class="ma-1"
            min-width="40px"
            width="40px"
            depressed
            >
                <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn
            dark
            color="pink"
            class="ma-1"
            min-width="40px"
            width="40px"
            depressed
            >
                <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn
            dark
            color="red"
            class="ma-1"
            min-width="40px"
            width="40px"
            depressed
            >
                <v-icon>mdi-youtube</v-icon>
            </v-btn>
        </v-col>
        <p class="mt-5">{{new Date().getFullYear()}} - <strong> FootClust</strong></p>
    </v-row>
    
    </v-footer>
</template>