<template>
  <div class="t-p-2">
    <div class="t-mb-2">
      <q-btn-toggle
        v-model="tag"
        style="border: 1px solid #027be3"
        spread
        no-caps
        rounded
        unelevated
        toggle-color="primary"
        color="white"
        text-color="primary"
        @update:model-value="reload"
        :options="[
          { label: 'Reportes', value: 'reporte' },
          { label: 'Pendientes', value: 'pendiente' },
          { label: 'Levantados', value: 'levantado' }
        ]"
      />
    </div>
    <m-loading ref="main">
      <template v-if="tag == 'reporte'">
        <div class="t-w-full t-flex">
          <div
            :class="`t-px-1 t-h-14 t-w-2/5 t-text-center t-flex t-items-center t-justify-center`"
          >
            <div class="t-font-bold t-text-xl t-text-center">Areas</div>
          </div>
          <div
            :key="`${el.fecha}-${el.dia}-${el.mes}`"
            :class="`t-px-1 t-h-14 t-w-1/5 t-text-center`"
            v-for="el in dias"
          >
            <div class="t-border-2 t-rounded-lg t-border-gray-300">
              <div class="t-font-bold t-text-xl t-text-center">
                {{ el.dia }}
              </div>
              <div class="t-uppercase t-text-gray-400 t-text-center">
                {{ el.mes }}
              </div>
            </div>
          </div>
        </div>
        <div :key="el.area" class="t-w-full t-flex" v-for="el in areas">
          <div class="t-p-1 t-h-14 t-w-2/5">
            <div
              class="t-font-bold t-text-xs t-h-full t-rounded-lg t-border-2 t-border-gray-300 t-flex t-items-center t-p-1"
            >
              {{ el.area }}
            </div>
          </div>
          <div
            :key="`${el.area}-${dy.fecha}`"
            :class="`t-p-1 t-h-14 t-w-1/5 t-text-center`"
            v-for="dy in dias"
            dclick="router.push(`/oper/obs/new?fecha=${dy.fecha}&area=${el.area}`)"
            @click="
              router.push(`/inspec/area?area_rep=${el.area}&fecha=${dy.fecha}`)
            "
          >
            <div v-if="el[dy.fecha]?.clase" :class="el[dy.fecha].clase">
              {{ el[dy.fecha].cant }}
            </div>
          </div>
        </div>
      </template>
      <template v-if="tag == 'pendiente'">
        <div
          :key="`${el.nivel}-${el.labor}`"
          v-for="el in pendiente"
          class="t-w-full t-flex t-py-2"
          @click="editar(el.id)"
        >
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
      </template>
      <template v-if="tag == 'levantado'">
        <div
          :key="el.id"
          v-for="el in levantado"
          class="t-w-full t-flex t-py-2"
          @click="editar(el.id)"
        >
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
      </template>
    </m-loading>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { useQuasar, Cookies } from 'quasar'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  main = ref(null),
  areas = ref([]),
  dias = ref([]),
  pendiente = ref([]),
  levantado = ref([]),
  tag = ref(Cookies.get('inspec-super-tag') ?? 'reporte')

function editar(id) {
  router.push(`/inspec/obs/edit/${id}`)
}
function reload() {
  Cookies.set('inspec-super-tag', tag.value ?? 'reporte')
  if (tag.value === 'reporte') {
    main.value.get('/labor/super/resumen', (b) => {
      console.log(b)
      b.areas.forEach((e) => {
        for (const k of Object.keys(e)) {
          if (typeof e[k] === 'string') {
            continue
          }
          e[k].clase =
            't-rounded-lg t-w-full t-h-full t-flex t-justify-center t-items-center t-text-lg ' +
            (e[k].cant ? 't-bg-emerald-400' : 't-bg-gray-300')
        }
      })
      areas.value = b.areas
      dias.value = b.dias.map((e) => {
        const dd = dayjs(e)
        return {
          dia: dd.format('DD'),
          mes: dd.format('MMM'),
          fecha: e
        }
      })
    })
  } else if (tag.value === 'pendiente') {
    main.value.get('/labor/super/pendiente', (b) => {
      pendiente.value = b.pendiente
    })
  } else if (tag.value === 'levantado') {
    main.value.get('/labor/super/levantado', (b) => {
      levantado.value = b.levantado
    })
  }
}
onMounted(() => {
  reload()
})
</script>
