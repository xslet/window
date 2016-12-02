/*
 * Copyright (C) 2016 xslet project.
 * This software is released under the MIT license.
 */
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
