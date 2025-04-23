<template>
  <modal-form-seguimiento v-model="form_show" @stored="reload" />
  <m-loading ref="main" style="height: 100%">
    <m-table
      :data="list"
      :columns="[{ field: 'curso', label: 'Curso' }]"
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
  useAttrs,
  provide
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import ModalFormSeguimiento from './coms/ModalFormSeguimiento.vue'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  form_show = ref(false),
  meta = reactive({
    title: 'Seguimiento',
    btn: {
      label: 'Agregar',
      click: () => {
        form_show.value = true
      }
    }
  }),
  list = ref([]),
  main = ref(null),
  seg_tipos = ref([]),
  seg_areas = ref([])
provide('seguimiento.tipos', seg_tipos)
provide('seguimiento.areas', seg_areas)
// const props = defineProps(['foo'])
defineExpose({ meta })

function reload() {
  main.value?.get('/seguimiento/init', (b) => {
    seg_tipos.value = b.tipos
    seg_areas.value = b.areas
    console.log('Result', b)
  })
}

onMounted(() => {
  reload()
})
</script>
