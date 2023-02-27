const config = require('../config');
const { ExtError, SizeLimitError } = require('./errorTypes');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
  let { ext, avatar } = req.body;
  ext = ext.toLowerCase();
  // 验证类型
  if (!config.base64.exts.includes(ext)) {
    next(new ExtError());
  }
  const { Base64 } = require('js-base64');
  const arr = Base64.toUint8Array(avatar);
  // 验证大小
  if (arr.length > config.base64.sizeLimit) {
    next(new SizeLimitError());
  }
  // 保存文件
  const { generateFilename, generateUrl } = require('./utils');
  const filename = `${generateFilename()}${ext}`;
  const fs = require('fs');
  const path = require('path');
  await fs.promises.writeFile(
    path.resolve(__dirname, '../../public/upload', filename),
    arr
  );
  res.send({
    data: generateUrl(req, filename),
  });
});

module.exports = router;
