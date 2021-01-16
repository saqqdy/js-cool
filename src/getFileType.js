/**
 * 文件后缀名
 * @param {String} url 文件名
 * @returns {String} 返回文件后缀
 */
function getFileType(url) {
  if (typeof url != 'string' || url == '') {
    return false
  }
  var type = /\.[^\.]+$/.exec(url) //[".docx", index: 31, input: "http://192.168.2.243:7005/doc/2.docx"]
  return type[0].toLowerCase()
}

export default getFileType
