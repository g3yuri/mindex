const { log = () => {} } = console

export function fecha(fecha) {
  log(fecha)
  const d = fecha.split(/-/).map((e) => parseInt(e, 10))
  const date = new Date(d[0], d[1] - 1, d[2])
  log(date)
  return date
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) {
    return '0 Bytes'
  }
  const k = 1024,
    dm = decimals,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function formatDate(date) {
  console.log('date', date)
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) {
    month = '0' + month
  }
  if (day.length < 2) {
    day = '0' + day
  }

  return [year, month, day].join('-')
}
