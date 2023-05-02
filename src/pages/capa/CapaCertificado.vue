<template>
  <m-loading ref="main" class="t-p-4">
    <image-upload :src="data.src" @upload="upload" :no-confirm="true" />
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
import ImageUpload from 'src/components/ImageUpload.vue'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  main = ref(null)
const data = reactive({})
const meta = computed(() => {
  const ret = {
    title: 'Diseño'
  }
  // prettier-ignore
  ret.btn = data?.file
    ? {
      label: 'Subir',
      icon: 'o_photo',
      click: upload_to_server
    }
    : null
  return ret
})
function upload_to_server() {
  main.value?.post('/capa/certificado/subir', { file: data.file }, (b) => {
    data.src = b.uri
  })
}
defineExpose({ meta })

function upload(file) {
  data.file = file
}

onMounted(() => {
  main.value?.get('/capa/certificado/init', (b) => {
    data.src = b.uri
  })
})
</script>
