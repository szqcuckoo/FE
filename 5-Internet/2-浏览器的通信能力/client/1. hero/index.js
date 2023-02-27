// (async () => {
//   const resp = await fetch('https://study.duyiedu.com/api/herolist').then(
//     (resp) => resp.json()
//   );
//   document.querySelector('.list').innerHTML = resp.data
//     .map(
//       (h) => `<li>
//   <a
//     href="https://pvp.qq.com/web201605/herodetail/${h.ename}.shtml"
//     target="_blank"
//   >
//     <img
//       src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${h.ename}/${h.ename}.jpg"
//       alt=""
//     />
//     <span>${h.cname}</span>
//   </a>
// </li>`
//     )
//     .join('');
// })();

// const xhr = new XMLHttpRequest();
// xhr.open("GET", "https://study.duyiedu.com/api/herolist");
// xhr.send();
// xhr.onload = (e) => {
//   const res = JSON.parse(e.currentTarget.response).data;
//   document.querySelector(".list").innerHTML = res.map((item) => {
//     console.log(item.cname, item.ename);
//     return `<li>
//     <a
//       href="https://pvp.qq.com/web201605/herodetail/${item.ename}.shtml"
//       target="_blank"
//     >
//       <img
//         src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg"
//         alt=""
//       />
//       <span>${item.cname}</span>
//     </a>
//   </li>`;
//   }).join("");
// };

(async () => {
  const resp = await fetch("https://study.duyiedu.com/api/herolist").then(
    (resp) => {
      return resp.json();
    }
  );
  // 同上
})();
