/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
/**
 * 获取滑动到顶部和底部 返回'top' 'bottom'，建议使用限流
 *
 * @returns 返回位置
 */
const getScrollPosition = () => {
    var innerH = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    var docScrollTop = document.documentElement.scrollTop;
    var bodyScrollTop = document.body.scrollTop;
    var docScrollHeight = document.documentElement.scrollHeight;
    var bodyScrollHeight = document.body.scrollHeight;
    var scrollT = 0, scrollH = 0;
    if (docScrollTop === 0) {
        scrollT = bodyScrollTop;
        scrollH = bodyScrollHeight;
        if (bodyScrollTop === 0) {
            return 'top';
        }
    }
    else {
        scrollT = docScrollTop;
        scrollH = docScrollHeight;
    }
    // if(bodyScrollTop === 0 && docScrollTop === 0){
    //   return 'top';
    // }
    if (innerH + Math.floor(scrollT) === scrollH ||
        innerH + Math.ceil(scrollT) === scrollH) {
        return 'bottom';
    }
};

export { getScrollPosition as default };
