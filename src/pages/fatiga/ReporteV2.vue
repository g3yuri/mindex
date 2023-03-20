<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row items-center q-my-md">
      <div class="col t-text-2xl t-font-bold t-text-blue-800">Reporte</div>
      <div class="col" style="text-align: right">
        <q-btn
          class="t-ml-4"
          unelevated
          color="primary"
          :label="!$q.screen.lt.sm ? 'Actualizar' : undefined"
          icon="refresh"
          @click="reload"
        />
      </div>
    </div>
    <q-dialog v-model="dl.show">
      <q-card style="max-width: 440px; width: 100%">
        <q-card-section>
          <div class="text-h6">Registro Fotografico</div>
        </q-card-section>
        <q-card-section>
          <!-- <m-loading ref="dial">
						<img v-for="el in screen" :src="el" />
					</m-loading> -->
          <q-img loading :src="dl.link" />
        </q-card-section>
        <q-separator />
        <q-card-section align="center"> </q-card-section>
      </q-card>
    </q-dialog>
    <q-select
      class="q-py-md"
      outlined
      v-model="grupo"
      label="Grupo"
      option-value="grupo"
      option-label="grupo"
      :options="grupo_list"
      @update:model-value="search"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">Sin resultado</q-item-section>
        </q-item>
      </template>
    </q-select>
    <m-loading ref="main">
      <q-markup-table flat>
        <thead class="t-bg-indigo-800 t-text-white">
          <tr>
            <th class="text-left">Operador</th>
            <th
              :key="key"
              style="padding: 0 !important"
              v-for="(el, key) in days"
              class="text-center"
            >
              {{ el }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            :key="key"
            v-for="(el, key) in data"
            @click="router.push(`/fatiga/operador/${el.persona.dni}`)"
          >
            <td class="text-left" style="max-width: 60px; white-space: normal">
              {{ el.persona.nombres }}
            </td>
            <td
              :key="key"
              style="padding: 0 !important"
              v-for="(dy, key) in days"
              class="t-p-0"
            >
              <div
                v-if="el.datos[dy]"
                :class="el.datos[dy].clase"
                @click="()=>{
                  dl.link = el.datos[dy].link
                  dl.show = true
                }
                "
              >
                {{ el.datos[dy].descanso_fm }}
              </div>
              <div v-else class="t-bg-gray-300 t-w-full t-h-full"></div>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </m-loading>
  </q-page>
</template>
<script setup>
import { nextTick, onMounted, ref, reactive } from 'vue'
import { Cookies } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

const days = ref([])
const data = ref([])
const dl = reactive({ show: false })
// const screen = ref( [])
// const semaforo = ref([])
// const seccion = ref(Cookies.get('seccion'))
// const guardia = ref(Cookies.get('guardia'))
const grupo = ref(Cookies.get('grupo') ?? [])
const grupo_list = ref(null)
const main = ref(null)

function reload() {
  main.value.get('/fatiga/grupos', (b) => {
    grupo_list.value = b.grupos
  })
}

onMounted(reload)

async function display(dni, fecha) {
  dl.show = true
  dl.dni = dni
  dl.fecha = fecha
}

function search() {
  console.log('reporteV2.search.grupo', grupo.value)
  // Cookies.set('seccion',grupo?.seccion)
  // Cookies.set('guardia',grupo?.guardia)
  Cookies.set('grupo', grupo?.value)

  // if (!guardia.value || !seccion.value)
  // 	return

  main.value.post('/fatiga/reporteV2', grupo.value, (b) => {
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
      }
    })
    console.log('reportev2.reload.b', b)
    data.value = b.datos
    days.value = b.dias
  })
}
</script>
