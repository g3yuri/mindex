<template>
	<q-page class="q-pa-md q-gutter-md">
		<div>
			<div class="row q-col-gutter-xs">
				<div class="col-1 t-flex t-justify-center t-items-center">
					<div class="t-py-2">Nivel</div>
				</div>
				<div class="col-2 t-flex t-justify-center t-items-center">
					<div class="t-py-2">Labor</div>
				</div>
				<div class="col-1 t-flex t-justify-center t-items-center">
					<div class="t--rotate-45 t-text-center t-py-2">Vent</div>
				</div>
				<div class="col-1 t-flex t-justify-center t-items-center">
					<div class="t--rotate-45 t-text-center t-py-2">Sost</div>
				</div>
				<div class="col-1 t-flex t-justify-center t-items-center">
					<div class="t--rotate-45 t-text-center t-py-2">Barr</div>
				</div>
				<div class="col-1 t-flex t-justify-center t-items-center">
					<div class="t--rotate-45 t-text-center t-py-2">Caja</div>
				</div>
				<div class="col-1 t-flex t-justify-center t-items-center">
					<div class="t--rotate-45 t-text-center t-py-2">Vias</div>
				</div>
				<div class="col-1 t-flex t-justify-center t-items-center">
					<div class="t--rotate-45 t-text-center t-py-2">Bloq</div>
				</div>
				<div class="col-1 t-flex t-justify-center t-items-center">
					<div class="t--rotate-45 t-text-center t-py-2">Reco</div>
				</div>
				<div class="col-1 t-flex t-justify-center t-items-center">
					<div class="t--rotate-45 t-text-center t-py-2">Pane</div>
				</div>
				<div class="col-1"></div>
			</div>
			<div class="row q-col-gutter-xs" @click="router.push('/oper/veo/item')">
				<div class="col-1 t-font-bold t-pt-2">12</div>
				<div class="col-2 t-font-bold t-pt-2">TJ 454</div>
				<div class="col-1">
					<div class="t-bg-red-400 t-w-full t-h-full t-rounded-lg"></div>
				</div>
				<div class="col-1">
					<div class="t-bg-green-400 t-w-full t-h-full t-rounded-lg"></div>
				</div>
				<div class="col-1">
					<div class="t-bg-red-400 t-w-full t-h-full t-rounded-lg"></div>
				</div>
				<div class="col-1">
					<div class="t-bg-red-400 t-w-full t-h-full t-rounded-lg"></div>
				</div>
				<div class="col-1">
					<div class="t-bg-red-400 t-w-full t-h-full t-rounded-lg"></div>
				</div>
				<div class="col-1">
					<div class="t-bg-green-400 t-w-full t-h-full t-rounded-lg"></div>
				</div>
				<div class="col-1">
					<div class="t-bg-red-400 t-w-full t-h-full t-rounded-lg"></div>
				</div>
				<div class="col-1">
					<div class="t-bg-green-400 t-w-full t-h-full t-rounded-lg"></div>
				</div>
				<div class="col-1 t-text-center">
					<q-icon name="o_chevron_right" size="sm"/>
				</div>
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
  qs = useQuasar()
// const props = defineProps(['foo'])

const meta = reactive({
  title: 'VEO'
})
defineExpose({ meta })

onMounted(() => {

})
</script>
