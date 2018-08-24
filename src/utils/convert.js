/**
 * used to convert unit.
 */

export function convertunit(limit) {
  var size = ''
  if (limit < 0.1 * 1024) { // 如果小于0.1KiB转化成B
    size = limit.toFixed(2) + 'B'
  } else if (limit < 0.1 * 1024 * 1024) { // 如果小于0.1MiB转化成KiB
    size = (limit / 1024).toFixed(1) + 'KiB'
  } else if (limit < 0.1 * 1024 * 1024 * 1024) { // 如果小于0.1GiB转化成MiB
    size = (limit / (1024 * 1024)).toFixed(1) + 'MiB'
  } else if (limit < 0.1 * 1024 * 1024 * 1024 * 1024) { // 如果小于0.1TB转化成GiB
    size = (limit / (1024 * 1024 * 1024)).toFixed(1) + 'GiB'
  } else { // 其他转化成TiB
    size = (limit / (1024 * 1024 * 1024 * 1024)).toFixed(1) + 'TiB'
  }

  var sizestr = size + ''
  var len = sizestr.indexOf('\.')
  var dec = sizestr.substr(len + 1, 2)
  if (dec === '00') { // 当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
  }
  return sizestr
}

export function convert(limit) {
  var size = ''
  if (limit < 1000) {
    size = limit.toFixed(2)
  } else if (limit < 0.1 * 1000 * 1000 * 1000) {
    size = (limit / (1000)).toFixed(2) + 'K'
  } else if (limit < 0.1 * 1000 * 1000 * 1000 * 1000) {
    size = (limit / (1000 * 1000 * 1000)).toFixed(2) + 'G'
  } else {
    size = (limit / (1000 * 1000 * 1000 * 1000)).toFixed(1) + 'T'
  }

  var sizestr = size + ''
  var len = sizestr.indexOf('\.')
  var dec = sizestr.substr(len + 1, 2)
  if (dec === '00') {
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
  }
  return sizestr
}

