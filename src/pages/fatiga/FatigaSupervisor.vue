<template>
  <oper-edit-dialog ref="editoper" @update="reload" />
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
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- <div class="t-w-full t-p-2">
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
      :options="[
        { label: 'Personal', value: 'personal' },
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
      ]"
    />
  </div> -->
  <m-loading
    ref="main"
    class="sm:t-p-3 t-p-0"
    :style="tag == 'personal' && 'height: 100%;'"
  >
    <template v-if="tag == 'dashboard'"> dashboard </template>
    <template v-else-if="tag == 'personal'">
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
      <!-- <div class="q-pa-sm">
        <q-btn
          label="Descargar registro"
          rounded
          unelevated
          color="primary"
          @click="dreg.show = true"
        />
      </div> -->
      <q-table
        flat
        bordered
        :rows="list"
        :columns="columns"
        dense
        color="primary"
        table-header-class="text-primary"
        title=""
        :loading="loading"
        row-key="ID"
        :filter="filter"
        :pagination="{ rowsPerPage: 100 }"
        binary-state-sort
        virtual-scroll
        style="height: 100%"
      >
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
            <template #append><q-icon name="search" /></template>
          </q-input>
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
        <template #body="row">
          <q-tr :props="row" @click="editoper.open(row.row)">
            <q-td key="area" :props="row">
              {{ row.row.area }}
            </q-td>
            <q-td key="fecha" :props="row">
              <template v-if="row.row.fecha">{{ row.row.fecha }}</template>
              <div
                v-else
                class="t-bg-red-500 t-text-white t-px-2 t-font-bold t-rounded-lg"
              >
                Sin datos
              </div>
            </q-td>
            <q-td key="dni" :props="row">
              {{ row.row.dni }}
            </q-td>
            <q-td key="nombres" :props="row">
              {{ row.row.nombres }}
            </q-td>
            <q-td key="celular" :props="row">
              <template v-if="row.row.celular">{{ row.row.celular }}</template>
              <div
                v-else
                class="t-bg-red-500 t-text-white t-px-2 t-font-bold t-rounded-lg"
              >
                Sin datos
              </div>
            </q-td>
            <q-td key="correo" :props="row">
              <template v-if="row.row.correo">{{ row.row.correo }}</template>
              <div
                v-else
                class="t-bg-red-500 t-text-white t-px-2 t-font-bold t-rounded-lg"
              >
                Sin datos
              </div>
            </q-td>
            <q-td key="turno" :props="row">
              <template v-if="row.row.turno">{{ row.row.turno }}</template>
              <div
                v-else
                class="t-bg-red-500 t-text-white t-px-2 t-font-bold t-rounded-lg"
              >
                Sin datos
              </div>
            </q-td>
            <q-td key="guardia" :props="row">
              <template v-if="row.row.guardia">{{ row.row.guardia }}</template>
              <div
                v-else
                class="t-bg-red-500 t-text-white t-px-2 t-font-bold t-rounded-lg"
              >
                Sin datos
              </div>
            </q-td>
            <q-td key="equipo" :props="row">
              <template v-if="row.row.fecha">{{ row.row.fecha }}</template>
              <div
                v-else
                class="t-bg-red-500 t-text-white t-px-2 t-font-bold t-rounded-lg"
              >
                Sin datos
              </div>
            </q-td>
            <q-td key="descanso" :props="row">
              <template v-if="row.row.descanso">{{
                row.row.descanso
              }}</template>
              <div
                v-else
                class="t-bg-red-500 t-text-white t-px-2 t-font-bold t-rounded-lg"
              >
                Sin datos
              </div>
            </q-td>
            <q-td key="tprofundo" :props="row">
              <template v-if="row.row.tprofundo">{{
                row.row.tprofundo
              }}</template>
              <div
                v-else
                class="t-bg-red-500 t-text-white t-px-2 t-font-bold t-rounded-lg"
              >
                Sin datos
              </div>
            </q-td>
            <q-td key="tligero" :props="row">
              <template v-if="row.row.tligero">{{ row.row.tligero }}</template>
              <div
                v-else
                class="t-bg-red-500 t-text-white t-px-2 t-font-bold t-rounded-lg"
              >
                Sin datos
              </div>
            </q-td>
            <q-td key="trem" :props="row">
              <template v-if="row.row.trem">{{ row.row.trem }}</template>
              <div
                v-else
                class="t-bg-red-500 t-text-white t-px-2 t-font-bold t-rounded-lg"
              >
                Sin datos
              </div>
            </q-td>
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
            <div class="t-font-bold t-text-xl t-text-center">{{ el.dia }}</div>
            <div class="t-uppercase t-text-gray-400 t-text-center">
              {{ el.mes }}
            </div>
          </div>
        </div>
      </div>

      <div v-for="(el, index) in data" :key="index" class="t-w-full t-flex">
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
          v-for="(dy, clave) in days"
          :key="clave"
          :class="`t-p-1 t-h-14 t-w-1/5 t-text-center`"
          @click="()=>{
            dl.link = el.datos[dy.fecha]?.link ?? []
            dl.show = true
          }
          "
        >
          <div
            v-if="el.datos[dy.fecha]?.descanso_fm"
            :class="el.datos[dy.fecha].clase"
          >
            {{ el.datos[dy.fecha].descanso_fm }}
          </div>
          <div
            v-else
            class="t-rounded-lg t-bg-gray-300 t-w-full t-h-full"
          ></div>
        </div>
      </div>
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

