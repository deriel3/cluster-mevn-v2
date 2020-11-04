<template>
  <v-simple-table
    fixed-header
    height="300px"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left">Nombre del dispositivo</th>
          <th class="text-left">Equipo</th>
          <th class="text-left">Fecha de inicio</th>
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="item in lista_dispositivos"
        :key="item._id"
        >
          <td v-if="item.name==mac_actual" ><strong>ACTUAL</strong></td>
          <td v-else></td>
          <td >{{item.nombre}}</td>
          <td>{{item.name}}</td>
          <td>{{item.fecha_ingreso.split('T')[0]}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
    props:{
        lista_dispositivos: '',
        mac_actual: ''
    }
}
</script>