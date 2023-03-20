<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row items-center q-my-md">
      <div class="col" style="text-align: right">
        <q-btn
          v-if="have_drop"
          flat
          @click="drop_click"
          icon="delete"
          rounded
          unelevated
          color="negative"
        />
        <q-btn
          flat
          @click="seleccionar_todo"
          icon="apps"
          rounded
          unelevated
          color="primary"
        />
        <q-btn
          flat
          @click="deseleccionar"
          icon="stop"
          rounded
          unelevated
          color="primary"
        />
        <!-- <q-btn flat @click="realloc" icon="apps" rounded unelevated color="primary"/> -->
      </div>
    </div>
    <div v-if="!tag" class="row">
      <div class="col-xs-12 col-sm-6">
        <q-select
          outlined
          dense
          @update:model-value="update_model"
          v-model="area"
          label="Area"
          option-value="id"
          option-label="label"
          :options="area_list"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div>
      <q-dialog v-model="dle.show">
        <q-card>
          <q-card-section>
            <div class="text-h6">REALMENTE DESEA ELIMINAR?</div>
          </q-card-section>
          <q-card-section>
            <div :key="key" v-for="(el, key) in dle.items">
              {{ el.id }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section align="center">
            <q-btn
              label="Cancelar"
              flat
              @click="dle.show = false"
              rounded
              unelevated
            />
            <q-btn
              label="Eliminar"
              color="negative"
              @click="planos_drop(dle.items)"
              rounded
              unelevated
            />
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dl.show">
        <q-card style="max-width: 400px; width: 100%">
          <q-card-section>
            <div class="text-h6">SUBIR ARCHIVOS</div>
          </q-card-section>
          <q-card-section class="row q-col-gutter-md">
            <q-uploader
              class="col-12"
              ref="up"
              color="grey-3"
              text-color="primary"
              flat
              :url="$m.api.uri(`/sis/${base}/upload`)"
              :label="`Subir ${base}`"
              :with-credentials="true"
              multiple
              batch
              @uploaded="uploaded"
              @failed="uploaded"
              :form-fields="form_fields"
            />
          </q-card-section>
          <q-separator />
          <q-card-section align="center">
            <q-btn
              label="Cancelar"
              flat
              @click="dl.show = false"
              rounded
              unelevated
            />
            <q-btn
              v-if="$refs.up?.upload"
              color="primary"
              label="Subir"
              @click="$refs.up.upload"
              rounded
              unelevated
            />
          </q-card-section>
        </q-card>
      </q-dialog>
      <m-loading ref="main">
        <table class="table-lab">
          <thead>
            <tr class="t-bg-yellow-400 t-text-black t-font-bold">
              <th>Ruta</th>
              <th>Size</th>
              <th>Modificacion</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="key"
              v-for="(el, key) in pets"
              @click="el.select = !el.select"
              :class="el.select ? 't-bg-gray-300' : ''"
              style="cursor: pointer"
            >
              <td>{{ el.name }}</td>
              <td>{{ el.size }}</td>
              <td>{{ el.last_modified_fm }}</td>
            </tr>
          </tbody>
        </table>
      </m-loading>
    </div>
  </q-page>
</template>
<script setup>
import {
  ref,
  reactive,
  onMounted,
  computed,
  toRefs,
  watchEffect,
  watch
} from 'vue'
import { useRoute } from 'vue-router'
import helper from '../../boot/helper'

const props = defineProps({
  base: String,
  tag: String
})

const { base, tag } = toRefs(props)

const area_list = ref([]),
  all = ref([]),
  pets = ref([]),
  main = ref(null),
  area = ref(null),
  dle = reactive({ show: false }),
  dl = reactive({ show: false }),
  files = ref([]),
  route = useRoute()

const meta = computed(() => ({
  title: `${base.value} / ${tag.value ?? area.value?.label ?? ''}`,
  btn: {
    label: 'Subir',
    icon: 'o_add',
    click: () => {
      dl.show = true
    }
  }
}))
defineExpose({ meta })
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024,
    dm = decimals,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

function update_model(value) {
  console.log('update_model.value', value)
  pets.value = all.value[tag?.value ?? value?.label ?? area.value?.label]
}

function _from_api(b) {
  all.value = b
  if (all.value) {
    for (const key in all.value) {
      all.value[key].forEach((e) => {
        e.size = formatBytes(e.size, 0)
        const parts = e.id.split('/')
        e.name = parts[parts.length - 1]
        e.last_modified_fm = new Date(
          parseInt(e.last_modified) * 1000
        ).toLocaleString('en-US')
      })
    }
    update_model()
  }
}

function realloc() {
  main.value.get(`/sis/${base.value}/realloc`, _from_api)
}
watch([main, base, tag], () => {
  console.log('onMounted.base', base?.value)
  main?.value?.get(`/sis/${base.value}/list`, _from_api)
})
helper.api.get('/sis/areas', (b) => {
  console.log('AREAS', b)
  area_list.value = Object.entries(b).map((e) => {
    return {
      id: e[0],
      label: e[1]
    }
  })
})

function uploaded(info) {
  console.log(info)
  try {
    const js = JSON.parse(info.xhr?.responseText)
    if (js.ok) {
      _from_api(js.body)
    } else {
      alert(js.body)
    }
  } catch (e) {
    alert(e)
  }
}

function drop_click() {
  console.log('drop_click.all', all.value)
  console.log('drop_click.area', area.value?.label)
  console.log('drop_click.base', base.value)
  console.log('drop_click.tag', tag.value)
  dle.items = [
    ...all.value[tag.value ?? area.value?.label].filter((e) => e.select)
  ]
  dle.show = true
}
function seleccionar_todo() {
  pets.value?.forEach((e) => {
    e.select = true
  })
}
function deseleccionar() {
  pets.value?.forEach((e) => {
    e.select = false
  })
}
function planos_drop(items) {
  helper.api.json(
    `/sis/${base.value}/drop`,
    items,
    (b) => {
      _from_api(b)
      dle.show = false
    },
    alert
  )
}

const have_drop = computed(() => {
  return pets.value?.filter((e) => e.select).length > 0
})

const form_fields = computed(() => {
  return [
    { name: 'base', value: base.value },
    { name: 'tag', value: tag.value ?? area.value?.label }
  ]
})
</script>

<style type="text/css" scoped>
.table-lab {
  border-spacing: 0;
  width: 100%;
}
.table-lab th {
  padding: 6px 12px;
  font-weight: bold;
}
.table-lab td {
  padding: 6px 12px;
  text-align: right;
}
.table-lab td:nth-child(1) {
  text-align: left;
}
</style>
