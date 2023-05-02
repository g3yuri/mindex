<template>
  <q-page class="q-pa-md q-gutter-md">
    <m-loading ref="main">
      <div class="row items-center q-gutter-md">
        <q-btn
          unelevated
          color="primary"
          flat
          label="Atras"
          icon="chevron_left"
          @click="$router.go(-1)"
        />
        <q-space />
        <q-btn
          v-if="pos_id"
          unelevated
          color="negative"
          label="Eliminar"
          flat
          icon="delete"
          @click="pos_delete"
        />
        <q-btn
          unelevated
          color="primary"
          :label="pos_id ? 'Actualizar' : 'Crear'"
          icon="save"
          @click="pos_store"
        />
      </div>
      <div class="t-font-bold text-primary t-text-xl t-py-5">
        DATOS GENERALES
      </div>
      <div class="col-12 t-p-5" v-if="pos_id">
        <ImageUpload
          @upload="upload_foto"
          confirm="Desea realmente subir la imagen?"
          label="FOTO"
          max-height="100px"
          max-width="100px"
          :src="info.uri_foto"
        />
      </div>
      <div>
        <div class="row q-col-gutter-sm">
          <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">
            EMPRESA
          </div>
          <q-select
            class="col-xs-8 col-sm-4"
            dense
            outlined
            v-model="info.id_empresa"
            :options="$m.empresas"
            option-value="id"
            option-label="empresa"
          />
          <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">
            APELLIDOS
          </div>
          <q-input
            class="col-xs-8 col-sm-4"
            dense
            outlined
            v-model="info.apellidos"
          />
          <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">
            NOMBRES
          </div>
          <q-input
            class="col-xs-8 col-sm-4"
            dense
            outlined
            v-model="info.nombres"
          />
          <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">
            DNI
          </div>
          <q-input
            class="col-xs-8 col-sm-4"
            dense
            outlined
            v-model="info.dni"
          />
          <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">
            EDAD
          </div>
          <q-input
            class="col-xs-8 col-sm-4"
            dense
            outlined
            v-model="info.edad"
          />
          <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">
            CARGO
          </div>
          <q-input
            class="col-xs-8 col-sm-4"
            dense
            outlined
            v-model="info.cargo"
            placeholder="cargo al que postula"
          />
          <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">
            AREA
          </div>
          <q-input
            class="col-xs-8 col-sm-4"
            dense
            outlined
            v-model="info.area"
          />
          <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">
            CATEGORIA
          </div>
          <q-select
            class="col-xs-8 col-sm-4"
            dense
            outlined
            v-model="info.categoria"
            :options="['EMPLEADO', 'OBRERO', 'PRACTICANTE']"
          />
          <div class="col-xs-4 col-sm-3 t-font-bold t-flex t-items-center">
            ZONA DE TRABAJO
          </div>
          <q-select
            class="col-xs-8 col-sm-3"
            dense
            outlined
            v-model="info.zona"
            :options="['MINA', 'SUPERFICIE']"
          />
        </div>
      </div>
      <q-dialog v-model="exp_form.show">
        <q-card>
          <q-card-section>
            <div
              class="t-text-2xl"
              style="font-family: Supply-Regular; color: rgb(5, 30, 65)"
            >
              {{ exp_form.id ? 'MODIFICAR' : 'AGREGAR' }} EXPERIENCIA
            </div>
          </q-card-section>
          <q-card-section class="row q-col-gutter-sm">
            <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">
              DESDE
            </div>
            <q-input
              class="col-xs-8 col-sm-4"
              dense
              outlined
              v-model="exp_form.desde"
              mask="##/####"
              fill-mask
            />
            <div class="col-xs-4 col-sm-2 t-font-bold t-flex t-items-center">
              HASTA
            </div>
            <q-input
              class="col-xs-8 col-sm-4"
              dense
              outlined
              v-model="exp_form.hasta"
              mask="##/####"
              fill-mask
            />
            <div class="col-xs-4 col-sm-4 t-font-bold t-flex t-items-center">
              CARGO
            </div>
            <q-input
              class="col-xs-8 col-sm-8"
              dense
              outlined
              v-model="exp_form.cargo"
            />
            <div class="col-xs-4 col-sm-4 t-font-bold t-flex t-items-center">
              EMPRESA
            </div>
            <q-input
              class="col-xs-8 col-sm-8"
              dense
              outlined
              v-model="exp_form.empresa"
            />
          </q-card-section>
          <q-separator />
          <q-card-section align="center" class="q-gutter-md">
            <q-btn
              :label="exp_form.id ? 'Modificar' : 'Crear'"
              @click="exp_store(exp_form)"
              icon="add"
              rounded
              unelevated
              color="primary"
            />
            <q-btn
              v-if="exp_form.pos_id > 0"
              flat
              label="Eliminar"
              @click="exp_eliminar(exp_form)"
              icon="delete"
              rounded
              unelevated
              color="negative"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
      <div class="row t-py-5" v-if="pos_id">
        <div class="col-xs-7 col-sm-8 t-font-bold text-primary t-text-xl">
          EXPERIENCIA
        </div>
        <div class="col-xs-5 col-sm-4 t-text-right">
          <q-btn
            label="AGREGAR"
            :disable="pos_id === null"
            flat
            icon="add"
            @click="exp_form = { show: true }"
            rounded
            unelevated
            color="primary"
          />
        </div>
      </div>
      <div>
        <table class="table-exp">
          <tbody>
            <tr
              :key="index"
              v-for="(el, index) in experiencia"
              style="cursor: pointer"
              @click="exp_form = { ...el, show: true }"
            >
              <td class="periodo">{{ el.desde }} - {{ el.hasta }}</td>
              <td class="empresa">
                <div>{{ el.empresa }}</div>
                <div>{{ el.cargo }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="pos_id">
        <div class="col-8 t-font-bold text-primary t-text-xl t-py-5">
          ADJUNTAR
        </div>
      </div>
      <div>
        <div class="row q-col-gutter-sm" v-if="pos_id">
          <div class="col-xs-6 col-sm-4">
            <ImageUpload
              @upload="upload_policial"
              confirm="Desea realmente subir la imagen?"
              label="ANTECEDENTES POLICIALES"
              max-height="100px"
              max-width="100px"
              :src="info.uri_policial"
            />
          </div>
          <div class="col-xs-6 col-sm-4">
            <ImageUpload
              @upload="upload_penal"
              confirm="Desea realmente subir la imagen?"
              label="ANTECEDENTES PENALES"
              max-height="100px"
              max-width="100px"
              :src="info.uri_penal"
            />
          </div>
          <div class="col-xs-6 col-sm-4">
            <ImageUpload
              @upload="upload_emo"
              confirm="Desea realmente subir la imagen?"
              label="EXAMEN MEDICO OCUPACIONAL"
              max-height="100px"
              max-width="100px"
              :src="info.uri_emo"
            />
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
      info: {},
      exp_form: { show: false },
      pos_id: null,
      experiencia: []
    }
  },
  mounted() {
    this.reload()
  },
  methods: {
    reload() {
      this.$m.api.get('/rrhh/empresas', (b) => {
        this.$m.empresas = b.empresas
      })
      const id = this.$route?.params?.id
      if (id) {
        this.pos_id = id
        this.$refs.main.get(`/rrhh/ver/${id}`, (b) => {
          this.info = b.postulante
          this.experiencia = b.experiencia
          this.info.id_empresa = {
            id: this.info.id_empresa,
            empresa: this.info.empresa
          }
        })
      }
    },
    pos_store() {
      const payload = { ...this.info, id_empresa: this.info.id_empresa?.id }
      this.$m.api.post('/rrhh/store', payload, (id) => {
        this.$q.notify('Se actualizo')
        this.pos_id = id
        this.$refs.main.get(`/rrhh/ver/${id}`, (b) => {
          this.info = b.postulante
          this.experiencia = b.experiencia
          this.info.id_empresa = {
            id: this.info.id_empresa,
            empresa: this.info.empresa
          }
        })
      })
    },
    exp_store(payload) {
      payload.pos_id = this.pos_id
      this.$m.api.post(
        '/rrhh/experiencia',
        payload,
        (b) => {
          payload.show = false
          this.$nextTick(() => {
            this.experiencia = b.experiencia
          })
        },
        alert
      )
    },
    exp_eliminar(payload) {
      this.$q
        .dialog({
          title: 'Confirmar',
          message: 'realmente desea eliminar el item?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          payload.pos_id = this.pos_id
          this.$m.api.delete(
            `/rrhh/experiencia?pos_id=${this.pos_id}&id=${payload.id}`,
            (b) => {
              payload.show = false
              this.experiencia = b.experiencia
            },
            alert
          )
        })
    },
    upload_foto(file) {
      this.$m.api.post(
        '/rrhh/upload/adjunto',
        { file, prefix: 'foto', pos_id: this.pos_id },
        (b) => {
          this.info.uri_foto = b.postulante.uri_foto
        },
        alert
      )
    },
    upload_policial(file) {
      this.$m.api.post(
        '/rrhh/upload/adjunto',
        { file, prefix: 'policial', pos_id: this.pos_id },
        (b) => {
          this.info.uri_policial = b.postulante.uri_policial
        },
        alert
      )
    },
    upload_penal(file) {
      this.$m.api.post(
        '/rrhh/upload/adjunto',
        { file, prefix: 'penal', pos_id: this.pos_id },
        (b) => {
          this.info.uri_penal = b.postulante.uri_penal
        },
        alert
      )
    },
    upload_emo(file) {
      this.$m.api.post(
        '/rrhh/upload/adjunto',
        { file, prefix: 'emo', pos_id: this.pos_id },
        (b) => {
          this.info.uri_emo = b.postulante.uri_emo
        },
        alert
      )
    },
    pos_delete() {}
  }
}
</script>
<style type="text/css">
.adjunta {
  border: 1px dashed #666;
  padding: 2px;
  text-align: center;
}
</style>
