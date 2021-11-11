/*!
 * js-cool v2.3.0
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
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
