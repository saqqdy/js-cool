'use strict';

require('core-js/modules/es.array.map.js');
require('core-js/modules/web.timers.js');

/**
 * 防抖节流
 *
 * @returns class
 */
function delay() {
  return {
    map: {},
    register: function register(id, fn, time, boo) {
      var _this = this; // 注册


      if (boo) {
        // 防抖，一定时间内只触发第一次
        if (!this.map[id]) {
          // 不存在的先执行fn
          fn();
        }

        this.map[id] = {
          id: id,
          fn: fn,
          time: time,
          boo: boo,
          timeout: setTimeout(function () {
            _this.destroy(id);
          }, time)
        };
      } else {
        // 节流，一定时间内延迟执行
        if (this.map[id]) {
          // 已存在的先销毁
          this.destroy(id);
        }

        this.map[id] = {
          id: id,
          fn: fn,
          time: time,
          boo: boo,
          timeout: setTimeout(fn, time)
        };
      }
    },
    destroy: function destroy(id) {
      // 销毁
      if (!this.map[id]) {
        return;
      }

      clearTimeout(this.map[id].timeout);
      delete this.map[id];
    }
  };
}

module.exports = delay;
