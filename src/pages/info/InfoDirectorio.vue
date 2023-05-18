<template>
  <q-page class="q-pa-md q-gutter-md">
    <div>
      <div class="t-text-xl t-font-bold t-py-4">GMI - SUPERFICIE</div>
      <div class="row q-col-gutter-md">
        <div
          :key="index"
          class="col-sm-6 col-xs-12 col-md-3"
          v-for="(el, index) in GMI"
        >
          <div class="t-w-full t-flex">
            <div class="t-w-1/4 t-text-lg t-font-bold">
              {{ el.anexo }}
            </div>
            <div class="t-w-3/4">
              {{ el.usuario }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="t-text-xl t-font-bold t-py-4">ALPAYANA</div>
      <div class="row q-col-gutter-md">
        <div
          :key="index"
          class="col-sm-6 col-xs-12 col-md-3"
          v-for="(el, index) in Alpayana"
        >
          <div class="t-w-full t-flex">
            <div class="t-w-1/4 t-text-lg t-font-bold">
              {{ el.anexo }}
            </div>
            <div class="t-w-3/4">
              {{ el.usuario }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="t-text-xl t-font-bold t-py-4">CUERPOS</div>
      <div class="row q-col-gutter-md">
        <div
          :key="index"
          class="col-sm-6 col-xs-12 col-md-3"
          v-for="(el, index) in Cuerpos"
        >
          <div class="t-w-full t-flex">
            <div class="t-w-1/4 t-text-lg t-font-bold">
              {{ el.anexo }}
            </div>
            <div class="t-w-3/4">
              {{ el.usuario }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="t-text-xl t-font-bold t-py-4">OROYA</div>
      <div class="row q-col-gutter-md">
        <div
          :key="index"
          class="col-sm-6 col-xs-12 col-md-3"
          v-for="(el, index) in Oroya"
        >
          <div class="t-w-full t-flex">
            <div class="t-w-1/4 t-text-lg t-font-bold">
              {{ el.anexo }}
            </div>
            <div class="t-w-3/4">
              {{ el.usuario }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="t-text-xl t-font-bold t-py-4">ESPERANZA</div>
      <div class="row q-col-gutter-md">
        <div
          :key="index"
          class="col-sm-6 col-xs-12 col-md-3"
          v-for="(el, index) in Esperanza"
        >
          <div class="t-w-full t-flex">
            <div class="t-w-1/4 t-text-lg t-font-bold">
              {{ el.anexo }}
            </div>
            <div class="t-w-3/4">
              {{ el.usuario }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="t-text-xl t-font-bold t-py-4">PIQUE 650</div>
      <div class="row q-col-gutter-md">
        <div
          :key="index"
          class="col-sm-6 col-xs-12 col-md-3"
          v-for="(el, index) in Pique650"
        >
          <div class="t-w-full t-flex">
            <div class="t-w-1/4 t-text-lg t-font-bold">
              {{ el.anexo }}
            </div>
            <div class="t-w-3/4">
              {{ el.usuario }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="t-text-xl t-font-bold t-py-4">PIQUE 790</div>
      <div class="row q-col-gutter-md">
        <div
          :key="index"
          class="col-sm-6 col-xs-12 col-md-3"
          v-for="(el, index) in Pique790"
        >
          <div class="t-w-full t-flex">
            <div class="t-w-1/4 t-text-lg t-font-bold">
              {{ el.anexo }}
            </div>
            <div class="t-w-3/4">
              {{ el.usuario }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </q-page>
</template>
<script setup>
import {
  ref,
  reactive,
  onMounted,
  computed,
  watchEffect,
  watch,
  useAttrs
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const Alpayana = [
  {
    anexo: '5101',
    usuario: ' Gerencia de Operaciones'
  },
  {
    anexo: '5130',
    usuario: ' Gerencia de Seguridad y SO'
  },
  {
    anexo: '5121',
    usuario: 'Seguridad y Salud Ocupacional'
  },
  {
    anexo: '5119',
    usuario: 'Posta Medica'
  },
  {
    anexo: '5543',
    usuario: 'Sistema Gestión Integrado - SGI'
  },
  {
    anexo: '5116',
    usuario: 'Superintendencia de Planeamiento'
  },
  {
    anexo: '5541',
    usuario: 'Asistente de Superintendencia de Planeamiento'
  },
  {
    anexo: '5516',
    usuario: 'Geomecanica'
  },
  {
    anexo: '5125',
    usuario: 'Superintendencia de Geología'
  },
  {
    anexo: '5106',
    usuario: 'Geologia'
  },
  {
    anexo: '5153',
    usuario: 'Geologia Taladros Largos'
  },
  {
    anexo: '5110',
    usuario: 'Gerencia de Mantenimiento y Energía'
  },
  {
    anexo: '5118',
    usuario: 'Medio Ambiente'
  },
  {
    anexo: '5115',
    usuario: 'Recursos Humanos'
  },
  {
    anexo: '5166',
    usuario: 'Capacitación'
  },
  {
    anexo: '5128',
    usuario: 'Porras Yupanqui, Luis'
  },
  {
    anexo: '5120',
    usuario: 'Berbardo Clemente, Lizet'
  },
  {
    anexo: '5104',
    usuario: 'Sistemas 	'
  },
  {
    anexo: '5113',
    usuario: 'Caja	'
  },
  {
    anexo: '5124',
    usuario: 'Almacén General	'
  },
  {
    anexo: '5154',
    usuario: 'Almacen'
  },
  {
    anexo: '5117',
    usuario: 'Auditoria Técnica	'
  },
  {
    anexo: '5114',
    usuario: 'Seguridad Patrimonial'
  }
]

const GMI = [
  {
    anexo: '5511',
    usuario: 'Gerencia General GMI	'
  },
  {
    anexo: '5556',
    usuario: 'Superintendencia de Mina GMI'
  },
  {
    anexo: '5102',
    usuario: 'Jefe de Mina GMI	'
  },
  {
    anexo: '5542',
    usuario: 'Oficina Veta Oroya GMI 	'
  },
  {
    anexo: '5128',
    usuario: 'Superintendencia SSO GMI'
  },
  {
    anexo: '5535',
    usuario: 'Seguridad GMI'
  },
  {
    anexo: '5109',
    usuario: 'Central de operaciones GMI'
  },
  {
    anexo: '5105',
    usuario: 'Superintendencia de Mantenimiento	'
  },
  {
    anexo: '5110',
    usuario: 'Planeamiento Mantenimiento GMI	'
  },
  {
    anexo: '5135',
    usuario: 'Taller Maestranza GMI 	'
  },
  {
    anexo: '5133',
    usuario: 'Taller Eléctrico GMI 	'
  },
  {
    anexo: '5144',
    usuario: 'Taller Garaje GMI 	'
  },
  {
    anexo: '5155',
    usuario: 'Taller Trackles GMI 	'
  },
  {
    anexo: '5152',
    usuario: 'Casa Lámpara Carmen	'
  },
  {
    anexo: '5134',
    usuario: 'Piques y Chancadora	'
  },
  {
    anexo: '5527',
    usuario: 'Subestación Principal'
  },
  {
    anexo: '5546',
    usuario: 'Almacen GMI	'
  },
  {
    anexo: '5525',
    usuario: 'Jefe de Recursos Humanos GMI'
  },
  {
    anexo: '5159',
    usuario: 'Recursos Humanos GMI'
  },
  {
    anexo: '5123',
    usuario: 'Bienestar Social GMI'
  }
]

const Oroya = [
  {
    anexo: '5538',
    usuario: 'NV 435 Sala Control Pique 790'
  },
  {
    anexo: '8401',
    usuario: 'NV 435 Estacion Pique 790'
  },
  {
    anexo: '5540',
    usuario: 'NV 435 Sala Operación Winche Pique 790 '
  },
  {
    anexo: '8402',
    usuario: 'NV 435 Sala Operación Winche Pique 790 '
  },
  {
    anexo: '8404',
    usuario: 'NV 4 Estación Pique 790'
  },
  {
    anexo: '8508',
    usuario: 'NV 12 Ventana inclinado 1200'
  },
  {
    anexo: '8508',
    usuario: 'NV 13 Ventana inclinado 014'
  },
  {
    anexo: '8508',
    usuario: 'NV 12 Pocket inclinado 1200'
  },
  {
    anexo: '8405',
    usuario: 'NV 4 Pocket Pique 790'
  },
  {
    anexo: '8406',
    usuario: 'NV 4 Izaje de Madera CH 995'
  },
  {
    anexo: '8407',
    usuario: 'NV 8 Estacion Pique 790'
  },
  {
    anexo: '8503',
    usuario: 'NV 12 Sala Winche inclinado 014'
  },
  {
    anexo: '8408',
    usuario: 'NV 8 Pockert Pique 790'
  },
  {
    anexo: '8504',
    usuario: 'NV 14 Sala Winche inclinado 016'
  },
  {
    anexo: '8409',
    usuario: 'NV 9 Izaje de Madera CH 995'
  },
  {
    anexo: '8519',
    usuario: 'NV 14 Taller Eléctrico'
  },
  {
    anexo: '8519',
    usuario: 'NV 14 Parrilla mineral 990 '
  },
  {
    anexo: '8526',
    usuario: 'NV 18  Sala winche Inc. 020'
  },
  {
    anexo: '8410',
    usuario: 'NV 10 Estación Pique 790'
  },
  {
    anexo: '8410',
    usuario: 'NV 11 Pocket Pique 790'
  },
  {
    anexo: '8512',
    usuario: 'NV 13 Izaje de madera CH 305'
  },
  {
    anexo: '8512',
    usuario: 'NV 14 Izaje de madera CH 305'
  },
  {
    anexo: '8512',
    usuario: 'NV 13 Buzon 06'
  },
  {
    anexo: '8512',
    usuario: 'NV 15 Izaje de Madera CH 305'
  },
  {
    anexo: '8512',
    usuario: 'NV 10 Chimenea 380'
  },
  {
    anexo: '8515',
    usuario: 'NV 10 Taller Eléctrico'
  },
  {
    anexo: '8502',
    usuario: 'NV 10 Sala Winche Inclinado 1200'
  },
  {
    anexo: '8502',
    usuario: 'NV 10  Bodega GMI'
  },
  {
    anexo: '8509',
    usuario: 'NV 15 Ventana inclinado 016'
  },
  {
    anexo: '8510',
    usuario: 'NV 11 Ventana inclinado 1200'
  },
  {
    anexo: '8510',
    usuario: 'NV 12 Izaje de Madera CH 06'
  },
  {
    anexo: '8510',
    usuario: 'NV 10 Izaje de madera Ch. 995'
  },
  {
    anexo: '8407',
    usuario: 'NV 18 Estacion Pique 790'
  },
  {
    anexo: '8507',
    usuario: 'NV 17 Parrilla de desmonte incl. 016'
  },
  {
    anexo: '8514',
    usuario: 'NV 16 Ventana Inclinado 016'
  },
  {
    anexo: '8515',
    usuario: 'NV17 Parrilla mineral 990'
  },
  {
    anexo: '8516',
    usuario: 'NV 14 Pocket inclinado 014'
  },
  {
    anexo: '8516',
    usuario: 'NV 14 Ventana inclinado 014'
  },
  {
    anexo: '8511',
    usuario: 'NV 10 Taller Mecánico '
  },
  {
    anexo: '8419',
    usuario: 'NV 435 Ximena'
  },
  {
    anexo: '8507',
    usuario: 'NV 17 Comedor'
  },
  {
    anexo: '8514',
    usuario: 'NV 16 Izaje de madera'
  },
  {
    anexo: '8513',
    usuario: 'NV 18 Camara Solumaq'
  },
  {
    anexo: '8527',
    usuario: 'NV 16 bodega tallerelctrico'
  },
  {
    anexo: '8527',
    usuario: 'NV 16 bodega GMI'
  },
  {
    anexo: '8527',
    usuario: 'NV16 Parrilla mineral 990 '
  },
  {
    anexo: '8501',
    usuario: 'NV18 Parrilla Mineral Pique 790'
  },
  {
    anexo: '8409',
    usuario: 'NV 18  Poquet Pique 790'
  },
  {
    anexo: '8526',
    usuario: 'NV 20  Inclinado 020 '
  },
  {
    anexo: '8521',
    usuario: 'NV 18 Inclinado 020 SALA WINCHE '
  },
  {
    anexo: '8524',
    usuario: 'NV 18 Ventana Inclinado 020 '
  },
  {
    anexo: '8526',
    usuario: 'NV 20 Inclinado 020 Pocket'
  }
]

const Esperanza = [
  {
    anexo: '8522',
    usuario: 'NV19A Rampa 910'
  },
  {
    anexo: '8528',
    usuario: ' NV 18 Taller Trackless'
  },
  {
    anexo: '8515',
    usuario: ' NV 18 Refugio de rescate minero Oroya'
  },
  {
    anexo: '8520',
    usuario: 'NV 18 Ximena Comedor y NV 19 A bodega'
  },
  {
    anexo: '8523',
    usuario: ' NV 18 Bodega de Taller Electrico'
  },
  {
    anexo: '8520',
    usuario: ' NV 19A Bodega Operaciones'
  },
  {
    anexo: '8522',
    usuario: 'NV 19 Rampa 910'
  },
  {
    anexo: '8504',
    usuario: 'NV 14 Inclinado 016'
  },
  {
    anexo: '8717',
    usuario: ' NV18 Subestación N° 75/ taller de maestranza'
  },
  {
    anexo: '8732',
    usuario: 'NV18 Inclinado 190 sala Winche'
  },
  {
    anexo: '8722',
    usuario: 'NV20 Inclinado 190'
  },
  {
    anexo: '8718',
    usuario: ' NV 18 Sala winche del inclinado 2000'
  },
  {
    anexo: '8718',
    usuario: ' NV 18 Ventana inclinado 2000'
  },
  {
    anexo: '8727',
    usuario: ' NV 21 xc 255 XIMENA'
  },
  {
    anexo: '8721',
    usuario: 'NV 21 ventana inclinado 2000 '
  },
  {
    anexo: '8730',
    usuario: ' NV 18 Polvorin'
  },
  {
    anexo: '8731',
    usuario: ' NV 21 Bodega taller electrico'
  },
  {
    anexo: '8727',
    usuario: ' NV 21 XC 255 parrilla de desmonte'
  },
  {
    anexo: '8525',
    usuario: ' NV 18 Subestacion 82'
  },
  {
    anexo: '8525',
    usuario: ' NV 18 AVG'
  },
  {
    anexo: '8724',
    usuario: ' NV18 Ventana Inclinado 190'
  },
  {
    anexo: '8723',
    usuario: ' NV 18 Cancha de Madera'
  },
  {
    anexo: '8524',
    usuario: 'NV21 Ximena'
  },
  {
    anexo: '8524',
    usuario: 'NV 21 Rampa 910'
  },
  {
    anexo: '8522',
    usuario: 'NV20 A()Rampa 910'
  },
  {
    anexo: '8519',
    usuario: 'NV15 Incli 016 ventana'
  },
  {
    anexo: '8526',
    usuario: ' NV 18 Sala winche del inclinado 020'
  }
]

const Pique650 = [
  {
    anexo: '5537',
    usuario: 'NV 1 Sala Control Eléctrico Pique'
  },
  {
    anexo: '8601',
    usuario: 'NV 1 Sala Control Eléctrico Pique'
  },
  {
    anexo: '5539',
    usuario: 'NV 1 Sala Operación Winche Pique'
  },
  {
    anexo: '8602',
    usuario: 'NV 1 Sala Control Eléctrico winche Pique'
  },
  {
    anexo: '8603',
    usuario: 'NV 1 Estación Pique'
  },
  {
    anexo: '8603',
    usuario: 'NV 4 Estación Pique'
  },
  {
    anexo: '8604',
    usuario: 'NV 4 Estación Pique'
  },
  {
    anexo: '8605',
    usuario: 'NV 7 Estación Pique'
  },
  {
    anexo: '8606',
    usuario: 'NV 10 Estación Pique'
  },
  {
    anexo: '8607',
    usuario: 'NV 10 Pocket Pique'
  },
  {
    anexo: '8617',
    usuario: 'NV 14 Estación del Pique'
  },
  {
    anexo: '8618',
    usuario: 'NV 14 Pocket del Pique'
  },
  {
    anexo: '8619',
    usuario: 'NV 18 Estación Pique'
  },
  {
    anexo: '8620',
    usuario: 'NV 18 Poquet del Pique'
  }
]

const Pique790 = [
  {
    anexo: '5540',
    usuario: 'NV 435 Sala operación winche Pique'
  },
  {
    anexo: '8401',
    usuario: 'NV 435 estacion pique'
  },
  {
    anexo: '8402',
    usuario: 'NV 435 Sala operación winche Pique'
  },
  {
    anexo: '8404',
    usuario: 'NV 4 Estacion de pique'
  },
  {
    anexo: '8410',
    usuario: 'NV 10 Estacion de pique'
  },
  {
    anexo: '8410',
    usuario: 'NV 10  Pocket Pique'
  },
  {
    anexo: '8411',
    usuario: 'NV 18 Estacion de pique'
  },
  {
    anexo: '8411',
    usuario: 'NV 18  Pocket Pique'
  }
]
const Cuerpos = [
  {
    anexo: '8815',
    usuario: 'NV 4 iInclinado Subestacion 700'
  },
  {
    anexo: '8615',
    usuario: 'NV4 pique circular'
  },
  {
    anexo: '8807',
    usuario: 'NV 6 Rompe Banco'
  },
  {
    anexo: '8808',
    usuario: 'NV6 Rampa'
  },
  {
    anexo: '8809',
    usuario: 'NV7 Rampa'
  },
  {
    anexo: '8811',
    usuario: 'NV 8 Sub estacion'
  },
  {
    anexo: '8810',
    usuario: 'NV 8A Sub estacion'
  },
  {
    anexo: '8801',
    usuario: 'NV 10 Comedor Zona Intermedia'
  },
  {
    anexo: '8610',
    usuario: 'NV 9 Rompebanco'
  },
  {
    anexo: '8611',
    usuario: 'NV 10 Chancadora'
  },
  {
    anexo: '8803',
    usuario: 'NV 10 Los Andes'
  },
  {
    anexo: '8812',
    usuario: 'NV 10 bodega taller electrico'
  },
  {
    anexo: '8804',
    usuario: 'NV 10 Taller Trackless'
  },
  {
    anexo: '8805',
    usuario: 'NV 10 Taller Trackless'
  },
  {
    anexo: '8806',
    usuario: 'NV 10 AVG'
  },
  {
    anexo: '8802',
    usuario: 'NV 10 Servicios Mina'
  },
  {
    anexo: '8812',
    usuario: 'NV11 Subestacion'
  },
  {
    anexo: '8818',
    usuario: 'NV 12A Acceso'
  },
  {
    anexo: '8819',
    usuario: 'NV 12 Sub Estacion'
  },
  {
    anexo: '8621',
    usuario: 'NV 13 Rompebanco'
  },
  {
    anexo: '8821',
    usuario: 'NV 13 Subestacion Electrica'
  },
  {
    anexo: '8820',
    usuario: 'NV 13 Robit'
  },
  {
    anexo: '8814',
    usuario: 'NV 14 Pique circular'
  },
  {
    anexo: '8824',
    usuario: 'NV 14 Comedor'
  },
  {
    anexo: '8822',
    usuario: 'NV 14 Planta Shotcreet'
  },
  {
    anexo: '8823',
    usuario: 'NV 14 Subestación Eléctrica 127'
  },
  {
    anexo: '8619',
    usuario: 'NV 14 Chancadora'
  },
  {
    anexo: '8622',
    usuario: 'NV 14 Chancadora'
  },
  {
    anexo: '8831',
    usuario: 'NV 14 Bodega de Taller Electrico'
  },
  {
    anexo: '8827',
    usuario: 'NV 14 Coretech'
  },
  {
    anexo: '8826',
    usuario: ' NV 15 Camara de volquete'
  },
  {
    anexo: '8704',
    usuario: ' NV 15 Sub Estacion'
  },
  {
    anexo: '8826',
    usuario: ' NV 15 Polvorin'
  },
  {
    anexo: '8706',
    usuario: ' NV 16 Sub estacion'
  },
  {
    anexo: '8726',
    usuario: 'NV 18 Chancadora'
  },
  {
    anexo: '8715',
    usuario: 'NV 18 Rompebanco'
  },
  {
    anexo: '8716',
    usuario: 'NV 18 Ventilacion'
  },
  {
    anexo: '8709',
    usuario: 'NV 18 Sub Estacion 132'
  },
  {
    anexo: '8705',
    usuario: 'NV 18 Comedor'
  },
  {
    anexo: '8713',
    usuario: 'NV18 Pique circular'
  },
  {
    anexo: '8704',
    usuario: 'NV 18 Bodega de OperaciónTrackless'
  },
  {
    anexo: '8723',
    usuario: 'NV 19A Rampa 565'
  },
  {
    anexo: '8712',
    usuario: 'NV 20A'
  },
  {
    anexo: '8711',
    usuario: 'NV 22 Rampa 565'
  }
]

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  meta = reactive({
    title: 'Directorio'
  })
// const props = defineProps(['foo'])
defineExpose({ meta })

onMounted(() => {})
</script>
