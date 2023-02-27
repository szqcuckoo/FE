const doms = {
  form: $('.user-form'),
  txtLoginId: $('#txtLoginId'),
  txtLoginPwd: $('#txtLoginPwd'),
};

doms.form.onsubmit = async (e) => {
  e.preventDefault();
  const loginId = doms.txtLoginId.value;
  const loginPwd = doms.txtLoginPwd.value;
  const resp = await login(loginId, loginPwd);
  if (resp.code === 0) {
    // 登录成功
    location.href = './index.html';
  } else {
    alert('账号密码错误');
  }
};
