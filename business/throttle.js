/**
 * 时间戳版节流
 * 指定时间内只执行一次，立即执行
 * @param {Functon} fn 要执行的函数
 * @param {Context} context 函数执行的上下文
 * @param {Number} timeout 间隔时间
 * @returns {Function} 节流后的函数
 */
function timeStampThrottle (fn, context, timeout) {
  let lastExcuteTime

  return function () {
    let interval = Date.now() - lastExcuteTime

    if (lastExcuteTime && interval < timeout) return

    fn.apply(context, arguments)
    lastExcuteTime = Date.now()
  }
}

/**
 * 定时器节流
 * 指定时间内只执行一次，延时执行
 * @param {Functon} fn 要执行的函数
 * @param {Context} context 函数执行的上下文
 * @param {Number} timeout 间隔时间
 * @returns {Function} 节流后的函数
 */
function timerThrottle (fn, context, timeout) {
  let timer

  return function () {
    if (timer) return

    let args = arguments

    timer = setTimeout(() => {
      fn.apply(context, args)
      timer = null
    }, timeout)
  }
}


/**
 * 复杂版节流
 * 先立即执行一次，中间固定间隔时间执行，最后再执行一次
 * 指定时间内连续触发，第一次立即执行，后续多个触发，只取后续触发的第一个，且延迟时间为(指定时间 - 两次触发间隔时间)
 * @param {Functon} fn 要执行的函数
 * @param {Context} context 函数执行的上下文
 * @param {Number} timeout 间隔时间
 * @returns {Function} 节流后的函数
 */
function complexThrottle (fn, context, timeout) {
  let timer
  let lastExcuteTime

  return function () {

    /**
     * 每次执行都记录时间戳，与上一次执行时间戳作比较，计算出准确的延迟时间
     * Q: 为什么这么写
     * A: 思考如下场景: 假设3s内只允许执行一次，相邻两次触发，前一次立即触发执行，2s后触发第二次执行，这时定时器应该延迟1s(3 - 2 = 1)后触发
     */

    function excute () {
      fn.apply(context, args)
      lastExcuteTime = Date.now()
    }

    if (timer) return

    let args = arguments


    // 第一次执行
    if (!lastExcuteTime) {
      excute()
    } else {
      let interval = Date.now() - lastExcuteTime

      if (interval < timeout) {
        timer = setTimeout(function () {
          excute()
          timer = null
        }, timeout - interval)
      } else {
        excute()
      }
    }
  }
}

/**
 * 节流函数
 * @param {Functon} fn 要执行的函数
 * @param {Context} context 函数执行的上下文
 * @param {Number} timeout 间隔时间
 * @param {Number} mode 通过不同mode拿到不同的节流函数，mode === 1: 简单版节流，mode !== 1: 复杂版节流
 * @returns {Function} 节流后的函数
 */
function throttle (fn, context, timeout, mode = 1) {
  let throttleFn
  switch (mode) {
    case 1:
      throttleFn = timeStampThrottle
      break
    case 2:
      throttleFn = timerThrottle
      break
    case 3:
      throttleFn = complexThrottle
      break
    default:
      throttleFn = timeStampThrottle
  }
  return throttleFn(fn, context, timeout)
}


export {
  throttle
}
