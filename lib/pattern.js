/**
 * pattern返回一些常用的正则：any, arrjson, chinese, email, float, isjson, json, mobile, number, pass, postcode, qq, string, tel, textarea, url, username
 * @returns {Object} 返回对象
 */

function pattern() {
  return {
    any: /[\w\W]+/,
    number: /^\d+$/,
    string: /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
    postcode: /^[0-9]{6}$/,
    url: /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
    username: /^[a-zA-Z0-9\_\-\.]{3,15}$/,
    float: /^[0-9]+\.{0,1}[0-9]{0,2}$/,
    email: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
    //mobile:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[6|7|8]|18[0-9])\d{8}$/,
    //mobile:/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
    mobile: /^1[3|4|5|7|8][0-9]\d{8,8}$/,
    chinese: /^[\u4E00-\u9FA5\uf900-\ufa2d]$/,
    tel: /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/,
    qq: /^[1-9][0-9]{5,13}$/,
    pass: /^(?![0-9\W\_]+$)(?![a-zA-Z\W\_]+$)[0-9a-zA-Z\W\_]{6,16}$/,
    json: /^\{[\s\S]*\}$/,
    arrjson: /^\[\{[\s\S]*\}\]$/,
    array: /^\[[\s\S]*\]$/,
    isjson: /[\s\S]*(\{[\s\S]*\})[\s\S]*/,
    textarea: /[\u4e00-\u9fa5_a-zA-Z0-9\,\.\/\?\;\:\'\"\[\]\-\*\(\)\（\）\%\$\@\\\!\，\《\》\。\、\？\；\：\‘\’\“\”\…\￥\！]/
  }
}

export default pattern()
