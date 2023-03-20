<template>
  <div ref="main">
    <div
      v-if="loading || error"
      class="flex flex-center justify-center"
      :style="`height: ${height};width: ${width};`"
    >
      <div v-if="error">
        <div class="text-h5 text-grey">
          {{ error }}
        </div>
        <div class="row q-col-gutter-md q-py-lg">
          <div class="col text-center">
            <q-btn
              label="Cancelar"
              outline
              icon="close"
              rounded
              unelevated
              color="primary"
              @click="cancelar"
            />
          </div>
          <div class="col text-center">
            <q-btn
              label="Reintentar"
              outline
              icon="refresh"
              rounded
              unelevated
              color="primary"
              @click="reintentar"
            />
          </div>
        </div>
      </div>
      <img v-else src="~assets/loading_circle.gif" style="max-width: 140px" />
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script>
function getPaddingY(element) {
  const style = element.currentStyle || window.getComputedStyle(element)
  return parseInt(style.paddingTop) + parseInt(style.paddingBottom)
}
function height_calc(main) {
  let c = main
  // esto esta para evaluar, el height salia cero si no se comenta
  let top = 0 // c.offsetHeight
  const bottom = 0
  const wh = window.innerHeight

  while (c) {
    top += c.offsetTop
    c = c.offsetParent
  }
  const cli = main.parentElement
  return cli.clientHeight - getPaddingY(cli) - getPaddingY(main) + 'px'
  // return (main.offsetParent ? main.offsetParent.offsetHeight : wh - top) + "px";
}
function width_calc(main) {
  // console.log("w=", main.offsetParent.offsetWidth);
  return main.clientWidth + 'px'
  // return main.offsetParent.offsetWidth + "px";
}

export default {
  data() {
    return {
      loading: false,
      error: null,
      height: '100%',
      width: '100%',
      path: null,
      payload: null,
      method: null,
      next: null,
      fail: null
    }
  },
  methods: {
    cancelar() {
      this.loading = false
      this.error = false
    },
    reintentar() {
      if (this.method === 'get') {
        this.get(this.path, this.next, this.fail)
      } else if (this.method === 'post') {
        this.post(this.path, this.payload, this.next, this.fail)
      } else if (this.method === 'json') {
        this.json(this.path, this.payload, this.next, this.fail)
      } else if (this.method === 'delete') {
        this.delete(this.path, this.payload, this.next, this.fail)
      }
    },
    post(path, payload, next, fail) {
      this.loading = true
      this.error = null
      this.path = path
      this.payload = payload
      this.method = 'post'
      this.next = next
      this.fail = fail
      this.height = height_calc(this.$refs.main)
      this.width = width_calc(this.$refs.main)

      this.$m.api.post(
        path,
        payload,
        (b) => {
          this.loading = false
          this.error = null
          if (next) next(b)
        },
        (e) => {
          console.log(e)
          this.error = e
          this.loading = false
          if (fail) fail(e)
        }
      )
    },
    json(path, payload, next, fail) {
      this.loading = true
      this.error = null
      this.path = path
      this.payload = payload
      this.method = 'json'
      this.next = next
      this.fail = fail
      this.height = height_calc(this.$refs.main)
      this.width = width_calc(this.$refs.main)

      this.$m.api.json(
        path,
        payload,
        (b) => {
          this.loading = false
          this.error = null
          if (next) next(b)
        },
        (e) => {
          console.log(e)
          this.error = e
          this.loading = false
          if (fail) fail(e)
        }
      )
    },
    get(path, next, fail) {
      this.loading = true
      this.error = null
      this.path = path
      this.method = 'get'
      this.next = next
      this.fail = fail
      this.height = height_calc(this.$refs.main)
      this.width = width_calc(this.$refs.main)
      // console.log("d", this.height, this.width);
      // return;
      this.$m.api.get(
        path,
        (b) => {
          this.loading = false
          this.error = null
          if (next) next(b)
        },
        (e) => {
          console.log(e)
          this.error = e
          this.loading = false
          if (fail) fail(e)
        }
      )
    },
    delete(path, next, fail) {
      this.loading = true
      this.error = null
      this.path = path
      this.method = 'delete'
      this.next = next
      this.fail = fail
      this.height = height_calc(this.$refs.main)
      this.width = width_calc(this.$refs.main)

      this.$m.api.delete(
        path,
        (b) => {
          this.loading = false
          this.error = null
          if (next) next(b)
        },
        (e) => {
          console.log(e)
          this.error = e
          this.loading = false
          if (fail) fail(e)
        }
      )
    }
  }
}
</script>
