<template>
	<m-loading ref="main">
		Reporte de operacion::
		<div>{{list}}</div>
	</m-loading>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  main = ref(null),
  list = ref([])

onMounted(() => {
  main.value.get('/labor/resumen/super', b => {
    console.log(b)
    list.value = b
  })
})
</script>
