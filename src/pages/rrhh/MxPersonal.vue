<template>
  <q-page class="q-pa-md">
    <div class="t-w-full">
      <div class="row q-col-gutter-md">
        <div class="col-12 t-text-lg">
          Actualizacion de personal, el archivo debe ser csv, la primera linea
          debe contener los siguientes campos
        </div>
        <q-dialog v-model="dl.show">
          <q-card style="max-width: 440px; width: 100%">
            <q-card-section>
              <div class="text-h6 t-font-bold t-text-center">
                Subir archivo CSV
              </div>
            </q-card-section>
            <q-card-section>
              <div class="t-text-center">
                El archivo debe estar en formato CSV, sin columnas en blanco a
                la izquierda ni arriba
              </div>

              <div
                class="t-border-2 t-bg-gray-100 t-p-2 t-rounded-md t-my-4 t-text-center"
              >
                <ImageUpload
                  @upload="upload_db"
                  confirm="Desea realmente actuailzar la base de datos?"
                  label="ARCHIVO EXCEL"
                  max-height="100px"
                  max-width="100px"
                />
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section align="center">
              <q-btn
                label="Actualizar"
                @click="personal_update"
                icon="save"
                rounded
                unelevated
                color="primary"
              />
            </q-card-section>
          </q-card>
        </q-dialog>
        <div class="col-xs-12 col-md-8">
          <table>
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
                <td>id_sap</td>
                <td>Codigo sap del personal</td>
              </tr>
              <tr>
                <td>nombre</td>
                <td>Nombre del personal</td>
              </tr>
              <tr>
                <td>desde</td>
                <td>Fecha de ingreso a la empresa (ejemplo 13/04/2021)</td>
              </tr>
              <tr>
                <td>condicion</td>
                <td>Si es empleado o obrero</td>
              </tr>
              <tr>
                <td>puesto</td>
                <td>Es el cargo que ocupa en la empresa</td>
              </tr>
              <tr>
                <td>area</td>
                <td>El area de la empresa al cual pertenece</td>
              </tr>
              <tr>
                <td>ceco</td>
                <td>Centro de costo al cual esta asignado</td>
              </tr>
              <tr>
                <td>fecha_nac</td>
                <td>Fecha de nacimiento (ejemplo: 15/01/1980)</td>
              </tr>
              <tr>
                <td>cel</td>
                <td>Celular del personal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import ImageUpload from '../../components/ImageUpload.vue'

import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import helper from '../../boot/helper.js'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  meta = reactive({
    title: 'Personal / Admin',
    btn: {
      label: 'Actualizar',
      icon: 'o_update',
      click: () => {
        dl.show = true
      }
    }
  })
defineExpose({ meta })

function personal_update() {}

const dl = reactive({
  show: false
})
function upload_db(file) {
  helper.api.post(
    '/rrhh/subir',
    { file, prefix: 'foto' },
    (b) => {
      alert(JSON.stringify(b))
    },
    alert
  )
}

onMounted(() => {})
</script>
