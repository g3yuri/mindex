<template>
  <m-loading ref="main"> </m-loading>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import helper from '../../boot/helper'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  main = ref(null)

onMounted(() => {
  helper.logout()
})
</script>
