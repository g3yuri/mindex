<template>
  <div class="q-pa-md fixed-center" style="max-width: 400px; width: 100%">
    <div class="t-text-center t-py-4 t-flex t-justify-center t-items-end">
      <q-img src="~/assets/logo.png" style="width: 42px; height: 42px" />
      <span class="t-pl-2 t-font-bold t-text-3xl">Mindex</span>
    </div>
    <div v-if="!isend" class="q-gutter-sm">
      <div class="row items-center">
        <div class="t-text-2xl t-font-bold q-mx-sm">Recuperación</div>
      </div>
      <div class="text-subtitle1 t-py-3">
        Introduce tu correo electronico para obtener instrucciones para
        recuperar tu cuenta.
      </div>
      <div>
        <q-input
          label="Ingrese su correo"
          v-model="correo"
          outlined
          @keyup.enter="rescue"
          type="email"
        />
      </div>
      <div class="text-primary text-right">
        <router-link to="/login"> Volver a inicio de sesion </router-link>
      </div>
      <div class="row justify-center q-py-md">
        <q-btn
          class="t-w-full t-font-bold"
          label="Recuperar"
          unelevated
          color="primary"
          @click="rescue"
        />
      </div>
    </div>
    <div v-else class="q-gutter-sm">
      <div class="text-subtitle1 t-py-3">
        Se envio un codigo a su correo <strong>{{ correo }}</strong
        >, ingrese el codigo aqui:
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
        <router-link to="/login"> Volver a inicio de sesion </router-link>
      </div>
      <div class="row justify-center q-py-md">
        <q-btn
          class="t-w-full t-font-bold"
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
export default {
  data() {
    return {
      correo: '',
      isend: false,
      code: ''
    }
  },
  mounted() {},
  methods: {
    rescue() {
      this.$m.API.post(
        'code/rescue',
        { email: this.correo },
        (b) => {
          this.isend = true
        },
        (e) => {
          this.$q.dialog({ message: e, persistent: true })
        }
      )
    },
    check_code() {
      this.$m.API.post(
        'code/verify',
        {
          code: this.code,
          email: this.correo
        },
        (b) => {
          this.$router.push(`/rescue/${this.correo}/${this.code}`)
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
