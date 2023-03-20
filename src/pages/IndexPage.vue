<template>
  <q-page class="q-pa-md">
    <div>
      <div class="row q-col-gutter-md">
        <template :key="sidx" v-for="(section, sidx) in menu">
          <div class="col-xs-6 col-sm-4 col-md-3 t-relative t-cursor-pointer" :key="index" v-for="(el, index) in section.items">
            <div class="t-absolute t-top-6 t-left-6">
              <q-icon :name="el.icon" class="t-text-3xl t-text-gray-300"/>
            </div>
            <div class="t-border-2 t-rounded-md t-text-center t-text-lg t-font-bold t-bg-gray-200 t-border-gray-300 t-p-6 t-text-black"
              @click="router.push(el.to)">
              {{el.label}}
            </div>
          </div>
        </template>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import helper from '../boot/helper'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  menu = ref(helper.menu.filter(e => e.ok))

onMounted(() => { })
</script>
