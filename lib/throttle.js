'use strict';

require('core-js/modules/es.date.to-string.js');
require('core-js/modules/web.timers.js');

var throttle = function throttle(fn, delay, immediate, debounce) {
  var curr = +new Date(),
      //当前事件
  last_call = 0,
      last_exec = 0,
      timer,
      diff,
      // 时间差
  context,
      //上下文
  args,
      exec = function exec() {
    last_exec = curr;
    fn.apply(context, args);
  };

  return function () {
    curr = +new Date();
    context = this, args = arguments, diff = curr - (debounce ? last_call : last_exec) - delay;
    clearTimeout(timer);

    if (debounce) {
      if (immediate) {
        timer = setTimeout(exec, delay);
      } else if (diff >= 0) {
        exec();
      }
    } else {
      if (diff >= 0) {
        exec();
      } else if (immediate) {
        timer = setTimeout(exec, -diff);
      }
    }

    last_call = curr;
  };
};

module.exports = throttle;
