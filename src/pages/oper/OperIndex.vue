<template>
	<q-page class="q-pa-md q-gutter-md">
		<div>
			<div class="row q-col-gutter-md">
				<div class="col-4">

				</div>
			</div>
		</div>
	</q-page>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute(),
  router = useRouter(),
  qs = useQuasar(),
  meta = reactive({
    title: 'RAC',
    btn: {
      label: 'Crear',
      icon: 'o_add',
      to: '/oper/racs/store'
    }
  })

defineExpose({ meta })

onMounted(() => {

})
</script>
