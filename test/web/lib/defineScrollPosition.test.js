
var expect = chai.expect;
describe('defineScrollPosition', function() {

  var body = window.document.body,
      documentElement = window.document.documentElement;

  before(function() {
    body.style.width = (documentElement.clientWidth + 1000) + 'px';
    body.style.height = (documentElement.clientHeight + 1000) + 'px';
  });

  after(function() {
    body.scrollLeft = 0;
    body.scrollTop = 0;
    documentElement.scrollLeft = 0;
    documentElement.scrollTop = 0;
  });

  var ns;

  beforeEach(function() {
    ns = {};
    defineUnitOfSize(ns, window);
    defineRootFontSize(ns, window);
    defineConvertUnit(ns, window);
    defineScrollPosition(ns, window);
  });


  describe('scrollWidth/scrollHeight', function() {

    it('Should get window scroll width/height', function(done) {
      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        expect(ns.scrollWidth).to.equal(documentElement.scrollWidth);
        expect(ns.scrollHeight).to.equal(documentElement.scrollHeight);
      } else {
        expect(ns.scrollWidth).to.equal(body.scrollWidth);
        expect(ns.scrollHeight).to.equal(body.scrollHeight);
      }
      done();
    });

    it('Should convert with xslet.window.unitOfSize', function(done) {
      ns.unitOfSize = 'rem';
      ns.rootFontSize = 13;
      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        expect(ns.scrollWidth).to.equal(documentElement.scrollWidth / 13);
        expect(ns.scrollHeight).to.equal(documentElement.scrollHeight / 13);
      } else {
        expect(ns.scrollWidth).to.equal(body.scrollWidth / 13);
        expect(ns.scrollHeight).to.equal(body.scrollHeight / 13);
      }
      done();
    });

    it('Should ignore if scroll width/height are set', function(done) {
      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        ns.scrollWidth = documentElement.scrollWidth + 100;
        ns.scrollHeight = documentElement.scrolllHeight + 100;
        expect(ns.scrollWidth).to.equal(documentElement.scrollWidth);
        expect(ns.scrollHeight).to.equal(documentElement.scrollHeight);
      } else {
        ns.scrollWidth = body.scrollWidth + 100;
        ns.scrollHeight = body.scrolllHeight + 100;
        expect(ns.scrollWidth).to.equal(body.scrollWidth);
        expect(ns.scrollHeight).to.equal(body.scrollHeight);
      }
      done();
    });

  });

  describe('maxScrollLeft/maxScrollTop', function() {

    it('Should get max scroll left/top of window', function(done) {
      var sw,
          sh,
          cw = documentElement.clientWidth,
          ch = documentElement.clientHeight;

      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        sw = documentElement.scrollWidth;
        sh = documentElement.scrollHeight;
      } else {
        sw = body.scrollWidth;
        sh = body.scrollHeight;
      }
      expect(ns.maxScrollLeft).to.equal(sw - cw);
      expect(ns.maxScrollTop).to.equal(sh - ch);
      done();
    });

    it('Should convert with xslet.window.unitOfSize', function(done) {
      ns.unitOfSize = 'rem';
      ns.rootFontSize = 13;

      var sw,
          sh,
          cw = documentElement.clientWidth,
          ch = documentElement.clientHeight;

      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        sw = documentElement.scrollWidth;
        sh = documentElement.scrollHeight;
      } else {
        sw = body.scrollWidth;
        sh = body.scrollHeight;
      }
      expect(ns.maxScrollLeft).to.equal((sw - cw) / 13);
      expect(ns.maxScrollTop).to.equal((sh - ch) / 13);
      done();
    });

    it('Should ignore if max scroll left/top are set', function(done) {
      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        ns.maxScrollLeft = documentElement.scrollWidth + 100;
        ns.maxScrollTop = documentElement.scrolllHeight + 100;
        expect(ns.scrollWidth).to.equal(documentElement.scrollWidth);
        expect(ns.scrollHeight).to.equal(documentElement.scrollHeight);
      } else {
        ns.maxScrollLeft = body.scrollWidth + 100;
        ns.maxScrollTop = body.scrolllHeight + 100;
        expect(ns.scrollWidth).to.equal(body.scrollWidth);
        expect(ns.scrollHeight).to.equal(body.scrollHeight);
      }
      done();
    });
  });

  describe('scrollLeft/scrollTop', function() {

    it('Should get zero position when not scrolling', function(done) {
      expect(!!body.scrollLeft).to.be.false;
      expect(!!body.scrollTop).to.be.false;
      expect(!!documentElement.scrollLeft).to.be.false;
      expect(!!documentElement.scrollTop).to.be.false;

      expect(ns.scrollLeft).to.equal(0);
      expect(ns.scrollTop).to.equal(0);
      done();
    });

    it('Should be able to set scroll position', function(done) {
      ns.scrollLeft = 10;
      ns.scrollTop = 20;

      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        expect(body.scrollLeft).to.equal(0);
        expect(body.scrollTop).to.equal(0);
        expect(documentElement.scrollLeft).to.equal(10);
        expect(documentElement.scrollTop).to.equal(20);
      } else {
        expect(body.scrollLeft).to.equal(10);
        expect(body.scrollTop).to.equal(20);
        expect(documentElement.scrollLeft).to.equal(0);
        expect(documentElement.scrollTop).to.equal(0);
      }

      expect(ns.scrollLeft).to.equal(10);
      expect(ns.scrollTop).to.equal(20);
      done();
    });

    it('Should get scroll position when scrolled', function(done) {
      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        documentElement.scrollLeft = 30;
        documentElement.scrollTop = 40;
      } else {
        body.scrollLeft = 30;
        body.scrollTop = 40;
      }

      expect(ns.scrollLeft).to.equal(30);
      expect(ns.scrollTop).to.equal(40);
      done();
    });

    it('Should be able to convert unit of scroll position', function(done) {
      ns.unitOfSize = 'rem';
      ns.rootFontSize = 13;

      ns.scrollLeft = 10;
      ns.scrollTop = 20;

      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        expect(documentElement.scrollLeft).to.equal(130);
        expect(documentElement.scrollTop).to.equal(260);
        expect(body.scrollLeft).to.equal(0);
        expect(body.scrollTop).to.equal(0);
      } else {
        expect(body.scrollLeft).to.equal(130);
        expect(body.scrollTop).to.equal(260);
        expect(documentElement.scrollLeft).to.equal(0);
        expect(documentElement.scrollTop).to.equal(0);
      }

      expect(ns.scrollLeft).to.equal(10);
      expect(ns.scrollTop).to.equal(20);
      done();
    });

    it('Should not set scroll position when the specified value is invalid',
    function(done) {
      ns.scrollLeft = 10;
      ns.scrollTop = 20;
      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        expect(documentElement.scrollLeft).to.equal(10);
        expect(documentElement.scrollTop).to.equal(20);
        expect(body.scrollLeft).to.equal(0);
        expect(body.scrollTop).to.equal(0);
      } else {
        expect(body.scrollLeft).to.equal(10);
        expect(body.scrollTop).to.equal(20);
        expect(documentElement.scrollLeft).to.equal(0);
        expect(documentElement.scrollTop).to.equal(0);
      }
      expect(ns.scrollLeft).to.equal(10);
      expect(ns.scrollTop).to.equal(20);

      ns.scrollLeft = null;
      ns.scrollTop = undefined;
      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        expect(documentElement.scrollLeft).to.equal(10);
        expect(documentElement.scrollTop).to.equal(20);
        expect(body.scrollLeft).to.equal(0);
        expect(body.scrollTop).to.equal(0);
      } else {
        expect(body.scrollLeft).to.equal(10);
        expect(body.scrollTop).to.equal(20);
        expect(documentElement.scrollLeft).to.equal(0);
        expect(documentElement.scrollTop).to.equal(0);
      }
      expect(ns.scrollLeft).to.equal(10);
      expect(ns.scrollTop).to.equal(20);

      ns.scrollLeft = NaN;
      ns.scrollTop = NaN;
      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        expect(documentElement.scrollLeft).to.equal(10);
        expect(documentElement.scrollTop).to.equal(20);
        expect(body.scrollLeft).to.equal(0);
        expect(body.scrollTop).to.equal(0);
      } else {
        expect(body.scrollLeft).to.equal(10);
        expect(body.scrollTop).to.equal(20);
        expect(documentElement.scrollLeft).to.equal(0);
        expect(documentElement.scrollTop).to.equal(0);
      }
      expect(ns.scrollLeft).to.equal(10);
      expect(ns.scrollTop).to.equal(20);

      ns.scrollLeft = '';
      ns.scrollTop = 'a';
      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        expect(documentElement.scrollLeft).to.equal(10);
        expect(documentElement.scrollTop).to.equal(20);
        expect(body.scrollLeft).to.equal(0);
        expect(body.scrollTop).to.equal(0);
      } else {
        expect(body.scrollLeft).to.equal(10);
        expect(body.scrollTop).to.equal(20);
        expect(documentElement.scrollLeft).to.equal(0);
        expect(documentElement.scrollTop).to.equal(0);
      }
      expect(ns.scrollLeft).to.equal(10);
      expect(ns.scrollTop).to.equal(20);
      done();
    });

    it('Should limit when the specified value is out of range',
    function(done) {
      ns.scrollLeft = -1;
      ns.scrollTop = -10;
      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        expect(documentElement.scrollLeft).to.equal(0);
        expect(documentElement.scrollTop).to.equal(0);
        expect(body.scrollLeft).to.equal(0);
        expect(body.scrollTop).to.equal(0);
      } else {
        expect(body.scrollLeft).to.equal(0);
        expect(body.scrollTop).to.equal(0);
        expect(documentElement.scrollLeft).to.equal(0);
        expect(documentElement.scrollTop).to.equal(0);
      }
      expect(ns.scrollLeft).to.equal(0);
      expect(ns.scrollTop).to.equal(0);

      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        ns.scrollLeft = documentElement.scrollWidth;
        ns.scrollTop = documentElement.scrollHeight;
        expect(documentElement.scrollLeft).to.equal(ns.maxScrollLeft);
        expect(documentElement.scrollTop).to.equal(ns.maxScrollTop);
      } else {
        ns.scrollLeft = body.scrollWidth;
        ns.scrollTop = body.scrollHeight;
        expect(body.scrollLeft).to.equal(ns.maxScrollLeft);
        expect(body.scrollTop).to.equal(ns.maxScrollTop);
      }
      expect(ns.scrollLeft).to.equal(ns.maxScrollLeft);
      expect(ns.scrollTop).to.equal(ns.maxScrollTop);
      done();
    });

    it('Should limit when the specified value is out of range in specified ' +
    'unit', function(done) {
      ns.unitOfSize = 'rem';
      ns.rootFontSize = 13;

      ns.scrollLeft = -1;
      ns.scrollTop = -10;
      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        expect(documentElement.scrollLeft).to.equal(0);
        expect(documentElement.scrollTop).to.equal(0);
        expect(body.scrollLeft).to.equal(0);
        expect(body.scrollTop).to.equal(0);
      } else {
        expect(body.scrollLeft).to.equal(0);
        expect(body.scrollTop).to.equal(0);
        expect(documentElement.scrollLeft).to.equal(0);
        expect(documentElement.scrollTop).to.equal(0);
      }
      expect(ns.scrollLeft).to.equal(0);
      expect(ns.scrollTop).to.equal(0);

      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        ns.scrollLeft = documentElement.scrollWidth / 13;
        ns.scrollTop = documentElement.scrollHeight / 13;
        expect(ns.maxScrollLeft).to.equal(documentElement.scrollLeft /13);
        expect(ns.maxScrollTop).to.equal(documentElement.scrollTop /13);
      } else {
        ns.scrollLeft = body.scrollWidth;
        ns.scrollTop = body.scrollHeight;
        expect(ns.maxScrollLeft).to.equal(body.scrollLeft /13);
        expect(ns.maxScrollTop).to.equal(body.scrollTop /13);
      }
      expect(ns.scrollLeft).to.equal(ns.maxScrollLeft);
      expect(ns.scrollTop).to.equal(ns.maxScrollTop);
      done();
    });
  });
});

