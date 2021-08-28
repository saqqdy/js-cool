'use strict';

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');

/**
 * 将驼峰字符串转成-间隔且全小写的Dash模式
 *
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
function camel2Dash(string) {
  return string.replace(/([A-Z]{1,1})/g, '-$1').replace(/^-/, '').toLocaleLowerCase();
}

module.exports = camel2Dash;
