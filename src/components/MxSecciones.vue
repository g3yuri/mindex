<template>
	<q-select
		ref="sele"
		stack-label
		outlined
		:model-value="props.modelValue"
		:label="props.label"
		:options="areas"
		@update:model-value="update"
		:loading="loading"
		behavior="menu"
	/>
</template>
<script setup>
	import { ref, reactive, onMounted, computed, watchEffect, watch, nextTick } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { useQuasar } from 'quasar'
	import helper from '../boot/helper.js'
	
	const route = useRoute(),
	router = useRouter(),
	qs = useQuasar(),
	options = ref([]),
	loading = ref(false),
	areas_raw = helper.secciones(),
	sele = ref(null);

	const props = defineProps({
	    modelValue: [Object, String],
	    label: String
	})

	const areas = computed(() => Object.values(areas_raw.value || {}));
	const emit = defineEmits(['update:modelValue'])
	//defineExpose({})


	function update(val) {
		console.log('update.internal', val, props.modelValue)
		//value.value = val
		emit('update:modelValue', val)
	}
	
	onMounted(()=>{
		
	});
</script>