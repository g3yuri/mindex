# Control de Postulantes Alpayana (alpayana)

Control de Postulantes Alpayana

## Instalar quasar

Con la ultima actualización de Quasar, se crea de esta manera un proyecto

```bash
yarn create quasar
```

## Instalar Tailwind

```bash
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
```

Crear el archivo de configuracion de tailwind

```bash
npx tailwindcss init
```

En el archivo de configuracion `tailwind.config.js` creado colocar `prefix:'t-'` y `content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"]`

```js
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [],
  prefix: "t-", // agregado
};
```

Enlazar los recursos de tailwind en quasar en `src/css/app.scss`

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

En el archivo `.postcss.config.js` se ingresa lo siguiente: `require('tailwindcss')`

```js
module.exports = {
  plugins: [
    // https://github.com/postcss/autoprefixer
    require("tailwindcss"), // agregado
    require("autoprefixer")({
      //...
    })
}
```

## Instalar animate css

```bash
yarn add animate.css dayjs
```

En el archivo `src/css/app.scss` agregar `@import "animate.css"`

## Modo PWA

Ejecutar el comando `quasar mode add pwa`

## Para que inicie automaticamente

Agregar estas lineas en `quasar.config.js` para que actualice los archivos cuando haya nuevos en el servidor

```json
// quasar.config.js
pwa: {
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true
  }
}
```

## Nginx

Para configurar el nginx referirse a: <https://quasar.dev/quasar-cli-webpack/developing-spa/deploying#general-deployment>

- Para instalar icongenie: `npm install -g @quasar/icongenie`
- Para crear el icono de la aplicacion `icongenie g -i ./src/assets/logo.png`
- Para el modo PWA `icongenie g -m pwa -i ./src/assets/logo.png`

## Paquete para visualización de imagenes v-viewer

Instalar con el siguiente comando, si se instala sin el next, se instala una version anterior que no funciona

```bash
npm i v-viewer@next
```

## Echart

Graficos de barras lineas etc, ref: <https://github.com/ecomfe/vue-echarts#readme>

```bash
npm install echarts vue-echarts
```

## Otros

```js
/* eslint-disable */

module.exports = (api) => {
  return {
    presets: [
      [
        "@quasar/babel-preset-app",
        api.caller((caller) => caller && caller.target === "node")
          ? { targets: { node: "current" } }
          : {},
      ],
    ],
  };
};
```

## Zoom Images

Referencia <https://github.com/mirari/v-viewer/tree/v3>
