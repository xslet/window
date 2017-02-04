/*
 * Copyright (C) 2016 xslet project.
 * This software is released under the MIT license.
 */
/**
 * Defines properties for scroll position.
 *
 * @private
 * @param nsWindow {object} - The `xslet.window` namespace object.
 * @param window {Window} - The window object of DOM.
 */
function defineScrollPosition(nsWindow, window) {
  var doc = window.document;
  var documentElement = doc.documentElement;

  var scroller = doc.body;
  /* istanbul ignore if */
  if (xslet.platform.ua.FIREFOX || xslet.platform.ua.MSIE) {
    scroller = documentElement;
  }

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

  Object.defineProperty(nsWindow, 'scrollWidth', {
    enumerable: true,
    set: readonly,
    get: getScrollWidth,
  });

  Object.defineProperty(nsWindow, 'scrollHeight', {
    enumerable: true,
    set: readonly,
    get: getScrollHeight,
  });

  Object.defineProperty(nsWindow, 'maxScrollLeft', {
    enumerable: true,
    set: readonly,
    get: getMaxScrollLeft,
  });

  Object.defineProperty(nsWindow, 'maxScrollTop', {
    enumerable: true,
    set: readonly,
    get: getMaxScrollTop,
  });


  function setScrollLeft(v) {
    if (typeof v !== 'number' || isNaN(v)) {
      return;
    }
    v = nsWindow.convertUnit(v, nsWindow.unitOfSize, 'px');
    v = Math.max(0, Math.min(v, getMaxScrollLeftInPixel()));
    scroller.scrollLeft = v;
  }

  function getScrollLeft() {
    var v = scroller.scrollLeft || /* istanbul ignore next */ 0;
    v = Math.max(0, Math.min(v, getMaxScrollLeftInPixel())); /* for Safari */
    v = nsWindow.convertUnit(v, 'px', nsWindow.unitOfSize);
    return v;
  }

  function setScrollTop(v) {
    if (typeof v !== 'number' || isNaN(v)) {
      return;
    }
    v = nsWindow.convertUnit(v, nsWindow.unitOfSize, 'px');
    v = Math.max(0, Math.min(v, getMaxScrollTopInPixel()));
    scroller.scrollTop = v;
  }

  function getScrollTop() {
    var v = scroller.scrollTop || /* istanbul ignore next */ 0;
    v = Math.max(0, Math.min(v, getMaxScrollTopInPixel())); /* for Safari */
    v = nsWindow.convertUnit(v, 'px', nsWindow.unitOfSize);
    return v;
  }

  function getScrollWidth() {
    var v = scroller.scrollWidth || /* istanbul ignore next */ 0;
    return nsWindow.convertUnit(v, 'px', nsWindow.unitOfSize);
  }

  function getScrollHeight() {
    var v = scroller.scrollHeight || /* istanbul ignore next */ 0;
    return nsWindow.convertUnit(v, 'px', nsWindow.unitOfSize);
  }

  function getMaxScrollLeft() {
    var v = getMaxScrollLeftInPixel();
    return nsWindow.convertUnit(v, 'px', nsWindow.unitOfSize);
  }

  function getMaxScrollTop() {
    var v = getMaxScrollTopInPixel();
    return nsWindow.convertUnit(v, 'px', nsWindow.unitOfSize);
  }


  function getMaxScrollLeftInPixel() {
    var v = scroller.scrollWidth - documentElement.clientWidth;
    return Math.max(0, v || /* istanbul ignore next */ 0);
  }

  function getMaxScrollTopInPixel() {
    var v = scroller.scrollHeight - documentElement.clientHeight;
    return Math.max(0, v || /* istanbul ignore next */ 0);
  }
}

function readonly() {}
