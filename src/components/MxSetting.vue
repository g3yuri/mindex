<template>
  <div
    :class="`t-w-full t-flex t-justify-between t-items-center t-border-b-2 t-p-2 t-border-gray-200 ${attrs.class}`"
  >
    <input
      v-if="type === 'file' && rsval"
      type="file"
      v-show="false"
      ref="file"
      @input="upload_file"
    />
    <div class="t-font-bold t-text-xl">{{ label }}</div>
    <div
      v-if="!slots.default"
      class="t-flex t-flex-row t-items-center t-flex-1 t-overflow-hidden t-pl-4 t-justify-between"
    >
      <div class="t-text-right t-w-full t-overflow-hidden">
        <div class="t-text-ellipsis t-w-full t-overflow-hidden t-truncate">
          {{ value || '-' }}
        </div>
        <div v-if="info" class="t-text-xs t-text-gray-400">
          <div>{{ info.name }} {{ formatBytes(info.size) }}</div>
        </div>
      </div>
      <div>
        <q-btn
          v-if="type === 'file' && !info"
          class="t-ml-4"
          @click="file?.click()"
          icon="o_cloud"
          unelevated
          color="primary"
        />
        <q-btn
          v-if="type === 'file' && info"
          class="t-ml-4"
          @click="upload"
          :loading="loading"
          icon="o_upload"
          label="SUBIR"
          unelevated
          color="negative"
        />
        <q-btn
          v-if="type === 'file' && info"
          class="t-ml-4"
          @click="reset"
          icon="o_close"
          unelevated
          color="secondary"
        />
      </div>
    </div>
    <slot v-if="slots.default"></slot>
  </div>
</template>
<script setup>
import {
  ref,
  reactive,
  onMounted,
  computed,
  watchEffect,
  watch,
  nextTick,
  useAttrs,
  useSlots
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { formatBytes } from '../assets/lib.js'
import helper from '../boot/helper.js'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  loading = ref(false),
  attrs = useAttrs(),
  file = ref(null),
  info = ref(null),
  rsval = ref(true),
  slots = useSlots()

const props = defineProps({
  value: [Object, String, Boolean],
  label: String,
  type: String,
  store: String,
  payload: Object
})

const emit = defineEmits(['update:modelValue', 'result'])

function update(val) {
  // console.log('update.internal', val, props.modelValue)
  // emit('update:modelValue', val)
}

function upload() {
  if (props.type === 'file') {
    const payload = { ...props.payload, file: file?.value?.files[0] }
    loading.value = true
    helper.api.post(
      props.store,
      payload,
      (b) => {
        console.log('upload.res', b)
        loading.value = false
        emit('result', b)
        file.value = null
        info.value = null
      },
      (e) => {
        console.log('upload.error', e)
        loading.value = false
      }
    )
  }
}

function reset() {
  if (props.type === 'file') {
    rsval.value = false
    info.value = null
    nextTick(function () {
      rsval.value = true
    })
    console.log('reset')
  }
}

function upload_file() {
  const { type, name, size } = file?.value?.files[0]
  info.value = { type, name, size }
  console.log('upload.val', file?.value.files)
}

onMounted(() => {})
</script>
