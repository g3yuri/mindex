<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row items-center q-my-md">
      <div class="col t-text-2xl t-font-bold t-text-blue-800">Fatiga</div>
      <div class="col" style="text-align: right">
        <q-btn unelevated color="primary" label="Crear" icon="o_add" />
      </div>
    </div>
    <div>
      <div class="row q-col-gutter-md">
        <div class="col-4"></div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { Cookies, useQuasar } from 'quasar'
import { reactive } from 'vue'

export default {
  setup() {
    const $q = useQuasar()
    const dni = $q.cookies.get('us_dni')
    const email = $q.cookies.get('us_email')
    const info = reactive({ dni, email })
    return {
      info
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.reload()
  },
  methods: {
    reload() {
      console.log(this.info)
      // if (!this.info.dni || !this.info.email) {
      // 	this.$router.push('/p/registro')
      // }
    }
  }
}
</script>
