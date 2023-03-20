<template>
	<m-loading ref="main" class="t-m-4">
		<div class="row q-col-gutter-md">
			<div class="col-xs-4 col-md-2" v-for="el in list">
				<div :class="`t-rounded-lg t-p-2 t-h-14 t-text-center ${el.class}`"
					@click="router.push(`/f/day/${el.fecha}`)" >
					<div>{{el.fecha}}</div>
					<div>{{el.descanso_total}}</div>
				</div>
			</div>
		</div>
	</m-loading>
</template>
<script setup>
	import { ref, onMounted } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	const main = ref(null)
	const list = ref([])
	const router = useRouter()

	function parseColor(b) {
		b.forEach(e=>{
			e.class = 't-bg-gray-300'
			if (e.color=='green') {
				e.class = 't-bg-green-400'
			} else if (e.color == 'yellow') {
				e.class = 't-bg-yellow-400'
			} else if (e.color == 'red') {
				e.class = 't-bg-red-500 t-text-white'
			}
		})
		return b
	}

	onMounted(()=>{
		main.value.get('/fatiga/oper/list',b=> {
			list.value = parseColor(b)
			console.log('list',b)
		})
	})
</script>