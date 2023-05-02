<template>
  <m-loading ref="main">
    <div
      v-if="obs.area_rep == helper.state.user.area"
      class="row q-col-gutter-md q-pa-md"
    >
      <div
        v-if="!canEdit"
        class="col-12 t-font-bold t-text-2xl t-uppercase"
        @click="canEdit = true"
      >
        {{ ini.zona }} {{ ini.fecha }} {{ ini.turno }}
        <q-icon name="edit" />
      </div>
      <div class="col-12" v-if="editZona">
        <div class="t-flex t-justify-between t-items-center">
          <div class="t-font-bold">Zona</div>
          <q-btn-toggle
            v-model="obs.zona"
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
      </div>
      <div class="col-12" v-if="editZona">
        <div class="t-flex t-justify-between t-items-center">
          <div class="t-font-bold">Tipo</div>
          <q-btn-toggle
            v-model="obs.tipo"
            no-caps
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            padding="xs md"
            :options="[
              { label: 'acto', value: 'acto' },
              { label: 'condicion', value: 'condicion' }
            ]"
          />
        </div>
      </div>
      <div class="col-12" v-if="editZona">
        <div class="t-flex t-justify-between t-items-center">
          <div class="t-font-bold">Perdida</div>
          <q-btn-toggle
            v-model="obs.perdida"
            no-caps
            unelevated
            dense
            toggle-color="primary"
            color="white"
            text-color="primary"
            padding="xs 8px"
            :options="[
              { label: 'persona', value: 'persona' },
              { label: 'proceso', value: 'proceso' },
              { label: 'equipo', value: 'equipo' },
              { label: 'ambiente', value: 'ambiente' }
            ]"
          />
        </div>
      </div>
      <div class="col-12" v-if="canEdit">
        <q-input
          stack-label
          label="Fecha"
          v-model="obs.fecha"
          mask="####-##-##"
          error-message="Fecha no valida"
          :error="!isValidDate"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="obs.fecha" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Cerrar" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-btn-toggle
              v-model="obs.turno"
              no-caps
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
          </template>
        </q-input>
      </div>
      <div class="col-6">
        <image-upload
          class="t-w-full t-h-full"
          :src="obs.rel"
          @upload="obs.file = $event"
          :image-max-size="500"
          :no-confirm="true"
        />
      </div>
      <div class="col-6">
        <q-input
          v-if="obs.zona != 'superficie'"
          class="t-text-2xl t-font-bold"
          stack-label
          label="Nivel"
          v-model="obs.nivel"
          mask="XXXX"
        />
        <div v-else class="t-py-2">Superficie</div>
        <q-input
          class="t-text-2xl t-font-bold"
          input-class="t-uppercase"
          v-model="obs.labor"
          stack-label
          label="Labor"
        />
      </div>
      <div class="col-12">
        <q-select
          stack-label
          v-model="obs.causa_id"
          use-input
          input-debounce="0"
          map-options
          label="Tipo de causa"
          :options="causa_options"
          @filter="causa_filterFn"
        />
      </div>
      <div class="col-4">
        <q-select
          stack-label
          v-model="obs.riesgo"
          label="Riesgo"
          :options="['alto', 'medio', 'bajo']"
        />
      </div>
      <div class="col-8">
        <q-select
          stack-label
          v-model="obs.area"
          label="Area Responsable"
          :options="areas"
        />
      </div>
      <div class="col-12">
        <q-input
          stack-label
          label="Observacion"
          v-model="obs.info"
          type="textarea"
        />
      </div>
    </div>
    <div v-else class="row q-col-gutter-md q-pa-md">
      <div class="t-w-full t-pb-4">
        <div
          :class="
            't-w-full t-h-48 t-overflow-hidden t-rounded-lg t-flex t-justify-center t-items-center ' +
            (obs.rel ? '' : 't-border-2')
          "
        >
          <q-img
            v-if="obs.rel"
            class="t-w-full t-h-full"
            :src="obs.rel"
            fit="contain"
          />
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="t-w-2/5 t-text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
      <div class="t-w-1/4 t-pr-1">
        <div class="t-flex t-flex-col">
          <div class="t-font-bold t-text-lg t-pr-2">
            {{ obs.nivel }}
          </div>
          <div
            class="t-text-ellipsis t-overflow-hidden t-text-xs t-text-gray-500"
          >
            {{ obs.labor }}
          </div>
          <div class="t-text-gray-500 t-text-xs">{{ obs.fecha }}</div>
        </div>
      </div>
      <div
        :class="'t-w-3/4 t-rounded-sm t-p-1 t-border-l-4 ' + obs.riesgo_class"
      >
        <div>{{ obs.info }}</div>
        <div class="t-text-gray-500">Resp: {{ obs.area }}</div>
        <div class="t-flex t-justify-between t-w-full">
          <div v-if="obs.user_id > 0" class="t-text-gray-500 t-text-xs">
            Por: {{ obs.NOMBRES }} {{ obs.APELLIDOS }}
          </div>
        </div>
        <div
          v-if="obs.fecha_accion && obs.accion"
          class="t-rounded-xl t-bg-green-400 t-text-white t-text-center t-text-xs t-inline t-px-2 t-font-bold"
        >
          LEVANTADO
        </div>
      </div>
    </div>
    <div
      v-if="
        obs.area == helper.state.user.area ||
        obs.area_rep == helper.state.user.area
      "
      class="row q-col-gutter-md q-pa-md"
    >
      <div class="col-12">
        <q-checkbox v-model="levantado" label="Fue levantado la observacion" />
      </div>
      <div class="row q-col-gutter-md t-w-full" v-if="levantado">
        <div class="col-6">
          <image-upload
            class="t-w-full t-h-full"
            :src="obs.accion_rel"
            @upload="obs.accion_file = $event"
            :image-max-size="500"
            :no-confirm="true"
          />
        </div>
        <div class="col-6">
          <div class="t-w-full">
            <q-input
              stack-label
              label="Fecha"
              v-model="obs.fecha_accion"
              mask="####-##-##"
              error-message="Fecha no valida"
              :error="!isValidDate_accion"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="obs.fecha_accion" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Cerrar"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="t-w-full">
            <q-input
              stack-label
              label="Accion realizada"
              v-model="obs.accion"
              type="textarea"
            />
          </div>
        </div>
      </div>
      <div class="col-4" v-if="obs.id">
        <q-btn @click="drop" flat icon="delete" unelevated color="negative" />
      </div>
      <div class="col-8">
        <q-btn
          class="t-w-full"
          :label="route.params?.id ? 'Actualizar' : 'Crear'"
          @click="save"
          unelevated
          color="primary"
        />
      </div>
    </div>
  </m-loading>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import ImageUpload from '../../components/ImageUpload.vue'