const editoper = ref(null)
const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  list = ref([]),
  guardia = reactive({
    A: null,
    B: null,
    C: null
  }),
  main = ref(null),
  columns = ref([
    {
      field: 'area',
      label: 'AREA',
      align: 'left',
      sortable: true,
      name: 'area'
    },
    {
      field: 'fecha',
      label: 'FECHA',
      align: 'left',
      sortable: true,
      name: 'fecha'
    },
    { field: 'dni', label: 'DNI', align: 'left', sortable: true, name: 'dni' },
    {
      field: 'nombres',
      label: 'NOMBRES',
      align: 'left',
      sortable: true,
      name: 'nombres'
    },
    {
      field: 'celular',
      label: 'CELULAR',
      align: 'center',
      sortable: true,
      name: 'celular'
    },
    {
      field: 'correo',
      label: 'CORREO',
      align: 'center',
      sortable: true,
      name: 'correo'
    },
    {
      field: 'turno',
      label: 'TURNO',
      align: 'center',
      sortable: true,
      name: 'turno'
    },
    {
      field: 'guardia',
      label: 'GUARDIA',
      align: 'center',
      sortable: true,
      name: 'guardia'
    },
    {
      field: 'equipo',
      label: 'EQUIPO',
      align: 'center',
      sortable: true,
      name: 'equipo'
    },
    {
      field: 'descanso',
      label: 'DESCANSO',
      align: 'center',
      sortable: true,
      name: 'descanso'
    }
    // {
    //   field: "tprofundo",
    //   label: "T. PROFUNDO",
    //   align: "center",
    //   sortable: true,
    //   name: "tprofundo",
    // },
    // {
    //   field: "tligero",
    //   label: "T. LIGERO",
    //   align: "center",
    //   sortable: true,
    //   name: "tligero",
    // },
    // {
    //   field: "trem",
    //   label: "T. REM",
    //   align: "center",
    //   sortable: true,
    //   name: "trem",
    // },
  ]),
  loading = ref(false),
  filter = ref(''),
  areas_raw = helper.secciones(),
  dl = reactive({ show: false, link: null }),
  dreg = reactive({ show: false, value: {} }),
  slide = ref(1)
const props = defineProps({
  scope: {
    type: String,
    default: 'dashboard'
  }
})
const tag = ref(props.scope)
const meta = computed(() => ({
  title: `${props.scope}`,
  btn: {
    label: 'Descargar registro',
    icon: 'o_cloud_download',
    click: () => {
      dreg.show = true
    }
  }
}))
defineExpose({ meta })

const days = ref([])
const data = ref([])
const areas = computed(() => Object.values(areas_raw.value || {}))

function descargar(from, to) {
  from = dayjs(from).format('YYYY-MM-DD')
  to = dayjs(to).format('YYYY-MM-DD')

  main.value.get(`/fatiga/admin/report/download/${from}/${to}`, (b) => {
    exportFile(b.filename, b.content, b.mimeType)
  })
}

watch(props, () => {
  tag.value = props.scope
  reload()
})

function reload() {
  const v = tag.value
  Cookies.set('fat-supervisor-tag', v)
  // console.log("v", v);

  if (v === 'dashboard') {
    main.value.get('/fatiga/super/dashboard', (b) => {
      console.log('super dashboard', b)
    })
  } else if (v === 'personal') {
    main.value.get('/fatiga/super/list', (b) => {
      list.value = b.list
    })
  } else if (v === 'A' || v === 'B' || v === 'C') {
    main.value.get(`/fatiga/super/guardia/${v}`, (b) => {
      console.log(`guardia:${props.scope}`, b)
      // guardia[v] = b.list
      b.datos.forEach((e) => {
        for (const k in e.datos) {
          const tm = (e.datos[k].descanso = parseInt(e.datos[k].descanso))
          e.datos[k].descanso_fm = `${Math.floor(tm / 60)}:${
            tm - 60 * Math.floor(tm / 60)
          }`
          e.datos[k].clase =
            't-w-full t-h-full t-flex t-justify-center t-items-center t-text-lg ' +
            (e.datos[k].descanso < 270
              ? 't-bg-red-500'
              : e.datos[k].descanso < 330
                ? 't-bg-yellow-400'
                : 't-bg-green-300')

          e.datos[k].link = e.datos[k].link?.split('@@')
        }
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
watch(tag, () => {
  reload()
})

onMounted(() => {
  reload()
})
</script>
