<template>
  <q-layout view="hHh lpR lFf">
    <q-header class="t-bg-green-800">
      <q-toolbar>
        <q-toolbar-title class="text-primary">
          <div class="t-flex t-items-center">
            <img src="~assets/logo.png" style="width:40px; height: 40px;">
            <div class="t-text-white t-pl-2">PANEL INFORMATIVO</div>
            <q-space />
            <div v-if="$m.state.user" style="font-family: Supply-Regular;color: rgb(255,180,45);">{{$m.state.user.email}}</div>
            <q-btn v-else label="Acceder" flat @click="$router.push('/login')" icon="login" rounded unelevated class="t-text-white"/>

          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import helper from '../boot/helper'
export default defineComponent({
  name: 'MainLayout',
  setup () {
    return {
    }
  }
})
</script>
