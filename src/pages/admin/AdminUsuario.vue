<template>
  <q-dialog v-model="info.show">
    <q-card>
      <q-card-section>
        <div class="t-text-3xl">
          {{ info.dl_usuario.id_usuario ? 'EDITAR' : 'CREAR' }} USUARIO
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row q-col-gutter-sm justify-center">
          <q-input
            v-model="info.dl_usuario.nombres"
            class="col-sm-6 col-xs-12"
            outlined
            label="Nombres"
          />
          <q-input
            v-model="info.dl_usuario.apellidos"
            class="col-sm-6 col-xs-12"
            outlined
            label="Apellidos"
          />
          <q-input
            v-model="info.dl_usuario.email"
            class="col-sm-6 col-xs-12"
            outlined
            label="Email"
          />
          <q-select
            v-model="info.dl_usuario.area"
            class="col-sm-6 col-xs-12"
            stack-label
            label="Area"
            :options="areas"
          />
          <q-input
            v-if="!info.dl_usuario.id_usuario"
            v-model="info.dl_usuario.password"
            type="password"
            class="col-sm-6 col-xs-12"
            outlined
            label="Password"
          />
          <div class="col-12 t-font-bold t-text-xl">ROLES</div>
          <q-option-group
            v-model="info.dl_usuario.roles"
            class="col-12"
            :inline="true"
            dense
            :options="$m.roles"
            type="checkbox"
          />
        </div>
      </q-card-section>
      <q-card-section align="center">
        <q-btn
          label="Cancelar"
          rounded
          unelevated
          flat
          @click="info.show = false"
        />

        <q-btn
          label="Guardar"
          icon="save"
          rounded
          unelevated
          color="primary"
          @click="click_guardar"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
  <m-loading ref="main" style="height: 100%">
    <q-table
      flat
      bordered
      :rows="usuarios"
      :columns="columns"
      dense
      color="primary"
      table-header-class="text-primary"
      title=""
      :loading="loading"
      row-key="ID"
      :filter="filter"
      virtual-scroll
      :pagination="{ rowsPerPage: 20 }"
      binary-state-sort
      style="height: 100%"
    >
      <template #top>
        <div class="t-flex t-items-center t-justify-center t-w-full">
          <q-input
            v-model="filter"
            outlined
            rounded
            dense
            debounce="300"
            placeholder="Buscar"
            class="sm:t-w-96 t-w-full t-px-8"
            input-class="t-text-sm t-font-bold t-pl-4"
          >
            <template #append><q-icon name="search" /></template>
          </q-input>
        </div>
      </template>

      <template #header="props">
        <q-tr :props="props" class="t-sticky t-bg-white t-z-10">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="t-sticky t-top-0"
          >
            <span class="t-font-bold t-text-sm">{{ col.label }}</span>
          </q-th>
        </q-tr>
      </template>
      <template #body="props">
        <q-tr :props="props" @click="click_user(props.row)">
          <q-td key="nombres" :props="props">
            {{ props.row.nombres }}
          </q-td>
          <q-td key="area" :props="props">
            {{ props.row.area }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="role" :props="props">
            {{ props.row.rolesName.join(',') }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </m-loading>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import helper from '../../boot/helper'
import { useQuasar } from 'quasar'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  main = ref(null),
  info = reactive({
    dl_usuario: {},
    show: false
  }),
  usuarios = ref([]),
  columns = ref([
    {
      field: 'nombres',
      label: 'NOMBRES',
      align: 'left',
      sortable: true,
      name: 'nombres'
    },
    {
      field: 'area',
      label: 'AREA',
      align: 'left',
      sortable: true,
      name: 'area'
    },
    {
      field: 'email',
      label: 'EMAIL',
      align: 'center',
      sortable: true,
      name: 'email'
    },
    {
      field: 'role',
      label: 'ROLES',
      align: 'center',
      sortable: true,
      name: 'role'
    }
  ]),
  loading = ref(false),
  filter = ref(''),
  areas_raw = helper.secciones()

const areas = computed(() => Object.values(areas_raw.value || {}))

const meta = reactive({
  title: 'Usuarios',
  btn: {
    label: 'Crear',
    icon: 'o_add',
    click: crear
  }
})
defineExpose({ meta })

function reload() {
  main.value.get('/admin/usuarios', (b) => {
    usuarios.value = b.usuarios
    helper.roles = b.roles.map((e) => ({ label: e.name, value: e.id }))
    // this.$m.rolesMap = {}
    // b.roles = b.role.forEach(e=>{
    // this.$m.rolesMap[e.id] = e.name
    // })
    usuarios.value.forEach((e) => {
      e.rolesName = e.roles.map((x) => x.name)
      e.roles = e.roles.map((x) => x.id)
    })
  })
}

function crear() {
  info.dl_usuario = { roles: [] }
  info.show = true
}

onMounted(reload)

function click_user(row) {
  info.dl_usuario = { ...row }
  info.show = true
}
function click_guardar() {
  helper.api.json('/admin/usuario/store', info.dl_usuario, (b) => {
    info.show = false
    reload()
  })
}
</script>
