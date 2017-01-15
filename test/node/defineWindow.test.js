'use strict';

var jsdom = require('jsdom').jsdom('');
var window = require('./helper/jsdom-helper')(jsdom);
var defineWindow = require('../../src/defineWindow');
var definePlatform = require('@xslet/platform');
var chai = require('chai');
var expect = chai.expect;

describe('xslet.window', function() {

  describe('.unitOfSize', function() {

    it('Should get unit of size', function(done) {
      var ns = {};
      defineWindow(ns, window);
      expect(ns.window.unitOfSize).to.equal('px');
      expect(ns.window.unitOfSize).to.equal('px');
      expect(ns.window.unitOfSize).to.equal('px');
      ns.window.unitOfSize = 'rem';
      expect(ns.window.unitOfSize).to.equal('px');
      expect(ns.window.unitOfSize).to.equal('px');
      expect(ns.window.unitOfSize).to.equal('px');
      done();
    });

    it('Should be able to set unit of size only once', function(done) {
      var ns = {};
      defineWindow(ns, window);
      ns.window.unitOfSize = 'rem';
      expect(ns.window.unitOfSize).to.equal('rem');
      expect(ns.window.unitOfSize).to.equal('rem');
      expect(ns.window.unitOfSize).to.equal('rem');
      ns.window.unitOfSize = 'px';
      expect(ns.window.unitOfSize).to.equal('rem');
      expect(ns.window.unitOfSize).to.equal('rem');
      expect(ns.window.unitOfSize).to.equal('rem');
      done();
    });
  });

  describe('.rootFontSize', function() {

    it('Should get root font size', function(done) {
      var ns = {};
      defineWindow(ns, window);
      expect(ns.window.rootFontSize).to.equal(16);
      expect(ns.window.rootFontSize).to.equal(16);
      expect(ns.window.rootFontSize).to.equal(16);
      done();
    });

    it('Should change root font size', function(done) {
      var ns = {};
      defineWindow(ns, window);
      ns.window.rootFontSize = 13;
      expect(ns.window.rootFontSize).to.equal(13);
      expect(ns.window.rootFontSize).to.equal(13);
      expect(ns.window.rootFontSize).to.equal(13);
      ns.window.rootFontSize = '3mm';
      expect(ns.window.rootFontSize).to.be.within(11, 12);
      expect(ns.window.rootFontSize).to.be.within(11, 12);
      expect(ns.window.rootFontSize).to.be.within(11, 12);
      ns.window.rootFontSize = '10px';
      expect(ns.window.rootFontSize).to.equal(10);
      expect(ns.window.rootFontSize).to.equal(10);
      expect(ns.window.rootFontSize).to.equal(10);
      done();
    });
  });

  describe('.convertUnit', function() {

    it('Should convert values by unit', function(done) {
      var ns = {};
      defineWindow(ns, window);
      expect(ns.window.convertUnit(10, 'mm', 'px')).to.be.within(37, 38);
      ns.window.rootFontSize = '12px';
      expect(ns.window.convertUnit(2, 'rem', 'px')).to.equal(24);
      done();
    });
  });

  describe('.scrollbarWidth', function() {

    it('Should get scroll bar width', function(done) {
      var ns = {};
      defineWindow(ns, window);
      expect(ns.window.scrollbarWidth).to.be.a('number');
      done();
    });
  });

  describe('.scrollLeft/.scrollTop', function() {
    var ns = {};
    before(function() {
      definePlatform(ns, window);
      defineWindow(ns, window);
      ns.window.unitOfSize = 'rem';
      ns.window.rootFontSize = 16;
    });

    it('Should get zero position when not scrolling', function(done) {
      expect(!!window.document.body.scrollLeft).to.be.false;
      expect(!!window.document.body.scrollTop).to.be.false;
      expect(!!window.document.documentElement.scrollLeft).to.be.false;
      expect(!!window.document.documentElement.scrollTop).to.be.false;
      expect(ns.window.scrollLeft).to.equal(0);
      expect(ns.window.scrollTop).to.equal(0);
      done();
    });

    it('Should set scroll position', function(done) {
      ns.window.scrollLeft = 3;
      ns.window.scrollTop = 12;
      expect(window.document.body.scrollLeft).to.equal(3 * 16);
      expect(window.document.body.scrollTop).to.equal(12 * 16);
      expect(window.document.documentElement.scrollLeft).to.equal(3 * 16);
      expect(window.document.documentElement.scrollTop).to.equal(12 * 16);
      expect(ns.window.scrollLeft).to.equal(3);
      expect(ns.window.scrollTop).to.equal(12);
      done();
    });

    it('Should get scroll position', function(done) {
      if (ns.platform.ua.MSIE || ns.platform.ua.FIREFOX) {
        window.document.documentElement.scrollLeft = 10;
        window.document.documentElement.scrollTop = 100;
      } else {
        window.document.body.scrollLeft = 10;
        window.document.body.scrollTop = 100;
      }
      expect(ns.window.scrollLeft).to.equal(10/16);
      expect(ns.window.scrollTop).to.equal(100/16);
      done();
    });

    it('Should throw error if scroll position is not set a number',
    function(done) {
      [null, undefined, true, false, '123', '', [], {}].forEach(function(v) {
        expect(function() {
          ns.window.scrollLeft = v;
        }).throws(TypeError);

        expect(function() {
          ns.window.scrollTop = v;
        }).throws(TypeError);
      });
      done();
    });
  });

  describe('.relayout', function() {

    it('Should execute relayout listeners manually', function(done) {
      var logger = '';
      var LOG = 'RE-LAYOUT\n';
      var listener = function() {
        logger += LOG;
      };

      var ns = {};
      defineWindow(ns, window);
      ns.window.addRelayoutListener(listener);

      ns.window.relayout();
      ns.window.relayout();
      ns.window.relayout();

      setTimeout(function() {
        expect(logger).to.equal(LOG + LOG + LOG);
        done();
      }, 500);
    });

    it('Should execute relayout listeners by window resizing', function(done) {
      var logger = '';
      var LOG = 'RE-LAYOUT\n';
      var listener = function() {
        logger += LOG;
      };

      var ns = {};
      definePlatform(ns, window);
      defineWindow(ns, window);
      ns.window.addRelayoutListener(listener);

      resizeWindow(ns);
      resizeWindow(ns);
      resizeWindow(ns);

      setTimeout(function() {
        expect(logger).to.equal(LOG);
        done();
      }, 500);
    });
  });
});

function resizeWindow(ns) {
  setTimeout(function() {
    if (ns.platform.ua.MSIE) {
      var event = window.document.createEvent('UIEvents');
      event.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(event);
    } else {
      window.dispatchEvent(new window.Event('resize'));
    }
  }, 50);
}

