<template>
  <div>
    <banner></banner>
    <funcion></funcion>
    <busqueda></busqueda>
    <opinion></opinion>
    <marcas></marcas>
  </div>
</template>
<script>
import banner from '../components/home/banner'
import funcion from '../components/home/funcion'
import busqueda from '../components/home/busqueda'
import opinion from '../components/home/opinion'
import marcas from '../components/home/marcas'
export default {
  components:{
    banner,
    funcion,
    busqueda,
    opinion,
    marcas
  }
}
</script>
