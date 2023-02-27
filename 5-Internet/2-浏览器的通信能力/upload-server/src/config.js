const path = require('path');

exports.global = {
  port: 9527,
  publicPath: path.resolve(__dirname, '../public'),
  uploadPath: path.resolve(__dirname, '../public/upload'),
};

exports.single = {
  sizeLimit: 1 * 1024 * 1024,
  exts: ['.jpg', '.jpeg', '.bmp', '.webp', '.gif', '.png'],
  fieldName: 'avatar',
};
exports.base64 = {
  sizeLimit: 1 * 1024 * 1024,
  exts: ['.jpg', '.jpeg', '.bmp', '.webp', '.gif', '.png'],
};
exports.binary = {
  sizeLimit: 1 * 1024 * 1024,
  exts: ['.jpg', '.jpeg', '.bmp', '.webp', '.gif', '.png'],
};
exports.multi = {
  fieldName: 'photos',
  sizeLimit: 1 * 1024 * 1024,
  countLimit: 10,
  exts: ['.jpg', '.jpeg', '.bmp', '.webp', '.gif', '.png'],
};
