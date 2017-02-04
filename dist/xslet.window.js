/*!
 * Copyright (C) 2016 xslet project.
 * This software is released under the MIT license.
 */

/**
 * Is the top namespace of all xslet modules.
 *
 * @namespace xslet
 * @global
 */
;xslet = (typeof xslet === 'undefined') ? {} : xslet;

(function(){
  'use strict';
  defineWindow(xslet, window);


/**
 * Defines a unit of a whole of HTML page as a property of `xslet.window`
 * namespace.
 *
 * @param nsWindow {object} - `xslet.window` namespace object.
 */
function defineUnitOfSize(nsWindow) {
  var unitOfSize;

  function getUnitOfSize() {
    return unitOfSize || (unitOfSize = 'px');
  }

  function setUnitOfSize(unit) {
    if (unit !== 'px' && unit !== 'mm' && unit !== 'rem') {
      throw new Error('The unit must be either "px", "mm" or "rem" : ' + unit);
    }

    if (!unitOfSize) {
      unitOfSize = unit;
    }
  }

  Object.defineProperty(nsWindow, 'unitOfSize', {
    enumerable: true,
    get: getUnitOfSize,
    set: setUnitOfSize,
  });
}


/**
 * Defines the root font size as a property of `xslet.window` namespace.
 *
 * @private
 * @param nsWindow {object} - `xslet.window` namespace object.
 * @param window {Window} - A window object of DOM.
 */
function defineRootFontSize(nsWindow, window) {
  var htmlTag = window.document.getElementsByTagName('html')[0];
  var computedHtmlStyle = window.getComputedStyle(htmlTag);

  function getRootFontSize() {
    return parseInt(computedHtmlStyle.fontSize.slice(0, -2));
  }

  function setRootFontSize(fontSize) {
    if (typeof fontSize === 'number') {
      if (fontSize <= 0) {
        throw new Error('The font size must be a positive number : ' +
          fontSize);
      }
      fontSize = fontSize + 'px';

    } else if (typeof fontSize === 'string') {
      var unit = fontSize.replace(/^[0-9]+/, '');
      if (unit !== 'px' && unit !== 'mm') {
        throw new Error('The unit of root font size must be either ' +
          '"px" or "mm" : ' + fontSize);
      }

      var num = parseInt(fontSize.slice(0, -unit.length));
      if (!num) {
        throw new Error('The font size must be a positive number : ' +
          fontSize);
      }

    } else {
      throw new Error('The font size must be a number : ' + fontSize);
    }

    htmlTag.style.fontSize = fontSize;
  }

  Object.defineProperty(nsWindow, 'rootFontSize', {
    enumerable: true,
    get: getRootFontSize,
    set: setRootFontSize,
  });
}


/**
 * Gets pixel count per millimeter.
 *
 * @private
 * @param window {Window} - A window object of DOM.
 * @return {number} - Pixel count per millimeter.
 */
function getPxPerMm(window) {
  var divTag = window.document.createElement('div');
  divTag.style.fontSize = '100mm';
  divTag.style.position = 'absolute';
  divTag.style.visibility = 'hidden';
  window.document.body.appendChild(divTag);

  var computedStyle = window.getComputedStyle(divTag);
  var fontSizePx = computedStyle.fontSize;
  divTag.parentNode.removeChild(divTag);
  return Number(fontSizePx.slice(0, -'px'.length)) / 100;
}

/**
 * Defines a function to convert a size value in a unit to new value in
 * another unit.
 * The units supported by this function are `'px'`, `'mm'` and `'rem'`.
 *
 * @private
 * @param nsWindow {object} - The `xslet.window` namespace object.
 * @param window {Window} - The window object of DOM.
 */
function defineConvertUnit(nsWindow, window) {
  var pxPerMm;

  function convertUnit(value, fromUnit, toUnit) {
    pxPerMm = pxPerMm || getPxPerMm(window);
    var pxPerRem = nsWindow.rootFontSize;

    if (fromUnit === toUnit) {
      return value;

    } else if (fromUnit === 'px') {
      if (toUnit === 'mm') {
        return value / pxPerMm;
      }

      if (toUnit === 'rem') {
        return value / pxPerRem;
      }

    } else if (fromUnit === 'mm') {
      if (toUnit === 'px') {
        return value * pxPerMm;
      }

      if (toUnit === 'rem') {
        return (value * pxPerMm) / pxPerRem;
      }

    } else if (fromUnit === 'rem') {
      if (toUnit === 'px') {
        return value * pxPerRem;
      }

      if (toUnit === 'mm') {
        return (value * pxPerRem) / pxPerMm;
      }
    }

    throw new Error('Illegal units : "' + fromUnit + '" -> "' + toUnit + '"');
  }

  Object.defineProperty(nsWindow, 'convertUnit', {
    enumerable: true,
    value: convertUnit,
  });
}


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


/**
 * Defines some properties and methods for re-layouting window contents.
 *
 * @private
 * @param nsWindow {object} - The `xslet.window` namespace object.
 * @param window {Window} - The window object of DOM.
 */
function defineRelayout(nsWindow, window) {
  var scrollbarWidth = calcScrollbarWidth(window);

  var relayoutListeners = [];
  var delayMillis = 100;
  var delayCounter = 0;

  function addRelayoutListener(listener) {
    if (typeof listener !== 'function') {
      return;
    }
    if (relayoutListeners.indexOf(listener) < 0) {
      relayoutListeners.push(listener);
    }
  }

  function removeRelayoutListener(listener) {
    for (var i = relayoutListeners.length - 1; i >= 0; i--) {
      if (relayoutListeners[i] === listener) {
        relayoutListeners.splice(i, 1);
      }
    }
  }

  function relayoutImmediately() {
    delayCounter = 0;
    scrollbarWidth = calcScrollbarWidth(window);

    var event = {
      width: convertUnit(window.innerWidth, nsWindow),
      height: convertUnit(window.innerHeight, nsWindow),
    };

    for (var i = 0, n = relayoutListeners.length; i < n; i++) {
      relayoutListeners[i](event);
    }
  }

  function delayRelayouting() {
    delayCounter--;
    if (delayCounter === 0) {
      relayoutImmediately();
    } else if (delayCounter < 0) {
      delayCounter = 0;
    }
  }

  function relayout() {
    delayCounter = 0;
    window.setTimeout(relayoutImmediately, 50);
  }

  function relayoutLater() {
    delayCounter++;
    window.setTimeout(delayRelayouting, delayMillis);
  }

  Object.defineProperty(nsWindow, 'scrollbarWidth', {
    enumerable: true,
    get: function() {
      return convertUnit(scrollbarWidth, nsWindow);
    },
    set: function() {},
  });

  Object.defineProperty(nsWindow, 'addRelayoutListener', {
    enumerable: true,
    value: addRelayoutListener,
  });

  Object.defineProperty(nsWindow, 'removeRelayoutListener', {
    enumerable: true,
    value: removeRelayoutListener,
  });

  Object.defineProperty(nsWindow, 'relayoutDelay', {
    enumerable: true,
    value: delayMillis,
  });

  Object.defineProperty(nsWindow, 'relayout', {
    enumerable: true,
    value: relayout,
  });

  window.addEventListener('resize', relayoutLater);
}

function convertUnit(value, nsWindow) {
  return nsWindow.convertUnit(value, 'px', nsWindow.unitOfSize);
}


/**
 * Defines `xslet.window` namespace.
 *
 * @private
 * @param xslet {object} - `xslet` namespace object.
 * @param window {Window} - A window object of DOM.
 */
function defineWindow(xslet, window) {
  Object.defineProperty(xslet, 'window', {
    enumerable: true,
    value: {},
  });

  defineUnitOfSize(xslet.window);
  defineRootFontSize(xslet.window, window);
  defineConvertUnit(xslet.window, window);
  defineScrollPosition(xslet.window, window);
  defineRelayout(xslet.window, window);

  /**
   * Is the namespace for window informations and operations.
   *
   * @namespace xslet.window
   * @prop unitOfSize {string} - The unit of size used in a whole of HTML page.
   * @prop rootFontSize {number} - The root font size.
   *   This value is a number, and can be specified as a number or a string
   *   of which format is `value + unit`.
   *   The unit allowed is either `'px'`, `'mm'` or `'rem'`.
   * @prop scrollbarWidth {number} - The scroll bar width.
   *   The unit of this value is same with `unitOfSize` property.
   *   This value can be updated by re-layouting a page, because some browsers
   *   change its scroll bar width by zooming.
   *   (read only)
   * @prop scrollLeft {number} - The horizontal scroll position of window.
   *   The unit of this value is same with `unitOfSize` property.
   * @prop scrollTop {number} - The vertical scroll position of window.
   *   The unit of this value is same with `unitOfSize` property.
   * @prop maxScrollLeft {number} - The maximum horizontal scroll position of
   *   window.
   *   The unit of this value is same with `unitOfSize` property.
   *   (read only)
   * @prop maxScrollTop {number} - The maximum vertical scroll position of
   *   window.
   *   The unit of this value is same with `unitOfSize` property.
   *   (read only)
   * @prop scrollWidth {number} - The width of scrollable area of window.
   *   The unit of this value is same with `unitOfSize` property.
   *   (read only)
   * @prop scrollHeight {number} - The height of scrollable area of window.
   *   The unit of this value is same with `unitOfSize` property.
   *   (read only)
   * @prop relayoutDelay {number} - The delay time to re-layout a page against
   *   resize events. The unit of this value is millisecond.
   */

  /**
   * Converts `value` in `fromUnit` to new value in `toUnit`.
   * The units allowed are either `'px'`, `'mm'` and `'rem'`.
   *
   * @method xslet.window.convertUnit
   * @param value {number} - A value to be converted.
   * @param fromUnit {string} - The unit of `value`.
   * @param toUnit {string} - The unit of value after converted.
   * @return {number} The value after converted.
   */

  /**
   * Re-layout a page.
   * This method forcely executes re-layout listeners registered by
   * `addRelayoutListener` method.
   *
   * @method xslet.window.relayout
   */

  /**
   * Adds a re-layout listener which is to be called when a browser is resized
   * or `xslet.window.relayout` method is executed.
   *
   * @method xslet.window.addRelayoutListener
   * @param listener {function} - A listener function.
   */

  /**
   * Removes a registered re-layout listener.
   *
   * @method xslet.window.removeRelayoutListener
   * @param listener {function} - A listener function.
   */
}

}());
