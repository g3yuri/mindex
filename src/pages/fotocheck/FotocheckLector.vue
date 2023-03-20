<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row items-center q-my-md">
      <div class="col t-text-2xl t-font-bold t-text-blue-800">FOTOCHECK</div>
      <div class="col" style="text-align: right">
        <q-btn
          unelevated
          color="primary"
          label="Agregar"
          @click="dl.show = true"
        />
      </div>
    </div>
    <q-dialog v-model="dl.show">
      <q-card style="max-width: 440px; width: 100%">
        <q-card-section>
          <div class="text-h6">Crear nuevo permiso</div>
        </q-card-section>
        <q-card-section>
          <div class="q-col-gutter-md">
            <q-input outlined label="Clave" v-model="dl.id" />
            <q-input outlined label="Nombre" v-model="dl.nombre" />
            <!-- <div class="q-gutter-sm">
            <q-radio v-model="dl.status" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="pause" label="Pause" />
            <q-radio v-model="dl.status" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="normal" label="Normal" />
            </div> -->
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section align="center">
          <q-btn
            :label="dl.mod ? 'Modificar' : 'Crear'"
            @click="agregar"
            rounded
            unelevated
            color="primary"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
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
              {{ props.row.id }}
            </q-td>
            <q-td key="nombre" :props="props">
              {{ props.row.nombre }}
            </q-td>
            <q-td key="cant" :props="props">
              {{ props.row.cant }}
            </q-td>
            <q-td key="accion" :props="props">
              <q-btn
                label="Ver Registro"
                dense
                flat
                @click="$router.push(`/fotocheck/registro/${props.row.id}`)"
                size="xs"
                rounded
                unelevated
                color="primary"
              />
              <q-btn
                label="Modificar"
                dense
                flat
                @click="dl = { ...props.row, mod: true, show: true }"
                size="xs"
                rounded
                unelevated
                color="primary"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </m-loading>
  </q-page>
</template>
<script>
const dl_default = { show: false, status: 'normal' }
export default {
  components: {},
  data() {
    return {
      dl: dl_default,
      loading: false,
      todo: [],
      color: {
        normal: 'green',
        pause: 'red'
      },
      filter: '',
      columns: [
        {
          field: 'id',
          label: 'clave',
          align: 'center',
          sortable: true,
          name: 'id'
        },
        {
          field: 'nombre',
          label: 'nombre',
          align: 'center',
          sortable: true,
          name: 'nombre'
        },
        {
          field: 'cant',
          label: 'cantidad',
          align: 'center',
          sortable: true,
          name: 'cant'
        },
        {
          field: 'accion',
          label: 'accion',
          align: 'center',
          sortable: true,
          name: 'accion'
        }
      ],
      initialPagination: {
        rowsPerPage: 50
      }
    }
  },
  mounted() {
    this.reload()
  },
  methods: {
    reload() {
      this.$refs.main.get('/colaborador/permiso', (b) => {
        this.todo = b
      })
    },
    agregar() {
      this.$m.api.post('/colaborador/permiso/store', this.dl, (b) => {
        this.todo = b
        this.dl = dl_default
      })
    }
  }
}
</script>
<style scoped>
.td-first-bold td:nth-child(1) {
  font-weight: bold;
}
</style>
