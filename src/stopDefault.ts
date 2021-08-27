/**
 * 阻止默认事件
 * @param e - dom的event对象
 * @returns
 */
function stopDefault(e: Event) {
    if (e && e.preventDefault) {
        e.preventDefault()
    } else {
        (window as any).event.returnValue = false
    }
    return false
}

export default stopDefault
