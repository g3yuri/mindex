<template>
  <m-loading ref="main" style="height: 100%">
    <m-table
      :columns="[
        { field: 'name', label: 'Role' },
        { field: 'cantidad', label: 'Cantidad' },
        { field: 'descripcion', label: 'Descripcion' }
      ]"
      :data="list_data"
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
  list_data = ref([])

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
