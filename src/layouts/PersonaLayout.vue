<template>
  <q-layout view="hHh lpR lFf">
    <q-header style="background-color: rgb(5,30,65);color: rgb(255,180,45);">
      <q-toolbar>
        <q-toolbar-title class="text-primary">
          <div class="t-flex t-items-center">
            <img src="~assets/logo.png" style="width:40px; height: 40px;">
            <div class="t-pl-2 t-text-2xl t-text-black" style="font-family: Supply-Regular;color: rgb(255,180,45);">MINDEX</div>
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
