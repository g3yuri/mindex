<template>
  <q-page class="q-pa-md">
    <m-loading ref="main" class="t-w-full">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <mx-setting
            class="t-max-w-2xl t-mx-auto"
            store="/mailer/gmail/store/credential"
            :payload="{}"
            label="Credenciales de google"
            type="file"
            :value="res?.value?.credential"
            @result="result"
          />
          <template v-if="res.token">
            <mx-setting
              class="t-max-w-2xl t-mx-auto"
              label="Token"
              :value="res.token.access_token"
            />
            <mx-setting
              class="t-max-w-2xl t-mx-auto"
              label="Expire in"
              :value="`${res.token.expires_in} seg`"
            />
            <mx-setting
              class="t-max-w-2xl t-mx-auto"
              label="Refresh"
              :value="res.token.refresh_token"
            />
            <mx-setting
              class="t-max-w-2xl t-mx-auto"
              label="Scope"
              :value="res.token.scope"
            />
            <mx-setting
              class="t-max-w-2xl t-mx-auto"
              label="Created"
              :value="
                dayjs(res.token.created * 1000).format('YYYY-MM-DD hh:mm:ss')
              "
            />
          </template>
          <mx-setting class="t-max-w-2xl t-mx-auto" label="Get uri">
            <a v-if="res?.uri" target="_blank" :href="res?.uri">GOOGLE URI</a>
          </mx-setting>
          <mx-setting class="t-max-w-2xl t-mx-auto">
            <q-checkbox v-model="res.force" label="Forzar solicitud de token" />
          </mx-setting>
        </div>
        <div>
          <q-btn
            label="Renovar"
            icon="o_add"
            @click="google_uri"
            unelevated
            color="primary"
          />
          <q-btn
            label="Test email"
            icon="o_send"
            @click="test_email"
            unelevated
            color="primary"
          />
        </div>
      </div>
    </m-loading>
  </q-page>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import ImageUpload from '../../components/ImageUpload.vue'
import MxSetting from '../../components/MxSetting.vue'
import helper from '../../boot/helper.js'
import dayjs from 'dayjs'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  dl = reactive({
    show: true,
    value: null
  }),
  main = ref(null),
  res = reactive({ value: null, force: false })
const meta = reactive({
  title: 'Mailer Config'
})
// const props = defineProps(['foo'])
defineExpose({ meta })
function result(b) {
  res.value = b
}
function test_email() {
  helper.Api.get('/mailer/test')
}
function google_uri() {
  helper.Api.post(
    '/mailer/gmail/uri',
    { force: res.force },
    (b) => {
      res.uri = b.auth_url
      res.token = b.token
      console.log('google_uri', b)
    },
    (e) => {
      console.log('google_uri.error', e)
    }
  )
}
onMounted(() => {
  main.value.get('/mailer/gmail/init', (b) => {
    res.value = b
    res.token = b.token
    res.uri = b.auth_url
    console.log('onmounted', b)
  })
})
</script>
