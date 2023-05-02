<template>
  <oper-edit-dialog ref="doper" />
  <q-dialog v-model="dl.show">
    <q-card style="width: 100%; height: 100%">
      <q-card-section class="t-h-full">
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="primary"
          navigation
          padding
          arrows
          class="t-h-full bg-grey-1 shadow-2 rounded-borders"
        >
          <q-carousel-slide
            v-for="(el, index) in dl.link"
            :key="index"
            :name="1"
            class=""
          >
            <q-img class="rounded-borders col-6 full-height" :src="el" />
          </q-carousel-slide>
        </q-carousel>
        <div class="t-w-full t-text-center t-p-4">
          <q-btn
            label="Editar Reporte"
            rounded
            unelevated
            color="primary"
            @click="router.push(`/fatiga/operador/${dl.dni}/${dl.fecha}`)"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="dreg.show">
    <q-card style="max-width: 440px; width: 100%">
      <m-loading ref="mreg">
        <q-card-section>
          <div class="text-h6">Descargar registros</div>
        </q-card-section>
        <q-card-section>
          <q-date v-model="dreg.value" range />
          <div>{{ dreg.value }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section align="center">
          <q-btn
            :disable="!(dreg.value?.from && dreg.value?.to)"
            label="Descargar"
            rounded
            unelevated
            color="primary"
            @click="descargar(dreg.value?.from, dreg.value?.to)"
          />
        </q-card-section>
      </m-loading>
    </q-card>
  </q-dialog>
  <m-loading
    ref="main"
    class="sm:t-p-3 t-p-0"
    :style="tag === 'personal' && 'height: 100%;'"
  >
    <template v-if="tag === 'personal'">
      <q-table
        flat
        bordered
        :rows="list"
        :columns="columns"
        dense
        color="primary"
        title=""
        :loading="loading"
        row-key="ID"
        :filter="filter"
        virtual-scroll
        :pagination="{ rowsPerPage: 20 }"
        binary-state-sort
        style="height: 100%; min-height: 100%"
      >
        <template #top-left>
          <q-btn
            label="Agregar operador"
            flat
            icon="o_add"
            unelevated
            color="primary"
            @click="() => doper.open()"
          />
        </template>
        <template #top-right>
          <q-input
            v-model="filter"
            outlined
            rounded
            dense
            debounce="300"
            placeholder="Buscar"
            input-class="t-text-sm t-font-bold t-pl-2"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template #body="inf">
          <q-tr :props="inf" @click="doper.open(inf.row)">
            <q-td key="dni" :props="inf">
              {{ inf.row.dni }}
            </q-td>
            <q-td key="nombres" :props="inf">
              {{ inf.row.nombres }}
            </q-td>
            <q-td key="area" :props="inf">
              {{ inf.row.area }}
            </q-td>
            <q-td key="celular" :props="inf">
              {{ inf.row.celular }}
            </q-td>
            <q-td key="correo" :props="inf">
              {{ inf.row.correo }}
            </q-td>
          </q-tr>
        </template>
        <template #header="inf">
          <q-tr :props="inf" class="t-sticky t-bg-white t-z-10">
            <q-th
              v-for="col in inf.cols"
              :key="col.name"
              :props="inf"
              class="t-sticky t-top-0"
            >
              <span class="t-font-bold t-text-sm">{{ col.label }}</span>
            </q-th>
          </q-tr>
        </template>
      </q-table>
    </template>
    <template v-else>
      <div class="t-w-full t-flex">
        <div
          :class="`t-px-1 t-h-14 t-w-2/5 t-text-center t-flex t-items-center t-justify-center`"
        >
          <div class="t-font-bold t-text-xl t-text-center">Operador</div>
        </div>
        <div
          v-for="(el, index) in days"
          :key="index"
          :class="`t-px-1 t-h-14 t-w-1/5 t-text-center`"
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
      <template v-for="(area, aidx) in data" :key="aidx">
        <div class="t-font-bold t-text-xl t-text-center">
          {{ area.area }}
        </div>
        <div
          v-for="(el, elix) in area.datos"
          :key="elix"
          class="t-w-full t-flex"
        >
          <div
            class="t-p-1 t-h-14 t-w-2/5"
            @click="router.push(`/fatiga/operador/${el.persona.dni}`)"
          >
            <div
              class="t-font-bold t-text-xs t-h-full t-rounded-lg t-border-2 t-border-gray-300 t-flex t-items-center t-p-1"
            >
              {{ el.persona.nombres }}
            </div>
          </div>
          <div
            v-for="(dy, dyix) in days"
            :key="dyix"
            :class="`t-p-1 t-h-14 t-w-1/5 t-text-center`"
            @click="
              () => {
                dl.link = el[dy.fecha].link
                dl.fecha = dy.fecha
                dl.dni = el.persona.dni
                dl.show = true
              }
            "
          >
            <div v-if="el[dy.fecha]?.descanso_fm" :class="el[dy.fecha].clase">
              {{ el[dy.fecha].descanso_fm }}
            </div>
            <div v-else class="t-rounded-lg t-bg-gray-300 t-w-full t-h-full" />
          </div>
        </div>
      </template>
    </template>
  </m-loading>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar, Cookies, exportFile } from 'quasar'
