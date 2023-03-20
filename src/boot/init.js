import helper from './helper'
import dayjs from 'dayjs'
dayjs.locale('es')
console.log('hola')
// import ECharts from 'vue-echarts'
// import { use } from "echarts/core"
// import { CanvasRenderer } from 'echarts/renderers'
// import { BarChart, PieChart } from 'echarts/charts'
// import { GridComponent, TooltipComponent } from 'echarts/components'
// use([ CanvasRenderer, BarChart, PieChart, GridComponent, TooltipComponent ])

import MLoading from '../components/MLoading.vue'
import { Notify, Screen } from 'quasar'

Screen.setSizes({ sm: 640, md: 768, lg: 1024, xl: 1080 })

Notify.setDefaults({
  position: 'bottom'
})

export default async (
  { urlPath, router, store, app } /* { app, router, Vue ... } */
) => {
  helper.router = router
  helper.store = store
  window.helper = helper
  // app.component('v-chart', ECharts)
  app.component('m-loading', MLoading)
  // helper.img_blank = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
  app.config.globalProperties.$m = helper

  helper.require_login_event = () => {
    const own = router.currentRoute
    if (own && own.path !== '/login' && !(own.meta && own.meta.guest)) {
      router.push('/login')
    }
  }

  await helper.boot()
  router.beforeEach((to, from, next) => {
    if (!helper.state.user) {
      if (
        !to.matched.some((record) => record.meta.guest) &&
        to.path !== '/login'
      ) {
        if (from.path === '/login') {
          console.warn('Recursividad desde login')
          next(false)
          return
        }
        next({ path: '/login', query: { redirect: to.fullPath } })
        return
      }
    } else {
      // SI EL USUARIO ESTA LOGUEADO, NO INGRESARA A LOGIN
      if (to.path === '/login' && helper.prevent_back_login) {
        next(false)
        return
      }
      if (to.path === '/login' && to.query?.redirect) {
        next(to.query.redirect)
        return
      }
    }
    next()
  })
}
