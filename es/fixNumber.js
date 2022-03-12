/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
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

export { fixNumber as default };