import OperEditDialog from './components/OperEditDialog.vue'
import dayjs from 'dayjs'
import helper from '../../boot/helper'

const tag_raw = Cookies.get('fat-supervisor-tag')

const route = useRoute()
const router = useRouter()
const qs = useQuasar()
const list = ref([])
const list_sin = ref([])
const main = ref(null)
const ldg_dadd = ref(null)
const doper = ref(null)
const columns = ref([
  { field: 'dni', label: 'DNI', align: 'left', sortable: true, name: 'dni' },
  {
    field: 'nombres',
    label: 'NOMBRES',
    align: 'left',
    sortable: true,
    name: 'nombres'
  },
  {
    field: 'area',
    label: 'AREA',
    align: 'left',
    sortable: true,
    name: 'area'
  },
  {
    field: 'celular',
    label: 'CELULAR',
    align: 'left',
    sortable: true,
    name: 'celular'
  },
  {
    field: 'correo',
    label: 'CORREO',
    align: 'center',
    sortable: true,
    name: 'correo'
  }
])
const loading = ref(false)
const filter = ref('')
const columns_sin = ref([
  { field: 'dni', label: 'DNI', align: 'left', sortable: true, name: 'dni' },
  {
    field: 'nombres',
    label: 'NOMBRES',
    align: 'left',
    sortable: true,
    name: 'nombres'
  },
  {
    field: 'area',
    label: 'AREA',
    align: 'left',
    sortable: true,
    name: 'area'
  },
  {
    field: 'celular',
    label: 'CELULAR',
    align: 'left',
    sortable: true,
    name: 'celular'
  },
  {
    field: 'correo',
    label: 'CORREO',
    align: 'center',
    sortable: true,
    name: 'correo'
  }
])
const loading_sin = ref(false)
const filter_sin = ref('')
const areas_raw = helper.secciones()
const tag = ref(
  tag_raw === 'A' || tag_raw === 'B' || tag_raw === 'C' ? tag_raw : 'personal'
)
const dl = reactive({ show: false, link: null, dni: null, fecha: null })
const slide = ref(1)
const dreg = reactive({ show: false, value: {} })
const mreg = ref(null)
const dadd = reactive({ show: false, value: null })

const props = defineProps({
  scope: {
    type: String,
    default: ''
  }
})

const meta = computed(() => ({
  title: `${
    typeof props.scope === 'string'
      ? props.scope.charAt(0).toUpperCase() + props.scope.slice(1)
      : ''
  }`,
  btn: {
    label: 'Exportar',
    icon: 'o_add',
    click: () => {
      dreg.show = true
      console.log('aqui:', dreg.show)
    }
  }
}))
defineExpose({ meta })

const days = ref([])
const data = ref([])

const areas = computed(() => Object.values(areas_raw.value || {}))

watch(props, () => {
  tag.value = props.scope
  console.log('route', route)
  reload()
})

function descargar(from, to) {
  from = dayjs(from).format('YYYY-MM-DD')
  to = dayjs(to).format('YYYY-MM-DD')

  main.value.get(`/fatiga/admin/report/download/${from}/${to}`, (b) => {
    exportFile(b.filename, b.content, b.mimeType)
  })
}

function reload() {
  const v = tag.value
  Cookies.set('fat-supervisor-tag', v)

  if (v === 'personal') {
    main.value.get('/fatiga/admin/list', (b) => {
      list.value = b.list
      list_sin.value = b.sin
    })
  } else if (v === 'A' || v === 'B' || v === 'C') {
    main.value.get(`/fatiga/admin/guardia/${v}`, (b) => {
      // guardia[v] = b.list
      b.datos.forEach((ar) => {
        ar.datos.forEach((e) => {
          for (const k of Object.keys(e)) {
            if (e.dni || !e[k].descanso) continue
            // console.log(e, k, Object.keys(e))
            const tm = (e[k].descanso = parseInt(e[k].descanso))
            e[k].descanso_fm = `${Math.floor(tm / 60)}:${
              tm - 60 * Math.floor(tm / 60)
            }`
            // prettier-ignore
            e[k].clase =
              't-rounded-lg t-w-full t-h-full t-flex t-justify-center t-items-center t-text-lg ' +
              (e[k].descanso < 270
                ? 't-bg-red-500'
                : e[k].descanso < 330
                  ? 't-bg-yellow-400'
                  : 't-bg-green-300')
            e[k].link = e[k].link?.split('@@')
          }
        })
      })
      console.log('reportev2.reload.b', b)
      data.value = b.datos
      days.value = b.dias.map((e) => {
        const dd = dayjs(e)
        return {
          dia: dd.format('DD'),
          mes: dd.format('MMM'),
          fecha: e
        }
      })
    })
  }
}
onMounted(reload)
</script>
