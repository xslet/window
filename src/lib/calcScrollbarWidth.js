/*
 * Copyright (C) 2016 xslet project.
 * This software is released under the MIT license.
 */

'use strict';

/**
 * Calculates current scroll bar width.
 *
 * Scroll bar width is different by browsers, and some browsers changes it
 * by zooming.
 * This function calculates current scroll bar width dynamically.
 * The unit of this value is `'px'`.
 *
 * @private
 * @param window {Window} - The window object of DOM.
 * @return scroll bar width [px].
 */
function calcScrollbarWidth(window) {
  var divTag = window.document.createElement('div');
  divTag.style.position = 'absolute';
  divTag.style.visibility = 'hiddden';
  divTag.style.overflow = 'scroll';
  divTag.style.width = '100px';
  divTag.style.height = '100px';
  window.document.body.appendChild(divTag);

  var scrollbarWidth = (divTag.offsetWidth - divTag.clientWidth);
  divTag.parentNode.removeChild(divTag);
  return scrollbarWidth;
}

module.exports = calcScrollbarWidth;
