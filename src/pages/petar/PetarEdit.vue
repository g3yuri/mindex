<template>
  <q-page class="q-pa-md q-gutter-md">
    <m-loading ref="main">
      <div class="row q-col-gutter-md">
        <div class="col-3 col-sm-2 t-font-bold">FECHA</div>
        <div class="col-9 col-sm-4 t-text-right">
          {{ info.fecha }}
        </div>
        <div class="col-3 col-sm-2 t-font-bold">AREA</div>
        <div class="col-9 col-sm-4 t-text-right">
          {{ info.area }}
        </div>
        <div class="col-3 col-sm-2 t-font-bold">ZONA</div>
        <div class="col-9 col-sm-4 t-text-right">
          <q-btn-toggle
            v-model="info.zona"
            no-capss
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            padding="xs md"
            :options="[
              { label: 'cuerpos', value: 'cuerpos' },
              { label: 'vetas', value: 'vetas' },
              { label: 'superficie', value: 'superficie' }
            ]"
          />
        </div>
        <div class="col-3 col-sm-2 t-font-bold">TURNO</div>
        <div class="col-9 col-sm-4 t-text-right">
          <q-btn-toggle
            v-model="info.turno"
            no-capss
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            padding="xs md"
            :options="[
              { label: 'dia', value: 'dia' },
              { label: 'noche', value: 'noche' }
            ]"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            stack-label
            outlined
            label="Actividad"
            v-model="info.actividad"
          />
        </div>
        <div class="col-12 col-sm-6" v-if="info.zona === 'superficie'">
          <q-input stack-label outlined label="Lugar" v-model="info.labor" />
        </div>
        <div class="col-4 col-sm-2" v-if="info.zona != 'superficie'">
          <q-input
            class="t-text-2xl t-font-bold"
            stack-label
            outlined
            label="Nivel"
            v-model="info.nivel"
            mask="XXXX"
          />
        </div>
        <div class="col-8 col-sm-4" v-if="info.zona != 'superficie'">
          <q-input
            class="t-text-2xl t-font-bold"
            outlined
            input-class="t-uppercase"
            v-model="info.labor"
            stack-label
            label="Labor"
          />
        </div>
        <div class="col-12 col-sm-6">
          <mx-personal label="Supervisor" v-model="info.supervisor" />
        </div>
        <div class="col-12 col-sm-6">
          <mx-personal label="Jefe de Area" v-model="info.jefe" />
        </div>
      </div>
      <div class="t-py-4">
        <div class="row q-col-gutter-md">
          <div
            :class="`${
              info.id ? 'col-xs-6 col-md-3 offset-md-3' : 'col-12'
            } t-text-center`"
          >
            <q-btn
              label="Guardar"
              @click="guardar"
              icon="o_save"
              unelevated
              color="primary"
            />
          </div>
          <div v-if="info.id" class="col-xs-6 col-md-3 t-text-center">
            <q-btn
              label="Eliminar"
              @click="eliminar"
              icon="o_delete"
              unelevated
              color="negative"
            />
          </div>
        </div>
      </div>
    </m-loading>
  </q-page>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import dayjs from 'dayjs'
import helper from '../../boot/helper.js'
import MxPersonal from '../../components/MxPersonal.vue'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  info = reactive({
    fecha: dayjs().format('YYYY-MM-DD'),
    area: helper.state.user.area,
    actividad: 'Soldadura en taller',
    nivel: '12B',
    labor: 'XC 400',
    supervisor: {
      value: '75829189',
      label: '75829189 DANIEL',
      nombre: 'DANIEL'
    },
    jefe: { value: '07483317', label: '07483317 JOSE', nombre: 'JOSE' },
    turno: 'dia',
    zona: 'cuerpos'
  }),
  meta = reactive({
    title: 'Petar',
    btn: {
      label: 'Atras',
      icon: 'o_chevron_left',
      flat: true,
      click: () => {
        router.go(-1)
      }
    }
  }),
  main = ref(null)
defineExpose({ meta })
// const props = defineProps(['foo'])

function guardar() {
  info.sup_id = info.supervisor.value
  info.sup_nombre = info.supervisor.nombre
  info.jefe_id = info.jefe.value
  info.jefe_nombre = info.jefe.nombre

  main.value?.post('/petar/store', info, (b) => {
    console.log('guardar.b', b)
    router.go(-1)
  })
}

function eliminar() {
  main.value?.post('/petar/delete', info, (b) => {
    console.log('guardar.b', b)
    router.go(-1)
  })
}

onMounted(() => {})
</script>
