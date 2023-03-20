<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center" style="background-color: #000">
    <div>
      <div style="font-size: 30vh;color: rgb(255,180,45);" class="t-font-bold">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. No se encontro la pagina...
      </div>

      <q-btn
        class="q-mt-xl q-mr-sm"
        color="white"
        text-color="black"
        icon="o_home"
        unelevated
        to="/"
        label="Inicio"
        no-caps
      />
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="black"
        icon="o_chevron_left"
        unelevated
        @click="$router.go(-1)"
        label="Atras"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageError404'
})
</script>
