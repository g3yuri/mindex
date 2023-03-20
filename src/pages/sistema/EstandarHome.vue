<template>
	<q-page class="q-pa-md q-gutter-md">
		<div class="row items-center q-my-md">
			<div class="col t-text-2xl t-font-bold t-text-blue-800" style="font-family: Supply-Regular;text-transform: uppercase;">{{base}}</div>
			<div class="col" style="text-align: right;">
				<q-btn v-if="have_drop" flat @click="drop_click" icon="delete" rounded unelevated color="negative"/>
				<q-btn flat @click="realloc" icon="apps" rounded unelevated color="primary"/>
				<q-btn unelevated color="primary" :disable="!area" label="Subir" @click="dl.show=true" icon="add" />
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<q-select outlined dense @update:model-value="update_model" v-model="area" label="Area" option-value="id" option-label="label" use-input hide-selected fill-input input-debounce="0" :options="area_list">
					<template v-slot:no-option>
						<q-item>
							<q-item-section class="text-grey">No results</q-item-section>
						</q-item>
					</template>
				</q-select>
			</div>
		</div>
		<div>
			<q-dialog v-model="dle.show" >
				<q-card>
					<q-card-section>
						<div class="text-h6">REALMENTE DESEA ELIMINAR?</div>
					</q-card-section>
					<q-card-section>
						<div v-for="el in dle.items">
							{{el.id}}
						</div>
					</q-card-section>
					<q-separator/>
					<q-card-section align="center">
						<q-btn label="Cancelar" flat @click="dle.show=false" rounded unelevated/>
						<q-btn label="Eliminar" color="negative" @click="planos_drop(dle.items)" rounded unelevated/>
					</q-card-section>
				</q-card>
			</q-dialog>	
			<q-dialog v-model="dl.show" >
				<q-card style="max-width:400px; width:100%;">
					<q-card-section>
						<div class="text-h6">SUBIR ARCHIVOS</div>
					</q-card-section>
					<q-card-section class="row q-col-gutter-md">
				      <q-uploader
				      	class="col-12"
				      	ref="up"
				      	color="grey-3"
				      	text-color="primary"
				      	flat
				        :url="$m.api.uri(`/sis/${base}/upload`)"
				        :label="`Subir ${base}`"
				        :with-credentials="true"
				        multiple
				        batch
				        @uploaded="uploaded"
				        :form-fields="form_fields"
				      />
					</q-card-section>
					<q-separator/>
					<q-card-section align="center">
						<q-btn label="Cancelar" flat @click="dl.show=false" rounded unelevated/>
						<q-btn v-if="$refs.up?.upload" color="primary" label="Subir" @click="$refs.up.upload" rounded unelevated/>
					</q-card-section>
				</q-card>
			</q-dialog>	
	      <m-loading ref="main">
			<table class="table-lab">
				<thead>
					<tr class="t-bg-yellow-400 t-text-black t-font-bold">
						<th>Ruta</th>
						<th>Size</th>
						<th>Modificacion</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="el in pets"
						@click="el.select=!el.select"
						:class="el.select?'t-bg-gray-300':''"
						style="cursor: pointer">
						<td>{{el.name}}</td>
						<td>{{el.size}}</td>
						<td>{{el.last_modified_fm}}</td>
					</tr>
				</tbody>
			</table>
	      </m-loading>
		</div>
	</q-page>e
</template>
<script>
	const area_list = [
		{id:'PET-MAN', label:'MANTENIMIENTO'},
		{id:'PET-MIN', label:'MINA'},
		{id:'PET-VENT', label:'VENTILACION'},
	]
	export default{
		data(){
			return {
				files:[],
				pets:[],
				all:[],
				dl:{show:false},
				dle:{show:false},
				area:null,
				area_list,
				base:'estandar'
			}
		},
		computed: {
			have_drop() {
				return this.pets?.filter(e=>e.select).length>0
			},
			form_fields(){
				return [{name:'base', value:this.base}, {name:'tag', value:this.area?.label}]
			}
		},
		mounted(){ this.reload() },
		methods:{
			update_model(value) {
				console.log(value)
				this.pets = this.all[value?.label]
			},
			_from_api(b) {
				this.all = b
				if (this.all) {
					for(var key in this.all) {
						this.all[key].forEach(e=>{
							e.size = this.formatBytes(e.size,0)
							var parts = e.id.split('/')
							e.name = parts[parts.length-1]
							e.last_modified_fm = new Date(parseInt(e.last_modified)*1000).toLocaleString('en-US')
						})
					}
				}
			},
			reload(){
				this.$refs.main.get(`/sis/${this.base}/list`,this._from_api)
			},
			realloc(){
				this.$refs.main.get(`/sis/${this.base}/realloc`,this._from_api)
			},
			uploaded(info){
				console.log(info)
				try {
					var js = JSON.parse(info.xhr?.responseText)
					if (js.ok) {
						this._from_api(js.body)
					} else {
						alert(js.body)
					}
				} catch (e) {
					alert(e)
				}
			},
			formatBytes(bytes,decimals=2) {
			   if(bytes == 0) return '0 Bytes';
			   var k = 1024,
			       dm = decimals,
			       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
			       i = Math.floor(Math.log(bytes) / Math.log(k));
			   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
			},
			drop_click() {
				this.dle={
					show:true,
					items:[
						...this.all[this.area?.label].filter(e=>e.select)
					]
				}
			},
			planos_drop(items) {
				this.$m.api.json(`/sis/${this.base}/drop`,items,b=>{
					this._from_api(b)
					this.dle.show=false
				}, alert)
			}
		}
	}
</script>

<style type="text/css" scoped>
	.table-lab{
		border-spacing: 0;
		width: 100%;
	}
	.table-lab th{
		padding: 6px 12px;
		font-weight: bold;
	}
	.table-lab td{
		padding: 6px 12px;
		text-align: right;
	}
	.table-lab td:nth-child(1){
		text-align: left;
	}
</style>