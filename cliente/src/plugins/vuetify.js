import Vue from 'vue';
import Vuetify from 'vuetify/lib';
Vue.use(Vuetify);

export default new Vuetify({
    rtl: false,
    theme: {
        dark: false,
        themes: {
        dark: {
            primary: '#D81B60',
            accent: '#FF4081',
            secondary: '#ffe18d',
            success: '#4CAF50',
            info: '#2196F3',
            warning: '#FB8C00',
            error: '#FF5252'
        },
        light: {
            primary: '#FDC36E',
            accent: '#3949AB',
            secondary: '#695656',
            success: '#08590B',
            info: '#2273B4',
            warning: '#FFE365',
            error: '#CA2B2B'
        }
        }
    }    
});
