/**
 * camel2Dash
 * 将驼峰字符串转成-间隔且全小写的Dash模式
 * @param {String} string 需要转换的字符串
 * @returns {String} 返回转换后的字符串
 */
const camel2Dash = string => {
  return string
    .replace(/([A-Z]{1,1})/g, '-$1')
    .replace(/^-/, '')
    .toLocaleLowerCase()
}

export default camel2Dash
