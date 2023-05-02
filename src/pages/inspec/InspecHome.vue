<template>
  <m-loading ref="main" class="">
    <q-tabs v-model="tab" align="justify" narrow-indicator dense>
      <q-tab name="reporte" label="Reporte" />
      <q-tab name="nivel23" label="Nivel 23" />
      <q-tab name="niveles" label="Niveles" />
      <q-tab name="areas" label="Areas" />
    </q-tabs>

    <div class="q-gutter-y-sm">
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="scale"
        transition-next="scale"
        class="t-bg-transparent"
      >
        <q-tab-panel name="reporte">
          <div class="row q-col-gutter-sm">
            <div class="t-w-full">
              <div class="t-w-full t-flex">
                <div class="t-p-1 t-w-1/5 t-text-center t-font-bold"></div>
                <div class="t-p-1 t-w-2/5 t-text-center t-font-bold">
                  CUERPOS
                </div>
                <div class="t-p-1 t-w-2/5 t-text-center t-font-bold">VETAS</div>
              </div>
              <div class="t-w-full t-flex">
                <div class="t-p-1 t-w-1/5 t-text-center t-font-bold t-text-xs">
                  FECHA
                </div>
                <div class="t-p-1 t-w-1/5 t-text-center t-font-bold t-text-xs">
                  DIA
                </div>
                <div class="t-p-1 t-w-1/5 t-text-center t-font-bold t-text-xs">
                  NOCHE
                </div>
                <div class="t-p-1 t-w-1/5 t-text-center t-font-bold t-text-xs">
                  DIA
                </div>
                <div class="t-p-1 t-w-1/5 t-text-center t-font-bold t-text-xs">
                  NOCHE
                </div>
              </div>
            </div>
            <div :key="key" class="t-w-full t-flex" v-for="(el, key) in list">
              <div :class="`t-px-1 t-h-14 t-w-1/5 t-text-center`">
                <div class="t-border-2 t-rounded-lg t-border-gray-300">
                  <div class="t-font-bold t-text-xl t-text-center">
                    {{ el.dia }}
                  </div>
                  <div class="t-uppercase t-text-gray-400 t-text-center">
                    {{ el.mes }}
                  </div>
                </div>
              </div>
              <div
                class="t-px-1 t-h-14 t-w-1/5"
                @click="router.push(`/inspec/day/cuerpos/dia/${el.day}`)"
              >
                <div
                  :class="`t-rounded-lg t-h-full t-w-full t-flex t-items-center t-justify-center t-text-center ${el.class_cuerpos_dia}`"
                >
                  <div class="t-font-bold t-text-xl">
                    {{ el.cuerpos_dia?.cant }}
                  </div>
                </div>
              </div>
              <div
                class="t-px-1 t-h-14 t-w-1/5"
                @click="router.push(`/inspec/day/cuerpos/noche/${el.day}`)"
              >
                <div
                  :class="`t-rounded-lg t-h-full t-w-full t-flex t-items-center t-justify-center t-text-center ${el.class_cuerpos_noche}`"
                >
                  <div class="t-font-bold t-text-xl">
                    {{ el.cuerpos_noche?.cant }}
                  </div>
                </div>
              </div>
              <div
                class="t-px-1 t-h-14 t-w-1/5"
                @click="router.push(`/inspec/day/vetas/dia/${el.day}`)"
              >
                <div
                  :class="`t-rounded-lg t-h-full t-w-full t-flex t-items-center t-justify-center t-text-center ${el.class_vetas_dia}`"
                >
                  <div class="t-font-bold t-text-xl">
                    {{ el.vetas_dia?.cant }}
                  </div>
                </div>
              </div>
              <div
                class="t-px-1 t-h-14 t-w-1/5"
                @click="router.push(`/inspec/day/vetas/noche/${el.day}`)"
              >
                <div
                  :class="`t-rounded-lg t-h-full t-w-full t-flex t-items-center t-justify-center t-text-center ${el.class_vetas_noche}`"
                >
                  <div class="t-font-bold t-text-xl">
                    {{ el.vetas_noche?.cant }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="nivel23">
          <div class="row q-col-gutter-sm">
            <div class="t-w-full">
              <div class="t-w-full t-flex">
                <div class="t-p-1 t-w-1/4 t-text-center t-font-bold"></div>
                <div class="t-p-1 t-w-1/4 t-text-center t-font-bold">
                  SUPERFICIE
                </div>
                <div class="t-p-1 t-w-2/4 t-text-center t-font-bold">
                  NIVEL 23
                </div>
              </div>
              <div class="t-w-full t-flex">
                <div class="t-p-1 t-w-1/4 t-text-center t-font-bold t-text-xs">
                  FECHA
                </div>
                <div
                  class="t-p-1 t-w-1/4 t-text-center t-font-bold t-text-xs"
                ></div>
                <div class="t-p-1 t-w-1/4 t-text-center t-font-bold t-text-xs">
                  DIA
                </div>
                <div class="t-p-1 t-w-1/4 t-text-center t-font-bold t-text-xs">
                  NOCHE
                </div>
              </div>
            </div>
            <div :key="key" class="t-w-full t-flex" v-for="(el, key) in list">
              <div :class="`t-px-1 t-h-14 t-w-1/4 t-text-center`">
                <div class="t-border-2 t-rounded-lg t-border-gray-300">
                  <div class="t-font-bold t-text-xl t-text-center">
                    {{ el.dia }}
                  </div>
                  <div class="t-uppercase t-text-gray-400 t-text-center">
                    {{ el.mes }}
                  </div>
                </div>
              </div>
              <div
                class="t-px-1 t-h-14 t-w-1/4"
                @click="router.push(`/inspec/day/superficie/dia/${el.day}`)"
              >
                <div
                  :class="`t-rounded-lg t-h-full t-w-full t-flex t-items-center t-justify-center t-text-center ${el.class_superficie_dia}`"
                >
                  <div class="t-font-bold t-text-xl">
                    {{ el.superficie_dia?.cant }}
                  </div>
                </div>
              </div>
              <div
                class="t-px-1 t-h-14 t-w-1/4"
                @click="router.push(`/inspec/day/nivel23/dia/${el.day}`)"
              >
                <div
                  :class="`t-rounded-lg t-h-full t-w-full t-flex t-items-center t-justify-center t-text-center ${el.class_nivel23_dia}`"
                >
                  <div class="t-font-bold t-text-xl">
                    {{ el.nivel23_dia?.cant }}
                  </div>
                </div>
              </div>
              <div
                class="t-px-1 t-h-14 t-w-1/4"
                @click="router.push(`/inspec/day/nivel23/noche/${el.day}`)"
              >
                <div
                  :class="`t-rounded-lg t-h-full t-w-full t-flex t-items-center t-justify-center t-text-center ${el.class_nivel23_noche}`"
                >
                  <div class="t-font-bold t-text-xl">
                    {{ el.nivel23_noche?.cant }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="niveles">
          <div class="t-w-full t-flex t-flex-row">
            <div class="t-w-1/2">
              <div class="t-font-bold t-text-center t-text-black">CUERPOS</div>
              <div
                :key="key"
                v-for="(el, key) in niveles_cuerpos"
                class="t-w-full t-flex t-flex-row t-h-14 t-my-1 t-items-center"
                @click="
                  router.push(`/inspec/nivel?nivel=${el.nivel}&zona=cuerpos`)
                "
              >
                <div class="t-w-3/5 t-font-bold t-text-lg t-p-2">
                  {{ el.nivel }}
                </div>
                <!-- <div class="t-w-1/2 t-font-bold t-text-lg t-p-2">{{el.cant}}</div> -->
                <div
                  :class="`t-w-2/5 t-font-bold t-text-lg t-p-2 t-mx-2 ${
                    el.cant ? 't-border-2' : ''
                  } t-rounded-lg t-h-full  t-flex t-items-center t-justify-center t-text-center`"
                >
                  <div class="t-font-bold">{{ el.cant }}</div>
                </div>
              </div>
            </div>
            <div class="t-w-1/2">
              <div class="t-font-bold t-text-center t-text-black">VETAS</div>
              <div
                :key="key"
                v-for="(el, key) in niveles_vetas"
                class="t-w-full t-flex t-flex-row t-h-14 t-my-1 t-items-center"
                @click="
                  router.push(`/inspec/nivel?nivel=${el.nivel}&zona=vetas`)
                "
              >
                <div class="t-w-3/5 t-font-bold t-text-lg t-p-2">
                  {{ el.nivel }}
                </div>
                <!-- <div class="t-w-1/2 t-font-bold t-text-lg t-p-2">{{el.cant}}</div> -->
                <div
                  :class="`t-w-2/5 t-font-bold t-text-lg t-p-2 t-mx-2 ${
                    el.cant ? 't-border-2' : ''
                  } t-rounded-lg t-h-full  t-flex t-items-center t-justify-center t-text-center`"
                >
                  <div class="t-font-bold">{{ el.cant }}</div>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="areas">
          <div class="t-w-full">
            <div class="t-w-full t-flex t-flex-row">
              <div class="t-w-3/5 t-font-bold t-text-xs t-p-2">AREA</div>
              <div class="t-w-1/5 t-font-bold t-text-xs t-p-2">CUERPOS</div>
              <div class="t-w-1/5 t-font-bold t-text-xs t-p-2">VETAS</div>
            </div>
            <div
              :key="key"
              v-for="(el, key) in areas"
              class="t-w-full t-h-14 t-items-center t-flex t-flex-row t-my-1"
            >
              <div class="t-w-3/5 t-font-bold t-text-xs t-p-2">
                {{ el.area }}
              </div>
              <div
                :class="`t-w-1/5 t-font-bold t-text-lg t-p-2 t-mx-2 ${
                  el.cuerpos ? 't-border-2' : ''
                } t-rounded-lg t-h-full  t-flex t-items-center t-justify-center t-text-center`"
                @click="
                  router.push(`/inspec/area?area=${el.area}&zona=cuerpos`)
                "
              >
                <div class="t-font-bold">{{ el.cuerpos }}</div>
              </div>
              <div
                :class="`t-w-1/5 t-font-bold t-text-lg t-p-2 t-mx-1 ${
                  el.vetas ? 't-border-2' : ''
                } t-rounded-lg t-h-full t-flex t-items-center t-justify-center t-text-center`"
                @click="router.push(`/inspec/area?area=${el.area}&zona=vetas`)"
              >
                <div class="t-font-bold">{{ el.vetas }}</div>
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </m-loading>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'

const route = useRoute(),
  router = useRouter(),
  list = ref([]),
  niveles_vetas = ref([]),
  niveles_cuerpos = ref([]),
  areas = ref([]),
  main = ref(null),
  tab = ref('reporte')

const meta = reactive({
  title: 'Reporte'
})
defineExpose({ meta })

onMounted(() => {
  main.value.get('/labor/resumen', (b) => {
    console.log('labor.resumen', b)
    b.reporte.forEach((e) => {
      const dd = dayjs(e.day)
      e.dia = dd.format('DD')
      e.mes = dd.format('MMM')
      e.class_cuerpos_dia = 't-bg-gray-300'
      if (e.cuerpos_dia?.cant) {
        e.class_cuerpos_dia = 't-bg-green-400'
      }
      e.class_cuerpos_noche = 't-bg-gray-300'
      if (e.cuerpos_noche?.cant) {
        e.class_cuerpos_noche = 't-bg-green-400'
      }
      e.class_vetas_dia = 't-bg-gray-300'
      if (e.vetas_dia?.cant) {
        e.class_vetas_dia = 't-bg-green-400'
      }
      e.class_vetas_noche = 't-bg-gray-300'
      if (e.vetas_noche?.cant) {
        e.class_vetas_noche = 't-bg-green-400'
      }
      e.class_nivel23_dia = 't-bg-gray-300'
      if (e.nivel23_dia?.cant) {
        e.class_nivel23_dia = 't-bg-green-400'
      }
      e.class_nivel23_noche = 't-bg-gray-300'
      if (e.nivel23_noche?.cant) {
        e.class_nivel23_noche = 't-bg-green-400'
      }
      e.class_superficie_dia = 't-bg-gray-300'
      if (e.superficie_dia?.cant) {
        e.class_superficie_dia = 't-bg-green-400'
      }
    })
    list.value = b.reporte
    niveles_cuerpos.value = b.niveles.cuerpos
    niveles_vetas.value = b.niveles.vetas
    areas.value = b.areas
  })
})
</script>
