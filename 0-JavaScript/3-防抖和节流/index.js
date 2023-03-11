/* 
防抖：防止抖动，单位时间内事件触发会被重置，避免事件被误伤触发多次。代码实现重在清零 clearTimeout。防抖可以比作等电梯，只要有一个人进来，就需要再等一会儿。业务场景有避免登录按钮多次点击的重复提交。
节流：控制流量，单位时间内事件只能触发一次，与服务器端的限流 (Rate Limit) 类似。代码实现重在开锁关锁 timer=timeout; timer=null。节流可以比作过红绿灯，每等一个红灯时间就可以过一批。
*/

// 防抖：就是电梯，只会等到最后一个人上来才运行

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// 节流：就是技能CD，固定时间只能放一次

function throttle(fn, delay) {
  let timer;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args);
      timer = null
    }, delay);
  };
}

const input = document.querySelector("#input");
input.oninput = debounce(function (e) {
  const res = e.target.value;
  console.log(res);
}, 1000);

// input.oninput = throttle(function (e) {
//   const res = e.target.value;
//   console.log(res);
// }, 1000);
