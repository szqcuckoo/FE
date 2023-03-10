/**
 * 观察某个对象的所有属性
 * @param {Object} obj
 */
function observe(obj) {
  for (const key in obj) {
    let internalValue = obj[key];
    let funcs = [];
    Object.defineProperty(obj, key, {
      get() {
        // 依赖收集：记录：是哪一个函数在调用我
        if (window.__func && !funcs.includes(window.__func)) {
          funcs.push(window.__func);
        }
        return internalValue;
      },
      set(val) {
        internalValue = val;
        // 派发更新 自动调用依赖该属性的函数
        for (let i = 0; i < funcs.length; i++) {
          funcs[i]();
        }
      },
    });
  }
}

/**
 * 将函数保存在 window 上执行完毕以后再删除
 * @param {Function} fn 
 */
function autoRun(fn) {
  window.__func = fn;
  fn();
  window.__func = null;
}
