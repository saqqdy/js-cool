'use strict';

/**
 * textarea或input对象在指定的光标位置插入文字
 *
 * @param obj-  dom对象
 * @param str - 要插入的文字
 */
function textareaInsertText(obj, str) {
    if (document.selection) {
        // IE
        var sel = document.selection.createRange();
        sel.text = str;
    }
    else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart, endPos = obj.selectionEnd, curPos = startPos, tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
        curPos += str.length;
        setTimeout(function () {
            obj.selectionStart = obj.selectionEnd = curPos;
        }, 0);
    }
    else {
        obj.value += str;
    }
}

module.exports = textareaInsertText;
