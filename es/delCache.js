/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
/**
 * 删除localStorage
 *
 * @param name - 名称
 */
function delCache(name) {
    localStorage.removeItem(name);
}

export { delCache as default };
