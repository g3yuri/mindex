<template>
	<q-page class="q-pa-md q-gutter-md">
		<m-loading ref="main">
			<div class="row items-center q-gutter-md">
				<q-btn unelevated color="primary" flat label="Atras" icon="chevron_left" @click="$router.go(-1)" />
				<q-space />
				<q-btn v-if="acc_id" unelevated color="negative" label="Eliminar" flat icon="delete" @click="pos_delete" />
				<q-btn unelevated color="primary" :label="acc_id?'Actualizar':'Crear'" icon="save" @click="pos_store" />
			</div>

			<div class="t-font-bold text-primary t-text-xl t-py-5">ACCIDENTE / INCIDENTE</div>
			<div class="col-12 t-p-5">
				<image-upload class="t-w-full t-h-full" :src="info.rel" @upload="info.file=$event" :image-max-size="500" :no-confirm="true"/>
			</div>
			<div class="col-12 t-p-5" v-if="acc_id">
				<!-- <ImageUpload @upload="upload_foto" confirm="Desea realmente subir la imagen?" label="FOTO" max-height="100px" max-width="100px" :src="info.uri_foto" /> -->
			</div>
			<div>
			    <div class="row q-col-gutter-sm">
			      <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">TIPO</div>
			      <q-select class="col-xs-8 col-sm-4" emit-value
        			map-options dense outlined v-model="info.tipo" :options="helper.tipos" />
			      <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">DAÑO A</div>
			      <q-select class="col-xs-8 col-sm-4" emit-value
        			map-options dense outlined v-model="info.danio" :options="helper.opt_danios" />
			      <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">POTENCIAL</div>
			      <q-select class="col-xs-8 col-sm-4" dense outlined v-model="info.potencial" :options="helper.potencial" />
			      <div class="col-sm-2 col-xs-4 t-font-bold t-flex t-items-center">FECHA</div>
			      <div class="col-sm-4 col-xs-8">
			      	<q-input outlined  dense v-model="info.fecha">
				      <template v-slot:prepend>
				        <q-icon name="event" class="cursor-pointer">
				          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
				            <q-date v-model="info.fecha" mask="YYYY-MM-DD HH:mm:ss">
				              <div class="row items-center justify-end">
				                <q-btn v-close-popup label="Cerrar" color="primary" flat />
				              </div>
				            </q-date>
				          </q-popup-proxy>
				        </q-icon>
				      </template>

				      <template v-slot:append>
				        <q-icon name="access_time" class="cursor-pointer">
				          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
				            <q-time v-model="info.fecha" mask="YYYY-MM-DD HH:mm:ss" format24h>
				              <div class="row items-center justify-end">
				                <q-btn v-close-popup label="Cerrar" color="primary" flat />
				              </div>
				            </q-time>
				          </q-popup-proxy>
				        </q-icon>
				      </template>
				    </q-input>
			      </div>
			      <div class="col-sm-2 col-xs-4 t-font-bold t-flex t-items-center">LUGAR</div>
			      <q-input class="col-sm-10 col-xs-8" dense outlined v-model="info.lugar" />
			      <div class="col-12 t-font-bold t-flex t-items-center">DESCRIPCION</div>
			      <q-input type="textarea" class="col-12" dense outlined v-model="info.descripcion" />
			      <div class="col-sm-3 col-xs-12 t-font-bold t-flex t-items-center">DIAGNOSTICO</div>
			      <q-input class="col-sm-9 col-xs-12" dense outlined v-model="info.diagnostico" />
			      <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">DNI ACC.</div>
			      <q-input class="col-xs-8 col-sm-4" dense outlined v-model="info.acc_dni" />
			      <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">NOMBRE</div>
			      <q-input class="col-xs-8 col-sm-4" dense outlined v-model="info.accidentado" />
			      <!-- <div class="col-12 t-font-bold t-flex t-items-center">COMENTARIO</div>
			      <q-input type="textarea" class="col-12" dense outlined v-model="info.comentario" /> -->
			      <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">AREA</div>
			      <q-select class="col-xs-8 col-sm-4" dense outlined
			      		v-model="info.area" :options="secciones" />
			      <!-- <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">SECCION</div> -->
			      <!-- <q-select class="col-xs-8 col-sm-4" emit-value
        map-options :disable="!Array.isArray(helper.secciones)" dense outlined v-model="info.seccion" :options="secciones" /> -->

					<!-- <q-select class="col-xs-8 col-sm-4" dense outlined v-model="info.seccion" label="Area Responsable" :options="secciones"/> -->
			    </div>
			</div>
		</m-loading>
	</q-page>
