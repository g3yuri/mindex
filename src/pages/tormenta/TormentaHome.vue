<template>
	<q-page class="q-pa-md q-gutter-md">
		<div class="row items-center q-my-md">
			<div class="col t-text-2xl t-font-bold t-text-blue-800">TORMENTA ELECTRICA</div>
			<div class="col" style="text-align: right;">
				<q-btn v-if="$m.hasRole(['ssomac','admin'])" unelevated color="primary" label="Crear Alerta" @click="dl={show:true}" />
			</div>
		</div>
		<q-dialog v-model="dl.show" >
			<q-card style="max-width: 440px; width:100%;">
				<q-card-section>
					<div class="text-h6" style="font-family: Supply-Regular;color:rgb(5,30,65);">CREAR ALERTA</div>
				</q-card-section>
				<q-card-section>
					<div class="row q-col-gutter-md justify-center">
						<q-input class="col-12" outlined label="Informacion" v-model="dl.info" />
<q-select class="col-xs-12 col-sm-6" dense outlined v-model="dl.nivel" :options="niveles" />
					</div>
				</q-card-section>
				<q-separator/>
				<q-card-section align="center">
					<q-btn label="Cancelar" flat @click="dl.show=false" rounded unelevated color="primary"/>
					<q-btn label="Crear" @click="alerta_crear(dl)" rounded unelevated color="primary"/>
				</q-card-section>
			</q-card>
		</q-dialog>
		<div>
			<m-loading ref="main">
				<div :key="key" :class="` ${el.class}`" v-for="(el, key) in alertas">
					<div> <strong>{{el.label}} {{el.created_at}}</strong> {{el.info}}</div>
				</div>
			</m-loading>
		</div>
	</q-page>
</template>
<script>
const tran = {
  0: { label: 'VERDE', class: 't-bg-green-200 t-my-4 t-p-2' },
  1: { label: 'AMARILL0', class: 't-bg-yellow-200 t-my-4 t-p-2' },
  2: { label: 'NARANJA', class: 't-bg-yellow-500 t-my-4 t-p-2' },
  3: { label: 'ROJO', class: 't-bg-red-600 t-text-white t-my-4 t-p-2' }
}
export default {
  data() {
    return {
      dl: { show: false },
      niveles: [
        { label: 'Verde', value: 0 },
        { label: 'Amarillo', value: 1 },
        { label: 'Naranja', value: 2 },
        { label: 'Rojo', value: 3 }
      ],
      alertas: []
    }
  },
  mounted() { this.reload() },
  methods: {
    reload() {
      this.$refs.main.get('/tormenta/list', b => {
        b.alertas.forEach(e => {
          const t = tran[e.nivel]
          if (t) {
            e.label = t.label
            e.class = t.class
          }
        })
        this.alertas = b.alertas
      })
    },
    alerta_crear(payload) {
      const pay = { ...payload, nivel: payload.nivel?.value }
      this.$m.api.post('/tormenta/store', pay, b => {
        payload.show = false
        this.reload()
      }, alert)
    }
  }
}
</script>
