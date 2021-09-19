'use strict';

/**
 * 截取小数点后几位，不足的不补0
 *
 * @param number - 要处理的数字，必填
 * @param n - 要保留的小数点位数，默认保留2位
 * @returns 返回新数字
 */
function fixNumber(number, n = 2) {
    let reg = new RegExp('^(.*\\..{' + n + '}).*$');
    number = '' + number;
    if (!/^(\-|\+)?\d+(\.\d+)?$/.test(number)) {
        console.warn('请传入数字');
        return number;
    }
    return parseFloat(number.replace(reg, '$1'));
}

module.exports = fixNumber;
