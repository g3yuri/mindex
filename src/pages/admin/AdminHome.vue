<template>
  <q-dialog v-model="dl.show">
    <q-card style="max-width: 440px; width: 100%">
      <m-loading ref="ref_dl">
        <q-card-section>
          <div class="t-text-3xl t-font-bold">
            {{ dl.value.id ? 'EDITAR' : 'CREAR' }} ROLE:
            {{ dl.value.name?.toUpperCase() }}
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section v-if="dl.value">
          <div class="row q-col-gutter-sm justify-center">
            <div class="col-sm-12 col-xs-12">
              Cantidad: {{ dl.value.cantidad }} rol{{
                dl.value.cantidad > 1 ? 'es' : ''
              }}
            </div>
            <q-input
              class="col-sm-12 col-xs-12"
              outlined
              label="Info"
              v-model="dl.value.info"
            />
          </div>
        </q-card-section>
        <q-card-section align="center">
          <q-btn
            label="Cancelar"
            @click="dl.show = false"
            rounded
            unelevated
            flat
          />
          <q-btn
            label="Guardar"
            @click="modificar"
            icon="save"
            rounded
            unelevated
            color="primary"
          />
        </q-card-section>
      </m-loading>
    </q-card>
  </q-dialog>
  <m-loading ref="main" style="height: 100%">
    <m-table
      :columns="[
        { field: 'name', label: 'Role' },
        { field: 'cantidad', label: 'Cantidad' },
        { field: 'info', label: 'Descripcion' }
      ]"
      :data="roles"
      @row-click="
        (e, r, i) => {
          dl.value = { ...r }
          dl.show = true
        }
      "
      v-bind="{ dense: false }"
    />
  </m-loading>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  roles = ref([]),
  main = ref(null),
  dl = reactive({
    show: false,
    value: {}
  }),
  ref_dl = ref(null)

const meta = reactive({
  title: 'Roles'
})

// const props = defineProps(['foo'])
defineExpose({ meta })

function reload() {
  main.value.get('/admin/roles', (b) => {
    roles.value = b.roles
  })
}
function modificar() {
  ref_dl.value?.post('/admin/roles', { ...dl.value }, (b) => {
    roles.value = b.roles
    dl.show = false
  })
}

onMounted(() => {
  reload()
})
</script>
