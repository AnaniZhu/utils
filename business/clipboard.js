// ie >= 9 || android version > 4.3
export default clipboard = function ({onCopy, onPaste}) {
	if (typeof onCopy !== 'function' || typeof onPaste !== 'function') {
		throw Error('paload must be function type!')
	}
	window.addEventListener('copy', e => {
   	let text = '' + window.getSelection()
   	const resetContent = value => {
   		e.preventDefault()
   		e.clipboardData.setData("text/plain", value)
   	}
   	onCopy || onCopy(text, resetContent)
	})
	window.addEventListener('paste', e => {
		let text = e.clipboardData.getData('Text')
	})
}