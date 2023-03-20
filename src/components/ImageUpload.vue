<template>
  <input
    v-if="file == null"
    type="file"
    v-show="false"
    ref="file"
    @input="upload"
  />
  <q-dialog v-model="form.show">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ _confirm }}</div>
      </q-card-section>
      <q-card-section align="center">
        <img
          v-if="isImage"
          :src="file.base64"
          style="max-width: 200px; max-height: 200px"
        />
        <div v-else>{{ file?.type }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section align="center">
        <q-btn
          label="Ok"
          @click="confirm_ok"
          rounded
          unelevated
          color="primary"
        />
        <q-btn
          label="Cancelar"
          @click="
            () => {
              form.show = false
              file = null
            }
          "
          rounded
          unelevated
          flat
          color="primary"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="fver.show">
    <q-card>
      <q-card-section align="center">
        <img
          v-if="isImageResult"
          :src="file_result?.base64 || src"
          style="max-width: 100%; max-height: 100%"
        />
        <div>{{ file_result?.type }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section align="center">
        <q-btn
          label="Cancelar"
          @click="fver.show = false"
          rounded
          unelevated
          flat
          color="primary"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
  <div :class="_class">
    <div class="t-flex t-flex-row t-justify-between t-w-full t-h-full">
      <div
        class="t-w-full t-border-2 t-rounded-lg t-border-gray-300 t-flex t-justify-center t-items-center t-relative t-overflow-hidden"
        @click="_src ? null : $refs.file.click()"
      >
        <q-img
          style="max-width: 200px; max-height: 200px"
          v-if="_src"
          :src="_src"
        />
        <div
          v-else
          class="t-flex t-flex-col t-justify-center t-items-center t-h-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="t-w-2/5 t-text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div v-if="_label?.length">{{ _label }}</div>
        </div>
        <div
          v-if="isImageResult"
          class="t-pl-4 t-absolute t-flex t-justify-center t-items-center t-flex-col"
        >
          <q-btn
            class="t-my-2"
            label="Ver"
            @click="fver.show = true"
            rounded
            unelevated
            color="primary"
          />
          <q-btn
            class="t-my-2"
            label="Reemplazar"
            @click="$refs.file.click()"
            rounded
            unelevated
            color="primary"
          />
          <div v-if="_fileSize" class="t-bg-gray-100 t-px-2 t-rounded-lg">
            {{ _fileSize }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'

const dataURLToFile = function (dataURL, filename) {
  const BASE64_MARKER = ';base64,'
  let blob = null
  let parts, contentType, raw

  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    parts = dataURL.split(',')
    contentType = parts[0].split(':')[1]
    raw = parts[1]

    blob = new Blob([raw], { type: contentType })
    return new File([blob], filename, { type: contentType })
  }

  parts = dataURL.split(BASE64_MARKER)
  contentType = parts[0].split(':')[1]
  raw = window.atob(parts[1])
  const rawLength = raw.length

  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  blob = new Blob([uInt8Array], { type: contentType })
  return new File([blob], filename, { type: contentType })
}
async function resizeFile(readerEvent, file, max_size) {
  return new Promise((resolve, reject) => {
    try {
      if (file.type.match(/image.*/)) {
        const image = new Image()
        image.onload = function (imageEvent) {
          // Resize the image
          const canvas = document.createElement('canvas')
          let width = image.width,
            height = image.height
          if (width > height) {
            if (width > max_size) {
              height *= max_size / width
              width = max_size
            }
          } else {
            if (height > max_size) {
              width *= max_size / height
              height = max_size
            }
          }
          canvas.width = width
          canvas.height = height
          canvas.getContext('2d').drawImage(image, 0, 0, width, height)
          const dataUrl = canvas.toDataURL('image/jpeg')
          // ar name = file.name.substr(0, file.name.lastIndexOf(".")) + ".jpg";
          resolve(dataURLToFile(dataUrl, file.name))
        }
        image.onerror = function (err) {
          reject(err)
        }
        image.src = readerEvent.target.result
      }
    } catch (e) {
      reject(e)
    }
  })
}
function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}
export default {
  name: 'ImageUpload',
  emits: ['upload'],
  props: {
    label: String,
    confirm: String,
    class: String,
    noConfirm: Boolean,
    src: String,
    imageStyle: String,
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    imageMaxSize: Number
  },
  data() {
    return {
      file: null,
      file_result: null,
      form: reactive({ show: false }),
      fver: reactive({ show: false })
    }
  },
  mounted() {
    this.reload()
  },
  computed: {
    _class: function () {
      return this.class
    },
    _label: function () {
      return this.label
    },
    isImage: function () {
      return this.file && this.file?.type.startsWith('image/')
    },
    isImageResult: function () {
      return (
        (this.file_result && this.file_result?.type.startsWith('image/')) ||
        this.src
      )
    },
    _confirm: function () {
      return this.confirm
    },
    _src: function () {
      return this.file_result?.base64 || this.src
    },
    _maxHeight: function () {
      if (typeof this.maxHeight === 'number') {
        return this.maxHeight + 'px'
      }
      return this.maxHeight
    },
    _maxWidth: function () {
      if (typeof this.maxWidth === 'number') {
        return this.maxWidth + 'px'
      }
      return this.maxWidth
    },
    _imageMaxSize: function () {
      return this.imageMaxSize
    },
    _fileSize: function () {
      return this.file_result?.size ? bytesToSize(this.file_result?.size) : null
    }
  },
  methods: {
    reload() {},
    upload() {
      const file = this.$refs.file.files[0]
      if (!file) {
        console.log('no hay variable file', file)
        return
      }
      const reader = new FileReader()

      reader.onload = async (readerEvent) => {
        file.base64 = reader.result
        this.file = file
        const filename = file.name
        console.log('image.file', this.file)
        if (this._imageMaxSize) {
          if (file.type.match(/image.*/)) {
            this.file = await resizeFile(
              readerEvent,
              this.file,
              this._imageMaxSize
            )
            this.file.base64 = reader.result
            console.log('image.resize', this.file)
          }
        }
        if (this.noConfirm) {
          this.confirm_ok()
        } else {
          this.form.show = true
        }
      }
      reader.onerror = (error) => {
        alert(error)
      }
      reader.readAsDataURL(file)
    },
    confirm_ok() {
      this.form.show = false
      this.file_result = this.file
      this.$emit('upload', this.file)
      this.file = null
    }
  }
}
</script>
