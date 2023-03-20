<template>
	<q-page class="q-pa-md q-gutter-md">
		<div class="row items-center q-my-md">
			<div class="col t-text-2xl t-font-bold t-text-blue-800">Datos de {{route?.params?.dni}}</div>
			<div class="col" style="text-align: right;">
				<q-btn unelevated color="primary" @click="lectura" label="Lectura" />
			</div>
		</div>
		<div>
			<m-loading ref="main">
				<q-table flat bordered :rows="todo" :columns="columns" dense
					color="primary"
					table-header-class="text-primary"
					title="Permisos"
					:loading="loading"
					:pagination="initialPagination"
					row-key="id"
					binary-state-sort>
					<template v-slot:top-right>
						<q-btn flat round icon="refresh" @click="reload"/>
						<q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
							<template v-slot:append><q-icon name="search" /></template>
						</q-input>
					</template>
					<template v-slot:body="props">
				        <q-tr :props="props">
				          <q-td key="dni" :props="props">
				            <q-btn size="sm" color="accent" round flat dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
				            {{ props.row.dni }}
				          </q-td>
				          <q-td key="startTimeMillis" :props="props">
				              {{ props.row.startTimeMillis }}
				          </q-td>
				          <q-td key="endTimeMillis" :props="props">
				              {{ props.row.endTimeMillis }}
				          </q-td>
				          <q-td key="total" :props="props">
				              {{ props.row.total }}
				          </q-td>
				        </q-tr>
				        <q-tr v-show="props.expand" :props="props">
				          <q-td colspan="100%">
				              <!-- <div class="text-left">despierto: {{ props.row.despierto }}</div>
				              <div class="text-left">dormido: {{ props.row.dormido }}</div>
				              <div class="text-left">fuera: {{ props.row.fuera }}</div> -->
				              <div class="text-left">{{ props.row.dormido }} {{ props.row.fuera }}</div>
				              <div class="text-left">despierto: {{ props.row.despierto }}</div>
				              <div class="text-left">ligero: {{ props.row.ligero }}</div>
				              <div class="text-left">profundo: {{ props.row.profundo }}</div>
				              <div class="text-left">rem: {{ props.row.rem }}</div>
				          </q-td>
				        </q-tr>
				    </template>
				</q-table>
			</m-loading>
			<pre>{{JSON.stringify(message,null,4)}}</pre>
		</div>
	</q-page>
</template>
<script>
	import { Cookies } from 'quasar'
	import { useQuasar } from 'quasar'
	import { reactive, ref, computed } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	import helper from '../../boot/helper'

	function formatHoursFromNano(nano) {
		var seconds = Math.floor(nano/1000000000),
			hours = '' + Math.floor(seconds/3600),
			minutes = '' + Math.floor((seconds-hours*3600)/60)

			seconds = '' + (seconds % 60)
			return [hours, minutes, seconds].join(':')
	}

	export default{
		setup () {
		  const $q = useQuasar()
		  const main = ref(null)
		  const todo = ref([])
		  const router = useRouter()
		  const route = useRoute()
		  const columns = ref([
					{field:'dni',label: 'dni', align:'center',sortable: true, name: 'dni'},
					{field:'startTimeMillis',label: 'startTimeMillis', align:'center',sortable: true, name: 'startTimeMillis'},
					{field:'endTimeMillis',label: 'endTimeMillis', align:'center',sortable: true, name: 'endTimeMillis'},
					{field:'total',label: 'total', align:'center',sortable: true, name: 'total'},
				])
		  const loading = ref(false)
		  const filter = ref(null)
		  const message = ref(null)
		  const dni = route?.params?.dni
		  const parse = (list) => {
				list.forEach(e=>{
					if (e.despierto) {
						e.despierto = formatHoursFromNano(parseInt(e.despierto))
					}
					if (e.dormido) {
						e.dormido = formatHoursFromNano(parseInt(e.dormido))
					}
					if (e.fuera) {
						e.fuera = formatHoursFromNano(parseInt(e.fuera))
					}
					e.ligero = formatHoursFromNano(parseInt(e.ligero))
					e.profundo = formatHoursFromNano(parseInt(e.profundo))
					e.rem = formatHoursFromNano(parseInt(e.rem))
					e.startTimeMillis = helper.formatDateHour(parseInt(e.startTimeMillis))
					e.endTimeMillis = helper.formatDateHour(parseInt(e.endTimeMillis))
					e.total = formatHoursFromNano(parseInt(e.total))
				})
				return list
		  }

		  const reload = ()=>{
			console.log('reload', dni)
			if (!dni) return

			main.value.get(`/fatiga/datos/${dni}`,b=>{
				console.log('datos.ok',b)
				todo.value = parse(b.list)
			})
		  }
		  const refresh = () => {
			main.value.post('/fatiga/oauth/refresh',{dni},b=>{
				console.log('refresh.ok',b)
				todo.value = parse(b.list)
			})
		  }
		  const lectura = () => {
			main.value.post('/fatiga/datos/lectura',{dni},b=>{
				console.log('refresh.ok',b)
				todo.value = parse(b.list)
				message.value = b
			})
		  }
		  return {
		  	reload,
		  	main,
		  	columns,
		  	todo,
		  	loading,
		  	filter,
		  	router,
		  	route,
		  	refresh,
		  	message,
		  	lectura,
		  	initialPagination: {
		        rowsPerPage: 50
		      },
		  }
		},
		mounted(){ this.reload() },
		methods:{
		}
	}
</script>