<template>
  <q-dialog v-model="cur_edit.show">
    <q-card style="max-width: 440px; width: 100%" v-if="cur_edit.value">
      <m-loading ref="main_curr">
        <q-card-section>
          <div class="t-text-3xl t-font-bold">
            {{ cur_edit.value?.id ? 'EDITAR' : 'CREAR' }} CURSO
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row q-col-gutter-sm justify-center">
            <q-input
              class="col-sm-6 col-xs-12"
              outlined
              label="Curso"
              v-model="cur_edit.value.curso"
            />
          </div>
        </q-card-section>
        <q-card-section align="center">
          <q-btn
            label="Cancelar"
            @click="cur_edit.show = false"
            rounded
            unelevated
            flat
          />
          <q-btn
            label="Guardar"
            @click="crear_curso"
            icon="save"
            rounded
            unelevated
            color="primary"
          />
        </q-card-section>
      </m-loading>
    </q-card>
  </q-dialog>
  <m-loading ref="main" class="t-p-4">
    <m-table
      :columns="[{ field: 'curso', label: 'CURSO' }]"
      :data="list_data"
      v-bind="{ dense: true }"
    />
  </m-loading>
</template>
<script setup>
import {
  ref,
  reactive,
  onMounted,
  computed,
  watchEffect,
  watch,
  useAttrs
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  cur_edit = reactive({
    show: false,
    value: {
      curso: null
    }
  }),
  meta = reactive({
    title: 'Cursos',
    btn: {
      label: 'Nuevo',
      icon: 'o_add',
      click: () => {
        cur_edit.show = true
      }
    }
  }),
  list_data = ref([]),
  main_curr = ref(null),
  main = ref(null)
// const props = defineProps(['foo'])
defineExpose({ meta })

function crear_curso() {
  main_curr.value.post(
    '/capa/cursos/crear',
    {
      curso: cur_edit.value.curso
    },
    (b) => {
      cur_edit.show = false
      cur_edit.value = {
        curso: null
      }
      list_data.value = b.cursos
    }
  )
}

onMounted(() => {
  main.value?.get('/capa/cursos/list', (b) => {
    list_data.value = b.cursos
  })
})
</script>
