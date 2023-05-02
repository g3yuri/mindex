<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row items-center q-my-md">
      <div class="col t-text-2xl t-font-bold t-text-blue-800">RACS</div>
      <div class="col" style="text-align: right">
        <q-btn
          unelevated
          color="primary"
          to="registro"
          label="Crear"
          icon="add"
        />
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
export default {
  data() {
    return {}
  },
  mounted() {
    this.reload()
  },
  methods: {
    reload() {}
  }
}
</script>