</template>
<script>
	import ImageUpload from '../../components/ImageUpload.vue'
	import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'

	export default{
		components:{
			ImageUpload
		},
		setup(props, context) {
			const secciones_raw = helper.secciones();
			const secciones = computed(()=>Object.values(secciones_raw.value||{}) )
			const areas_raw = helper.areas();
			const areas = computed(()=>Object.values(areas_raw.value||{}) )
			//meta: { title: 'Accidentes / Incidentes', btn:{icon:'o_save', label:'Crear', to: 'crear'}}
			//var self = this
			function pos_store(){
				var payload = {
					...this.info
				}
				alert(payload)
				this.$refs.main.post('/iai/store',payload,id=>{
					this.$q.notify('Se actualizo')
					this.$router.go(-1)
				})
			}
			const meta = reactive({
				title:'Accidentes / Incidentes',
				btn: {
					icon: 'o_save',
					label: 'Crear',
					click: ()=>{
						console.log(props)
						pos_store()
						
					}
				}
			})

			return {
				secciones,
				areas,
				meta,
				pos_store
			}
		},
		data(){
			return {
				info: {
					// acc_dni:'42995248',
					// accidentado:'Elmer Velasquez',
					// fecha: "2022-03-18 16:20",
					// lugar: 'Nv 12 GL 180 SW',
					// descripcion: 'Cuando el trabajador bajaba, no usa los 3 puntos de apoyo',
					// diagnostico: 'Esgince de la mano derecha',
					// comentario:'Directiva de uso de tres ountos de apoyo',
					// tipo:null,
					// uri_foto:null
				},
				exp_form:{show:false},
				acc_id:null,
				experiencia:[],
				helper:{}
			}
		},
		mounted(){ this.reload() },
		methods:{
			reload(){
				this.$refs.main.get('/iai/helper',b=>{
					var opt = []
					Object.keys(b.tipos).map(function(value, index){
						opt.push({value, label:b.tipos[value]})
					})
					var opt_danios = []
					Object.keys(b.danios).map(function(value, index){
						opt_danios.push({value, label:b.danios[value]})
					})

					this.helper.tipos = opt
					this.helper.opt_danios = opt_danios
					this.helper.potencial = b.potencial
					this.helper.areas = Object.keys(b.areas)
					this.helper.secciones_areas = {}

					this.helper.areas.forEach((value,index)=>{
						var pp = []
						Object.keys(b.areas[value]).map(function(val,ind){
							pp.push({value:val,label:b.areas[value][val]})
						})
						this.helper.secciones_areas[value] = pp
					})

					//console.log(this.helper.secciones_areas)

					//seleccion automaticamente
					// this.info.tipo = opt[0]
					// this.info.potencial = b.potencial[0]
					// this.info.area = this.helper.areas[0]
					// this.input_value(this.info.area)
					var id = this.$route?.params?.id
					if (id) {
						this.acc_id = id
						this.$refs.main.get(`/iai/ver/${id}`,b=>{
							//console.log(b)
							for (var k in b) {
								this.info[k] = b[k]
							}
							this.input_value(this.info.area)
							//console.log(this.info)
						})
					}
				})

			},
			input_value(value){
				this.info.area = value
				this.helper.secciones=this.helper.secciones_areas[this.info.area]
				//console.log(this.helper.secciones_areas, this.info.area, this.helper.secciones)
			},
			exp_store(payload){
				payload.acc_id = this.acc_id
				this.$m.api.post('/rrhh/experiencia',payload,b=>{
					payload.show = false
					this.$nextTick(()=>{
						this.experiencia = b.experiencia
					})
				}, alert)
			},
			exp_eliminar(payload){
				this.$q.dialog({
			        title: 'Confirmar',
			        message: 'realmente desea eliminar el item?',
			        cancel: true,
			        persistent: true
			    }).onOk(()=>{
					payload.acc_id = this.acc_id
					this.$m.api.delete(`/rrhh/experiencia?acc_id=${this.acc_id}&id=${payload.id}`,b=>{
						payload.show = false
						this.experiencia = b.experiencia
					}, alert)
			    })
			},
			upload_foto(file) {
				this.$m.api.post('/rrhh/upload/adjunto',{file,prefix:'foto', acc_id:this.acc_id},b=>{
					this.info.uri_foto = b.postulante.uri_foto
				},alert)
			},
			upload_policial(file) {
				this.$m.api.post('/rrhh/upload/adjunto',{file,prefix:'policial', acc_id:this.acc_id},b=>{
					this.info.uri_policial = b.postulante.uri_policial
				},alert)
			},
			upload_penal(file) {
				this.$m.api.post('/rrhh/upload/adjunto',{file,prefix:'penal', acc_id:this.acc_id},b=>{
					this.info.uri_penal = b.postulante.uri_penal
				},alert)
			},
			upload_emo(file) {
				this.$m.api.post('/rrhh/upload/adjunto',{file,prefix:'emo', acc_id:this.acc_id},b=>{
					this.info.uri_emo = b.postulante.uri_emo
				},alert)
			},
			pos_delete(){

			}
		}
	}
</script>
<style type="text/css">
	.adjunta {
		border: 1px dashed #666;
		padding: 2px;
		text-align: center;
	}
</style>