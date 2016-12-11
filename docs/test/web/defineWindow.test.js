
var expect = chai.expect;
describe('xslet.window', function() {

  describe('.unitOfSize', function() {

    it('Should get unit of size', function(done) {
      var xslet = {};
      defineWindow(xslet, window);
      expect(xslet.window.unitOfSize).to.equal('px');
      expect(xslet.window.unitOfSize).to.equal('px');
      expect(xslet.window.unitOfSize).to.equal('px');
      xslet.window.unitOfSize = 'rem';
      expect(xslet.window.unitOfSize).to.equal('px');
      expect(xslet.window.unitOfSize).to.equal('px');
      expect(xslet.window.unitOfSize).to.equal('px');
      done();
    });

    it('Should be able to set unit of size only once', function(done) {
      var xslet = {};
      defineWindow(xslet, window);
      xslet.window.unitOfSize = 'rem';
      expect(xslet.window.unitOfSize).to.equal('rem');
      expect(xslet.window.unitOfSize).to.equal('rem');
      expect(xslet.window.unitOfSize).to.equal('rem');
      xslet.window.unitOfSize = 'px';
      expect(xslet.window.unitOfSize).to.equal('rem');
      expect(xslet.window.unitOfSize).to.equal('rem');
      expect(xslet.window.unitOfSize).to.equal('rem');
      done();
    });
  });

  describe('.rootFontSize', function() {

    it('Should get root font size', function(done) {
      var xslet = {};
      defineWindow(xslet, window);
      expect(xslet.window.rootFontSize).to.equal(16);
      expect(xslet.window.rootFontSize).to.equal(16);
      expect(xslet.window.rootFontSize).to.equal(16);
      done();
    });

    it('Should change root font size', function(done) {
      var xslet = {};
      defineWindow(xslet, window);
      xslet.window.rootFontSize = 13;
      expect(xslet.window.rootFontSize).to.equal(13);
      expect(xslet.window.rootFontSize).to.equal(13);
      expect(xslet.window.rootFontSize).to.equal(13);
      xslet.window.rootFontSize = '3mm';
      expect(xslet.window.rootFontSize).to.be.within(11, 12);
      expect(xslet.window.rootFontSize).to.be.within(11, 12);
      expect(xslet.window.rootFontSize).to.be.within(11, 12);
      xslet.window.rootFontSize = '10px';
      expect(xslet.window.rootFontSize).to.equal(10);
      expect(xslet.window.rootFontSize).to.equal(10);
      expect(xslet.window.rootFontSize).to.equal(10);
      done();
    });
  });

  describe('.convertUnit', function() {

    it('Should convert values by unit', function(done) {
      var xslet = {};
      defineWindow(xslet, window);
      expect(xslet.window.convertUnit(10, 'mm', 'px')).to.be.within(37, 38);
      xslet.window.rootFontSize = '12px';
      expect(xslet.window.convertUnit(2, 'rem', 'px')).to.equal(24);
      done();
    });
  });

  describe('.scrollbarWidth', function() {

    it('Should get scroll bar width', function(done) {
      var xslet = {};
      defineWindow(xslet, window);
      expect(xslet.window.scrollbarWidth).to.be.a('number');
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

      var xslet = {};
      defineWindow(xslet, window);
      xslet.window.addRelayoutListener(listener);

      xslet.window.relayout();
      xslet.window.relayout();
      xslet.window.relayout();

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

      var xslet = {};
      defineWindow(xslet, window);
      xslet.window.addRelayoutListener(listener);

      resizeWindow();
      resizeWindow();
      resizeWindow();

      setTimeout(function() {
        expect(logger).to.equal(LOG);
        done();
      }, 500);
    });
  });
});

function resizeWindow() {
  setTimeout(function() {
    if (xslet.platform.ua.MSIE) {
      var event = window.document.createEvent('UIEvents');
      event.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(event);
    } else {
      window.dispatchEvent(new window.Event('resize'));
    }
  }, 50);
}

