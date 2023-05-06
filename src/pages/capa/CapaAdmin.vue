<template>
  <q-dialog v-model="dl.show">
    <q-card style="max-width: 440px; width: 100%">
      <m-loading ref="main_dl">
        <q-card-section>
          <div class="t-text-3xl t-font-bold">
            {{ dl.value.id ? 'EDITAR' : 'CREAR' }} CERTIFICADO
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row q-col-gutter-sm justify-center">
            <q-input
              dense
              class="col-sm-6 col-xs-12"
              stack-label
              outlined
              label="Dni"
              v-model="dl.value.dni"
            />
            <q-input
              class="col-sm-6 col-xs-12"
              outlined
              dense
              v-model="dl.value.fecha"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="dl.value.fecha" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Cerrar"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              dense
              class="col-sm-6 col-xs-12"
              stack-label
              outlined
              label="Nombres"
              v-model="dl.value.nombres"
            />
            <q-input
              dense
              class="col-sm-6 col-xs-12"
              stack-label
              outlined
              label="Apellidos"
              v-model="dl.value.apellidos"
            />
            <q-select
              dense
              class="col-sm-6 col-xs-12"
              outlined
              v-model="dl.value.curso"
              label="Cursos"
              option-value="curso"
              option-label="curso"
              use-input
              emit-value
              map-options
              hide-selected
              fill-input
              input-debounce="0"
              :options="cursos_list"
              @filter="filterFn"
              @update:model-value="showing"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"
                    >Sin resultados</q-item-section
                  >
                </q-item>
              </template>
            </q-select>
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
            @click="generar"
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
      :data="list_data"
      :columns="[
        { field: 'dni', label: 'Dni' },
        { field: 'nombres', label: 'Nombres' },
        { field: 'curso', label: 'Curso' },
        { field: 'hash', label: 'Ver' }
      ]"
      v-bind="{ dense: false }"
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="dni" :props="props">
            {{ props.row.dni }}
          </q-td>
          <q-td key="nombres" :props="props">
            {{ props.row.apellidos }} {{ props.row.nombres }}
          </q-td>
          <q-td key="curso" :props="props">
            {{ props.row.curso }}
          </q-td>
          <q-td key="hash" :props="props">
            <a
              target="_blank"
              :href="`https://slim.gmi.gd.pe/capa/certificado/${props.row.hash}`"
              >ver</a
            >
          </q-td>
        </q-tr>
      </template>
    </m-table>
  </m-loading>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  main = ref(null),
  main_dl = ref(null),
  list_data = ref([]),
  dl = reactive({
    show: false,
    value: {
      curso: ''
    }
  })

const meta = reactive({
  title: 'Administrar',
  btn: {
    label: 'Crear',
    click: () => {
      dl.show = true
    }
  }
})

// const props = defineProps(['foo'])
defineExpose({ meta })
let original = []
const cursos_list = ref(original)

function filterFn(val, update) {
  if (val === '') {
    update(() => {
      cursos_list.value = original
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    cursos_list.value = original.filter(
      (v) => v.curso?.toLowerCase().indexOf(needle) > -1
    )
  })
}

function generar() {
  main_dl.value?.post('/capa/certificado/generar', dl.value, (b) => {
    list_data.value = b.certis
    dl.show = true
  })
}

function reload() {
  main.value?.get('/capa/certificado/init', (b) => {
    cursos_list.value = b.cursos
    list_data.value = b.certis
    original = b.cursos
    console.log('original', original)
  })
}

function showing() {
  console.log('select.update', dl.value)
}

onMounted(() => {
  reload()
})
</script>
