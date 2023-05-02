<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row items-center q-my-md">
      <div class="col t-text-2xl t-font-bold t-text-blue-800">
        Registro de Operador
      </div>
    </div>
    <div>
      <m-loading v-if="!message" ref="main">
        <div class="row q-col-gutter-md" style="max-width: 400px; margin: auto">
          <div class="col-12">
            <q-input outlined label="Dni" v-model="info.dni" />
          </div>
          <!-- <div class="col-12">
						<q-input outlined label="Correo" v-model="info.correo" />
					</div> -->
          <div class="col-12">
            <q-input
              outlined
              label="Nombres y apellidos"
              v-model="info.nombres"
            />
          </div>
          <div class="col-12 text-center">
            <q-btn
              unelevated
              color="primary"
              @click="registrar"
              label="Verificar registro"
            />
          </div>
        </div>
      </m-loading>
      <div v-else class="col-12 text-center t-font-bold t-text-2xl">
        <div class="t-py-5">{{ message }}</div>
        <q-btn
          label="Reintentar"
          @click="message = null"
          rounded
          unelevated
          color="primary"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
import { Cookies, useQuasar } from 'quasar'
import { reactive, ref } from 'vue'
import helper from '../../boot/helper'

export default {
  setup() {
    const $q = useQuasar()
    const dni = $q.cookies.get('us_dni')
    const correo = $q.cookies.get('us_correo')
    const nombres = $q.cookies.get('us_nombres')
    const info = reactive({ dni, correo, nombres })
    const message = ref(null)
    const main = ref(null)

    const registrar = () => {
      console.log('registro', info)
      $q.cookies.set('us_dni', info.dni ?? '')
      $q.cookies.set('us_correo', info.correo ?? '')
      $q.cookies.set('us_nombres', info.nombres ?? '')
      main.value.post('/fatiga/registro', info, (b) => {
        console.log('registro.ok', b)
        if (b.op === 'registrado') {
          message.value = 'Ya se encuentra registrado'
        } else if (b.op === 'redirect') {
          // redirecting
          window.location.href = b.auth_url
        } else {
          message.value = 'Respuesta desconocida:' + JSON.stringify(b.op)
        }
      })
    }
    return {
      info,
      registrar,
      message,
      main
    }
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
