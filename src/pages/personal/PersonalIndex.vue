<template>
	<q-page class="q-pa-md q-gutter-md">
		<div>
			<div class="row q-col-gutter-md">
				<div class="col-4">
					Personal
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
  qs = useQuasar()
// const props = defineProps(['foo'])

const meta = reactive({
  title: 'Personal'
})

defineExpose({ meta })

onMounted(() => {

})
</script>
