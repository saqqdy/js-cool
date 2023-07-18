/**
 * Get slide to top and bottom return 'top' 'bottom', recommend using limit flow
 *
 * @returns return position
 */
function getScrollPosition() {
	const innerH =
		window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	const docScrollTop = document.documentElement.scrollTop
	const bodyScrollTop = document.body.scrollTop
	const docScrollHeight = document.documentElement.scrollHeight
	const bodyScrollHeight = document.body.scrollHeight
	let scrollT = 0,
		scrollH = 0
	if (docScrollTop === 0) {
		scrollT = bodyScrollTop
		scrollH = bodyScrollHeight
		if (bodyScrollTop === 0) {
			return 'top'
		}
	} else {
		scrollT = docScrollTop
		scrollH = docScrollHeight
	}
	// if(bodyScrollTop === 0 && docScrollTop === 0){
	//   return 'top';
	// }
	if (innerH + Math.floor(scrollT) === scrollH || innerH + Math.ceil(scrollT) === scrollH) {
		return 'bottom'
	}
}

export default getScrollPosition
