/*!
 * js-cool v2.3.0
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
/**
 * 返回下一个zIndex值
 *
 * @param min - 可选，最小值
 * @param max - 可选，最大值
 * @returns 数字
 */
function nextIndex(min = 5000, max = 10000) {
    let doms = [min];
    Array.prototype.forEach.call(document.querySelectorAll('body > *'), e => {
        let n = +window.getComputedStyle(e).zIndex || 0;
        n > min && n < max && doms.push(n);
    });
    doms.sort((a, b) => b - a);
    return doms[0] + 1;
}

export { nextIndex as default };
