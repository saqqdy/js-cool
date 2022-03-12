/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
/**
 * 新标签页打开链接（浏览器不能解析的文件跳转下载）
 *
 * @param url - 链接
 */
function openUrl(url) {
    let dom = document.createElement('a');
    dom.style.display = 'none';
    dom.href = url;
    dom.setAttribute('target', '_blank');
    document.body.appendChild(dom);
    dom.click();
    document.body.removeChild(dom);
}

export { openUrl as default };
