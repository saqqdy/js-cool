/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
/**
 * 数字千分位分割
 *
 * @param value - 数字
 * @returns 分割后的字符串
 */
function splitThousand(val) {
    if (!val)
        return val === 0 || val === '0' ? 0 : '';
    val = val.toString();
    if (val.split('.').length == 1)
        return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return (val.split('.')[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$&,') +
        '.' +
        val.split('.')[1]);
}

export { splitThousand as default };
