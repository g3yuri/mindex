<template>
  <q-page class="q-pa-md t-bg-green-800">
    <div>
      <div class="row q-col-gutter-md">
        <div
          :key="el.link"
          v-for="el in list"
          class="col-sm-4 col-md-2 col-xs-6"
          @click="$router.push(el.link)"
        >
          <div
            class="t-flex t-items-center t-justify-center t-border-2 t-rounded-lg t-border-white t-text-white t-text-center t-font-bold t-text-xl t-h-40 t-px-2 t-py-8 hover:t-bg-green-900 hover:cursor-pointer sm:t-py-6"
          >
            {{ el.title }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { link: '/p/politica', title: 'POLITICA' },
        { link: '/p/metas', title: 'OBJETIVOS Y METAS' },
        { link: '/p/msds', title: 'HOJAS MSDS' },
        { link: '/p/pas', title: 'PAS' },
        { link: '/p/gsi', title: 'TABLA GSI' },
        { link: '/p/mapa', title: 'MAPA DE RIESGOS' },
        { link: '/racs/reporte', title: 'RACS' },
        { link: '/p/anexo', title: 'ANEXO EMERGENCIAS 5555' }
      ]
    }
  },
  mounted() {
    this.reload()
  },
  methods: {
    reload() {}
  }
}
</script>
