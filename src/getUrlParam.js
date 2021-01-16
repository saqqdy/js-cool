/* 获取URL参数 */
/*function getUrlParam(url){
	var urlStr = url != "" && url != null ? url.substr(url.indexOf("?")) : location.search;//获取url中"?"符后的字串
	var urlParam = [];
	if(urlStr.indexOf("?") != -1){
		var str = urlStr.substr(1);
		var strs = str.split("&");
		for(var i = 0;i < strs.length;i++){
			//urlParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			urlParam[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
		};
	};
	return urlParam;
}*/

/* 获取URL参数 */
// function getUrlParam(url) {
//   var urlStr = url != "" && typeof url != "undefined" ? url.substr(url.indexOf("?")) : location.search; //获取url中"?"符后的字串
//   var urlParam = [];
//   if (urlStr.includes("?")) {
//     var str = urlStr.substr(1);
//     var strs = str.split("&");
//     for (var i = 0; i < strs.length; i++) {
//       //urlParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
//       urlParam[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
//     };
//   };
//   return urlParam;
// }
// function getUrlParam(url) {
//   // url = (url != "" && typeof url != "undefined") ? url.substr(url.indexOf("?")) : location.search; //获取url中"?"符后的字串
//   var reg_url = /^[^\?]+\?([\w\W]+)$/,
//     reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
//     arr_url = reg_url.exec(url),
//     ret = {};
//   if (arr_url && arr_url[1]) {
//     var str_para = arr_url[1], result;
//     while ((result = reg_para.exec(str_para)) != null) {
//       ret[result[1]] = result[2];
//     }
//   }
//   return ret;
// }

/**
 * 获取URL参数
 * @param {String} url 传入url参数
 * @returns {Object} 返回参数列表
 */
function getUrlParam(url) {
  url = url !== '' && typeof url !== 'undefined' ? url.substr(url.indexOf('?')).split('#')[0] : location.search //获取url中"?"符后的字串
  var search = url.substring(url.lastIndexOf('?') + 1)
  var obj = {}
  var reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, function(rs, $1, $2) {
    var name = decodeURIComponent($1)
    var val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

export default getUrlParam
