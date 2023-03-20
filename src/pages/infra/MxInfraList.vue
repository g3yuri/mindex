<template>
	<q-page class="q-pa-md q-gutter-md">
		<div>
			<div class="row q-col-gutter-md">
				<div class="t-font-bold t-text-xl">Cuerpos</div>
				<div class="col-12" :key="index" v-for="(el, index) in list.cuerpos">
					<div class="t-font-bold t-text-lg">{{el.nivel}} {{el.labor}}</div>
				</div>
				<div class="t-font-bold t-text-xl">Vetas</div>
				<div class="col-12" :key="index" v-for="(el, index) in list.cuerpos">
					<div class="t-font-bold t-text-lg">{{el.nivel}} {{el.labor}}</div>
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
	qs = useQuasar()

	const initial = list_infra[route.params?.item]
	const list = ref(initial)
	//const props = defineProps(['foo'])

	const meta = reactive({
		title:initial.title
	})
	defineExpose({meta})
	
	onMounted(()=>{
		
	});
</script>