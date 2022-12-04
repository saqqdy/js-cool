/**
 * 获取滑动到顶部和底部 返回'top' 'bottom'，建议使用限流
 *
 * @returns 返回位置
 */
const getScrollPosition = (): string | void => {
	let innerH =
			window.innerHeight ||
			document.documentElement.clientHeight ||
			document.body.clientHeight,
		docScrollTop = document.documentElement.scrollTop,
		bodyScrollTop = document.body.scrollTop,
		docScrollHeight = document.documentElement.scrollHeight,
		bodyScrollHeight = document.body.scrollHeight,
		scrollT = 0,
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
