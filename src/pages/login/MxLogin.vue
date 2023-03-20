<template>
  <div class="fixed-center" style="max-width: 400px; width: 100%;">
    <div class="t-text-center t-py-4 t-flex t-justify-center t-items-end">
      <q-img src="~/assets/logo.png" style="width: 42px; height: 42px" />
      <span class="t-pl-2 t-font-bold t-text-3xl">Mindex</span>
    </div>
    <div class="t-rounded-xl t-px-8 t-py-4 t-w-full" >
      <div class="row items-center q-gutter-x-md q-py-md">
        <div ><h5 class="t-text-2xl t-font-bold">Login</h5></div>
      </div>
      <div class="q-gutter-sm">
        <q-input label="Usuario o Correo" v-model="usuario" outlined @keyup.enter="login" />
        <q-input label="Contraseña" v-model="pwd" outlined :type="isPwd ? 'password' : 'text'" @keyup.enter="login">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="text-primary text-right">
          <router-link to="/rescue">
            Recuperar contraseña
          </router-link>
        </div>
        <div class="row justify-center q-py-md">
          <q-btn label="Ingresar" class="t-w-full t-font-bold" unelevated color="primary" @click="login"/>
        </div>
        <!-- <div class="row justify-center">
          <q-btn label="Registro de nuevo usuario" class="q-px-md" no-caps unelevated color="positive" @click="$router.push({path:'/registro',query:{redirect:$route.query.redirect}})"/>
        </div>
        <div class="row justify-center">
          <q-btn label="Recuperar contraseña" flat dense no-caps unelevated color="primary" @click="$router.push({path:'/rescue',query:{redirect:$route.query.redirect}})"/>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Cookies } from 'quasar'

export default {
  data () {
    return {
      usuario: '',
      pwd: '',
      isPwd: true
    }
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    login() {
      const user = this.usuario?.trim()
      this.$m.login(user, this.pwd, error => {
        this.$q.dialog({ message: error, persistent: true })
      })
    }
  }
}
</script>

<style>
</style>
