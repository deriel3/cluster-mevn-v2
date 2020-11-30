<template>
    <v-container class="d-flex">
        <div class="px-1 py-1" align="center" style="width:100%">
            <v-card justify="space-around" width="100%">
                <v-card-text>
                    <v-row v-for="item in data_contactos" :key="item._id">
                        <v-col
                        md="4"
                        s="12"
                        cols="4">
                            <v-select
                            v-model="item.tipo_dispositivo"
                            :items="medio_contacto"
                            label="Tipo de dispositivo"
                            required
                            ></v-select>
                        </v-col>
                        <v-col
                        md="4"
                        s="12"
                        cols="4">
                            <v-text-field
                            v-model="item.contacto"
                            label="Contacto"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        md="4"
                        s="12"
                        cols="4">
                            <v-text-field
                            v-model="item.persona"
                            label="Persona"
                            required
                            ></v-text-field>
                        </v-col>
                        
                    </v-row>
                    <small>*Para eliminar deje el campo de contacto en blanco</small>
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
        contactos: ''
    },

    data () {
        return {
            data_contactos: this.contactos,
            medio_contacto:["Correo electronico", "Telefono", "Celular", "Fax", "Pagina web", "Otro"],
        }
    },
    
    methods: {
        borrar_vacios () {
            this.data_contactos = this.data_contactos.filter(item => {
                return item.tipo_dispositivo !== '' && item.contacto !== '' && item.persona !== ''
            })
            this.$emit("actualizar_length_contacto",this.data_contactos)
            
        },
        guardar_cambio () {
            this.borrar_vacios()
            let id = this.$store.state.user.id
            let ruc = this.$route.params.ruc
            let token = this.$store.state.token
            let option = {
                url: process.env.VUE_APP_URL_SERVER+"/api/act_formacontacto",
                method: 'POST',
                headers: {
                    'access-token':token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    id: id,
                    ruc: ruc,
                    forma_contacto: this.data_contactos
                }
            }
            axios(option)
            .then(res => {
                let data = res.data
                switch (data.cod)
                {
                    case "200": this.$toast.success("Campos actualizados")
                    break;
                    case "403": EventBus.$emit("force_logout")
                }
            })
        }
    }
}
</script>