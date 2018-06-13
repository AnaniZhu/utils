export function debounce (fn, interval) {
	let timer = null
	return function () {
		let arg = arguments
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			fn.apply(this, arg)
			timer = null
		}, interval)
	}
}