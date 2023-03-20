<template>
  <q-page class="q-pa-md q-gutter-md">
    <div>
      <q-dialog v-model="dl.show">
        <q-card style="max-width: 440px; width: 100%">
          <m-loading ref="dial">
            <q-card-section>
              <div class="text-h2">Modificar contraseña</div>
            </q-card-section>
            <q-card-section>
              <div v-if="dl.value">
                <div class="col-12">
                  <q-input
                    label="Ingrese anterior contraseña"
                    v-model="dl.value.pwd_lost"
                    outlined
                    @keyup.enter="change"
                    :rules="[(val) => !!val || 'Requerido']"
                    :type="isPwd_lost ? 'password' : 'text'"
                    lazy-rules
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd_lost ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd_lost = !isPwd_lost"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <q-input
                    label="Ingrese nueva contraseña"
                    v-model="dl.value.pwd_now"
                    outlined
                    @keyup.enter="change"
                    :rules="[(val) => !!val || 'Requerido']"
                    :type="isPwd_now ? 'password' : 'text'"
                    lazy-rules
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd_now ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd_now = !isPwd_now"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <q-input
                    label="Repita nueva contraseña"
                    v-model="dl.value.pwd_rep"
                    outlined
                    @keyup.enter="change"
                    :rules="[
                      (val) =>
                        (val.length && val == dl.value.pwd_now) ||
                        'Se debe repetir la nueva contraseña'
                    ]"
                    :type="isPwd_rep ? 'password' : 'text'"
                    lazy-rules
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd_rep ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd_rep = !isPwd_rep"
                      />
                    </template>
                  </q-input>
                </div>
              </div>
            </q-card-section>
            <q-card-section align="center">
              <q-btn
                class="t-w-full t-font-bold"
                label="Cambiar"
                @click="change_pwd_exec"
                unelevated
                color="primary"
              />
            </q-card-section>
          </m-loading>
        </q-card>
      </q-dialog>
      <div class="text-center t-p-4">
        <q-avatar v-if="info.avatar" size="100px">
          <img :src="info.avatar" />
        </q-avatar>
        <q-avatar :color="$m.state.user.color" text-color="white" size="100px">
          {{ $m.state.user.letter }}
        </q-avatar>
      </div>
      <mx-setting
        class="t-max-w-2xl t-mx-auto"
        label="Nombres"
        :value="info.nombres"
      />
      <mx-setting
        class="t-max-w-2xl t-mx-auto"
        label="Apellidos"
        :value="info.apellidos"
      />
      <mx-setting
        class="t-max-w-2xl t-mx-auto"
        label="Area"
        :value="$m.state.user.area"
      />
      <mx-setting
        class="t-max-w-2xl t-mx-auto"
        label="Correo"
        :value="$m.state.user.email"
      />
      <mx-setting class="t-max-w-2xl t-mx-auto" label="Cambiar contraseña">
        <q-btn label="Cambiar" @click="change_pwd" unelevated color="primary" />
      </mx-setting>
    </div>
  </q-page>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import MxSetting from '../../components/MxSetting.vue'
import helper from '../../boot/helper.js'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  dl = reactive({
    show: false,
    value: null
  }),
  isPwd_now = ref(true),
  isPwd_rep = ref(true),
  isPwd_lost = ref(true),
  dial = ref(null)
// const props = defineProps(['foo'])
const info = reactive({
  nombres: helper.state.user.nombres,
  apellidos: helper.state.user.apellidos
})

function change_pwd() {
  dl.show = true
  dl.value = {
    pwd_lost: '',
    pwd_now: '',
    pwd_rep: ''
  }
}
function change() {}

function change_pwd_exec() {
  console.log('exec', { ...dl.value })
  dial.value.post('/login/pwd/update', { ...dl.value }, (b) => {
    // console.log('perfil.change_pwd_exec', b)
    dl.show = false
    dl.value = {}
  })
}

onMounted(() => {})
const fiu = ref(32)

function titulo() {
  alert('Hola como esta')
}
defineExpose({ titulo })
</script>
