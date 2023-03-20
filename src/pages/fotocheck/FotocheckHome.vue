<template>
  <q-page class="q-pa-md q-gutter-md">
    <q-dialog v-model="dl.show">
      <q-card>
        <q-card-section>
          <div class="text-h6 t-font-bold">ACTUALIZAR</div>

          <table class="col-sm-12 col-md-8 table-lab td-first-bold">
            <thead>
              <tr class="t-bg-yellow-400 t-text-black t-font-bold">
                <th>Campo</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>Dni del personal</td>
              </tr>
              <tr>
                <td>nombre</td>
                <td>Nombres del personal</td>
              </tr>
              <tr>
                <td>apellidos</td>
                <td>Apellidos del personal</td>
              </tr>
              <tr>
                <td>fecha_ingreso</td>
                <td>Fecha de ingreso a la empresa (ejemplo 13/04/2021)</td>
              </tr>
              <tr>
                <td>fecha_nac</td>
                <td>Fecha de nacimiento (ejemplo: 15/01/1980)</td>
              </tr>
              <tr>
                <td>fecha_dni_emision</td>
                <td>Fecha de emision del dni (ejemplo: 15/01/1980)</td>
              </tr>
              <tr>
                <td>fecha_emision</td>
                <td>Fecha de emision de la autorización</td>
              </tr>
              <tr>
                <td>fecha_caducidad</td>
                <td>
                  Fecha de caducidad de la autorización (ejemplo: 15/01/1980)
                </td>
              </tr>
              <tr>
                <td>area</td>
                <td>El area de la empresa al cual pertenece</td>
              </tr>
              <tr>
                <td>empresa</td>
                <td>Empresa a la cual pertenece</td>
              </tr>
              <tr>
                <td>cargo</td>
                <td>Es el cargo que ocupa en la empresa</td>
              </tr>
              <tr>
                <td>lugar</td>
                <td>Lugar de trabajo</td>
              </tr>
              <tr>
                <td>manipula</td>
                <td>El vehiculo que manipula</td>
              </tr>
              <tr>
                <td>sangre</td>
                <td>Tipo de sangre (ejemplo: 15/01/1980)</td>
              </tr>
              <tr>
                <td>fecha_emo</td>
                <td>Fecha del emo (ejemplo: 15/01/1980)</td>
              </tr>
              <tr>
                <td>fecha_emo_venc</td>
                <td>Fecha de vencimiento del emo (ejemplo: 15/01/1980)</td>
              </tr>
              <tr>
                <td>sctr_pension</td>
                <td>Entidad donde se emitio el sctr pension</td>
              </tr>
              <tr>
                <td>sctr_salud</td>
                <td>Entidad donde se emitio el sctr salud</td>
              </tr>
              <tr>
                <td>vacuna_dosis</td>
                <td>Es la dosis que registra</td>
              </tr>
              <tr>
                <td>vacuna_fecha</td>
                <td>Fecha de la ultima vacuna</td>
              </tr>
              <tr>
                <td>fecha_sctr_venc</td>
                <td>Fecha de vencimiento del sctr</td>
              </tr>
              <tr>
                <td>status</td>
                <td>Si el personal esta de BAJA o ACTIVO</td>
              </tr>
              <tr>
                <td>unidad</td>
                <td>Unidad a la que esta destinado</td>
              </tr>
              <tr>
                <td>observacion</td>
                <td>Observacion del personal</td>
              </tr>
              <tr>
                <td>responsable</td>
                <td>Responsable del registro</td>
              </tr>
            </tbody>
          </table>
        </q-card-section>
        <q-card-section>
          <ImageUpload
            @upload="upload_db"
            confirm="Desea realmente actuailzar la base de datos?"
            label="ARCHIVO CSV"
            max-height="100px"
            max-width="100px"
          />
        </q-card-section>
        <q-separator />
        <q-card-section align="center"> </q-card-section>
      </q-card>
    </q-dialog>
    <div class="row items-center q-my-md">
      <div class="col t-text-2xl t-font-bold t-text-blue-800">FOTOCHECK</div>
      <div class="col" style="text-align: right">
        <q-btn
          unelevated
          color="primary"
          label="Actualizar"
          @click="dl.show = true"
        />
      </div>
    </div>
    <m-loading ref="main">
      <div class="row q-col-gutter-md">
        <div :key="key" v-for="(el, key) in todo" class="col-4">
          <div
            :class="
              't-border-4 t-h-full t-rounded-md t-py-2 t-border-indigo-500 t-text-center ' +
              (el.current ? 't-bg-indigo-500 t-text-white' : 't-bg-gray-300')
            "
          >
            <div>{{ el.VENC }}</div>
            <div class="t-font-bold t-text-xl">{{ el.CANT }}</div>
          </div>
        </div>
      </div>
    </m-loading>
  </q-page>
</template>
<script>
import ImageUpload from '../../components/ImageUpload.vue'

export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      dl: { show: false },
      todo: []
    }
  },
  mounted() {
    this.reload()
  },
  methods: {
    reload() {
      this.$refs.main.get('/colaborador/venc', (b) => {
        this.todo = b
        const hoy = new Date()
        const mes = hoy.getMonth() + 1
        const anio = hoy.getFullYear()
        console.log(mes, anio)
        b.forEach((e) => {
          if (typeof e.VENC === 'string') {
            const pt = e.VENC.split(/-/).map((e) => parseInt(e))
            e.current = pt[0] === anio && pt[1] === mes
          } else {
            e.VENC = '(sin emo)'
          }
        })
      })
    },
    upload_db(file) {
      this.$m.api.post(
        '/colaborador/upload',
        { file, prefix: 'foto' },
        (b) => {
          alert(JSON.stringify(b))
        },
        alert
      )
    }
  }
}
</script>
<style scoped>
.td-first-bold td:nth-child(1) {
  font-weight: bold;
}
</style>
