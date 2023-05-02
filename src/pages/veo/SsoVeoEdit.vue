<template>
  <q-page class="q-pa-md q-gutter-md">
    <m-loading ref="main">
      <div class="row q-col-gutter-md">
        <div class="col-xs-6 col-sm-2">Zona</div>
        <div class="col-xs-6 col-sm-4 t-text-right">
          <q-btn-toggle
            v-model="info.zona"
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
              { label: 'Cuerpos', value: 'cuerpos' },
              { label: 'Vetas', value: 'vetas' }
            ]"
          />
        </div>
        <div class="col-xs-6 col-sm-2">Tipo</div>
        <div class="col-xs-6 col-sm-4 t-text-right">
          <q-btn-toggle
            v-model="info.tipo"
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
              { label: 'Avance', value: 'avance' },
              { label: 'Tajo', value: 'tajo' }
            ]"
          />
        </div>
        <div class="col-xs-12 col-sm-12">
          <div class="t-flex t-justify-between t-items-center">
            <div>Estado</div>
            <q-btn-toggle
              v-model="info.status"
              no-caps
              rounded
              unelevated
              toggle-color="primary"
              color="white"
              text-color="primary"
              :options="[
                { label: 'Normal', value: 'normal' },
                { label: 'Termino', value: 'termino' },
                { label: 'Paralizado', value: 'paralizado' }
              ]"
            />
          </div>
        </div>
        <div class="col-12">
          <mx-secciones v-model="info.area" label="Area Responsable" />
        </div>
        <div class="col-xs-4 col-sm-4">
          <q-input stack-label outlined label="nivel" v-model="info.nivel" />
        </div>
        <div class="col-xs-8 col-sm-8">
          <q-input stack-label outlined label="Labor" v-model="info.labor" />
        </div>
        <div class="col-12">
          <q-checkbox v-model="have_obs" label="Tiene observacion?" />
          <q-input
            v-if="have_obs"
            stack-label
            outlined
            label="Observacion"
            v-model="info.observacion"
            type="textarea"
            autogrow
          />
        </div>
        <div class="col-sm-12 col-xs-4 offset-xs-4 offset-sm-0 t-text-center">
          <q-btn
            label="Crear"
            @click="crear"
            icon="o_add"
            unelevated
            color="primary"
          />
        </div>
      </div>
    </m-loading>
  </q-page>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import helper from '../../boot/helper.js'
import MxSecciones from '../../components/MxSecciones.vue'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar()
const meta = reactive({
    title: 'Editar VEO',
    btn: {
      label: 'Atras',
      icon: 'o_chevron_left',
      click: () => {
        router.go(-1)
      },
      flat: true
    }
  }),
  info = reactive({
    status: 'normal',
    zona: 'cuerpos',
    tipo: 'tajo',
    nivel: '10B',
    labor: 'XC 400'
  }),
  main = ref(null),
  have_obs = ref(false)

watchEffect(() => {
  have_obs.value = !!info.observacion
})

// const props = defineProps(['foo'])
defineExpose({ meta })

function crear() {
  main.value?.post('/veo/sso/store', info, (b) => {
    router.go(-1)
  })
}

onMounted(() => {})
</script>
