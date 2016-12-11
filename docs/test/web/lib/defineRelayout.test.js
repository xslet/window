
var expect = chai.expect;
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

describe('relayout event listener and relayout function', function() {

  it('Should execute listeners on window resizing', function(done) {
    this.timeout(0);

    var counterOfResizing = 0,
        counterOfRelayout = 0;

    var obj = {},
        events = []; 

    defineUnitOfSize(obj, window);
    defineConvertUnit(obj, window);
    defineRelayout(obj, window);
    obj.addRelayoutListener(function(event) {
      events.push(event);
      counterOfRelayout ++;
    });

    window.addEventListener('resize', function(event) {
      counterOfResizing ++;
    });

    setTimeout(resizeWindow, 100);
    setTimeout(resizeWindow, 110);
    setTimeout(resizeWindow, 120);
    setTimeout(resizeWindow, 130);
    setTimeout(resizeWindow, 140);

    setTimeout(resizeWindow, 1000);
    setTimeout(resizeWindow, 1010);
    setTimeout(resizeWindow, 1020);
    setTimeout(resizeWindow, 1030);
    setTimeout(resizeWindow, 1040);
    setTimeout(resizeWindow, 1050);
    setTimeout(resizeWindow, 1060);
    setTimeout(resizeWindow, 1070);
    setTimeout(resizeWindow, 1080);
    setTimeout(resizeWindow, 1090);

    setTimeout(function() {
      expect(counterOfResizing).to.equal(15);
      expect(counterOfRelayout).to.equal(2);
      events.forEach(function(ev) {
        expect(ev.width ).to.be.a('number');
        expect(ev.height).to.be.a('number');
      });
      done();
    }, 2000);
  });

  it('Should execute relayout', function(done) {
    this.timeout(0);

    var counterOfRelayout = 0;

    var obj = {};
    defineUnitOfSize(obj, window);
    defineConvertUnit(obj, window);
    defineRelayout(obj, window);
    obj.addRelayoutListener(function(event) {
      counterOfRelayout ++;
    });

    obj.relayout();
    setTimeout(function() {
      expect(counterOfRelayout).to.equal(1);

      obj.relayout();
      obj.relayout();
      obj.relayout();
      obj.relayout();
      obj.relayout();
      setTimeout(function() {
        expect(counterOfRelayout).to.equal(6);
        done();
      }, 1000);
    }, 1000);
  });

  it('Should cancel resizing after relayout', function(done) {
    this.timeout(0);

    var counterOfResizing = 0,
        counterOfRelayout = 0;

    var obj = {};
    defineUnitOfSize(obj, window);
    defineConvertUnit(obj, window);
    defineRelayout(obj, window);
    obj.addRelayoutListener(function(event) {
      counterOfRelayout ++;
    });

    window.addEventListener('resize', function(event) {
      counterOfResizing ++;
    });

    setTimeout(resizeWindow, 100);
    setTimeout(resizeWindow, 110);
    setTimeout(resizeWindow, 120);
    setTimeout(resizeWindow, 130);
    setTimeout(resizeWindow, 140);
    setTimeout(function() {
      obj.relayout();
    }, 150);

    setTimeout(function() {
      expect(counterOfResizing).to.equal(5);
      expect(counterOfRelayout).to.equal(1);
      done();
    }, 2000);
  });

  it('Should get scroll bar width in unit by `.unitOfSize`',
  function(done) {
    var objs = [ {}, {}, {} ];
    objs.forEach(function(obj) {
      defineUnitOfSize(obj, window);
      defineConvertUnit(obj, window);
      defineRelayout(obj, window);
    });

    var PX2MM = objs[0].convertUnit(1, 'px', 'mm');

    objs[0].unitOfSize = 'px';
    objs[1].unitOfSize = 'mm';
    objs[2].unitOfSize = 'rem';

    objs[0].rootFontSize = 13;
    objs[1].rootFontSize = 13;
    objs[2].rootFontSize = 13;

    var scrollbarWidth0 = objs[0].scrollbarWidth;
    var scrollbarWidth1 = objs[1].scrollbarWidth;
    var scrollbarWidth2 = objs[2].scrollbarWidth;

    expect(scrollbarWidth1).to.be.equal(scrollbarWidth0 * PX2MM);
    expect(scrollbarWidth2).to.be.equal(scrollbarWidth0 / 13);
    done();
  });

  it('Should not set scroll bar width manually', function(done) {
    var obj = {};
    defineUnitOfSize(obj, window);
    defineConvertUnit(obj, window);
    defineRelayout(obj, window);

    var scrollbarWidth = obj.scrollbarWidth;
    obj.scrollbarWidth = 20;
    expect(obj.scrollbarWidth, scrollbarWidth);
    done();
  });

  it('Should add and remove relayout listener', function(done) {
    var obj = {};
    defineUnitOfSize(obj, window);
    defineConvertUnit(obj, window);
    defineRelayout(obj, window);

    var logger = '';

    function listenerA(event) {
      logger += 'A';
    }
    function listenerB(event) {
      logger += 'B';
    }
    function listenerC(event) {
      logger += 'C';
    }
    var listenerD = {};

    obj.relayout();
    setTimeout(exec1, 100);

    function exec1() {
      expect(logger).to.equal('');

      obj.addRelayoutListener(listenerA);
      obj.addRelayoutListener(listenerB);
      obj.addRelayoutListener(listenerC);
      obj.addRelayoutListener(listenerD);
      obj.relayout();
      setTimeout(exec2, 100);
    }

    function exec2() {
      expect(logger).to.equal('ABC');

      obj.addRelayoutListener(listenerA);
      obj.addRelayoutListener(listenerB);
      obj.addRelayoutListener(listenerC);
      obj.addRelayoutListener(listenerD);
      obj.relayout();
      setTimeout(exec3, 100);
    }

    function exec3() {
      expect(logger).to.equal('ABCABC');

      obj.removeRelayoutListener(listenerB);
      obj.removeRelayoutListener(listenerD);
      obj.relayout();
      setTimeout(exec4, 100);
    }

    function exec4() {
      expect(logger).to.equal('ABCABCAC');

      obj.removeRelayoutListener(listenerA);
      obj.removeRelayoutListener(listenerC);
      obj.relayout();
      setTimeout(exec5, 100);
    }

    function exec5() {
      expect(logger).to.equal('ABCABCAC');
      done();
    }
  });
});
