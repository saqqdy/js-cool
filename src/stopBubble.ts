/**
 * 阻止冒泡
 *
 * @param e - dom的event对象
 * @returns bool false
 */
function stopBubble(e: Event) {
    if (e && e.stopPropagation) {
        // Firefox
        e.stopPropagation() // e.preventDefault();
    } else {
        // IE
        e.cancelBubble = true // e.returnValue = false;
    }
    return false
}

export default stopBubble
