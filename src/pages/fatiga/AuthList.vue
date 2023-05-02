<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row items-center q-my-md">
      <div class="col t-text-2xl t-font-bold t-text-blue-800">
        Registro de autorizaciones
      </div>
    </div>
    <div>
      <m-loading ref="main">
        <q-table
          flat
          bordered
          :rows="todo"
          :columns="columns"
          dense
          color="primary"
          table-header-class="text-primary"
          title="Permisos"
          :loading="loading"
          :pagination="initialPagination"
          row-key="id"
          binary-state-sort
        >
          <template v-slot:top-right>
            <q-btn flat round icon="refresh" @click="reload" />
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Buscar"
            >
              <template v-slot:append><q-icon name="search" /></template>
            </q-input>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                <q-btn
                  size="sm"
                  color="accent"
                  round
                  flat
                  dense
                  @click="props.expand = !props.expand"
                  :icon="props.expand ? 'remove' : 'add'"
                />
                {{ props.row.id }}
              </q-td>
              <q-td key="dni" :props="props">
                {{ props.row.dni }}
              </q-td>
              <q-td key="nombres" :props="props">
                {{ props.row.nombres }}
              </q-td>
              <q-td key="correo" :props="props">
                {{ props.row.correo }}
              </q-td>
              <q-td key="accion" :props="props">
                <q-btn
                  label="Ver Registro"
                  dense
                  flat
                  @click="router.push(`/p/datos/${props.row.dni}`)"
                  size="xs"
                  rounded
                  unelevated
                  color="primary"
                />
                <q-btn
                  label="Refresh"
                  dense
                  flat
                  @click="refresh(props.row.dni)"
                  size="xs"
                  rounded
                  unelevated
                  color="primary"
                />
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left t-whitespace-pre-line">
                  access_token: {{ props.row.access_token }}
                </div>
                <div class="text-left">
                  refresh_token: {{ props.row.refresh_token }}
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </m-loading>
    </div>
  </q-page>
</template>
<script>
import { Cookies, useQuasar } from 'quasar'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import helper from '../../boot/helper'

export default {
  setup() {
    const $q = useQuasar()
    const main = ref(null)
    const todo = ref([])
    const router = useRouter()
    const columns = ref([
      { field: 'id', label: 'id', align: 'center', sortable: true, name: 'id' },
      {
        field: 'dni',
        label: 'dni',
        align: 'center',
        sortable: true,
        name: 'dni'
      },
      {
        field: 'nombres',
        label: 'nombres',
        align: 'center',
        sortable: true,
        name: 'nombres'
      },
      {
        field: 'correo',
        label: 'correo',
        align: 'center',
        sortable: true,
        name: 'correo'
      },
      {
        field: 'accion',
        label: 'accion',
        align: 'center',
        sortable: true,
        name: 'accion'
      }
    ])
    const loading = ref(false)
    const filter = ref(null)

    const reload = () => {
      console.log('reload')
      main.value.get('/fatiga/oauth/list', (b) => {
        console.log('reload.ok', b)
        todo.value = b.list
      })
    }
    const refresh = (dni) => {
      main.value.post('/fatiga/oauth/refresh', { dni }, (b) => {
        console.log('refresh.ok', b)
        todo.value = b.list
      })
    }
    return {
      reload,
      main,
      columns,
      todo,
      loading,
      filter,
      router,
      refresh,
      initialPagination: {
        rowsPerPage: 50
      }
    }
  },
  mounted() {
    this.reload()
  },
  methods: {}
}
</script>
