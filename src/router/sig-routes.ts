import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/SigLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/domain-sig/SigHome.vue') }
    ],
    meta: {
      guest: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/PageError404.vue'),
    meta: {
      guest: true
    }
  }
]

export default routes
