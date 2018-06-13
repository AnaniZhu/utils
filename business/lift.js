export function getOffsetTop (element) {
  let top = 0
  while (element.offsetParent) {
    top += element.offsetTop
    element = element.offsetParent
  }
  return top
}

export function to (end, rate, callback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (fn) {
      setTimeout(fn, 17)
    }
  }
  // 考虑到在页面首部的情况 document.body.scrollTop和document.documentElement.scrollTop都为0
  document.body.scrollTop += 1
  document.documentElement.scrollTop += 1
  const doc = document.body.scrollTop ? document.body : document.documentElement

  let pos = doc.scrollTop
  // 头判断
  if (end > pos) {
    end += 1
  }

  function step () {
    pos = pos + (end - pos) / (rate || 2)
    doc.scrollTop = pos
    if (Math.abs(end - pos) < 1) {
      callback && callback()
      return
    }
    window.requestAnimationFrame(step)
  }
  step()
}