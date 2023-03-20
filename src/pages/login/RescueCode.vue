<template>
  <div class="q-pa-md fixed-center" style="max-width: 400px; width: 100%;">
	    <div class="t-text-center t-py-4 t-flex t-justify-center t-items-end">
	      <q-img src="~/assets/logo.png" style="width: 42px; height: 42px" />
	      <span class="t-pl-2 t-font-bold t-text-3xl">Mindex</span>
	    </div>
		<div v-if="step==1" class="text-center">
			<div class="text-h5">{{msg}}</div>
		      <div class="text-primary">
		        <q-btn class="t-w-full t-font-bold" @click="$router.push({path:'/login',query:{redirect:$route.query.redirect}})"  dense no-caps unelevated label="Iniciar Sesion"/>
		      </div>
		</div>
		<div v-else-if="step==2" class="row q-col-gutter-sm">
			<div class="col-12 t-text-2xl t-font-bold q-my-sm">
				Reestablecer contraseña
			</div>
			<div class="text-subtitle1 t-py-3">
				Coloque su nueva contraseña en ambos campos.
			</div>
  			<div class="col-12">
  				<q-input label="Ingrese nueva contraseña" v-model="pwd_now" outlined @keyup.enter="change" :rules="[val=>!!val || 'Requerido']" :type="isPwd_now ? 'password' : 'text'" lazy-rules>
			        <template v-slot:append>
			          <q-icon
			            :name="isPwd_now ? 'visibility_off' : 'visibility'"
			            class="cursor-pointer"
			            @click="isPwd_now = !isPwd_now"
			          />
			        </template>
  				</q-input>
  			</div>
  			<div class="col-12">
  				<q-input label="Repita nueva contraseña" v-model="pwd_rep" outlined @keyup.enter="change" :rules="[val=>val.length &&val==pwd_now || 'Se debe repetir la nueva contraseña']" :type="isPwd_rep ? 'password' : 'text'" lazy-rules>
			        <template v-slot:append>
			          <q-icon
			            :name="isPwd_rep ? 'visibility_off' : 'visibility'"
			            class="cursor-pointer"
			            @click="isPwd_rep = !isPwd_rep"
			          />
			        </template>
  				</q-input>
  			</div>
		      <div class="col-12 text-primary text-right">
		        <q-btn @click="$router.push({path:'/login',query:{redirect:$route.query.redirect}})" color="primary" flat dense no-caps unelevated label="Volver a inicio de sesion"/>
		      </div>
  			<div class="col-12">
    			<q-btn class="t-w-full t-font-bold" label="Reestablecer" unelevated color="primary" @click="change"/>
  			</div>
		</div>
		<div v-else-if="step==3" class="q-gutter-md text-center">
			<div class="text-h5">{{msg}}</div>

		      <div class="text-primary">
		        <q-btn @click="$router.push({path:'/login',query:{redirect:$route.query.redirect}})" color="primary" flat dense no-caps unelevated label="Iniciar Sesion"/>
		      </div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				msg:'Validando el codigo',
				step:1,
				pwd_now:'',
				pwd_rep:'',
				isPwd_now:true,
				isPwd_rep:true,
			}
		},
		created(){
			this.$m.api.post('code/verify',{
					code:this.$route.params.code,
					email:this.$route.params.email},b=>{
				this.step = 2
			},e=>{
				this.msg = e
			})
		},
		methods:{
			change(){
				if (this.pwd_now && this.pwd_rep && this.pwd_now==this.pwd_rep){
					this.$m.api.post('code/passchange',{
						code:this.$route.params.code,
						email:this.$route.params.email,
						now:this.pwd_now},b=>{
						this.step=3
						this.msg = b
					},e=>{
						this.$q.dialog({message:e})
					})
				}
			}
		}
	}
</script>