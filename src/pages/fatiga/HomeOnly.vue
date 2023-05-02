<template>
  <q-page class="t-flex t-flex-col t-justify-between">
    <div class="t-p-4">
      <div class="t-text-2xl t-font-bold t-text-blue-800 t-text-center">
        CONTROL DE SOMNOLENCIA GMI
      </div>
    </div>
    <m-loading
      ref="main"
      class="t-flex-1 t-flex t-items-center t-justify-center t-flex-col"
    >
      <div class="t-w-full t-text-center">
        <div class="t-text-lg t-p-6 t-font-bold t-text-gray-600">
          Para poder registrarte, ingresa tu dni y haz click en el boton
        </div>
        <div class="t-px-3 t-flex t-flex-col t-items-center t-justify-center">
          <q-input
            outlined
            label="Dni"
            v-model="dni"
            class="t-max-w-xs t-w-full"
            :rules="[(val) => validDni(val) || 'Ingrese un dni valido']"
          />
          <div class="t-flex t-flex-row t-items-center">
            <q-checkbox v-model="polit" />
            <div @click="router.push('/f/politica')" class="t-text-blue-800">
              Politica de provacidad de datos
            </div>
          </div>
        </div>
        <div class="t-my-4">
          <button
            v-if="isok"
            type="button"
            class="login-with-google-btn"
            @click="open_login"
          >
            Login con Google
          </button>
          <button v-else type="button" class="login-with-google-btn" disabled>
            Login con Google
          </button>
        </div>
        <div @click="router.push('/f/servicio')" class="t-text-blue-800">
          Condiciones del servicio
        </div>
      </div>
      <div v-if="user">
        {{ user.id }}
      </div>
    </m-loading>
  </q-page>
</template>
<script setup>
import { Cookies } from 'quasar'
import { onMounted, ref, watchEffect, watch, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const user = reactive({})
const main = ref(null)
const isok = ref(false)
const polit = ref(false)
const router = useRouter()
const dni = ref(Cookies.get('cdni') || '')

function validDni(val) {
  return val.match(/^[0-9]{8,8}$/)
}

watchEffect(() => {
  isok.value = !!validDni(dni.value) && polit.value
  Cookies.set('cdni', dni.value)
})

onMounted(() => {
  if (user?.id) {
    router.push('/f/operador')
  }
})

function open_login() {
  main.value.get('/fatiga/login_google', (b) => {
    if (b.op === 'redirect') {
      // redirecting
      window.location.href = b.auth_url
    } else {
      console.warn('Respuesta desconocida:', b.op)
    }
  })
}
</script>
<style>
.login-with-google-btn {
  transition: background-color 0.3s, box-shadow 0.3s;
  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;
}
.login-with-google-btn:hover {
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
}
.login-with-google-btn:active {
  background-color: #eeeeee;
}
.login-with-google-btn:focus {
  outline: none;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
    0 0 0 3px #c8dafc;
}
.login-with-google-btn:disabled {
  filter: grayscale(100%);
  background-color: #ebebeb;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
}
</style>
