<template>
  <m-loading v-show="have_filter" ref="main" class="t-p-2">
    <div class="t-py-2 t-flex t-justify-between">
      <div class="t-flex t-items-start t-py-2 t-flex-wrap">
        <span class="t-font-bold t-rounded-md t-mr-2">Filtros: </span>
        <template v-for="[key, val] in Object.entries(filter)">
          <span
            :key="key"
            v-if="!!val"
            class="t-border-b-4 t-border-gray-300 t-text-sm t-mr-2"
          >
            <span class="t-whitespace-nowrap t-overflow-hidden t-text-ellipsis"
              >{{ key }}: {{ val }}</span
            >
          </span>
        </template>
      </div>
      <div>
        <q-btn
          flat
          round
          icon="o_close"
          unelevated
          color="primary"
          @click="filter = {}"
        />
      </div>
    </div>
    <div
      class="t-w-full t-flex t-items-center t-my-2 t-font-bold t-text-center"
    >
      <div class="t-w-1/2 md:t-w-2/3 t-pr-2 t-flex">
        <span
          class="t-text-sm t-overflow-hidden t-text-ellipsis t-whitespace-nowrap t-pr-2"
          >NOMBRES</span
        >
        <div class="t-text-right t-flex-1">DNI</div>
      </div>
      <div class="t-w-1/2 md:t-w-1/3">DESCANSO</div>
    </div>
    <div
      v-for="(el, ind) in list"
      :key="ind"
      class="t-w-full t-flex t-items-center t-my-2"
    >
      <div class="t-w-1/2 md:t-w-2/3 t-pr-2 t-flex">
        <span
          class="t-text-sm t-overflow-hidden t-text-ellipsis t-whitespace-nowrap t-pr-2"
          >{{ el.nombres }}</span
        >
        <div class="t-hidden md:t-text-right md:t-flex-1">{{ el.dni }}</div>
      </div>
      <div class="t-w-1/2 md:t-w-1/3">
        <div
          :style="`width: ${Math.floor(el.media * 100) / media_max}%;`"
          :class="`${el.clase} t-text-white t-p-1 t-font-bold t-text-xs t-rounded-md`"
        >
          {{ el.media_str }}
        </div>
      </div>
    </div>
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

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  meta = reactive({}),
  list = ref([]),
  filter = ref({}),
  main = ref(null),
  media_max = ref(0)

const props = defineProps({
  area: {
    type: String,
    default: null
  },
  guardia: {
    type: String,
    default: null
  },
  cargo: {
    type: String,
    default: null
  },
  riesgo: {
    type: String,
    default: null
  }
})
watch(
  () => props,
  () => {
    reload()
  }
)
defineExpose({ meta, reload })
const have_filter = computed(() => {
  return filter.value?.area || filter.value?.guardia || filter.value?.cargo
})

onMounted(() => {
  reload()
})

function reload(options) {
  options = options ?? props
  const { area = '', guardia = '', cargo = '', riesgo = '' } = options
  console.log('dash', { area, guardia, cargo })
  if (area || guardia || cargo || riesgo) {
    main.value.get(
      `/fatiga/super/dashboard/operador?area=${area}&guardia=${guardia}&cargo=${cargo}&riesgo=${riesgo}`,
      (b) => {
        console.log('operador.result', b)
        let max = 0
        b.data.forEach((el) => {
          el.media = parseFloat(el.media)
          if (el.media > max) {
            max = el.media
          }
          el.media_str = `${Math.floor(el.media)}h:${Math.ceil(
            (el.media - Math.floor(el.media)) * 60
          )}m`
          if (el.media < 4.0) {
            el.clase = 't-bg-red-500'
          } else if (el.media < 5.5) {
            el.clase = 't-bg-yellow-500'
          } else {
            el.clase = 't-bg-green-500'
          }
        })
        media_max.value = max
        list.value = b.data
        filter.value = {
          area: b.area,
          guardia: b.guardia,
          cargo: b.cargo,
          riesgo: b.riesgo
        }
      }
    )
  }
}
</script>
