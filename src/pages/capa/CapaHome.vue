<template>
  <m-loading ref="main" style="height: 100%">
    <m-table
      :data="list"
      :columns="[
        { field: 'dni', label: 'dni' },
        { field: 'curso', label: 'Curso' },
        { field: 'fecha', label: 'fecha' }
      ]"
      v-bind="{ dense: false }"
    />
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
  main = ref(null),
  meta = reactive({
    title: 'Cursos'
  }),
  list = ref([])
// const props = defineProps(['foo'])
defineExpose({ meta })

function reload() {
  main.value?.get('/capa/certificado/list', (b) => {
    list.value = b.cursos
  })
}

onMounted(() => {
  reload()
})
</script>
