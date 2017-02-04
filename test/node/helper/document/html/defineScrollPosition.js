'use strict';

var platform = require('platform');

function defineScrollPosition(window) {
  var documentElement = window.document.documentElement;
  var body = window.document.body;

  Object.defineProperty(documentElement, 'offsetWidth', {
    enumerable: true,
    get: function() {
      return window.innerWidth;
    },
    set: readonly,
  });
  Object.defineProperty(documentElement, 'offsetHeight', {
    enumerable: true,
    get: function() {
      return window.innerHeight;
    },
    set: readonly,
  });
  Object.defineProperty(documentElement, 'clientWidth', {
    enumerable: true,
    get: function() {
      return window.innerWidth;
    },
    set: readonly,
  });
  Object.defineProperty(documentElement, 'clientHeight', {
    enumerable: true,
    get: function() {
      return window.innerHeight;
    },
    set: readonly,
  });
  Object.defineProperty(documentElement, 'scrollWidth', {
    enumerable: true,
    get: function() {
      if (body.style.offsetWidth) {
        var v = body.style.width;
        v = Number(v.slice(0, -'px'.length));
        return v;
      }
      return undefined;
    },
    set: readonly,
  });
  Object.defineProperty(documentElement, 'scrollHeight', {
    enumerable: true,
    get: function() {
      if (body.style.offsetHeight) {
        var v = body.style.height;
        v = Number(v.slice(0, -'px'.length));
        return v;
      }
      return undefined;
    },
    set: readonly,
  });

  if (platform.name === 'IE' || platform.name === 'Firefox') {
    var scrollLeft = 0,
        scrollTop = 0;

    Object.defineProperty(documentElement, 'scrollLeft', {
      enumerable: true,
      get: function() {
        return scrollLeft;
      },
      set: function(v) {
        scrollLeft = v;
      },
    });

    Object.defineProperty(documentElement, 'scrollTop', {
      enumerable: true,
      get: function() {
        return scrollTop;
      },
      set: function(v) {
        scrollTop = v;
      },
    });

    return;
  }

  Object.defineProperty(documentElement, 'scrollLeft', {
    enumerable: true,
    get: function() {
      return 0;
    },
    set: function() {},
  });

  Object.defineProperty(documentElement, 'scrollTop', {
    enumerable: true,
    get: function() {
      return 0;
    },
    set: function() {},
  });
};

function readonly() {}

module.exports = defineScrollPosition;
