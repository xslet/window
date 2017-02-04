
var expect = chai.expect;
var body = window.document.body;
var documentElement = window.document.documentElement;

body.style.width = (documentElement.clientWidth + 1000) + 'px';
body.style.height = (documentElement.clientHeight + 1000) + 'px';

describe('xslet.window', function() {

  after(function() {
    body.scrollLeft = 0;
    body.scrollTop = 0;
    documentElement.scrollLeft = 0;
    documentElement.scrollTop = 0;
  });

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

    it('Should get zero position when not scrolling', function(done) {
      var ns = {};
      defineWindow(ns, window);

      expect(!!body.scrollLeft).to.be.false;
      expect(!!body.scrollTop).to.be.false;
      expect(!!documentElement.scrollLeft).to.be.false;
      expect(!!documentElement.scrollTop).to.be.false;
      expect(ns.window.scrollLeft).to.equal(0);
      expect(ns.window.scrollTop).to.equal(0);
      done();
    });

    it('Should set scroll position', function(done) {
      var ns = {};
      defineWindow(ns, window);
      ns.window.unitOfSize = 'rem';
      ns.window.rootFontSize = 16;

      ns.window.scrollLeft = 3;
      ns.window.scrollTop = 12;

      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        expect(body.scrollLeft).to.equal(0);
        expect(body.scrollTop).to.equal(0);
        expect(documentElement.scrollLeft).to.equal(3 * 16);
        expect(documentElement.scrollTop).to.equal(12 * 16);
      } else {
        expect(body.scrollLeft).to.equal(3 * 16);
        expect(body.scrollTop).to.equal(12 * 16);
        expect(documentElement.scrollLeft).to.equal(0);
        expect(documentElement.scrollTop).to.equal(0);
      }

      expect(ns.window.scrollLeft).to.equal(3);
      expect(ns.window.scrollTop).to.equal(12);
      done();
    });

    it('Should get scroll position', function(done) {
      var ns = {};
      defineWindow(ns, window);
      ns.window.unitOfSize = 'rem';
      ns.window.rootFontSize = 16;

      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        documentElement.scrollLeft = 10;
        documentElement.scrollTop = 100;
      } else {
        body.scrollLeft = 10;
        body.scrollTop = 100;
      }
      expect(ns.window.scrollLeft).to.equal(10/16);
      expect(ns.window.scrollTop).to.equal(100/16);
      done();
    });

    it('Should ignore if scroll position is not set a number', function(done) {
      var ns = {};
      defineWindow(ns, window);

      ns.window.scrollLeft = 30;
      ns.window.scrollTop = 40;

      [null, true, false, '123', '', [], {}, NaN].forEach(function(v) {
        expect(ns.window.scrollLeft).to.equal(30);
        expect(ns.window.scrollTop).to.equal(40);
      });
      done();
    });
  });

  describe('.scrollWidth/.scrollHeight', function() {

    it('Should get scroll width/height', function(done) {
      var ns = {};
      defineWindow(ns, window);

      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        expect(ns.window.scrollWidth).to.equal(documentElement.scrollWidth);
        expect(ns.window.scrollHeight).to.equal(documentElement.scrollHeight);
      } else {
        expect(ns.window.scrollWidth).to.equal(body.scrollWidth);
        expect(ns.window.scrollHeight).to.equal(body.scrollHeight);
      }
      done();
    });

    it('Should get scroll width/height', function(done) {
      var ns = {};
      defineWindow(ns, window);

      ns.window.unitOfSize = 'rem';
      ns.window.rootFontSize = 16;

      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        var de = documentElement;
        expect(ns.window.scrollWidth).to.equal(de.scrollWidth / 16);
        expect(ns.window.scrollHeight).to.equal(de.scrollHeight / 16);
      } else {
        expect(ns.window.scrollWidth).to.equal(body.scrollWidth / 16);
        expect(ns.window.scrollHeight).to.equal(body.scrollHeight / 16);
      }
      done();
    });

  });

  describe('.maxScrollLeft/.maxScrollTop', function() {

    it('Should get max scroll left/top', function(done) {
      var ns = {};
      defineWindow(ns, window);

      var cw = documentElement.clientWidth,
          ch = documentElement.clientHeight;

      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        var de = documentElement;
        expect(ns.window.maxScrollLeft).to.equal(de.scrollWidth - cw);
        expect(ns.window.maxScrollTop).to.equal(de.scrollHeight - ch);
      } else {
        expect(ns.window.maxScrollLeft).to.equal(body.scrollWidth - cw);
        expect(ns.window.maxScrollTop).to.equal(body.scrollHeight - ch);
      }
      done();
    });

    it('Should get max scroll left/top', function(done) {
      var ns = {};
      defineWindow(ns, window);

      ns.window.unitOfSize = 'rem';
      ns.window.rootFontSize = 16;

      var cw = documentElement.clientWidth,
          ch = documentElement.clientHeight;

      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        var de = documentElement;
        expect(ns.window.maxScrollLeft).to.equal((de.scrollWidth - cw) / 16);
        expect(ns.window.maxScrollTop).to.equal((de.scrollHeight - ch) / 16);
      } else {
        expect(ns.window.maxScrollLeft).to.equal((body.scrollWidth - cw) / 16);
        expect(ns.window.maxScrollTop).to.equal((body.scrollHeight - ch) / 16);
      }
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
      ns.platform = xslet.platform;
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

