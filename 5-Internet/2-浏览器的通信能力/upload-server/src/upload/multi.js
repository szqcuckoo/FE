const config = require('../config');

const multer = require('multer');
const upload = multer({
  dest: config.global.uploadPath,
  limits: {
    fileSize: config.multi.sizeLimit,
  },
  fileFilter(req, file, cb) {
    const path = require('path');
    const ext = path.extname(file.originalname);
    if (config.multi.exts.includes(ext)) {
      cb(null, true);
    } else {
      const { ExtError } = require('./errorTypes');
      cb(new ExtError());
    }
  },
});
const express = require('express');
const router = express.Router();
router.post('/', async (req, res, next) => {
  upload.array(config.multi.fieldName, config.multi.countLimit)(
    req,
    res,
    async (err) => {
      if (err instanceof multer.MulterError) {
        const { SizeLimitError, CountLimitError } = require('./errorTypes');
        if (err.message === 'File too large') {
          err = new SizeLimitError();
        } else {
          err = new CountLimitError();
        }
      }
      if (err) {
        next(err);
        return;
      }

      const urls = await Promise.all(req.files.map((f) => handleFile(f, req)));
      res.send({
        data: urls,
      });
    }
  );
});

async function handleFile(file, req) {
  const { suffix, generateUrl } = require('./utils');
  const filename = suffix(file.originalname, file.filename);
  const fs = require('fs');
  await fs.promises.rename(file.path, `${file.destination}/${filename}`);
  const url = generateUrl(req, filename);
  return url;
}

module.exports = router;
