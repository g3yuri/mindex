<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row items-center q-my-md">
      <div class="col t-text-2xl t-font-bold t-text-blue-800">
        Registro de Operador
      </div>
    </div>
    <div>
      <m-loading ref="main">
        <div class="row q-col-gutter-md" style="max-width: 400px; margin: auto">
          <div
            v-if="initok"
            class="t-px-3 t-flex t-flex-col t-items-center t-justify-center t-w-full"
          >
            <div class="t-text-center t-p-3 t-text-xl">
              Falta ingresar el numero de dni
            </div>
            <q-input
              outlined
              label="Dni"
              v-model="dni"
              class="t-max-w-xs t-w-full"
              :rules="[(val) => validDni(val) || 'Ingrese un dni valido']"
            />
            <q-btn
              label="Verificar"
              :disabled="!validDni(dni)"
              @click="verificar"
              rounded
              unelevated
              color="primary"
            />
          </div>
          <div v-if="res" class="col-12 t-font-bold t-text-xl t-text-center">
            <div>
              El correo {{ res?.correo }} y dni {{ res?.dni }} ya se encuentra
              registrado
            </div>
            <div>
              <q-btn
                label="Ir al panel"
                @click="router.push('/f/operador')"
                rounded
                unelevated
                color="primary"
              />
            </div>
          </div>
          <div v-if="error" class="col-12 t-font-bold t-text-xl t-text-center">
            {{ error }}
          </div>
          <!-- <div>{{JSON.stringify(res,null,4)}}</div> -->
        </div>
      </m-loading>
    </div>
  </q-page>
</template>
<script setup>
import { Cookies } from 'quasar'
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

function validDni(val) {
  return val?.match(/^[0-9]{8,8}$/)
}

const route = useRoute()
const router = useRouter()
const main = ref(null)
const dni = ref(Cookies.get('cdni'))
const initok = ref(!validDni(dni.value))
const res = ref(null)
const error = ref(null)

const verificar = () => {
  const payload = {
    code: route.query?.code,
    dni: dni.value
  }
  console.log('payload', payload)
  if (!validDni(dni.value)) {
    console.log('dni no valido')
    return
  }

  main.value.post(
    '/fatiga/verificar',
    payload,
    (b) => {
      console.log('verificar.ok', b)
      res.value = b
    },
    (e) => {
      error.value = JSON.stringify(e)
    }
  )
}
onMounted(() => {
  verificar()
})
</script>
