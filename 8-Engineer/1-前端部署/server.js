const http = require("node:http");
const fsp = require('node:fs/promises')
const fs = require("node:fs");

const html = fs.readFileSync("./index.html");

// const server = http.createServer((req, res) => {
//   res.end(html)
// });

// 基于 stream 的处理
const server = http.createServer(async (req, res) => {
  const stat = await fsp.stat('./index.html')
  res.setHeader('content-length', stat.size)
  fs.createReadStream('./index.html').pipe(res)
})

server.listen(3213, () => {
  console.log("listening 3213");
});
