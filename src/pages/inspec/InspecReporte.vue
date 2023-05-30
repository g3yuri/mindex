<template>
  <m-loading ref="main" class="t-m-4">
    <div class="t-flex t-flex-row t-justify-between t-items-center t-pb-4">
      <div class="t-flex-1">
        <div
          :key="key"
          v-for="(el, key) in Object.keys(payload)"
          class="t-font-bold t-uppercase"
        >
          {{ el }}: {{ payload[el] }}
        </div>
      </div>
      <q-btn
        label="Agregar"
        @click="agregar"
        icon="add"
        unelevated
        color="primary"
      />
    </div>
    <div class="row q-col-gutter-lg">
      <div :key="key" v-for="(el, key) in list" class="col-xs-12 col-md-6 flex">
        <div class="t-w-2/6 t-pr-1">
          <div class="t-flex t-items-center">
            <div class="t-font-bold t-text-lg t-pr-2">{{ el.nivel }}</div>
            <div
              class="t-text-ellipsis t-overflow-hidden t-text-xs t-text-gray-500"
            >
              {{ el.labor }}
            </div>
          </div>
          <div
            :class="
              't-w-full t-h-24 t-overflow-hidden t-rounded-lg t-flex t-justify-center t-items-center t-relative' +
              (el.rel ? '' : 't-border-2')
            "
          >
            <div
              v-if="el.rel"
              class="images"
              v-viewer="{ toolbar: false, navbar: false, title: false }"
            >
              <img :key="el.rel" class="t-w-full t-h-full" :src="el.rel" />
            </div>
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
            <div
              v-if="el.pare == '1'"
              class="t-absolute t-top-0 t-right-0 t-flex"
            >
              <q-icon
                name="check_circle"
                color="red"
                class="t-bg-white t-rounded-full"
                size="xs"
              />
            </div>
          </div>
        </div>
        <div
          :class="'t-w-4/6 t-rounded-sm t-p-1 t-border-l-4 ' + el.riesgo_class"
          @click="editar(el.id)"
        >
          <div>{{ el.info }}</div>
          <div class="t-text-gray-500">Resp: {{ el.area }}</div>
          <div class="t-flex t-justify-between t-w-full">
            <div v-if="el.user_id > 0" class="t-text-gray-500 t-text-xs">
              Por: {{ el.NOMBRES }} {{ el.APELLIDOS }}
            </div>
            <div class="t-text-gray-500 t-text-xs t-text-right">
              {{ el.fecha }}
            </div>
          </div>
          <div
            v-if="el.fecha_accion && el.accion"
            class="t-rounded-xl t-bg-green-400 t-text-white t-text-center t-text-xs t-inline t-px-2 t-font-bold"
          >
            LEVANTADO
          </div>
        </div>
      </div>
    </div>
  </m-loading>
</template>
<script setup>
import {
  ref,
  toRefs,
  reactive,
  onMounted,
  computed,
  watchEffect,
  watch
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import 'viewerjs/dist/viewer.css'
import { directive as viewer } from 'v-viewer'

const vViewer = viewer({
  debug: true
})
console.log('vviewer', vViewer)
const route = useRoute(),
  router = useRouter(),
  main = ref(null),
  list = ref([])
const payload = reactive({ ...route.params, ...route.query })

function editar(id) {
  router.push(`/inspec/obs/edit/${id}`)
}

function agregar() {
  const { zona, turno, fecha } = payload
  router.push(
    `/inspec/obs/new?zona=${zona ?? ''}&turno=${turno ?? ''}&fecha=${
      fecha ?? ''
    }`
  )
}

onMounted(() => {
  const pm = route.params
  const { nivel, area, zona, area_rep, fecha } = route.query
  // console.log("query", route.query)

  if (pm.zona && pm.turno && pm.fecha) {
    main.value.post('/labor/day', pm, (b) => {
      console.log('labor.day', b)
      b.forEach((e) => {
        e.riesgo_class = 't-border-indigo-800'
        if (e.riesgo === 'alto') {
          e.riesgo_class = 't-border-red-500'
        } else if (e.riesgo === 'medio') {
          e.riesgo_class = 't-border-amber-500'
        } else if (e.riesgo === 'bajo') {
          e.riesgo_class = 't-border-green-500'
        }
      })
      list.value = b
    })
  } else if (nivel || zona || area || area_rep || fecha) {
    main.value.post('/labor/query', route.query, (b) => {
      console.log('labor.query', b)
      b.forEach((e) => {
        e.riesgo_class = 't-border-indigo-800'
        if (e.riesgo === 'alto') {
          e.riesgo_class = 't-border-red-500'
        } else if (e.riesgo === 'medio') {
          e.riesgo_class = 't-border-amber-500'
        } else if (e.riesgo === 'bajo') {
          e.riesgo_class = 't-border-green-500'
        }
      })
      list.value = b
    })
  }
})
</script>
