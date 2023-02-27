const config = require('../config');
const { ExtError, SizeLimitError } = require('./errorTypes');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
  // 验证后缀
  let ext = req.get('x-ext');
  ext = ext && ext.toLowerCase();
  if (!config.binary.exts.includes(ext)) {
    next(new ExtError());
    return;
  }
  // 验证大小
  const len = +req.get('content-length');
  if (len > config.binary.sizeLimit) {
    next(new SizeLimitError());
    return;
  }
  // 保存文件
  const fs = require('fs');
  const path = require('path');
  const { generateFilename, generateUrl } = require('./utils');
  const filename = `${generateFilename()}${ext}`;
  const filepath = path.resolve(__dirname, '../../public/upload', filename);
  const stream = fs.createWriteStream(filepath);
  req.pipe(stream);
  stream.on('finish', () => {
    res
      .send({
        data: generateUrl(req, filename),
      })
      .end();
  });
});

module.exports = router;
