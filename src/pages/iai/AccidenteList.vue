<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row items-center q-my-md">
      <div class="col t-text-2xl t-font-bold">Listar</div>
      <div class="col" style="text-align: right">
        <q-btn unelevated color="primary" label="Crear" icon="o_add" />
      </div>
    </div>
    <div ref="main">
      <div class="row q-col-gutter-md">
        <div class="col-4"></div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  { mes } = route.query,
  main = ref(null),
  list = ref([])

onMounted(() => {
  console.log('route', route.query)
  if (mes) {
    main.value.post('/iai/query', { mes }, (b) => {
      list.value = b
    })
  }
})
</script>
