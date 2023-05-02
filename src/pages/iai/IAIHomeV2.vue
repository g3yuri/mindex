<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="">
      <q-btn-toggle
        v-model="tag"
        class="t-w-full"
        style="border: 1px solid #027be3"
        spread
        no-caps
        rounded
        dense
        unelevated
        toggle-color="primary"
        color="white"
        text-color="primary"
        @update:model-value="reload"
        :options="[
          { label: 'Ultimos', value: 'ultimos' },
          { label: 'Por mes', value: 'mes' }
        ]"
      />
    </div>
    <div>
      <m-loading ref="main">
        <div v-if="tag == 'ultimos'" class="row q-col-gutter-md">
          <div
            v-for="(el, index) in list"
            :key="index"
            class="t-w-full t-flex t-py-2"
          >
            <div class="t-w-2/6 t-pr-1">
              <div class="t-flex t-items-center">
                <div class="t-font-bold t-text-lg t-pr-2">
                  {{ el.fecha_corta }}
                </div>
              </div>
              <div
                :class="
                  't-w-full t-h-24 t-overflow-hidden t-rounded-lg t-flex t-justify-center t-items-center ' +
                  (el.rel ? '' : 't-border-2')
                "
              >
                <q-img v-if="el.rel" class="t-w-full t-h-full" :src="el.rel" />
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
            <div
              :class="
                't-w-4/6 t-rounded-sm t-p-1 t-border-l-4 ' + el.riesgo_class
              "
            >
              <div>{{ el.descripcion }}</div>
              <div class="t-text-gray-500">{{ el.area }}</div>
              <div class="t-w-full">
                <div class="t-text-gray-500 t-text-xs">Tipo: {{ el.tipo }}</div>
                <div class="t-text-gray-500 t-text-xs">
                  Daño a: {{ el.danio }}
                </div>
                <div class="t-text-gray-500 t-text-xs">
                  Potencial: {{ el.potencial }}
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
        <div v-if="tag == 'mes'" class="row q-col-gutter-md">
          <div
            class="col-6"
            :key="index"
            v-for="(el, index) in list"
            @click="router.push(`/iai/mes?mes=${el.mes_index}`)"
          >
            <div class="t-border-2 t-rounded-lg t-p-2">
              <div class="text-h3">{{ el.mes }}</div>
              <div :key="k" v-for="(x, k) in el.danios">{{ k }}: {{ x }}</div>
            </div>
          </div>
        </div>
      </m-loading>
    </div>
  </q-page>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar, LocalStorage } from 'quasar'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  tag = ref(LocalStorage.getItem('iai.view.toggle') || 'ultimos'),
  list = ref([]),
  main = ref(null),
  months = ref([
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Setiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ])

function editar(id) {
  router.push(`/iai/editar/${id}`)
}
function parse_list_mes(list) {
  console.log('list', list)
  const xmes = []
  list.forEach((e) => {
    if (!xmes[e.mes]) {
      xmes[e.mes] = {}
    }
    xmes[e.mes][e.danio] = e.cant
  })
  list = []
  xmes.forEach((e, k) => {
    list.push({
      mes: months.value[k],
      mes_index: k,
      danios: e
    })
  })
  console.log('LIST.TIPOS', list)
  return list
}
function reload() {
  console.log('tag', tag.value)
  LocalStorage.set('iai.view.toggle', tag.value)
  if (tag.value === 'mes') {
    main.value.post('/iai/list/mes', {}, (b) => {
      list.value = parse_list_mes(b.list)
    })
  } else {
    main.value.get('/iai/list/ultimos', (b) => {
      list.value = b.list
    })
  }
}
onMounted(() => {
  reload()
})
</script>