import dayjs from 'dayjs'
import helper from '../../boot/helper'

const route = useRoute(),
  router = useRouter(),
  main = ref(null),
  areas_raw = helper.secciones(),
  causas_raw = helper.ob_causas(),
  canEdit_raw = ref(false),
  editZona = ref(!route.query.zona)

const obs = reactive({
    riesgo: 'medio',
    tipo: 'condicion',
    perdida: 'persona',
    turno: 'dia',
    fecha: dayjs().format('YYYY-MM-DD'),
    ...route.query,
    area_rep: helper.state.user.area
  }),
  ini = reactive({ ...route.query }),
  inst = ref({})
const $q = useQuasar()
const levantado = ref(!!(obs.fecha_accion && obs.accion))

watchEffect(() => {
  if (obs.zona === 'superficie') {
    obs.nivel = 'SUP'
  } else {
    if (obs.nivel === 'SUP') {
      obs.nivel = null
    }
  }
})

const canEdit = computed({
  get() {
    const pm = ini.zona && ini.fecha && ini.turno
    // console.log('canedit',ini.zona, ini.fecha,ini.turno, pm)
    if (!pm) {
      return true
    }
    return canEdit_raw.value && pm
  },
  set(nv) {
    canEdit_raw.value = nv
  }
})

console.log('route.params', route.params)

const areas = computed(() => Object.values(areas_raw.value || {}))

const isValidDate = computed(() => {
  const dt = dayjs(obs.fecha, 'YYYY-MM-DD', true)
  let res = obs.fecha?.length === 10 && dt.isValid()
  if (res) {
    res = dt.format('YYYY-MM-DD') === obs.fecha
  }
  // console.log('computed', obs.fecha, res)
  return res
})

const isValidDate_accion = computed(() => {
  const dt = dayjs(obs.fecha_accion, 'YYYY-MM-DD', true)
  let res = obs.fecha_accion?.length === 10 && dt.isValid()
  if (res) {
    res = dt.format('YYYY-MM-DD') === obs.fecha_accion
  }
  // console.log('computed', obs.fecha, res)
  return res
})

function drop() {
  $q.dialog({
    title: 'Eliminar observación',
    message: 'Desea realmente eliminar el dialogo',
    cancel: true,
    persistent: true
  }).onOk(() => {
    main.value.post(`/labor/obs-drop/${route.params.id}`, {}, (b) => {
      router.replace({
        path: `/inspec/day/${ini?.zona}/${ini?.turno}/${ini?.fecha}`
      })
    })
  })
}

function save() {
  const props = [
    'id',
    'nivel',
    'labor',
    'zona',
    'riesgo',
    'causa_id',
    'fecha',
    'turno',
    'tipo',
    'info',
    'fecha_accion',
    'accion',
    'area'
  ]
  const payload = {}
  console.log('save.obs', obs)
  for (const p of props) {
    payload[p] = obs[p] ?? null
  }
  if (obs.labor) {
    payload.labor = obs.labor.toUpperCase()
  }
  payload.fecha_accion = payload.fecha_accion?.trim()
    ? payload.fecha_accion?.trim()
    : null
  payload.accion = payload.accion?.trim() ? payload.accion?.trim() : null

  const data = { data: JSON.stringify(payload) }
  if (obs.file) {
    data.file = obs.file
    console.log('upload.file', data.file)
  }
  if (obs.accion_file) {
    data.accion_file = obs.accion_file
    console.log('upload.file', data.accion_file)
  }
  console.log('save.payload', payload)

  // DESDE OPER/OBS/NEW: /inspec/day/undefined/undefined/2022-08-27
  main.value.post('/labor/obs-save', data, (b) => {
    // router.replace({path:`/inspec/obs/${b.id}`})
    // console.log('route.params',route.params)
    router.go(-1)
    // router.replace({path:`/inspec/day/${ini?.zona}/${ini?.turno}/${ini?.fecha}`})
  })
}

onMounted(() => {
  if (!route.params?.id) return

  main.value.get(`/labor/obs/${route.params?.id}`, (b) => {
    inst.value = b
    for (const p in b) {
      ini[p] = obs[p] = b[p]
    }
    editZona.value = !obs.zona
    levantado.value = !!(obs.fecha_accion && obs.accion)
    console.log('labor.onMounted', b, levantado)
  })
})

const ob_causas = computed(() =>
  causas_raw.value?.map((e) => ({ label: e.descripcion, value: e.id }))
)
const causa_options = ref(ob_causas.value)
function causa_filterFn(val, update) {
  if (val === '') {
    update(() => {
      causa_options.value = ob_causas.value
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    causa_options.value = ob_causas.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    )
  })
}
</script>
