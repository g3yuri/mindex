<template>
	<m-loading ref="main">
		<div class="row q-col-gutter-md q-pa-md">
			<template :key="index" v-for="(el, index) in list">
				<div class="col-sm-6 col-md-4 col-xs-12 t-w-full">
					<div class="row">
						<div class="t-w-28">
							<div class="t-font-bold">#{{el.id}}</div>
							<div>{{el.fecha}}</div>
							<div>{{el.zona}}/{{el.turno}}</div>
						</div>
						<div class="t-w-max">
							<div class="t-font-bold">{{el.nivel}} {{el.labor}}</div>
							<div>{{el.actividad}}</div>
							<div class="t-text-gray-400 t-text-xs">Supervisor: {{el.sup_nombre}}</div>
							<div class="t-text-gray-400 t-text-xs">Jefe de Area: {{el.jefe_nombre}}</div>
						</div>
					</div>
				</div>
			</template>
		</div>
	</m-loading>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  meta = reactive({
    title: 'Petar',
    btn: {
      label: 'Nuevo',
      icon: 'o_save',
      to: '/oper/petar/edit'
    }
  }),
  list = ref([]),
  main = ref(null)
defineExpose({ meta })
// const props = defineProps(['foo'])

onMounted(() => {
  main.value?.get('/petar/list', b => {
    list.value = b.list
  })
})
</script>
