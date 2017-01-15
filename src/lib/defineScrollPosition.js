/*
 * Copyright (C) 2016 xslet project.
 * This software is released under the MIT license.
 */

'use strict';

/**
 * Defines properties for scroll position.
 *
 * @private
 * @param nsWindow {object} - The `xslet.window` namespace object.
 * @param window {Window} - The window object of DOM.
 */
function defineScrollPosition(nsWindow, window) {
  var doc = window.document;

  Object.defineProperty(nsWindow, 'scrollLeft', {
    enumerable: true,
    set: setScrollLeft,
    get: getScrollLeft,
  });

  Object.defineProperty(nsWindow, 'scrollTop', {
    enumerable: true,
    set: setScrollTop,
    get: getScrollTop,
  });

  function setScrollLeft(v) {
    if (typeof v !== 'number') {
      throw new TypeError('xslet.window.scrollLeft must be a number');
    }
    v = nsWindow.convertUnit(v, nsWindow.unitOfSize, 'px');
    doc.body.scrollLeft = v;
    doc.documentElement.scrollLeft = v;
  }

  function getScrollLeft() {
    var v = doc.body.scrollLeft || doc.documentElement.scrollLeft || 0;
    return nsWindow.convertUnit(v, 'px', nsWindow.unitOfSize);
  }

  function setScrollTop(v) {
    if (typeof v !== 'number') {
      throw new TypeError('xslet.window.scrollTop must be a number');
    }
    v = nsWindow.convertUnit(v, nsWindow.unitOfSize, 'px');
    doc.body.scrollTop = v;
    doc.documentElement.scrollTop = v;
  }

  function getScrollTop() {
    var v = doc.body.scrollTop || doc.documentElement.scrollTop || 0;
    return nsWindow.convertUnit(v, 'px', nsWindow.unitOfSize);
  }
}

module.exports = defineScrollPosition;
