<template>
  <q-page class="q-pa-md q-gutter-md">
    <m-loading ref="main">
      <div class="row q-col-gutter-md">
        <div :key="index" v-for="(el, index) in roles" class="col-4">
          {{ el.name }}
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
  qs = useQuasar(),
  roles = ref([]),
  main = ref(null)

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

onMounted(() => {
  reload()
})
</script>
