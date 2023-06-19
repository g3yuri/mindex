<template>
  <q-layout view="lHh lpR lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          v-if="false"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="text-primary">
          <div class="t-flex t-items-center">
            <div class="t-flex t-items-center" @click="router.push('/')">
              <img
                src="~assets/logo-gmi.png"
                style="width: 40px; height: 40px"
              />
              <div
                class="t-pl-2 t-text-xl t-font-bold t-text-indigo-900 t-whitespace-pre-wrap"
              >
                {{ route.meta?.title ?? 'Sistema Integrado de Gestión GMI' }}
              </div>
            </div>
          </div>
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
      v-if="false"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :breakpoint="800"
      class="t-bg-slate-100"
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
          <template v-for="(section, sidx) in list_main" :key="sidx">
            <q-list class="rounded-borders t-pl-4">
              <q-item-label v-if="section.title" header>{{
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
            </q-list>
          </template>
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
    title: 'SISTEMA INTEGRADO DE GESTION',
    menu: [
      {
        items: [
          {
            to: '/politica',
            label: 'Politica',
            icon: 'o_picture_in_picture'
          },
          {
            to: '/pas',
            label: 'Protocolo de emergencias',
            icon: 'o_group',
            dev: true
          },
          {
            to: '/formatos',
            label: 'Formatos',
            icon: 'o_group',
            dev: true
          },
          {
            to: '/comite',
            label: 'Comite de Seguridad',
            icon: 'o_group',
            dev: true
          },
          {
            to: '/comite',
            label: 'Comite de Seguridad',
            icon: 'o_group',
            dev: true
          }
        ]
      }
    ]
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

    m.items.forEach((i) => {
      if (i.dev && !process.env.DEV) {
        return
      }
      e.items.push(i)
    })
  })
})

const list_main = reactive(TopMenu.filter((e) => e.items.length > 0))

helper.menu = TopMenu

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
