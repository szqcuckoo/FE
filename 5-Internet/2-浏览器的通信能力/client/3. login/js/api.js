async function request(url, options) {
  const key = '__token';
  let token = localStorage.getItem(key);
  options = options || {};
  options.headers = options.headers || {};
  if (token) {
    options.headers['authorization'] = `Bearer ${token}`;
  }
  const resp = await fetch('https://study.duyiedu.com' + url, options);
  token = resp.headers.get('authorization');
  if (token) {
    localStorage.setItem(key, token);
  }
  return await resp.json();
}

async function login(loginId, loginPwd) {
  return await request('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ loginId, loginPwd }),
  });
}

async function profile() {
  return await request('/api/user/profile');
}

async function history() {
  return await request('/api/chat/history');
}

async function chat(content) {
  return await request('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
    }),
  });
}
