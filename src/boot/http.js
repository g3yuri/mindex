function handleError(self, error, fail, response, path, option) {
  response = response || {}
  option = option || {}
  const debug = (self && self.debug) || defaults.debug
  const se = debug
    ? `${JSON.stringify(option)} ${path}: ${response.status}: ${
      response.statusText
    } ${error}`
    : `${error}`

  if (!(fail && fail(se))) {
    self && self.afterFail && self.afterFail(se)
  }
}

function __putFile64(url, from, data64, id, call_finish, call_step) {
  let len = data64.length,
    left = 0
  if (len > 200000) {
    left = len - 200000
    len = 200000
  }
  const data = new FormData()
  data.append('glue', data64.slice(0, len))
  data.append('from', from)
  data.append('left', left)
  data.append('id', id)
  data.append('bin-image', 'push')
  // ToastAndroid.show(`Send:${data64.slice(0,5)} ... ${data64.slice(len-5,len)}`,ToastAndroid.SHORT);
  fetch(url, { method: 'post', body: data })
    .then((r) => r.json())
    .then((r) => {
      let percent
      if (r.ok) {
        // if(r.body) ToastAndroid.show(r.body,ToastAndroid.SHORT);
        if (left > 0) {
          from += len
          percent = Math.round((from * 100) / (from + left))
          if (typeof call_step === 'function') {
            call_step(percent)
          }
          __putFile64(url, from, data64.slice(len), id, call_finish, call_step)
        }
        if (left === 0) {
          percent = 100
          // ToastAndroid.show(`Finish:`,ToastAndroid.LONG);
          if (typeof call_finish === 'function') {
            call_finish()
          }
        }
      } else alert(JSON.stringify(r))
    })
    .catch((r) => alert(JSON.stringify(r)))
}

/* INTERFACE */
const ImageUpload = {
  putFile: (url, img, call_finish, call_step, call_init) => {
    const data = new FormData()
    data.append('bin-image', 'init')
    data.append('type', img.type)
    data.append('length', img.length)
    fetch(url, { method: 'post', body: data })
      .then((r) => r.json())
      .then((r) => {
        if (r.ok) {
          const id = r.body
          if (typeof call_init === 'function') {
            call_init(id)
          }
          __putFile64(
            url,
            0,
            img.data,
            id,
            () => {
              if (typeof call_finish === 'function') {
                call_finish()
              }
            },
            (percent) => {
              if (typeof call_step === 'function') {
                call_step(percent)
              }
            }
          )
        } else alert(`Schema-Then:${url}` + JSON.stringify(r.body))
      })
      .catch((r) => alert(`Schema-Catch:${url}` + JSON.stringify(r)))
  }
}

const defaults = {
  baseURL: 'http://localhost/',
  withCredentials: false,
  debug: false,
  next: console.log,
  fail: console.warn,
  headers: {},
  afterFail: () => {},
  begin: () => {},
  end: () => {},
  middleware: () => {},
  result: () => {},
  getCookieValue: function (name) {
    if (typeof document !== 'undefined') {
      return (
        document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() ||
        ''
      )
    }
    return null
  }
}

const http = {
  defaults,
  create: function (options) {
    const result = Object.create(this)
    for (const props in options) {
      if (defaults[props]) {
        result[props] = options[props]
      }
    }
    return result
  },
  uri: function (relative) {
    const baseURL = this.baseURL || defaults.baseURL
    const path = new URL(relative, baseURL).href
    return path
  },
  get: function (url, next, fail) {
    const option = { method: 'get' }
    this.fetch(url, option, next, fail)
  },
  post: function (url, payload, next, fail) {
    const option = { method: 'post' }
    if (payload) {
      // muestra error en react native con form_data vacio
      let data = null
      for (const p in payload) {
        const b = payload[p]
        if (data == null) {
          data = new FormData()
        }
        data.append(p, b)
      }
      option.body = data
    }
    this.fetch(url, option, next, fail)
  },
  delete: function (url, next, fail) {
    const option = { method: 'delete' }
    this.fetch(url, option, next, fail)
  },
  json: function (url, payload, next, fail) {
    const option = {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    this.fetch(url, option, next, fail)
  },
  fetch: async function (url, option, next, fail) {
    url = url.trim()
    next = next || this.next || defaults.next
    fail = fail || this.fail || defaults.fail
    const baseURL = this.baseURL || defaults.baseURL
    const headers = this.headers || defaults.headers
    const getCookieValue = this.getCookieValue || defaults.getCookieValue
    const begin = this.begin || defaults.begin
    const end = this.end || defaults.end
    const result = this.result || defaults.result
    const middleware = this.middleware || defaults.middleware
    option = option || {}

    const haveCreds =
      typeof this.withCredentials !== 'undefined'
        ? this.withCredentials
        : defaults.withCredentials

    if (haveCreds) {
      option.credentials = 'include'
    }
    option.headers = {
      Accept: 'application/json',
      ...headers,
      ...option.headers
    }
    let csrf = getCookieValue('XSRF-TOKEN')
    if (csrf instanceof Promise) {
      csrf = await csrf
    }
    if (csrf && typeof csrf === 'string') {
      option.headers['X-XSRF-TOKEN'] = decodeURIComponent(csrf)
    }
    const path = new URL(url, baseURL).href
    begin()
    !middleware(path, option) &&
      fetch(path, option)
        .then(async (r) => {
          end()
          if (r.ok) {
            const type = r.headers.get('content-type')
            if (type && type.indexOf('application/json') !== -1) {
              r.json()
                .then(function (b) {
                  if (!result(b)) {
                    if (b.ok) {
                      next(b.body)
                    } else {
                      handleError(
                        this,
                        JSON.stringify(b.body),
                        fail,
                        r,
                        path,
                        option
                      )
                    }
                  }
                })
                .catch((e) => {
                  handleError(this, e, fail, r, path, option)
                })
            } else {
              r.text()
                .then(next)
                .catch((e) => {
                  handleError(this, e, fail, r, path, option)
                })
            }
          } else {
            handleError(this, '', fail, r, path, option)
          }
        })
        .catch((e) => {
          end()
          handleError(this, e, fail, null, path, option)
        })
  }
}
export default http
