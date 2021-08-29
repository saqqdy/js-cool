'use strict';

/**
 * 阻止默认事件
 *
 * @param e - dom的event对象
 * @returns bool false
 */
function stopDefault(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    else {
        window.event.returnValue = false;
    }
    return false;
}

module.exports = stopDefault;
