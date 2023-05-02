<template>
  <q-layout view="lHh lpR lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="text-primary">
          <!-- <div class="t-flex t-items-center">
            <div class="t-flex t-items-center" @click="router.push('/')">
              <img src="~assets/logo.png" style="width: 40px; height: 40px" />
              <div class="t-pl-2 t-text-2xl t-font-bold">
                {{ route.meta?.title ?? "Mindex" }}
              </div>
            </div> -->
          <div class="t-flex t-items-center t-justify-between">
            <div
              :class="`${
                meta.title?.length > (meta?.btn ? 10 : 15) && qs.screen.lt.sm
                  ? 'text-h3'
                  : 'text-h2'
              } t-font-bold t-pr-6 t-text-ellipsis t-overflow-hidden`"
            >
              {{ meta.title }}
            </div>

            <div v-if="meta.btn" style="text-align: right">
              <q-btn
                class="t-w-max"
                unelevated
                color="primary"
                :label="meta.btn.label"
                :icon="meta.btn.icon"
                :to="meta.btn.to"
                :flat="meta.btn.flat"
                @click="meta?.btn?.click()"
              />
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :breakpoint="800"
      class="t-bg-gray-100"
      :width="280"
    >
      <div @click="router.push('/')">
        <div
          class="t-w-full t-flex t-items-center t-justify-center t-py-4 t-cursor-pointer"
          @click="router.push('/')"
        >
          <img src="~assets/logo.png" style="width: 40px; height: 40px" />
          <div class="t-pl-2 t-text-2xl t-font-bold">Mindex</div>
        </div>
      </div>
      <div class="panel-menu">
        <q-list>
          <q-item clickable to="/perfil" :dense="false">
            <q-item-section avatar style="min-width: 36px">
              <q-avatar :color="info.color" text-color="white" size="md">
                {{ info.letter }}
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="t-text-sm">
                <div>{{ $m.state.user.email }}</div>
                <div>
                  {{ $m.state.user.nombres + ' ' + $m.state.user.apellidos }}
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <!-- <template v-for="(section, sidx) in menu" :key="sidx">
            <template v-if="section.ok">
              <q-item-label v-if="section.title" header>{{
                section.title
              }}</q-item-label>
              <q-item
                v-for="(el, index) in section.items"
                :key="index"
                clickable
                :to="el.to"
                :dense="false"
              >
                <q-item-section avatar style="min-width: 36px">
                  <q-icon color="grey-6" :name="el.icon" size="md" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="t-text-md">{{ el.label }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator v-if="section.title" />
            </template>
          </template> -->

          <template v-for="(section, sidx) in list_main">
            <q-item-label v-if="section.title" header :key="sidx">{{
              section.title
            }}</q-item-label>
            <q-item
              v-for="(el, index) in section.items"
              :key="'e-' + index"
              clickable
              :to="el.to"
              :dense="true"
            >
              <q-item-section avatar>
                <q-icon :name="el.icon" size="sm" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ el.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>

          <q-item
            clickable
            to="/logout"
            :dense="true"
            style="
              border-top: 1px solid #aaa;
              padding-top: 8px;
              margin-top: 8px;
            "
          >
            <q-item-section avatar>
              <q-icon name="o_logout" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Salir</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>
    <q-page-container style="height: 100vh; overflow: auto">
      <router-view ref="central" v-slot="{ Component }">
        <component :is="Component" ref="view" />
      </router-view>
    </q-page-container>
    <q-footer v-if="meta?.footer" bordered class="t-bg-gray-100 t-font-bold">
      <q-tabs
        v-model="tab"
        dense
        :inline-label="!qs.screen.lt.md"
        class="t-flex-1 t-text-black"
        align="justify"
        switch-indicator
      >
        <q-route-tab
          v-for="(el, index) in meta?.footer"
          :key="index"
          :to="el.to"
          exact
          no-caps
          :name="el.to"
          :icon="el.icon"
          :label="el.label"
          :ripple="false"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed, watch, watchEffect, isRef, reactive } from 'vue'
import helper from '../boot/helper'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'

const menu_select = ref(null)

const route = useRoute(),
  router = useRouter()
const tab = ref(''),
  central = ref(null),
  view = ref(null)
const qs = useQuasar()

const info = computed(() => {
  const roulet = ['red', 'purple-14', 'indigo-14', 'green']
  const nm = `${helper.state.user.nombres}${helper.state.user.email}`.replace(
    /\s/g,
    ''
  )
  const ret = {
    color: roulet[nm.charCodeAt(0) % roulet.length],
    letter: nm[0]
  }
  console.log('INFO', ret)
  return ret
})

const meta = computed(() => {
  console.log('view.meta', view.value?.meta)
  console.log('route.meta', route?.meta)
  return { ...route.meta, ...view.value?.meta }
})

const TopMenu = [
  {
    title: 'SEGURIDAD',
    menu: [
      {
        roles: ['admin', 'seguridad', 'supervisor'],
        items: [
          {
            to: '/inspec/home',
            label: 'Reporte Diario de Seguridad',
            icon: 'o_report_problem'
          }
        ]
      }
    ]
  },
  {
    title: 'CONTROL DE FATIGA',
    menu: [
      {
        roles: ['admin', 'seguridad', 'supervisor'],
        items: [
          {
            to: '/fatiga/admin',
            label: 'Administracion Fatiga',
            icon: 'o_hotel'
          },
          {
            to: '/fatiga/supervisor',
            label: 'Control de Fatiga',
            icon: 'o_watch'
          }
        ]
      },
      {
        roles: ['admin', 'fatiga'],
        items: [{ to: '/fatiga/reporte', label: 'Fatiga', icon: 'o_person' }]
      },
      {
        roles: ['admin', 'operador'],
        items: [
          { to: '/f/inicio', label: 'Reporte de Conductor', icon: 'o_person' }
        ]
      }
    ]
  },
  {
    title: 'ADMINISTRACION',
    menu: [
      {
        roles: ['admin'],
        items: [
          { to: '/admin', label: 'Usuarios', icon: 'o_person' },
          { to: '/mailer', label: 'Mailer', icon: 'o_mail' }
        ]
      }
    ]
  },
  {
    title: 'SIG',
    menu: [
      {
        roles: ['admin', 'supervisor'],
        items: [
          {
            to: '/panel',
            label: 'Documentos SIG',
            icon: 'o_picture_in_picture'
          },
          {
            to: '/oper/personal',
            label: 'Personal',
            icon: 'o_group',
            dev: true
          }
        ]
      },
      {
        roles: ['admin', 'ssomac', 'supervisor'],
        items: [
          { to: '/rrhh/personal', label: 'Personal Admin', icon: 'o_group' }
        ]
      }
    ]
  },
  {
    title: 'SUPERVISOR',
    menu: [
      {
        roles: ['admin', 'supervisor', 'seguridad'],
        items: [
          {
            to: '/oper/racs/home',
            label: 'RACS',
            icon: 'o_report'
          },
          {
            to: '/oper/petar',
            label: 'PETAR',
            icon: 'o_emergency'
          },
          {
            to: '/oper/veo',
            label: 'VEO',
            icon: 'o_verified',
            dev: true
          }
        ]
      },
      {
        roles: ['productividad', 'admin', 'supervisor'],
        items: [
          // { to:'/planos/home', label:'Planos', icon:'o_map' }
          { to: '/plano', label: 'Planos', icon: 'o_where_to_vote' }
        ]
      }
    ]
  },
  {
    title: 'CAPACITACION',
    menu: [
      {
        roles: ['capacitacion', 'admin', 'seguridad'],
        items: [
          {
            to: '/capa/admin',
            label: 'Administrar',
            icon: 'o_local_library'
          },
          {
            to: '/capa/home',
            label: 'Mis Capacitaciones',
            icon: 'o_auto_stories'
          }
        ]
      }
    ]
  }
]

const menu = [
  {
    roles: ['admin', 'seguridad', 'supervisor'],
    items: [
      {
        to: '/inspec/home',
        label: 'Reporte Diario de Seguridad',
        icon: 'o_people'
      },
      {
        to: '/fatiga/admin',
        label: 'Administracion Fatiga',
        icon: 'o_perm_contact_calendar'
      }
    ]
  },
  {
    roles: ['admin'],
    items: [
      { to: '/admin', label: 'Usuarios', icon: 'o_person' },
      { to: '/mailer', label: 'Mailer', icon: 'o_mail' }
    ]
  },
  {
    roles: ['admin', 'supervisor', 'seguridad'],
    items: [
      {
        to: '/fatiga/supervisor',
        label: 'Control de Fatiga',
        icon: 'o_perm_contact_calendar'
      },
      {
        to: '/oper/racs/home',
        label: 'RACS',
        icon: 'o_perm_contact_calendar'
      },
      {
        to: '/oper/petar',
        label: 'PETAR',
        icon: 'o_perm_contact_calendar'
      },
      {
        to: '/oper/veo',
        label: 'VEO',
        icon: 'o_perm_contact_calendar'
      },
      {
        to: '/oper/personal',
        label: 'Personal',
        icon: 'o_perm_contact_calendar'
      }
    ]
  },
  {
    roles: ['admin', 'alpayana'],
    items: [
      {
        to: '/tormenta/home',
        label: 'Tormenta Electrica',
        icon: 'o_trending_down'
      }
    ]
  },
  {
    roles: ['productividad', 'admin'],
    items: [
      // { to:'/planos/home', label:'Planos', icon:'o_map' }
      { to: '/plano', label: 'Planos', icon: 'o_map' }
    ]
  },
  {
    roles: ['sig', 'admin'],
    items: [{ to: '/panel', label: 'Panel', icon: 'o_picture_in_picture' }]
  },
  {
    roles: ['admin', 'alpayana'],
    items: [{ to: '/fotocheck/home', label: 'Fotocheck', icon: 'o_person' }]
  },
  {
    roles: ['admin', 'alpayana'],
    title: 'LECTOR DE FOTOCHECK',
    items: [
      { to: '/fotocheck/lector', label: 'Lector', icon: 'o_person' },
      { to: '/fotocheck/query', label: 'Consultas', icon: 'o_person' }
    ]
  },
  {
    roles: ['admin', 'fatiga'],
    items: [{ to: '/fatiga/reporte', label: 'Fatiga', icon: 'o_person' }]
  },
  {
    roles: ['admin', 'operador'],
    items: [
      { to: '/f/inicio', label: 'Reporte de Conductor', icon: 'o_person' }
    ]
  },
  {
    roles: ['admin', 'ssomac', 'supervisor'],
    items: [{ to: '/rrhh/personal', label: 'Personal Admin', icon: 'o_person' }]
  },
  {
    roles: ['admin', 'seguridad', 'ssomac'],
    items: [{ to: '/iai/home', label: 'Accidentes', icon: 'o_person' }]
  },
  {
    roles: ['admin', 'seguridad', 'supervisor'],
    items: [{ to: '/logout', label: 'Salir', icon: 'o_person' }]
  }
]

const leftDrawerOpen = ref(false)
const roles = helper.state.user?.roles?.map((e) => e.name) || []
// menu.forEach((e) => {
//   e.ok =
//     e.roles.filter(function (n) {
//       return roles.indexOf(n) !== -1
//     }).length > 0
// })
TopMenu.forEach((e) => {
  e.items = []
  e.menu.forEach((m) => {
    // check if element is  include in array
    if (
      m.roles.filter(function (n) {
        return roles.indexOf(n) !== -1
      }).length > 0
    ) {
      m.items.forEach((i) => {
        if (i.dev && !process.env.DEV) {
          return
        }
        e.items.push(i)
      })
    }
  })
})

const list_main = reactive(TopMenu.filter((e) => e.items.length > 0))

helper.menu = TopMenu

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
