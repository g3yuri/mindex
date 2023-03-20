import { ref, reactive } from 'vue'
import { Loading, LoadingBar, Notify, Cookies } from 'quasar'
// const endPoint = process.env.NODE_ENV === 'development'? `http://192.168.0.5:8000/` : `https://mineria.gd.pe/api/`
const endPoint = process.env.NODE_ENV === 'development' ? 'https://slim.gmi.gd.pe/' : 'https://slim.gmi.gd.pe/'

import http from './http.js'
http.defaults.baseURL = endPoint
http.defaults.withCredentials = true

LoadingBar.setDefaults({
  color: 'blue'
})

Notify.setDefaults({
  position: 'top-right'
})

function tostr (e) {
  return typeof e === 'object' ? JSON.stringify(e, null, 4) : e
}
const getCookieValue = (name) => (
  document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

function _get_info_from_user (user) {
  const roulet = ['red', 'purple-14', 'indigo-14', 'green']
  const nm = `${user.nombres}${user.email}`.replace(
    /\s/g,
    ''
  )
  const ret = {
    color: roulet[nm.charCodeAt(0) % roulet.length],
    letter: nm[0]
  }
  return ret
}
function update_from_api (b) {
  const router = helper.router
  const route = router.currentRoute.value

  if (!(b.user && b.user.email && b.user.email.length)) {
    // EL BOOT RESPONDE USER VACIO
    // Caso 1: Usuarios intentan ingresar a un panel privado
    // console.log(router, route)
    // return
    // if (helper.state.user){
    //   console.warn('El usuario no corresponde a un email')
    //   helper.logout()
    // }
    console.log('El usuario no corresponde a un email..')
    helper.state.user = null
    return
  }
  const { color, letter } = _get_info_from_user(b.user)
  helper.state.user = b.user
  helper.state.user.color = color
  helper.state.user.letter = letter
  b.user.roles = b.roles
  localStorage.setItem('user', JSON.stringify(b.user))

  if (route.name === 'Login') {
    const url = route.query.redirect || helper.adminpage
    router.push(url === '/login' ? helper.adminpage : url)
  }
}

function result_api (b) {
  if (b?.body?.require_login) {
    if (helper.require_login_event) {
      helper.require_login_event()
    }
  }
}

function getInitialUser () {
  let user = null
  try {
    user = JSON.parse(localStorage.getItem('user'))
  } catch (e) { console.log(e) }
  return user
}

const areas = ref(null),
  secciones = ref(null),
  ob_causas = ref(null),
  supervisores = ref(null)

export const helper = {
  adminpage: '/', // pagina del administrador
  state: reactive({
    token: '',
    user: getInitialUser(),
    uuid: null,
    netinfo: null,
    dirs: null
  }),
  version: 3,
  router: null,
  areas: function () {
    if (areas.value == null) {
      helper.api.get('/sis/areas', b => {
        console.log('helper.areas', b)
        areas.value = b
      })
    }
    return areas
  },
  url (relative) {
    return new URL(relative, endPoint).href
  },
  secciones: function () {
    if (secciones.value == null) {
      helper.api.get('/sis/secciones', b => {
        console.log('helper.secciones', b)
        secciones.value = b
      })
    }
    return secciones
  },
  supervisores: function () {
    if (supervisores.value == null) {
      helper.api.get('/sis/supervisores', b => {
        console.log('helper.supervisores', b)
        supervisores.value = b
      })
    }
    return supervisores
  },
  ob_causas: function () {
    if (ob_causas.value == null) {
      helper.api.get('/sis/ob_causas', b => {
        console.log('helper.ob_causas', b)
        ob_causas.value = b
      })
    }
    return ob_causas
  },
  formatDateHour: function (date, glue_date = '-', glue_hour = ':') {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate()
    const year = d.getFullYear(),
      hours = d.getHours(),
      minutes = d.getMinutes(),
      seconds = d.getSeconds()

    if (month.length < 2) { month = '0' + month }
    if (day.length < 2) { day = '0' + day }
    return [year, month, day].join(glue_date) + ' ' + [hours, minutes, seconds].join(glue_hour)
  },
  formatDate: function (date, glue = '-') {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) { month = '0' + month }
    if (day.length < 2) { day = '0' + day }
    return [year, month, day].join(glue)
  },

  netinfo_change: function (state) {
    helper.state.netinfo = state
  },
  hasRole: function (rls) {
    if (!(rls instanceof Array)) {
      rls = [rls]
    }
    return helper.state.user?.roles.filter(function (n) {
      return rls.indexOf(n.name) !== -1
    }).length > 0
  },
  goBack: function () {
    helper.prevent_back_login = true
    helper.router.go(-1)
    helper.prevent_back_login = false
  },
  reload: function () {
    window.document.location.reload()
  },
  api: http.create({
    afterFail: function (e) {
      Notify.create({ message: e })
    },
    result: result_api
  }),
  Api: http.create({
    begin: function () { LoadingBar.start() },
    end: function () { LoadingBar.stop() },
    result: result_api
  }),
  API: http.create({
    begin: function () { Loading.show() },
    end: function () { Loading.hide() },
    result: result_api
  }),
  boot: function () {
    return new Promise((resolve, reject) => {
      if (helper.state.user && !(helper.state.user.email && helper.state.user.email.length)) {
        console.warn('El usuario no corresponde a un email.')
        helper.state.user = null
      }

      helper.api.get('boot', b => {
        update_from_api(b)
        resolve(helper.state.user)
      }, reject)
    })
  },
  login: function (usuario, pwd, error = alert) {
    helper.API.post('login', { usuario, pwd }, update_from_api, error)
  },
  logout: async function (error = console.log) {
    helper.API.get('logout', async () => {
      helper.state.user = null
      localStorage.removeItem('user')
      helper.state.token = null
      window.document.location.reload()
    }, error)
  }
}

export default helper
