<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="t-bg-gray-200">
      <q-toolbar>
        <q-toolbar-title class="text-primary">
          <div class="t-flex t-items-center">
            <div class="t-flex t-items-center" @click="router.push('/f/operador')">
              <img src="~assets/logo.png" style="width:40px; height: 40px;">
              <div class="t-px-2 t-font-bold t-text-black">Reporte</div>
            </div>
            <q-space />
            <div v-if="user?.id" class="t-font-bold t-text-sm t-text-right">{{user.correo}}<br/>{{user.dni}}</div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <m-loading ref="main">
      <q-page-container v-if="pass">
        <router-view />
      </q-page-container>
    </m-loading>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import helper from '../boot/helper'

// import { useUser } from '../use/user'
// const [user, setUser] = useUser()
const route = useRoute()
const router = useRouter()

const main = ref(null)
const pass = ref(false)

onMounted(() => {
  main.value.get('/fatiga/boot', b => {
    if (b?.oper_require_login) {
      // btn.value = true
      console.log('route', route)

      if (route.meta.no_auth) {
        pass.value = true
      } else {
        router.push('/f/home')
        pass.value = true
      }
    } else if (b) {
      // setUser(b)
      console.log('SETUSER(B): ', JSON.stringify(b))
      helper._fatiga_user = b // set user
      pass.value = true
    }
  })
})

</script>
