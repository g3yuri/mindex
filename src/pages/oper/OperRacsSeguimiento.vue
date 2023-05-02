<template>
	<q-page class="q-pa-md q-gutter-md">
		<racs-list tipo="seguimiento" />
	</q-page>
</template>
<script setup>
import RacsList from './coms/RacsList.vue'
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar()

onMounted(() => {

})
</script>
