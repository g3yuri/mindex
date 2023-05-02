<template>
  <div style="max-width: 300px; width: 100%; margin: auto">
    <div
      class="row items-center q-py-xl text-center t-text-2xl"
      style="font-family: Supply-Regular"
    >
      REGISTRO DE NUEVO USUARIO
    </div>
    <div v-if="!isend" class="q-gutter-sm">
      <q-input
        label="Correo"
        v-model="user.email"
        outlined
        @keyup.enter="registro"
      />
      <q-input
        label="password"
        type="password"
        v-model="user.password"
        outlined
        @keyup.enter="registro"
      />
      <q-input
        label="Nombres"
        v-model="user.nombres"
        outlined
        @keyup.enter="registro"
      />
      <q-input
        label="Apellidos"
        v-model="user.apellidos"
        outlined
        @keyup.enter="registro"
      />
      <div class="col-12 text-primary text-right">
        <q-btn
          @click="
            $router.push({
              path: '/login',
              query: { redirect: $route.query.redirect }
            })
          "
          color="primary"
          flat
          dense
          no-caps
          unelevated
          label="Volver a inicio de sesion"
        />
      </div>
      <div class="row justify-center q-py-md">
        <q-btn
          label="Registrarse"
          rounded
          unelevated
          color="primary"
          @click="registro"
        />
      </div>
    </div>
    <div v-else class="q-gutter-sm">
      <div class="text-subtitle1 text-center">
        Se envio un codigo a su correo {{ correo }}, ingrese dicho codigo aqui:
      </div>
      <div>
        <q-input
          label="Ingrese el codigo"
          v-model="code"
          outlined
          @keyup.enter="check_code"
        />
      </div>
      <div class="text-primary text-right">
        <q-btn
          @click="
            $router.push({
              path: '/login',
              query: { redirect: $route.query.redirect }
            })
          "
          color="primary"
          flat
          dense
          no-caps
          unelevated
          label="Volver a inicio de sesion"
        />
      </div>
      <div class="row justify-center q-py-md">
        <q-btn
          rounded
          label="Validar Codigo"
          unelevated
          color="primary"
          @click="check_code"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Cookies } from 'quasar'

export default {
  data() {
    return {
      usuario: '',
      pwd: '',
      isPwd: true,
      user: {
        email: 'g3yuri@gmail.com',
        password: '123456',
        nombres: 'Yuri',
        apellidos: 'Quispe',
        ciudad: 'Lima',
        carrera: 'Minas'
      },
      isend: false,
      correo: '',
      code: ''
    }
  },
  methods: {
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    registro() {
      this.$m.API.post(
        'registro',
        this.user,
        (b) => {
          this.correo = this.user.email
          this.isend = true
        },
        (e) => {
          this.$q.dialog({ message: e, persistent: true })
        }
      )
    },
    check_code() {
      this.$m.API.post(
        'code/verify/registro',
        {
          code: this.code,
          email: this.correo
        },
        (b) => {
          this.$router.push({
            path: `/rescue/${this.correo}/${this.code}`,
            query: { redirect: this.$route.query.redirect }
          })
        },
        (e) => {
          this.$q.dialog({ message: e, persistent: true })
        }
      )
    }
  }
}
</script>

<style></style>
