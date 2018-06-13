export function throttle (fn, interval) {
  let timer = null
  let isFirst = true
  return function () {
    const arg = arguments
    if (isFirst) {
      fn.apply(this, arg)
      isFirst = false
    }
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, arg)
      timer = null
    }, interval || 300)
  }
}