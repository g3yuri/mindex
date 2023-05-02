<template>
  <q-page style="max-width: 500px; margin: auto">
    <div class="row items-center q-my-md">
      <div
        class="col t-text-4xl t-text-center t-py-4 t-font-bold t-text-blue-800"
      >
        REGISTRO
      </div>
    </div>
    <div
      v-if="message"
      class="t-flex t-justify-center t-items-center t-font-bold t-text-xl"
    >
      {{ message }}
    </div>
    <m-loading ref="main">
      <div
        v-if="hasInfo && !modif"
        class="t-max-w-xl t-mx-auto t-my-4 t-flex t-flex-col t-justify-between t-items-center"
      >
        <div class="t-font-bold t-text-xl t-pr-4 t-w-full t-text-center">
          Turno: {{ info.turno }}
        </div>
        <div class="t-font-bold t-text-xl t-pr-4 t-w-full t-text-center">
          Equipo: {{ info.equipo }}
        </div>
        <div>
          <q-btn
            label="Cambiar"
            outline
            size="sm"
            @click="modif = true"
            unelevated
            color="primary"
          />
        </div>
      </div>
      <div v-else class="t-m-3">
        <div class="t-max-w-xl t-mx-auto t-flex t-items-center">
          <div class="t-font-bold t-text-xl t-pr-4 t-w-1/3 t-text-left t-block">
            Turno
          </div>
          <div class="t-w-full t-text-right">
            <q-btn-toggle
              v-model="info.turno"
              no-caps
              rounded
              unelevated
              toggle-color="primary"
              color="white"
              text-color="primary"
              :options="[
                { label: 'DIA', value: 'DIA' },
                { label: 'NOCHE', value: 'NOCHE' }
              ]"
            />
          </div>
        </div>

        <div
          class="t-max-w-xl t-mx-auto t-my-4 t-flex t-justify-between t-items-center"
        >
          <div
            class="t-font-bold t-text-xl t-pr-4 t-w-1/3 t-text-right t-hidden sm:t-block"
          >
            Equipo
          </div>
          <q-input
            ref="requipo"
            class="t-text-2xl t-w-full"
            outlined
            :label="$q.screen.lt.sm ? 'Equipo' : undefined"
            v-model="info.equipo"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.trim().length) || 'Por favor ingrese su equipo'
            ]"
          />
        </div>
      </div>
      <!-- <div class="t-max-w-xl t-mx-auto t-flex t-justify-center t-w-full t-mb-4">
				<ImageUpload @upload="info.screen = $event" :src="info.link" :no-confirm="true" label="Agregar captura de pantalla de app" max-width="100%" />
			</div> -->
      <div class="t-w-full t-px-4 t-mb-4" style="min-height: 80px">
        <div>
          <ImageUpload
            @upload="info.screen = $event"
            :src="info.link"
            :no-confirm="true"
            label="Agregar captura de pantalla de app"
            max-width="100%"
          />
        </div>
      </div>
      <div
        class="t-border-2 t-border-rounded t-rounded-lg t-border-indigo-600 t-px-2 t-mx-2"
      >
        <div class="t-font-bold t-text-lg t-text-indigo-700 t-w-full">
          Cuando despertaste
        </div>
        <div
          class="t-max-w-xl t-mx-auto t-mt-4 t-flex t-justify-between t-items-center"
        >
          <div
            class="t-font-bold t-text-xl t-pr-4 t-w-1/3 t-text-right t-hidden sm:t-block"
          >
            Fecha
          </div>
          <div v-if="fecha_lock" class="t-mb-4 t-font-bold t-text-xl">
            {{ fecha }}
          </div>
          <q-input
            v-else
            ref="rfnac"
            class="t-text-2xl t-w-full"
            outlined
            :label="$q.screen.lt.sm ? 'Fecha' : undefined"
            v-model="fecha"
            mask="date"
            fill-mask="_"
            :rules="['date']"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="fecha" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Cerrar"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="t-max-w-xl t-mx-auto t-my-0 t-flex t-justify-between t-items-center t-flex-col sm:t-flex-row"
        >
          <div
            class="t-font-bold t-text-xl t-pr-4 t-w-full sm:t-w-1/3 t-text-right t-hidden sm:t-block"
          >
            Hora cuando despertaste
          </div>
          <q-input
            ref="rtprofundo"
            class="t-text-2xl t-w-full sm:t-w-4/6"
            outlined
            :label="$q.screen.lt.sm ? 'Hora hh:mm' : undefined"
            v-model="info.final_hora"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.trim().match(/[0-9\.]+/)) ||
                'Por favor ingrese la hora de inicio de descanso'
            ]"
          >
            <template v-slot:append>
              <q-btn-toggle
                v-model="info.final_hora_sf"
                no-caps
                rounded
                unelevated
                toggle-color="primary"
                color="white"
                text-color="primary"
                :options="[
                  { label: 'am', value: 'am' },
                  { label: 'pm', value: 'pm' }
                ]"
              />
            </template>
          </q-input>
        </div>
      </div>
      <div
        class="t-max-w-xl t-mx-auto t-px-4 t-pt-4 t-flex t-justify-between t-items-center"
      >
        <div
          class="t-font-bold t-text-xl t-pr-4 t-w-1/3 t-text-right t-hidden sm:t-block"
        >
          Descanso total
        </div>
        <q-input
          ref="rtprofundo"
          class="t-text-2xl t-w-full"
          outlined
          :label="$q.screen.lt.sm ? 'Descanso total hh:mm' : undefined"
          v-model="info.descanso"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.trim().match(/[0-9\.]+/)) ||
              'Por favor ingrese el tiempo'
          ]"
        />
      </div>
      <div class="t-w-full t-flex t-px-2">
        <div class="t-w-1/2 t-px-2 t-flex t-justify-between t-items-center">
          <div
            class="t-font-bold t-text-xl t-pr-4 t-w-1/3 t-text-right t-hidden sm:t-block"
          >
            Sueño profundo
          </div>
          <q-input
            ref="rtprofundo"
            class="t-text-2xl t-w-full"
            outlined
            stack-label
            :label="$q.screen.lt.sm ? 'Sueño profundo hh:mm' : undefined"
            v-model="info.tprofundo"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.trim().match(/[0-9\.]+/)) ||
                'Por favor ingrese el tiempo'
            ]"
          />
        </div>
        <div class="t-w-1/2 t-px-2 t-flex t-justify-between t-items-center">
          <div
            class="t-font-bold t-text-xl t-pr-4 t-w-1/3 t-text-right t-hidden sm:t-block"
          >
            Sueño ligero
          </div>
          <q-input
            ref="rtdescanso"
            class="t-text-2xl t-w-full"
            outlined
            stack-label
            :label="$q.screen.lt.sm ? 'Sueño ligero hh:mm' : undefined"
            v-model="info.tligero"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.trim().match(/[0-9\.]+/)) ||
                'Por favor ingrese el tiempo'
            ]"
          />
        </div>
      </div>
      <div
        class="t-max-w-xl t-mx-auto t-px-4 t-w-1/2 t-flex t-justify-between t-items-center"
      >
        <div
          class="t-font-bold t-text-xl t-pr-4 t-w-1/3 t-text-right t-hidden sm:t-block"
        >
          Sueño REM
        </div>
        <q-input
          ref="rtdescanso"
          class="t-text-2xl t-w-full"
          outlined
          stack-label
          :label="$q.screen.lt.sm ? 'Sueño REM hh:mm' : undefined"
          v-model="info.trem"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.trim().match(/[0-9\.]+/)) ||
              'Por favor ingrese el tiempo'
          ]"
        />
      </div>
      <div class="t-px-2">
        <q-checkbox v-model="have_obs" label="Existe una observacion" />
      </div>
      <div v-if="have_obs" class="t-px-4">
        <q-input v-model="info.observacion" outlined autogrow />
      </div>
      <div class="t-max-w-xl t-mx-auto t-p-3">
        <q-btn
          class="t-w-full t-py-3 t-font-bold t-text-lg"
          label="Registrar"
          @click="registro"
          rounded
          unelevated
          color="primary"
        />
        <q-btn
          v-if="info.id"
          class="t-w-full t-my-3 t-font-bold t-text-lg"
          outline
          label="Eliminar"
          @click="eliminar"
          rounded
          unelevated
          color="negative"
        />
      </div>
    </m-loading>
  </q-page>
