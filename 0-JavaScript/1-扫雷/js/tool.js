// 工具函数

/**
 * 获取 DOM 元素
 * @param {string} selector 
 * @returns HTMLdom
 */

function $(selector) {
  return document.querySelector(selector)
}

function $$(selector) {
  return document.querySelectorAll(selector)
}
