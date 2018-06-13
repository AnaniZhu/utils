export function formatTime (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(addZero).join('-') + ' ' + [hour, minute, second].map(addZero).join(':')
}
export function addZero (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export function formatDate (date) {
  let nowDate = new Date()
  const diffTime = nowDate - date

  if (diffTime < 0) {
    return
  }

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const MINUTE = 60 * 1000
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR

  const todayExtraTime = nowDate - new Date(nowDate).setHours(0, 0, 0, 0)

  if (diffTime > DAY + todayExtraTime) {
    return formatTime(date)
  } else if (diffTime < DAY + todayExtraTime && diffTime > todayExtraTime) {
    // 昨天
    return '昨天 ' + [hour, minute, second].map(addZero).join(':')
  } else {
    /**
     * 表示在今天
     * 5分钟之内显示 '刚刚'
     * 一小时内显示 '几分钟前'
     * 其余显示 今天 xx : xx : xx
     **/
    if (diffTime < 5 * MINUTE) {
      return '刚刚'
    } else if (diffTime / HOUR < 1) {
      return ~~(diffTime / MINUTE) + '分钟前'
    } else {
      return '今天 ' + [hour, minute, second].map(addZero).join(':')
    }
  }
}