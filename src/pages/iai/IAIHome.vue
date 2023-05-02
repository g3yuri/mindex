<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row items-center q-my-md">
      <div
        class="col t-text-3xl"
        style="font-family: Supply-Regular; color: rgb(5, 30, 65)"
      >
        ACCIDENTES
      </div>
      <div class="col" style="text-align: right">
        <q-btn
          unelevated
          color="primary"
          label="Crear"
          icon="add"
          to="/iai/nuevo"
        />
      </div>
    </div>
    <div>
      <m-loading ref="main">
        <q-table
          flat
          bordered
          :rows="accidentes"
          :columns="columns"
          dense
          color="primary"
          :grid="$q.screen.xs"
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
            <q-tr :props="props" @click="expand_item(props)">
              <q-td key="fecha_corta" :props="props">
                {{ props.row.fecha_corta }}
              </q-td>
              <q-td key="tipo" :props="props">
                {{ props.row.tipo }}
              </q-td>
              <q-td key="potencial" :props="props">
                {{ props.row.potencial }}
              </q-td>
              <q-td key="lugar" :props="props">
                {{ props.row.lugar }}
              </q-td>
              <q-td key="accidentado" :props="props">
                {{ props.row.accidentado }}
              </q-td>
            </q-tr>
            <q-tr
              :props="props"
              :key="`e_${props.row.index}`"
              class="q-virtual-scroll--with-prev"
            >
              <q-td colspan="100%">
                <div v-if="!props.row.expand" class="text-left">
                  {{ props.row.descripcion }}
                </div>
                <div v-else-if="props.row.info">
                  <q-btn
                    label="Editar"
                    flat
                    @click="postulante_ver(props.row)"
                    dense
                    rounded
                    unelevated
                    color="primary"
                  />

                  <div>
                    <span class="t-font-bold">Tipo: </span
                    >{{ props.row.info.tipo }}
                  </div>
                  <div>
                    <span class="t-font-bold">Fecha y hora: </span
                    >{{ props.row.info.fecha }}
                  </div>
                  <div>
                    <span class="t-font-bold">Descripcion: </span
                    >{{ props.row.info.descripcion }}
                  </div>
                  <div>
                    <span class="t-font-bold">Diagnostico: </span
                    >{{ props.row.info.diagnostico }}
                  </div>
                </div>
                <div v-else>cargando...</div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </m-loading>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      accidentes: [],
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
          field: 'fecha_corta',
          label: 'FECHA',
          align: 'left',
          sortable: true,
          name: 'fecha_corta',
          style: 'width:50px'
        },
        {
          field: 'tipo',
          label: 'TIPO',
          align: 'left',
          sortable: true,
          name: 'tipo'
        },
        {
          field: 'potencial',
          label: 'POTENCIAL',
          align: 'left',
          sortable: true,
          name: 'potencial'
        },
        {
          field: 'lugar',
          label: 'LUGAR',
          align: 'left',
          sortable: true,
          name: 'lugar'
        },
        {
          field: 'accidentado',
          label: 'ACCIDENTADO',
          align: 'center',
          sortable: true,
          name: 'accidentado'
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
      this.$refs.main.get('/iai/list', (b) => {
        this.accidentes = b.accidentes
      })
    },
    postulante_ver(row) {
      console.log(row)
      this.$router.push({ path: `/iai/editar/${row.id}`, params: {} })
    },
    expand_item(props) {
      props.row.expand = !props.row.expand
      if (!props.row.expand) {
        return
      }
      this.$m.api.get(`/iai/ver/${props.row.id}`, (b) => {
        props.row.info = b
      })
    }
  }
}
</script>
