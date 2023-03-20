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
				<div class="t-font-bold t-text-xl t-pr-4 t-w-1/3 t-text-right t-hidden sm:t-block">Email</div>
				<q-input ref="remail"
					class="t-text-2xl t-w-full" outlined 
					:label="$q.screen.lt.sm?'Email':undefined"
					v-model="info.email"
					lazy-rules
					:rules="validateEmail"
					/>
			</div>
			<div class="t-max-w-xl t-mx-auto t-my-4 t-flex t-justify-between t-items-center">
				<div class="t-font-bold t-text-xl t-pr-4 t-w-1/3 t-text-right t-hidden sm:t-block">Fecha Nac.</div>
				<q-input ref="rfnac" class="t-text-2xl t-w-full" outlined :label="$q.screen.lt.sm?'Fecha de Nacimiento':undefined" v-model="info.fnac" mask="date" fill-mask="_" :rules="['date']">
			      <template v-slot:append>
			        <q-icon name="event" class="cursor-pointer">
			          <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
			            <q-date v-model="info.fnac">
			              <div class="row items-center justify-end">
			                <q-btn v-close-popup label="Cerrar" color="primary" flat />
			              </div>
			            </q-date>
			          </q-popup-proxy>
			        </q-icon>
			      </template>
			    </q-input>
			</div>
			<div class="t-max-w-xl t-mx-auto t-my-4">
				<q-btn class="t-w-full t-py-3 t-font-bold t-text-lg" label="Registrar" @click="registro" rounded unelevated color="primary"/>
			</div>
		</m-loading>
	</q-page>
</template>
<script>
	export default{
		data(){
			return {
				info:{},
				error:false,
				validateEmail:[val => String(val)
					    .toLowerCase()
					    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || 'Por favor ingrese un correo electronico']
			}
		},
		mounted(){ this.reload() },
		computed: {
		},
		methods:{
			reload(){},
			registro(){
				this.$refs.rdni.validate()
				this.$refs.remail.validate()
				this.$refs.rfnac.validate()
				const error = this.$refs.rdni.hasError || this.$refs.remail.hasError || this.$refs.rfnac.hasError
				if (error) {
					alert('Corregir')
					return
				} else {
					this.error =error
					console.log(this.error)
					this.$refs.main.post('/fatiga/registro',this.info,b=>{
						console.log(b)
					})
				}
			}
		}
	}
</script>