/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
/**
 * 阻止冒泡
 *
 * @param e - dom的event对象
 * @returns bool false
 */
function stopBubble(e) {
    if (e && e.stopPropagation) {
        // Firefox
        e.stopPropagation(); // e.preventDefault();
    }
    else {
        // IE
        e.cancelBubble = true; // e.returnValue = false;
    }
    return false;
}

export { stopBubble as default };
