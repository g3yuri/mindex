<template>
  <q-table
    flat
    :rows="list"
    :columns="columns"
    dense
    color="primary"
    title=""
    :loading="loading"
    row-key="id"
    :filter="filter"
    virtual-scroll
    :pagination="{ rowsPerPage: 20 }"
    binary-state-sort
    style="height: 100%; min-height: 100%"
    card-class="t-bg-transparent"
    class="m_table"
  >
    <!-- <template #top-left>
        <slot name="top-left"></slot>
      </template> -->
    <template #[props.landSearch]>
      <q-input
        v-model="filter"
        outlined
        rounded
        dense
        debounce="300"
        placeholder="Buscar"
        input-class="t-text-sm t-font-bold t-pl-2 t-w-full"
        :class="`t-w-full ${
          props.landSearch == 'top' ? 'md:t-w-2/3' : ''
        } t-m-auto`"
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template #body="props" v-if="slots.body">
      <slot name="body" v-bind="props" />
    </template>

    <!-- <template #body="props">
          <slot v-bind="props" name="body">
            <q-tr :props="props">
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="cantidad" :props="props">
                {{ props.row.cantidad }}
              </q-td>
              <q-td key="descripcion" :props="props">
                {{ props.row.descripcion }}
              </q-td>
            </q-tr>
          </slot>
        </template> -->
    <!-- <template #header="inf">
          <q-tr :props="inf" class="t-sticky t-bg-white t-z-10">
            <q-th
              v-for="col in inf.cols"
              :key="col.name"
              :props="inf"
              class="t-sticky t-top-0"
            >
              <span class="t-font-bold t-text-sm">{{ col.label }}</span>
            </q-th>
          </q-tr>
        </template> -->
  </q-table>
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
  useSlots
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar()

const filter = ref('')
const loading = ref(false),
  slots = useSlots()
const meta = computed(() => ({
  title: 'Roles.',
  btn: {
    label: 'Agregar',
    icon: 'o_add',
    click: () => {}
  }
}))
// const columns = ref([])

const props = defineProps({
  columns: {
    type: Array,
    default() {
      return []
    },
    validator(val) {
      return Array.isArray(val)
    }
  },
  data: {
    type: Array,
    default() {
      return []
    }
  },
  landSearch: {
    type: String,
    default: 'top'
  }
})
// const list = ref([])
// watch(props.data, () => {
//   list.value = [...props.data]
//   console.log('algo: ', list)
// })
// CON EL WATCH NO RESULTABA EL CAMBIO
const list = computed(() => {
  // return [...props.data]
  return props.data
})

const columns = computed(() => {
  return props.columns.map((e) => ({
    sortable: true,
    align: 'left',
    label: e.label,
    name: e.field,
    field: e.field
  }))
})

defineExpose({ meta })

onMounted(() => {
  // list.value = [...props.data]
  console.log('algo: ', list)
})
</script>

<style lang="scss">
@tailwind components;

@layer components {
  .m_table {
    th {
      @apply t-font-bold t-text-sm;
    }
    td {
      @apply t-text-sm;
    }
  }
}
</style>
