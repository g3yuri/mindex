<template>
  <m-loading ref="main" style="height: 100%">
    <m-table
      :data="list"
      dense
      :columns="[
        { field: 'fecha', label: 'Fecha' },
        { field: 'resp', label: 'Responsable' },
        { field: 'plazo', label: 'Plazo' },
        { field: 'mes', label: 'Mes' },
        { field: 'pedido', label: 'Pedido' }
      ]"
      v-bind="{ dense: false }"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th :key="props.cols[0].field" :props="props">
            {{ props.cols[0].label }}
          </q-th>
          <q-th :key="props.cols[1].field" :props="props">
            {{ props.cols[1].label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="fecha" :props="props">
            <div class="t-font-bold">{{ props.row.fecha }}</div>
            <div class="t-overflow-hidden t-whitespace-normal">
              {{ props.row.resp }}
            </div>
            <div :class="props.row.estado_class">
              {{ props.row.plazo }}
            </div>
          </q-td>
          <q-td key="pedido" :props="props">
            <div class="t-overflow-hidden t-whitespace-normal">
              {{ props.row.pedido }}
            </div>
          </q-td>
        </q-tr>
      </template>
    </m-table>
  </m-loading>
</template>
<script setup>
import {
  ref,
  reactive,
  onMounted,
  computed,
  watchEffect,
  watch,
  useAttrs
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import dayjs from 'dayjs'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  meta = reactive({
    title: 'Comite'
  }),
  list = ref([
    {
      fecha: '4/04/23',
      pedido:
        'Las reuniones del CSSOT tendrá una duración máxima de 1h 10 min, la reunión se realizará a las 3:00 pm',
      resp: 'CSSOT',
      plazo: '5/05/23',
      mes: 'Abril',
      estado: 'VENCIDO',
      obs: ''
    },
    {
      fecha: '8/05/23',
      pedido:
        'Realizar seguimiento de la limpieza de comedores Carmen y potosí',
      resp: 'Frans Quinto / Yulissa Aldana',
      plazo: '6/06/23',
      mes: 'Mayo',
      estado: 'En Proceso',
      obs: ''
    },
    {
      fecha: '8/05/23',
      pedido:
        'Prohibir el ingreso a comedores con mameluco, implementar señalética respectiva.',
      resp: 'Frans Quinto / Luis Mallqui',
      plazo: '6/06/23',
      mes: 'Mayo',
      estado: 'En Proceso',
      obs: ''
    },
    {
      fecha: '8/05/23',
      pedido:
        'Implementar check list de equipos nuevos que ingresaron a la unidad',
      resp: 'Jeyson Mejía / Alan Rivas',
      plazo: '20/05/23',
      mes: 'Mayo',
      estado: 'vencido',
      obs: ''
    },
    {
      fecha: '8/05/23',
      pedido:
        'Elaborar informe técnico de calidad de tubos pvc para taladros largos en vetas y cuerpos.',
      resp: 'Jhonatan Michue / David Jimenez / Braulio Rocha',
      plazo: '30/05/23',
      mes: 'Mayo',
      estado: 'En Proceso',
      obs: ''
    },
    {
      fecha: '8/05/23',
      pedido:
        'Dar soporte el área de Trackless para el correcto funcionamiento de los equipos de perforación',
      resp: 'Jeyson Mejía / Alan Rivas',
      plazo: '15/05/23',
      mes: 'Mayo',
      estado: 'Vencido',
      obs: ''
    },
    {
      fecha: '8/05/23',
      pedido:
        'Estandarización de cables eléctricos y tubería de agua y aire en zona de cuerpos del Nivel 10 al 15',
      resp: 'Alan Rivas / Paul Lozano / Joel Tonconi',
      plazo: '6/06/23',
      mes: 'Mayo',
      estado: 'En Proceso',
      obs: ''
    },
    {
      fecha: '4/04/23',
      pedido: 'Culminar los trabajos en el comedor del Nivel 21 Zona cuerpos',
      resp: 'Paul Lozano / Joel Tonconi',
      plazo: '30/05/23',
      mes: 'Mayo',
      estado: 'En Proceso',
      obs: 'Avance 50% vaciado y pulido de la parte delantera'
    },
    {
      fecha: '8/05/23',
      pedido:
        'Implementar baños químicos en Ximena 21ª, Esperanza  20B, Cuerpos Nv 19, 21A.',
      resp: 'Luis Gomez/ Paul Lozano / Alan Rivas / Julio Moreno',
      plazo: '0/05/23',
      mes: 'Mayo',
      estado: 'En Proceso',
      obs: ''
    },
    {
      fecha: '8/05/23',
      pedido:
        'Implementar 02 lockers de 02 compartimientos en el  Polvorín Nivel 15',
      resp: 'Ider Barboza',
      plazo: '5/05/23',
      mes: 'Mayo',
      estado: 'Vencido',
      obs: ''
    },
    {
      fecha: '8/05/23',
      pedido:
        'Solicitar a Alpayana la implementación de cuadernos de reclamos para comedores en interior mina',
      resp: 'Yulissa Aldana',
      plazo: '15/05/23',
      mes: 'Mayo',
      estado: 'Vencido',
      obs: ''
    },
    {
      fecha: '8/05/23',
      pedido: 'Implementar extintores de PQS en comedores Nivel 10, 14, 18',
      resp: 'Ider Barbosa / Yulissa Aldana',
      plazo: '15/05/23',
      mes: 'Mayo',
      estado: 'Vencido',
      obs: ''
    },
    {
      fecha: '8/05/23',
      pedido: 'Realizar la contratación de operadores de grúa certificados',
      resp: 'Veronica Martel / Antonio Travezaño',
      plazo: '6/06/23',
      mes: 'Mayo',
      estado: 'En Proceso',
      obs: ''
    },
    {
      fecha: '8/05/23',
      pedido: 'Realizar la evaluación y pedido de compra de jetanoles',
      resp: 'Jhonatan Michue / Braulio Rocha',
      plazo: '15/05/23',
      mes: 'Mayo',
      estado: 'Vencido',
      obs: ''
    },
    {
      fecha: '8/05/23',
      pedido: 'Implementar un desatador mecánico para la mina',
      resp: 'Julio Moreno',
      plazo: '25/05/23',
      mes: 'Mayo',
      estado: 'En Proceso',
      obs: ''
    },
    {
      fecha: '8/05/23',
      pedido: 'Implementar barretillas de acero y puntas para carrilanos',
      resp: 'Elmer Molina / Julio Apaza',
      plazo: '25/05/23',
      mes: 'Mayo',
      estado: 'En Proceso',
      obs: ''
    }
  ])
list.value.forEach((e) => {
  e.estado_class =
    dayjs().diff(e.plazo) > 0
      ? 't-bg-red-500 t-text-white t-text-center t-rounded-lg'
      : 't-bg-yellow-300 t-font-bold t-text-center t-rounded-lg'
})
// const props = defineProps(['foo'])
defineExpose({ meta })

function reload() {}

onMounted(() => {
  reload()
})
</script>
