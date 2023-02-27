const path = require('path');

exports.generateUrl = function (req, filename, basePath = '/upload') {
  return `${req.protocol}://${req.header('host')}${basePath}/${filename}`;
};

exports.generateFilename = function () {
  const date = new Date();
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  const h = date.getHours().toString().padStart(2, '0');
  const mi = date.getMinutes().toString().padStart(2, '0');
  const sec = date.getSeconds().toString().padStart(2, '0');
  const mili = date.getMilliseconds().toString().padStart(3, '0');
  const rad = Math.random().toString(36).substring(2).padEnd(6, '0');
  return `${y}${m}${d}${h}${mi}${sec}${mili}${rad}`;
};

exports.suffix = function (originalname, curName) {
  let ext = path.extname(curName);
  if (ext) {
    return curName;
  }
  ext = path.extname(originalname);
  if (!ext) {
    return curName;
  }
  return `${curName}${ext}`;
};
