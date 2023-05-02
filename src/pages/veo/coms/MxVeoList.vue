<template>
  <q-page class="q-pa-md q-gutter-md">
    <m-loading ref="main">
      <div class="col-xs-12 col-sm-6">
        <div class="t-flex t-justify-between t-items-center">
          <div class="text-h3">Avance</div>
        </div>
      </div>
      <div
        class="col-xs-12 col-sm-6"
        :key="index"
        v-for="(el, index) in list.avance"
      >
        {{ el }}
      </div>
      <div class="col-xs-12 col-sm- t-pt-4">
        <div class="t-flex t-justify-between t-items-center">
          <div class="text-h3">Tajo</div>
        </div>
      </div>
      <div
        class="col-xs-12 col-sm-6 t-py-2"
        :key="index"
        v-for="(el, index) in list.tajo"
      >
        <div
          class="t-flex t-justify-between t-items-center t-border-2 t-rounded-lg t-border-gray-300 t-py-2 t-pl-3"
        >
          <div class="t-flex-1">
            <div class="t-flex t-justify-between t-items-center">
              <div class="t-w-4 t-h-4 t-rounded-lg t-bg-green-400"></div>
              <div class="t-font-bold t-text-xl t-flex-1 t-pl-2">
                {{ el.nivel }} {{ el.labor }}
              </div>
              <div class="t-text-gray-500">{{ el.area }}</div>
              <div class="t-text-right">
                <q-icon name="o_chevron_right" size="lg" />
              </div>
            </div>
            <div class="t-w-full t-flex-1 t-text-gray-500 t-italic">
              {{ el.observacion }}
            </div>
          </div>
        </div>
      </div>
    </m-loading>
  </q-page>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar()
const meta = reactive({
    title: 'VEO / SSO',
    btn: {
      label: 'Agregar',
      icon: 'o_add',
      to: '/sso/veo/edit'
    }
  }),
  main = ref(null),
  list = reactive({
    avance: null,
    tajo: null
  })
const props = defineProps(['zona'])
watchEffect(() => {
  console.log('zona', props.zona)
  reload()
})
defineExpose({ meta })
function avance_agregar() {}

function reload() {
  main.value?.post('/veo/sso/list', { zona: props.zona }, (b) => {
    console.log('sso_list.b', b)
    list.avance = b.avance
    list.tajo = b.tajo
  })
}

onMounted(() => {
  reload()
})
</script>
