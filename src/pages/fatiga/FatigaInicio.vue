<template>
	<q-page class="t-flex t-flex-col t-justify-between">
		<div class="t-p-4">
			<div class="t-text-2xl t-font-bold t-text-blue-800 t-text-center">CONTROL DE SOMNOLENCIA GMI</div>
		</div>
		<m-loading ref="main" class="t-flex-1 t-flex t-items-center t-justify-center t-flex-col">
			<div class="t-w-full t-text-center">
				<div class="t-text-lg t-p-6 t-font-bold t-text-gray-600">Para poder registrarte, ingresa tu dni, correo electronio y haz click en el boton</div>
				<div class="t-px-3 t-flex t-flex-col t-items-center t-justify-center">
					<q-input outlined label="Dni" v-model="info.dni" class="t-max-w-xs t-w-full" :rules="[val=>validDni(val) || 'Ingrese un dni valido' ] " />
					<q-input outlined label="Correo gmail" v-model="info.correo" class="t-max-w-xs t-w-full" :rules="[v=>validEmail(v) || 'Correo no valido']" />
					<q-input outlined label="Celular" v-model="info.celular" class="t-max-w-xs t-w-full" :rules="[v=>validCelular(v) || 'Celular incorrecto']" />
					<div class="t-flex t-flex-row t-items-center">
						<q-checkbox v-model="polit" />
						<div @click="router.push('/f/politica')" class="t-text-blue-800">Politica de provacidad de datos</div>
					</div>
				</div>
				<div class="t-my-4">
					<q-btn :disabled="!isok" label="Ingresar" @click="ingresar" rounded unelevated color="primary"/>

				</div>
				<div @click="router.push('/f/servicio')" class="t-text-blue-800">Condiciones del servicio</div>
			</div>
			<!-- <div v-if="user">
				{{user.id}}
			</div> -->
		</m-loading>
	</q-page>
</template>
<script setup>
import { Cookies } from 'quasar'
import { onMounted, ref, watchEffect, watch, reactive } from 'vue'
// import { useUser } from '../../use/user.js'
import helper from '../../boot/helper.js'

import { useRouter, useRoute } from 'vue-router'

const main = ref(null)
const isok = ref(false)
const polit = ref(false)
// const [user, setUser] = useUser()
const router = useRouter()
const info = reactive({
  dni: Cookies.get('cdni') || '',
  correo: Cookies.get('ccorreo') || '',
  celular: Cookies.get('ccelular') || ''
})

function validDni(v) {
  return /^[0-9]{8,8}$/.test(v)
}

function validCelular(v) {
  return /^[0-9 ]{6,}$/.test(v)
}

function validEmail(v) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
}

function ingresar() {
  main.value.post('/fatiga/registro/manual', info, b => {
    // console.log('login_oper.manual',b)
    router.push('/f/operador')
  })
}

watchEffect(() => {
  isok.value = validDni(info.dni) && validCelular(info.celular) && validEmail(info.correo) && polit.value
  Cookies.set('cdni', info.dni)
  Cookies.set('ccorreo', info.correo)
  Cookies.set('ccelular', info.celular)
})

onMounted(() => {
  const user = helper._fatiga_user
  console.log('get_user: ', user)
  if (user?.id) {
    router.push('/f/operador')
  }
})

function open_login() {
  main.value.get('/fatiga/login_google', b => {
    if (b.op === 'redirect') {
      // redirecting
      window.location.href = b.auth_url
    } else {
      console.warn('Respuesta desconocida:', JSON.stringify(b.op))
    }
  })
}
</script>
