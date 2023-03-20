<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row items-center q-my-md">
      <div class="col t-text-2xl t-font-bold t-text-blue-800">CONSULTAS</div>
      <div class="col" style="text-align: right">
        <q-btn unelevated color="primary" label="Actualizar" @click="reload" />
      </div>
    </div>
    <v-chart class="chart" :option="option" />
    <div class="t-flex t-flex-row t-items-center">
      <div class="t-pr-4 t-font-bold t-text-xl">
        {{ payloadDate.from }} hasta {{ payloadDate.to }}
      </div>
      <q-btn rounded unelevated size="xs" color="primary" label="cambiar">
        <q-popup-proxy
          cover
          transition-show="scale"
          transition-hide="scale"
          @before-show="updateProxy"
        >
          <q-date v-model="proxyDate" range mask="YYYY-MM-DD">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn v-close-popup label="Cancel" color="primary" flat />
              <q-btn
                v-close-popup
                label="OK"
                color="primary"
                flat
                @click="query"
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-btn>
    </div>
    <q-dialog v-model="dl.show">
      <q-card style="max-width: 440px; width: 100%">
        <q-card-section>
          <div class="text-h6">Crear nuevo permiso</div>
        </q-card-section>
        <q-card-section>
          <div class="q-col-gutter-md">
            <q-input v-model="dl.id" outlined label="Clave" />
            <q-input v-model="dl.nombre" outlined label="Nombre" />
            <!-- <div class="q-gutter-sm">
              <q-radio v-model="dl.status" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="pause" label="Pause" />
              <q-radio v-model="dl.status" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="normal" label="Normal" />
              </div> -->
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section align="center">
          <q-btn
            :label="dl.mod ? 'Modificar' : 'Crear'"
            rounded
            unelevated
            color="primary"
            @click="agregar"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <m-loading ref="main">
      <q-table
        flat
        bordered
        :rows="todo"
        :columns="columns"
        dense
        color="primary"
        table-header-class="text-primary"
        title=""
        :loading="loading"
        :pagination="initialPagination"
        row-key="id"
        :filter="filter"
        binary-state-sort
      >
        <template #top-right>
          <q-btn flat round icon="refresh" @click="reload" />
          <q-input
            v-model="filter"
            borderless
            dense
            debounce="300"
            placeholder="Buscar"
          >
            <template #append><q-icon name="search" /></template>
          </q-input>
        </template>
      </q-table>
    </m-loading>
  </q-page>
</template>
<script>
import helper from '../../boot/helper'
import dayjs from 'dayjs'
import { exportFile, useQuasar } from 'quasar'

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, defineComponent, provide } from 'vue'

use([
  GridComponent,
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

provide(THEME_KEY, 'dark')

const dl_default = { show: false, status: 'normal' }
export default {
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: 'light'
  },
  data() {
    const from = dayjs().add(-1, 'day').format('YYYY-MM-DD')
    const to = dayjs().format('YYYY-MM-DD')

    return {
      dl: dl_default,
      loading: false,
      todo: [],
      color: {
        normal: 'green',
        pause: 'red'
      },
      filter: '',
      columns: [
        {
          field: 'created_at',
          label: 'FECHA',
          align: 'left',
          sortable: true,
          name: 'fecha'
        },
        {
          field: 'query',
          label: 'DNI',
          align: 'left',
          sortable: true,
          name: 'query'
        },
        {
          field: 'nombre',
          label: 'NOMBRE',
          align: 'left',
          sortable: true,
          name: 'nombre'
        },
        {
          field: 'uuid',
          label: 'LECTOR',
          align: 'center',
          sortable: true,
          name: 'lector'
        }
      ],
      proxyDate: {
        from,
        to
      },
      payloadDate: {
        from,
        to
      },
      initialPagination: {
        rowsPerPage: 50
      },
      option: {}
    }
  },
  mounted() {
    this.reload()
  },
  methods: {
    reload() {
      this.$refs.main.post('/colaborador/query', this.payloadDate, (b) => {
        this.todo = b.list
        this.payloadDate.from = b.from
        this.payloadDate.to = b.to
        console.log('stat', b.stat)
        this.option = {
          xAxis: {
            type: 'category',
            data: b.stat.map((e) => e.fecha)
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              itemStyle: {
                color: 'rgb(29,78,216)'
              },
              label: {
                show: true,
                position: 'inside',
                color: '#fff',
                fontWeight: 'bold'
              },
              data: b.stat.map((e) => e.cant),
              type: 'bar'
            }
          ]
        }
      })
    },
    agregar() {
      this.$m.api.post('/colaborador/permiso/store', this.dl, (b) => {
        this.todo = b
        this.dl = dl_default
      })
    },
    query() {
      const days = dayjs(this.proxyDate.to).diff(
        dayjs(this.proxyDate.from),
        'days'
      )
      console.log('days', days)
      if (days <= 6 && days >= 0) {
        this.payloadDate.from = this.proxyDate.from
        this.payloadDate.to = this.proxyDate.to
        this.reload()
      } else {
        alert(`La diferencia de dias de la consulta es (${days}) mayor a 7`)
      }
    },
    updateProxy() {
      console.log('updateProxy')
    }
  }
}
</script>
<style scoped>
.td-first-bold td:nth-child(1) {
  font-weight: bold;
}
.chart {
  height: 300px;
  max-width: 100%;
  margin: 0;
}
</style>
