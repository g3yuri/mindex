<template>
	<q-page class="q-pa-md q-gutter-md">
		<div>
			<div class="row q-col-gutter-md">
				<div class="col-xs-12 col-sm-6 col-md-4" :key="index" v-for="(el, index) in list">
					<div class="t-flex t-justify-between t-items-center t-border-2 t-rounded-lg t-p-2">
						<div @click="router.push(`/infra/${index}`)">
							<div class="t-text-xl t-font-bold">{{el.title}}</div>
							<div class="t-text-gray-500 t-italic t-text-xs">Cuerpos {{el.cuerpos?.length??0}}, Vetas {{el.vetas?.length??0}}</div>
						</div>
						<q-icon name="o_chevron_right" size="md"/>
					</div>
				</div>
			</div>
		</div>
	</q-page>
</template>
<script setup>
	import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { useQuasar } from 'quasar'
	import list_infra from './list_infra'
	
	const route = useRoute(),
	router = useRouter(),
	qs = useQuasar();
	const meta = reactive({
		title:'Infraestructura'
	}),
	list = ref(list_infra)
	//const props = defineProps(['foo'])
	defineExpose({meta})
	
	onMounted(()=>{
		
	});
</script>