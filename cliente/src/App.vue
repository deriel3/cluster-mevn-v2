<template>
  <v-app>
    <navegador></navegador>
    <v-main fluid>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
    <pie></pie>
  </v-app>
</template>

<script>
import navegador from './components/template/nav';
import pie from './components/template/footer'

export default {
  name: 'App',
  components: {
    navegador,
    pie
  },
};
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
