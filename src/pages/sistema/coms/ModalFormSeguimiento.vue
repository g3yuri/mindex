<template>
  <q-dialog v-model="show">
    <q-card style="max-width: 440px; width: 100%">
      <m-loading ref="main">
        <q-card-section>
          <div class="t-text-3xl t-font-bold">
            {{ dl.id ? 'Editar' : 'Crear' }} Acción
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row q-col-gutter-sm justify-center">
            <q-select
              class="col-sm-6 col-xs-12"
              stack-label
              dense
              options-dense
              outlined
              v-model="dl.tipo"
              label="Tipo"
              option-value="id"
              option-label="tipo"
              :options="tipos"
            />
            <q-input
              class="col-sm-6 col-xs-12"
              outlined
              label="Plazo"
              dense
              v-model="dl.plazo"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="dl.plazo" mask="YYYY-MM-DD">
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
              class="col-12"
              outlined
              stack-label
              autogrow
              type="textarea"
              label="Causa"
              v-model="dl.causa"
            />
            <q-input
              class="col-12"
              outlined
              stack-label
              autogrow
              type="textarea"
              label="Acción"
              v-model="dl.accion"
            />
            <q-select
              class="col-12"
              stack-label
              dense
              outlined
              v-model="dl.area"
              label="Area responsable"
              option-value="id"
              option-label="area"
              options-dense
              :options="areas"
            />
            <mx-personal
              class="col-12"
              dense
              label="Responsable"
              v-model="dl.quien_dni"
            />
          </div>
        </q-card-section>
        <q-card-section align="center">
          <q-btn
            label="Cancelar"
            @click="show = false"
            rounded
            unelevated
            flat
          />
          <q-btn
            label="Guardar"
            @click="agregar"
            icon="save"
            rounded
            unelevated
            color="primary"
          />
        </q-card-section>
      </m-loading>
    </q-card>
  </q-dialog>
</template>
<script setup>
import {
  ref,
  reactive,
  onMounted,
  computed,
  watchEffect,
  watch,
  useAttrs,
  inject
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import MxPersonal from '../../../components/MxPersonal.vue'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  meta = reactive({}),
  main = ref(null),
  dl = ref({}),
  tipos = inject('seguimiento.tipos', []),
  areas = inject('seguimiento.areas', [])

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const show = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

defineExpose({ meta })
function agregar() {}

onMounted(() => {
  main.value?.get('/seguimiento/tipos', (b) => {
    console.log('seguimiento.id', b)
  })
  if (props.id) {
    main.value?.get(`/seguimiento/${props.id}`, (b) => {
      console.log('seguimiento.id', b)
    })
  }
})
</script>
