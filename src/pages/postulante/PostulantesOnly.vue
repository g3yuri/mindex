<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row items-center q-my-md">
      <div
        class="col t-text-3xl"
        style="font-family: Supply-Regular; color: rgb(5, 30, 65)"
      >
        POSTULANTES
      </div>
      <div class="col" style="text-align: right">
        <q-btn
          unelevated
          color="primary"
          label="Crear"
          icon="add"
          to="/postulante/nuevo"
        />
      </div>
    </div>
    <div>
      <m-loading ref="main">
        <q-table
          flat
          bordered
          :rows="postulantes"
          :columns="columns"
          dense
          color="primary"
          table-header-class="text-primary"
          table-class="table-list"
          title=""
          :loading="loading"
          style="background-color: transparent"
          row-key="s3"
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
            <q-tr :props="props" @click="postulante_ver(props.row)">
              <q-td key="apellidos" :props="props">
                {{ props.row.apellidos }}
              </q-td>
              <q-td key="nombres" :props="props">
                {{ props.row.nombres }}
              </q-td>
              <q-td key="empresa" :props="props">
                {{ props.row.empresa }}
              </q-td>
              <q-td key="status" :props="props">
                <q-chip
                  dense
                  class="t-px-2"
                  :color="change_color[props.row.status]"
                  >{{
                    props.row.status ? props.row.status : 'SIN REVISION'
                  }}</q-chip
                >
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </m-loading>
    </div>
  </q-page>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  data() {
    return {
      postulantes: [],
      data: [
        {
          id: 's',
          nombres: 'Jimmy',
          apellidos: 'Ponce',
          empresa: 'ISAMIN SAC',
          status: 'aceptado'
        },
        {
          id: 's2',
          nombres: 'Jose',
          apellidos: 'Santillan',
          empresa: 'ANDES SAC',
          status: 'observado'
        },
        {
          id: 's3',
          nombres: 'Esteban',
          apellidos: 'Medina',
          empresa: 'ANDES SAC',
          status: 'rechazado'
        }
      ],
      columns: [
        {
          field: 'apellidos',
          label: 'APELLIDOS',
          align: 'left',
          sortable: true,
          name: 'apellidos'
        },
        {
          field: 'nombres',
          label: 'NOMBRES',
          align: 'left',
          sortable: true,
          name: 'nombres'
        },
        {
          field: 'empresa',
          label: 'EMPRESA',
          align: 'left',
          sortable: true,
          name: 'empresa'
        },
        {
          field: 'status',
          label: 'STATUS',
          align: 'center',
          sortable: true,
          name: 'status'
        }
      ],
      loading: false,
      filter: '',
      change_color: {
        APROBADO: 'green',
        OBSERVADO: 'yellow',
        RECHAZADO: 'red'
      }
    }
  },
  mounted() {
    this.reload()
  },
  methods: {
    reload() {
      this.$refs.main.get('/rrhh/list', (b) => {
        this.postulantes = b.postulantes
      })
    },
    postulante_ver(row) {
      console.log(row)
      this.$router.push({ path: `/postulante/ver/${row.id}`, params: {} })
    }
  }
}
</script>
