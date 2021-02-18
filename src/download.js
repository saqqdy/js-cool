/**
 * @description 文件下载的几种方式：1. 针对一些浏览器无法识别的文件格式。地址栏输入文件URL、window.location.href = URL、window.open(URL)；2. 使用a标签download属性（或者js创建a标签）；3. 浏览器可识别的pdf、txt文件，后端兼容处理attachment；4. 在header增加token用于鉴权下载，使用XmlHttpRequest来想后台发起请求
 * @param {String} url 链接
 * @param {String} filename 文件名
 * @param {String} type 下载类型 'href','open','download','request'
 */
const download = (url, filename, type = 'download') => {
    let name = /[^\/]+$/.exec(url)[0],
        fileType = /[^\.]+$/.exec(name)[0].toLowerCase()
    if (type === 'open') {
        window.open(url)
    } else if (type === 'href') {
        window.location.href = url
    } else if (type === 'request') {
        downloadUrlFile(url, filename || name)
    } else {
        openFile(url, filename || name, fileType)
    }
}

/**
 * @description 新标签页下载文件
 * @private
 * @param {String} url 链接
 * @param {String} filename 文件名
 */
function openFile(url, filename, fileType) {
    let dom = document.createElement('a')
    // if (['pdf', 'txt'].includes(fileType)) console.log('is pdf')
    dom.style.display = 'none'
    dom.download = filename
    dom.href = url
    document.body.appendChild(dom)
    dom.click()
    document.body.removeChild(dom)
}

/**
 * @description 下载二级制文件
 * @private
 * @param {String} url 链接
 * @param {String} filename 文件名
 */
function downloadUrlFile(url, filename) {
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
        if (xhr.status === 200) {
            saveFile(xhr.response, filename)
        }
    }
    xhr.send()
}

/**
 * @description 保存文件
 * @private
 * @param {Object} data 文件数据
 * @param {String} filename 文件名
 */
function saveFile(data, filename) {
    const urlObject = window.URL || window.webkitURL || window
    const blob = new Blob([data])
    let link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
    link.href = urlObject.createObjectURL(blob)
    link.download = filename
    link.click()
}

export default download
