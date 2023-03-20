<template>
  <m-loading ref="main" class="row t-w-full t-flex">
    <div class="col-12 col-sm-6">
      <div class="t-font-bold t-text-xl t-text-center t-px-2 t-pt-2">
        Fatiga por Guardias
      </div>
      <div class="t-text-xs t-text-center t-pb-2">Ultimos 30 dias</div>
      <v-chart
        v-if="opt_area"
        ref="main_area"
        class="t-w-full t-text-black"
        style="height: 300px"
        :option="opt_area"
      />
    </div>
    <!-- <div class="col-12 col-sm-6">
      <div class="t-font-bold t-text-xl t-text-center t-px-2 t-pt-2">
        Fatiga por Cargos
      </div>
      <div class="t-text-xs t-text-center t-pb-2">Ultimos 30 dias</div>
      <v-chart
        v-if="opt_cargo"
        ref="main_cargo"
        class="t-w-full t-text-black"
        style="height: 300px"
        :option="opt_cargo"
      />
    </div>
    <div class="col-12 col-sm-6">
      <div class="t-font-bold t-text-xl t-text-center t-px-2 t-pt-2">
        Reportabilidad por Areas
      </div>
      <div class="t-text-xs t-text-center t-pb-2">
        Ultimos 30 dias ( # reportes por operador )
      </div>
      <v-chart
        v-if="opt_repor"
        ref="main_repor"
        class="t-w-full t-text-black"
        style="height: 300px"
        :option="opt_repor"
      />
    </div>
    <div class="col-12 col-sm-6">
      <div class="t-font-bold t-text-xl t-text-center t-px-2 t-pt-2">
        Operadores por Areas
      </div>
      <div class="t-text-xs t-text-center t-pb-2">
        Cantidad de operadores por Areas
      </div>
      <v-chart
        v-if="opt_oper"
        ref="main_oper"
        class="t-w-full t-text-black"
        style="height: 300px"
        :option="opt_oper"
      />
    </div> -->
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

/* import for v-chart */
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

use([
  GridComponent,
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  meta = reactive({
    title: 'Fatiga Dashboard'
  })
const opt_area = ref(null),
  opt_cargo = ref(null),
  opt_repor = ref(null),
  opt_oper = ref(null),
  main_area = ref(null),
  main_cargo = ref(null)
// const props = defineProps(['foo'])
defineExpose({ meta })
function setBarOption(draw, res, key) {
  const order = {}
  res.forEach((e) => {
    const tmp = order[e[key]] ?? { alto: 0, medio: 0, bajo: 0, total: 0 }
    const c = parseInt(e.cant)
    tmp[e.riesgo] = c
    tmp.total += c
    order[e[key]] = tmp
  })
  console.log('order', order)
  const area = []
  const info = { alto: [], medio: [], bajo: [] }
  Object.entries(order).forEach(([k, v]) => {
    area.push(k)
    info.alto.push(Math.round((v.alto * 1000) / v.total) / 10 || 0)
    info.medio.push(Math.round((v.medio * 1000) / v.total) / 10 || 0)
    info.bajo.push(Math.round((v.bajo * 1000) / v.total) / 10 || 0)
  })
  console.log(area, info)

  function printLabel(param) {
    // console.log("printLabel", param);
    return param?.value > 0 ? param?.value + ' %' : ''
  }

  // console.log("setBarOption", draw);
  draw.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    color: ['#5AD8A6', '#F6BD16', '#E8684A'],
    legend: {},
    textStyle: {
      fontWeight: 'bold',
      color: '#000'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        formatter: '{value} %'
      }
    },
    xAxis: {
      type: 'category',
      data: area,
      axisLabel: {
        rotate: area.length > 5 ? 60 : 0,
        interval: 0,
        fontSize: area.length > 3 ? 10 : 12,
        formatter: function (vakue, key) {
          if (vakue?.length < 5) {
            return vakue
          }
          const text = vakue.split(' ')
          return text.filter((e) => e.length > 2).join('\n')
        }
      }
    },
    series: ['bajo', 'medio', 'alto'].map((key) => ({
      name: 'Riesgo ' + key,
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        formatter: printLabel
      },
      emphasis: {
        focus: 'series'
      },
      data: info[key]
    }))
  }
}

function setReporOption(draw, { area, data }) {
  // console.log("setReporOption", res);

  draw.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    color: ['#1e88e5'],
    legend: {},
    textStyle: {
      fontWeight: 'bold',
      color: '#000'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    yAxis: {
      type: 'value',
      axisLabel: {}
    },
    xAxis: {
      type: 'category',
      data: area,
      axisLabel: {
        rotate: 0,
        interval: 0,
        fontSize: area?.length > 3 ? 10 : 12,
        formatter: function (vakue, key) {
          const text = vakue.split(' ')
          return text.filter((e) => e.length > 2).join('\n')
        }
      }
    },
    series: [
      {
        name: 'Reportabilidad',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data
      }
    ]
  }
}

const main = ref(null)

function reload() {
  main.value.get('/fatiga/super/dashboard', (b) => {
    console.log('super', b)
    // eliminar datos repetidos
    setBarOption(opt_area, b.guardia, 'guardia')
    // setBarOption(opt_cargo, b.cargo, "cargo");
    // setReporOption(opt_repor, {
    //   area: b.repor.map((e) => e.area),
    //   data: b.repor.map((e) => Math.round((e.cant * 10) / e.total) / 10),
    // });
    // setReporOption(opt_oper, {
    //   area: b.repor.map((e) => e.area),
    //   data: b.repor.map((e) => e.total),
    // });
  })
}
onMounted(() => {
  reload()
})
</script>
