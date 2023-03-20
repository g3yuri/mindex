<template>
  <q-dialog v-model="doper.show">
    <q-card>
      <m-loading ref="main">
        <q-card-section>
          <div class="t-text-3xl t-font-bold">
            {{ doper.value.id ? 'EDITAR' : 'CREAR' }} OPERADOR
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row q-col-gutter-sm justify-center">
            <q-input
              v-if="!doper.value.id"
              v-model="doper.value.dni"
              class="col-sm-6 col-xs-12"
              outlined
              label="Dni"
            />
            <q-input
              v-model="doper.value.nombres"
              class="col-sm-6 col-xs-12"
              outlined
              label="Nombres"
            />
            <q-input
              v-model="doper.value.correo"
              class="col-sm-6 col-xs-12"
              outlined
              label="Email"
            />
            <q-input
              v-model="doper.value.celular"
              class="col-sm-6 col-xs-12"
              outlined
              label="Celular"
            />
            <q-select
              v-model="doper.value.guardia"
              class="col-sm-6 col-xs-12"
              stack-label
              outlined
              label="Guardia"
              :options="['A', 'B', 'C']"
            />
            <q-select
              v-model="doper.value.area"
              class="col-sm-6 col-xs-12"
              stack-label
              outlined
              label="Area"
              :options="areas"
            />
          </div>
        </q-card-section>
        <q-card-section align="center">
          <q-btn
            v-if="doper.value?.id"
            label="Eliminar"
            color="negative"
            unelevated
            flat
            @click="eliminar_operador"
          />
          <q-btn label="Cancelar" unelevated flat @click="doper.show = false" />
          <q-btn
            label="Guardar"
            icon="save"
            unelevated
            color="primary"
            @click="click_guardar"
          />
        </q-card-section>
      </m-loading>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import helper from '../../../boot/helper'

const main = ref(null)

const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  }
})
const emit = defineEmits(['update:modelValue', 'update', 'delete'])

const areas_raw = helper.secciones()
const areas = computed(() => Object.values(areas_raw.value || {}))

const doper = reactive({ show: false, value: {} })

function click_guardar() {
  main.value.post('/fatiga/admin/opers', doper.value, (b) => {
    doper.show = false
    emit('update', b.oper)
  })
}

function eliminar_operador() {
  console.log('delete', `/fatiga/admin/opers/${doper.value?.dni}`)
  main.value.delete(`/fatiga/admin/opers/${doper.value?.dni}`, (b) => {
    doper.show = false
    console.log('res', b)
    emit('delete', b.oper)
  })
}

function open(row = {}) {
  doper.value = { ...row }
  // console.log('oper-edit-dialog.open',doper.value)
  doper.show = true
}
defineExpose({ open })

onMounted(() => {})
</script>
