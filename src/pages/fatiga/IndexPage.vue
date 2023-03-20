<template>
	Hello
</template>
<script setup>
	import { ref, toRefs, reactive, onMounted, computed, watchEffect, watch } from 'vue'
	import { useRoute, useRouter } from 'vue-router'

	const route = useRoute(),
	router = useRouter(),
	main = ref(null),
	list = ref([]);

	onMounted(()=>{
	});
</script>