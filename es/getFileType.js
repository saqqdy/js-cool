'use strict';

/**
 * 文件后缀名
 *
 * @param url - 文件名
 * @returns 返回文件后缀
 */
function getFileType(url) {
    if (typeof url != 'string' || url == '') {
        return null;
    }
    var type = /\.[^\.]+$/.exec(url); //[".docx", index: 31, input: "http://192.168.2.243:7005/doc/2.docx"]
    return type ? type[0].toLowerCase() : null;
}

module.exports = getFileType;
