/**
 * 获取目录形式URL参数
 * @param {String} url 传入url地址
 * @returns {Object} 返回参数对象
 */
function getDirParam(url) {
  var patt = new RegExp(/^http[s]?:\/\/[^\/]+([\s\S]*)/)
  var urlStr = url != '' && typeof url != 'undefined' ? url.replace(patt, '$1') : location.pathname //获取url中域名后的字串:/post/0703/a1.html
  urlStr = urlStr.replace(/^\//, '')
  var dirParam = {}
  dirParam.host = url != '' && typeof url != 'undefined' ? url.match(/^http[s]?:\/\/[^\/]+/)[0] : location.host //获取域名，包含http://
  if (urlStr.includes('/')) {
    //dirParam = unescape(urlStr).split("/");
    dirParam.path = decodeURI(urlStr).split('/')
  }
  return dirParam //{"host":"http://192.168.2.243:7004","path":["media","video","chidaoyan.mp4"]}
}

export default getDirParam
