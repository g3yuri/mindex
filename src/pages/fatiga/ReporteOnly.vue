<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row items-center q-my-md">
      <div class="col t-text-2xl t-font-bold t-text-blue-800">Reporte</div>
      <div class="col" style="text-align: right">
        <q-btn
          class="t-ml-4"
          unelevated
          color="primary"
          :label="!$q.screen.lt.sm ? 'Personal' : undefined"
          icon="person"
          @click="reload"
        />
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
    <div>
      <q-dialog v-model="dl.show">
        <q-card style="max-width: 440px; width: 100%">
          <q-card-section>
            <div class="text-h6">Registro Fotografico</div>
          </q-card-section>
          <q-card-section>
            <!-- <m-loading ref="dial">
							<img v-for="el in screen" :src="el" />
						</m-loading> -->
            <img
              :src="`https://slim.gmi.gd.pe/storage/fatiga/${dl.dni}/${dl.fecha}`"
            />
          </q-card-section>
          <q-separator />
          <q-card-section align="center"> </q-card-section>
        </q-card>
      </q-dialog>
      <q-markup-table flat>
        <thead class="t-bg-indigo-800 t-text-white">
          <tr>
            <th class="text-left">Operador</th>
            <th v-for="(el, index) in days" :key="index" class="text-center">
              {{ el }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(el, idx) in data" :key="idx">
            <td class="text-left">{{ el.nombre }}</td>
            <td
              :key="numx"
              v-for="(dy, numx) in days"
              @click="display(el.dni, dy)"
              :class="el.semaforo[dy] ? el.semaforo[dy] : 't-bg-gray-300'"
            >
              {{ el.descanso[dy] }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>
<script>
import { nextTick } from 'vue'
export default {
  data() {
    return {
      days: [],
      data: [],
      dl: { show: false },
      screen: []
    }
  },
  mounted() {
    this.reload()
  },
  methods: {
    async display(dni, fecha) {
      this.dl = {
        show: true,
        dni,
        fecha
      }
      // await nextTick()
      // this.$refs.dial.get(`/personal/screen/${dni}/${fecha}`,b=>{
      // 	this.screen = b
      // })
    },
    reload() {
      this.$m.api.get('/fatiga/reporte', (b) => {
        const fod = {}
        b.forEach((e) => {
          e.descanso = {}
          e.semaforo = {}
          const d = e.tiempo.split(',')
          d.forEach((i) => {
            const p = i.split('#')
            e.descanso[p[0]] = p[1]
            let t = p[1].split(':')
            t = parseInt(t[0]) + parseInt(t[1]) / 60
            e.semaforo[p[0]] =
              't-text-center t-font-bold ' +
              (t > 5.5 ? 'bg-green' : t < 4 ? 'bg-red' : 'bg-yellow')

            fod[p[0]] = p[1]
          })
        })
        this.data = b
        this.days = Object.keys(fod)
      })
    }
  }
}
</script>
