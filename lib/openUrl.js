'use strict';

/**
 * 新标签页打开链接（浏览器不能解析的文件跳转下载）
 *
 * @param url - 链接
 */
function openUrl(url) {
  var dom = document.createElement('a');
  dom.style.display = 'none';
  dom.href = url;
  dom.setAttribute('target', '_blank');
  document.body.appendChild(dom);
  dom.click();
  document.body.removeChild(dom);
}

module.exports = openUrl;
