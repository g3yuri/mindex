<template>
	<q-page class="q-pa-md q-gutter-md">
		<div class="row items-center q-my-md">
			<div class="col t-text-4xl t-text-center t-py-4 t-font-bold t-text-blue-800">REGISTRO</div>
		</div>
		<m-loading ref="main">
			<div class="t-max-w-xl t-mx-auto t-my-4 t-flex t-justify-between t-items-center">
				<div class="t-font-bold t-text-xl t-pr-4 t-w-1/3 t-text-right t-hidden sm:t-block">DNI</div>
				<q-input ref="rdni"
					class="t-text-2xl t-w-full" outlined 
					:label="$q.screen.lt.sm?'DNI':undefined" 
					v-model="info.dni"
					lazy-rules
					:rules="[val => (val && val.trim().match(/[0-9]{8}/)) || 'Por favor ingrese dni']"
					/>
			</div>
			<div class="t-max-w-xl t-mx-auto t-my-4 t-flex t-justify-between t-items-center">
				<div class="t-font-bold t-text-xl t-pr-4 t-w-1/3 t-text-right t-hidden sm:t-block">Fecha</div>
				<q-input ref="rfnac" class="t-text-2xl t-w-full" outlined :label="$q.screen.lt.sm?'Fecha del dato':undefined" v-model="fecha" mask="date" fill-mask="_" :rules="['date']">
			      <template v-slot:append>
			        <q-icon name="event" class="cursor-pointer">
			          <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
			            <q-date v-model="fecha">
			              <div class="row items-center justify-end">
			                <q-btn v-close-popup label="Cerrar" color="primary" flat />
			              </div>
			            </q-date>
			          </q-popup-proxy>
			        </q-icon>
			      </template>
			    </q-input>
			</div>
			<div class="t-max-w-xl t-mx-auto t-my-4 t-flex t-justify-between t-items-center">
				<div class="t-font-bold t-text-xl t-pr-4 t-w-1/3 t-text-right t-hidden sm:t-block">Sueño profundo</div>
				<q-input ref="rtprofundo"
					class="t-text-2xl t-w-full" outlined 
					:label="$q.screen.lt.sm?'Sueño Profundo':undefined" 
					v-model="info.tprofundo"
					lazy-rules
					:rules="[val => (val && val.trim().match(/[0-9\.]+/)) || 'Por favor ingrese el tiempo']"
					/>
			</div>
			<div class="t-max-w-xl t-mx-auto t-my-4 t-flex t-justify-between t-items-center">
				<div class="t-font-bold t-text-xl t-pr-4 t-w-1/3 t-text-right t-hidden sm:t-block">Sueño Ligero</div>
				<q-input ref="rtligero"
					class="t-text-2xl t-w-full" outlined 
					:label="$q.screen.lt.sm?'Sueño ligero':undefined" 
					v-model="info.tligero"
					lazy-rules
					:rules="[val => (val && val.trim().match(/[0-9\.]+/)) || 'Por favor ingrese el tiempo']"
					/>
			</div>
			<div class="t-max-w-xl t-mx-auto t-my-4 t-flex t-justify-between t-items-center">
				<div class="t-font-bold t-text-xl t-pr-4 t-w-1/3 t-text-right t-hidden sm:t-block">Sueño Rem</div>
				<q-input ref="rtrem"
					class="t-text-2xl t-w-full" outlined 
					:label="$q.screen.lt.sm?'Sueño REM':undefined" 
					v-model="info.trem"
					lazy-rules
					:rules="[val => (val && val.trim().match(/[0-9\.]+/)) || 'Por favor ingrese tiempo']"
					/>
			</div>
			<div class="t-max-w-xl t-mx-auto t-my-4 t-flex t-justify-center">
				<ImageUpload @upload="set_screen" label="Pantalla de app Mi Fit" image-max-size="500"/>
			</div>
			<div class="t-max-w-xl t-mx-auto t-my-4">
				<q-btn class="t-w-full t-py-3 t-font-bold t-text-lg" label="Registrar" @click="registro" rounded unelevated color="primary"/>
			</div>
		</m-loading>
	</q-page>
</template>
<script>
	import ImageUpload from '../../components/ImageUpload.vue'
	import { reactive, ref } from 'vue'
	import { Cookies } from 'quasar'
	export default{
		components:{ ImageUpload },
		data(){
			var d = new Date(),
		        month = '' + (d.getMonth() + 1),
		        day = '' + d.getDate(),
		        year = d.getFullYear();
		    if (month.length < 2) 
		        month = '0' + month;
		    if (day.length < 2) 
		        day = '0' + day;
		    var fecha = [year, month, day].join('/');

			console.log(fecha)
			return {
				fecha,
				info: { dni:Cookies.get('cdni')},
				error:false,
				screen:null,
				validateEmail:[val => String(val)
					    .toLowerCase()
					    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || 'Por favor ingrese un correo electronico']
			}
		},
		mounted(){ this.reload() },
		computed: {
		},
		methods:{
			reload(){
				this.info.fecha = new Date()
			},
			registro(){
				Cookies.set('cdni',this.info.dni)
				this.info.fecha = this.fecha.replaceAll('/','-')
				console.log(this.info.fecha)
				this.$refs.main.post('/fatiga/fatiga',{...this.info,screen:this.screen},b=>{
					console.log(b)
					alert('Se ingreso sus datos, gracias..')
				})
				return
				this.$refs.rdni.validate()
				this.$refs.rtligero.validate()
				this.$refs.rtprofundo.validate()
				this.$refs.rtrem.validate()
				const error = this.$refs.rdni.hasError || this.$refs.rtligero.hasError || this.$refs.rtprofundo.hasError || this.$refs.rtrem.hasError
				if (error) {
					alert('Corregir')
					return
				} else {
					this.$m.api.post('/fatiga/fatiga',{...this.info,screen:this.screen},b=>{
						console.log(b)
					})
				}
			},
			set_screen(file) {
				this.screen = file
			},
			upload_screen(file) {
				this.$m.api.post('/fatiga/fatiga',{...this.info,screen:this.screen},b=>{
					alert(JSON.stringify(b))
				},alert)
			},
		}
	}
</script>