/**
 * @description 返回下一个zIndex值
 * @param {number} min 可选，最小值
 * @param {number} max 可选，最大值
 * @returns {Number} 数字
 */
function nextIndex(min = 5000, max = 10000) {
    let doms = [min]
    ;[...document.querySelectorAll('body > *')].forEach(e => {
        let n = +window.getComputedStyle(e).zIndex || 0
        n > min && n < max && doms.push(n)
    })
    doms.sort((a, b) => b - a)
    return doms[0] + 1
}

export default nextIndex
