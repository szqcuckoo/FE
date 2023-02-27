const app = require('express')();
const text = `<h1>两只老虎爱跳舞</h1>

小兔子乖乖拔萝卜

我和小鸭子学走路

童年是最美的礼物`;

app.get('/source/file.txt', (req, res) => {
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.end(text);
});
app.get('/d/file.txt', (req, res) => {
  res.set('Content-Type', 'text/plain; charset=utf-8');
  res.set('Content-Disposition', 'attachment; filename=baby.txt');
  res.end(text);
});

app.listen(7000, () => {
  console.log('server started');
});
