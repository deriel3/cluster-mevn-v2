<template>
    <v-container class="d-flex">
        <div class=" py-1" align="center" style="width:100%">
            <v-card justify="space-around" width="100%" >
                <v-card-text >
                    <v-text-field
                        v-model="data_facebook"
                        label="Facebook"
                        placeholder="https://facebook.com/TUPAGINA"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="data_instagram"
                        label="Instagram"
                        placeholder="https://instagram.com/TUPAGINA"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="data_pagina_web"
                        placeholder="https://tudominio.com/"
                        label="Pagina Web"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="data_whats"
                        label="Whats App"
                        placeholder="https://api.whatsapp.com/send?phone=TUNUMERO"
                        required
                    ></v-text-field>
                    <br>
                    <v-btn
                    color="primary" class="black--text" @click="guardar_cambio">
                        Guardar Cambio
                    </v-btn>
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>
<script>
import axios from 'axios'
import { EventBus } from '../../EventBus/EventBus'
export default {
    props: {
        facebook: '',
        instagram: '',
        paginaweb: '',
        whats: ''
    },
    data () {
        return {
            data_facebook: this.facebook,
            data_instagram: this.instagram,
            data_pagina_web: this.paginaweb,
            data_whats: this.whats
        }
    }, 
    methods: {
        guardar_cambio () {
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            let token = this.$store.state.token
            let option = {
                url: process.env.VUE_APP_URL_SERVER+"/api/act_redessociales",
                method: 'POST',
                headers: {
                    'access-token':token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    id: id,
                    ruc: ruc,
                    facebook: this.data_facebook,
                    instagram: this.data_instagram,
                    paginaweb: this.data_pagina_web,
                    whats: this.data_whats
                }
            }
            axios(option)
            .then(res => {
                let data = res.data
                switch (data.cod)
                {
                    case "200": this.$toast.success("Campos actualizados")
                    let nuevo = {
                        facebook: this.data_facebook,
                        instagram: this.data_instagram,
                        paginaweb: this.data_pagina_web,
                        whats: this.data_whats
                    }
                    this.$emit('cambiar_redes', nuevo)
                    break;
                    case "403": EventBus.$emit("force_logout")
                }
            })
        }
    }
}
</script>