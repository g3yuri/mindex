<template>
	<q-page class="q-pa-md q-gutter-md">
		<m-loading ref="main">
			<div class="row items-center q-my-md q-gutter-md justify-end">
					<q-btn icon="chevron_left" @click="$router.go(-1)" flat unelevated color="primary" label="Atras" />
					<q-space />
					<q-btn v-if="is_revisor" @click="dl={show:true,info:info.info, status:info.status}" unelevated color="primary" label="Revisar" />
					<q-btn unelevated color="primary" label="Editar" icon="edit" :to="`/postulante/editar/${$route.params.id}`" />
			</div>
			<q-dialog v-model="dl.show" >
				<q-card style="max-width: 440px; width:100%;">
					<q-card-section>
						<div class="text-h6" style="font-family: Supply-Regular;color:rgb(5,30,65);">REVISAR CANDIDATO</div>
					</q-card-section>
					<q-card-section>
						<div class="row q-gutter-md justify-center q-px-sm">
			      			<q-select class="col-xs-12 col-sm-6" dense outlined v-model="dl.status" :options="['APROBADO','RECHAZADO','OBSERVADO']" />
							<q-input class="col-12" outlined label="Comentario" type="textarea" v-model="dl.info" />
						</div>
					</q-card-section>
					<q-separator/>
					<q-card-section align="center" class="q-gutter-md">
						<q-btn label="Cancelar" flat @click="dl.show=false" rounded unelevated/>
						<q-btn label="Guardar" @click="rev_store(dl)" icon="save" rounded unelevated color="primary"/>
					</q-card-section>
				</q-card>
			</q-dialog>
			<div v-if="info.status" :class="class_status">
				<strong>{{info.status}}</strong>: {{info.info}}
			</div>
			<div class="t-font-bold text-primary t-text-xl">DATOS GENERALES</div>
			<div>
				<div class="row q-col-gutter-sm">
					<div class="col-xs-12 col-md-3">
						<div class="adjunta" style="max-height: 140px; max-width: 140px;">
							<img v-if="info.uri_foto" :src="info.uri_foto" style="max-width: 100%; max-height: 100%; object-fit: contain;">
							{{info.uri_foto?'':'FOTO'}}
						</div>
					</div>
					<div class="col-xs-12 col-md-9">
						<table>
							<tbody>
								<tr>
									<td class="ver-label">APELLIDOS</td>
									<td>{{info.apellidos}}</td>
								</tr>
								<tr>
									<td class="ver-label">NOMBRES</td>
									<td>{{info.nombres}}</td>
								</tr>
								<tr>
									<td class="ver-label">CARGO</td>
									<td>{{info.cargo}}</td>
								</tr>
								<tr>
									<td class="ver-label">EDAD</td>
									<td>{{info.edad}}</td>
								</tr>
								<tr>
									<td class="ver-label">AREA</td>
									<td>{{info.area}}</td>
								</tr>
								<tr>
									<td class="ver-label">CATEGORIA</td>
									<td>{{info.categoria}}</td>
								</tr>
								<tr>
									<td class="ver-label">ZONA DE TRABAJO</td>
									<td>{{info.zona}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="t-font-bold text-primary t-text-xl t-py-5">EXPERIENCIA</div>
			<div>
			    <table class="table-exp">
			    	<tbody>
			    		<tr v-for="el in experiencia">
			    			<td class="periodo">{{el.desde}} - {{el.hasta}}</td>
			    			<td class="empresa">
			    				<div>{{el.empresa}}</div>
			    				<div>{{el.cargo}}</div>
			    			</td>
			    		</tr>
			    	</tbody>
			    </table>
			</div>
			<div>
				<div class="col-8 t-font-bold text-primary t-text-xl t-py-5">DOCUMENTOS ADJUNTOS</div>
			</div>
			<div>
				<div class="row q-col-gutter-md">
					<div class="col-xs-6 col-sm-4">
						<div class="adjunta">
							<img v-if="info.uri_policial" :src="info.uri_policial" style="max-width: 100%; max-height: 100%; object-fit: contain;">
							{{info.uri_policial?'':'ANTECEDENTES POLICIALES'}}
						</div>
					</div>
					<div class="col-xs-6 col-sm-4">
						<div class="adjunta">
							<img v-if="info.uri_penal" :src="info.uri_penal" style="max-width: 100%; max-height: 100%; object-fit: contain;">
							{{info.uri_penal?'':'ANTECEDENTES PENALES'}}
						</div>
					</div>
					<div class="col-xs-6 col-sm-4">
						<div class="adjunta">
							<img v-if="info.uri_emo" :src="info.uri_emo" style="max-width: 100%; max-height: 100%; object-fit: contain;">
							{{info.uri_emo?'':'EXAMEN MEDICO OCUPACIONAL'}}
						</div>
					</div>
				</div>
			</div>
		</m-loading>
	</q-page>
</template>
<script>
	export default{
		data(){
			return {
				info:{},
				experiencia:[],
				dl:{show:false}
			}
		},
		mounted(){ this.reload() },
		computed:{
			is_revisor() {
				return this.$m.hasRole(['ssomac','admin'])
			},
			class_status() {
				var trans = {
					APROBADO: 't-bg-green-200 t-p-4 t-my-4',
					RECHAZADO: 't-bg-red-200 t-p-4 t-my-4',
					OBSERVADO: 't-bg-yellow-200 t-p-4 t-my-4',
				}
				return trans[this.info.status]
			}
		},
		methods:{
			reload(){
				this.$refs.main.get(`/rrhh/ver/${this.$route.params.id}`,b=>{
					this.info = b.postulante
					this.experiencia = b.experiencia
				})
			},
			rev_store(payload) {
				payload.id = this.info.id
				this.$m.api.post('/rrhh/revision',payload,b=>{
					this.dl.show = false
					this.reload()
				},alert)
			}
		}
	}
</script>
<style type="text/css">
	.ver-label{
		@apply t-font-bold;
	}
	.adjunta {
		max-width: 100%;
		max-height: 100%;
		margin: auto;
		border: 1px dashed #666;
		padding: 0px;
		text-align: center;
		display: flex;
		justify-content: center;
	}
</style>