const $ = document.querySelector.bind(document);
const doms = {
  img: $('.preview'),
  container: $('.upload'),
  select: $('.upload-select'),
  selectFile: $('.upload-select input'),
  progress: $('.upload-progress'),
  cancelBtn: $('.upload-progress button'),
  delBtn: $('.upload-result button'),
};

function showArea(areaName) {
  doms.container.className = `upload ${areaName}`;
}

function setProgress(value) {
  doms.progress.style.setProperty('--percent', value);
}

// doms.select.onclick = () => {
//   // 选择文件
//   doms.selectFile.click();
// };
// doms.selectFile.onchange = () => {
//   const file = doms.selectFile.files[0];
//   // ajax -> 服务器
//   const xhr = new XMLHttpRequest();
//   xhr.addEventListener('load', () => {
//     // 响应完成之后触发
//     const resp = JSON.parse(xhr.responseText).data;
//     doms.img.src = resp;
//     showArea('result');
//   });
//   xhr.upload.addEventListener('progress', (e) => {
//     // 上传一部分就触发一次
//     const percent = Math.floor((e.loaded / e.total) * 100);
//     setProgress(percent);
//   });
//   // 配置
//   xhr.open('POST', 'http://localhost:9527/upload/single');
//   // 构建multipart/form-data格式的消息体
//   const formData = new FormData();
//   formData.append('avatar', file);
//   // 发送请求
//   xhr.send(formData);

//   showArea('progress');

//   // 本地预览
//   const reader = new FileReader();
//   reader.onload = (e) => {
//     doms.img.src = e.target.result;
//   };
//   reader.readAsDataURL(file); //本地读取文件
// };

doms.select.onclick = () => {
  doms.selectFile.click()
}

// 选择文件后触发
doms.selectFile.onchange = () => {
  let file = doms.selectFile.files[0]
  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:9527/upload/single')
  // xhr 请求发送完成后触发
  xhr.onload = () => {
    const res = JSON.parse(xhr.responseText).data
    doms.img.src = res
    showArea('result')
  }
  // 上传进度
  xhr.upload.onprogress = (e) => {
    const percent = Math.floor((e.loaded/e.total )* 100)
    setProgress(percent)
  }
  // 包装 formData 数据格式
  const formData = new FormData()
  formData.append('avatar', file)
  xhr.send(formData)
  showArea('progress');
  // 本地预览
  const render = new FileReader()
  render.onload = (e) => {
    doms.img.src = e.target.result
  }
  render.readAsDataURL(file)
}
