<template>
  <div class="t-p-3">
    <div class="t-text-xl t-font-bold">{{ route.params.fecha }}</div>
    <m-loading ref="main">
      <div
        :key="el.id"
        v-for="el in list"
        :class="`t-flex t-flex-row t-justify-between t-my-3 t-bg-gray-200 t-p-3 t-rounded-lg ${el.class}`"
        @click="router.push(`/f/ingreso?id=${el.id}`)"
      >
        <div>{{ el.final }}</div>
        <div>{{ el.descanso }}</div>
      </div>
      <div
        class="t-my-3 t-bg-gray-200 t-p-3 t-text-center t-font-bold t-text-2xl t-w-full t-rounded-lg"
        @click="router.push(`/f/ingreso?fecha=${route.params.fecha}`)"
      >
        <div>AGREGAR</div>
      </div>
    </m-loading>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
const main = ref(null)
const list = ref([])

function parseColor(b) {
  b.forEach((e) => {
    e.class = 't-bg-gray-300'
    if (e.color === 'green') {
      e.class = 't-bg-green-400'
    } else if (e.color === 'yellow') {
      e.class = 't-bg-yellow-400'
    } else if (e.color === 'red') {
      e.class = 't-bg-red-500 t-text-white'
    }
  })
  return b
}

onMounted(() => {
  main.value.get(`/fatiga/day/${route?.params?.fecha ?? 'hoy'}`, (b) => {
    console.log('mounted', b)
    list.value = parseColor(b)
  })
})
</script>
