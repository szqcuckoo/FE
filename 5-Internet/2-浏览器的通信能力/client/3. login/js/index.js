const doms = {
  aside: {
    nickname: $('#nickname'), // 昵称
    loginId: $('#loginId'), // 账号
  },
  close: $('.close'), // 关闭按钮
  chatContainer: $('.chat-container'),
  txtMsg: $('#txtMsg'), // 文本框
  msgContainer: $('.msg-container'),
};

/**
@example 
addChat({
  content: "你几岁啦？",
  createdAt: 1651213093992,
  from: "haha",
  to: null
})
*/
function addChat(chatInfo) {
  const div = $$$('div');
  div.classList.add('chat-item');
  if (chatInfo.from) {
    div.classList.add('me');
  }
  const img = $$$('img');
  img.className = 'chat-avatar';
  img.src = chatInfo.from ? './asset/avatar.png' : './asset/robot-avatar.jpg';

  const content = $$$('div');
  content.className = 'chat-content';
  content.innerText = chatInfo.content;

  const date = $$$('div');
  date.className = 'chat-date';
  date.innerText = formatDate(chatInfo.createdAt);

  div.appendChild(img);
  div.appendChild(content);
  div.appendChild(date);

  doms.chatContainer.appendChild(div);
  doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// 鉴权（如何知道有没有登录）
(async () => {
  let user = await profile();
  if (user.code === 401) {
    alert('去登录');
    location.href = './login.html';
    return;
  }

  // 获取历史聊天记录
  const resp = await history();
  for (const chatInfo of resp.data) {
    addChat(chatInfo);
  }
  // 发送消息
  doms.msgContainer.onsubmit = async (e) => {
    e.preventDefault();
    addChat({
      content: doms.txtMsg.value,
      createdAt: Date.now(),
      from: user.data.nickname,
      to: null,
    });
    const resp = await chat(doms.txtMsg.value);
    addChat({
      content: resp.data.content,
      createdAt: resp.data.createdAt,
      from: null,
      to: user.data.nickname,
    });
  };
})();
