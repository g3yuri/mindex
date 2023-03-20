<template>
	<q-page class="q-pa-md q-gutter-md">
		<div class="row items-center q-my-md">
			<div class="col t-text-2xl t-font-bold t-text-blue-800">FOTOCHECK</div>
			<div class="col" style="text-align: right;">
				<q-btn unelevated color="primary" label="Actualizar" @click="reload" />
			</div>
		</div>
		<m-loading ref="main">
			<div class="row q-col-gutter-md">
				<div>DISPOSITIVO: {{me.id}}</div>
				<div>NOMBRE: {{me.nombre}}</div>
			</div>
			<table class="col-sm-12 col-md-8 table-lab td-first-bold">
					<thead>
						<tr class="t-bg-yellow-400 t-text-black t-font-bold">
							<th style="user-select: text !important;">Consulta</th>
							<th style="user-select: text !important;">Fecha</th>
						</tr>
					</thead>
					<tbody>
						<tr :key="index" v-for="(el,index) in todo">
							<td style="user-select: text !important;">{{el.query}}</td>
							<td style="user-select: text !important;">{{el.created_at}}</td>
						</tr>
					</tbody>
				</table>
		</m-loading>
	</q-page>
</template>
<script>
	export default{
		data(){
			return {
				dl:{show:false},
				todo:[],
				me:{}
			}
		},
		mounted(){ this.reload() },
		methods:{
			reload(){
				var uuid = this.$route?.params?.uuid
				if (!uuid) {
					alert('no hay uuid')
					return
				}
				this.$refs.main.get(`/colaborador/registro/${uuid}`,b=>{
					this.todo = b.list
					this.me = b.me
				})
			}
		}
	}
</script>
<style scoped>
	.td-first-bold td:nth-child(1) {
		font-weight: bold;
	}
</style>