</template>
<script>
import ImageUpload from '../../components/ImageUpload.vue'
import { reactive, ref, watch, onMounted, watchEffect } from 'vue'
import { Cookies, useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs'

export default {
  components: { ImageUpload },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const main = ref(null)
    const info = reactive({})

    const hasInfo = ref(false)
    const modif = ref(false)
    const fecha = ref(null)
    const screen = ref(null)
    const fecha_lock = ref(!!route?.query?.fecha)
    const $q = useQuasar()
    const have_obs = ref(false)

    function initialize(init) {
      init = init ?? {}
      const final = dayjs(init.final || route?.query?.fecha)
      fecha.value = final.format('YYYY/MM/DD')

      info.turno = init.turno ?? Cookies.get('cturno')
      info.equipo = init.equipo ?? Cookies.get('cequipo')

      info.descanso = init.descanso
      info.tprofundo = init.tprofundo
      info.tligero = init.tligero
      info.trem = init.trem
      info.observacion = init.observacion
      have_obs.value = !!init.observacion

      info.final_hora = init.final ? final.format('hh:mm') : null
      info.final_hora_sf = init.final ? final.format('a') : Cookies.get('csf')
      if (init.link) {
        info.link = init.link
      }
      if (init.id) {
        info.id = init.id
      }

      hasInfo.value = info.turno && info.equipo
      console.log('init', init)
    }

    function eliminar() {
      if (info.id > 0) {
        $q.dialog({
          title: 'Eliminar reporte',
          message: 'Desea realmente eliminar el reporte',
          cancel: true,
          persistent: true
        }).onOk(() => {
          main.value.get(
            `/fatiga/oper/${route?.params?.dni}/${info.id}/eliminar`,
            (b) => {
              if (fecha.value) {
                const fc = dayjs(fecha.value).format('YYYY-MM-DD')
                router.replace(`/fatiga/operador/${route?.params?.dni}/${fc}`)
              } else {
                router.replace(`/fatiga/operador/${route?.params?.dni}`)
              }
            }
          )
        })
      }
    }

    onMounted(() => {
      const id = route?.params?.id
      if (id > 0) {
        main.value.get(`/fatiga/item/${route?.params?.dni}/${id}`, (b) => {
          initialize(b)
        })
      } else {
        initialize()
      }
    })

    let timer = null

    watchEffect(() => {
      const has = info.turno && info.equipo
      if (timer) {
        clearTimeout(timer)
      }
      timer = null
      if (has) {
        timer = setTimeout(() => {
          Cookies.set('cturno', info.turno)
          Cookies.set('cequipo', info.equipo)
          hasInfo.value = true
          modif.value = false
        }, 3000)
      }
      console.log('watch.effect')
    })
    watch(
      () => info.final_hora_sf,
      (csf) => {
        Cookies.set('csf', csf)
      }
    )

    console.log(fecha)
    return {
      fecha,
      fecha_lock,
      modif,
      info,
      hasInfo,
      main,
      error: false,
      message: null,
      eliminar,
      have_obs,
      router,
      route,
      initialize,
      validateEmail: [
        (val) =>
          String(val)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) || 'Por favor ingrese un correo electronico'
      ]
    }
  },
  methods: {
    registro() {
      Cookies.set('cturno', this.info.turno)
      Cookies.set('cequipo', this.info.equipo)
      const hora = this.info.final_hora?.trim().split(':')
      if (hora?.length !== 2) {
        alert('No ingreso la hora final de manera correcta')
        return
      }
      if (!this.info.final_hora_sf) {
        alert('No determino si es am o pm')
        return
      }
      if (this.info.final_hora_sf === 'pm') {
        hora[0] = parseFloat(hora[0]) + 12
      }
      this.info.final =
        this.fecha.replaceAll('/', '-') + ` ${hora[0]}:${hora[1]}:00`
      // console.log('registro.info',this.info); return;
      this.$refs.main.post(
        `/fatiga/oper/${this.route?.params?.dni}/store`,
        this.info,
        (b) => {
          console.log(b)
          this.message = b
          this.initialize(b)
          if (this.fecha) {
            const fc = dayjs(this.fecha).format('YYYY-MM-DD')
            this.router.replace(
              `/fatiga/operador/${this.route?.params?.dni}/${fc}`
            )
          } else {
            this.router.replace(`/fatiga/operador/${this.route?.params?.dni}`)
          }
          // alert('Se ingreso sus datos, gracias..')
        }
      )
    }
  }
}
</script>
