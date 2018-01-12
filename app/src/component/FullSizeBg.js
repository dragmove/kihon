import $ from 'jquery';
import {isDefined, isBoolean, isNotDef, notSingleEle, anyOf} from '../util/util';

/*
var $ = null;

// Establish the root object, `window` (`self`) in the browser, or `global` on the server.
// We use `self` instead of `window` for `WebWorker` support.
var root = (typeof self == 'object' && self.self === self && self) ||
  (typeof global == 'object' && global.global === global && global);

console.log('root :', root);

// Start with AMD.
if (typeof define === 'function' && define.amd) {
  console.log('amd');



  define(['jquery', 'exports'], function (jQuery, exports) {
    console.log('jQuery :', jQuery);

    if (isNotDef(jQuery)) throw new Error('FullSizeBg: require jQuery.');

    $ = jQuery;
  });


  // Next for Node.js or CommonJS.
} else if (typeof exports !== 'undefined') {
  // node.js or common js or browser
  console.log('node.js or common js or browser');

  try {
    if (isDefined(root.jQuery)) {
      console.log('use es2015+. browser $ :', $);

      $ = root.jQuery;

    } else {
      console.log('node.js or common js - $ :', $);

      $ = require('jquery');
    }

  } catch (e) {
    console.log('error :', e);

    throw new Error('FullSizeBg: require jQuery.');
  }

} else {
  // browser global
  console.log('browser global. test complete.');

  if (isNotDef(root.jQuery)) throw new Error('FullSizeBg: require jQuery.');
  $ = root.jQuery;
}
*/

class FullSizeBg {
  constructor(options) {
    const _ = this;

    if (isNotDef(options)) throw new Error('FullSizeBg: require options object when create FullSizeBg instance.');

    _._option = $.extend({
      wrap: null, // wrap
      imgWrap: null, // image wrap
      imgWidth: 320, // natural image width
      imgHeight: 240, // natural image height
      alignX: 'center', // 'left' or 'center' or 'right'
      alignY: 'center', // 'top' or 'center' or 'bottom'
      global: window
    }, options);

    _._global = _._option.global;

    _._initialized = false;

    _._uniqueId = Date.now();

    _._$wrap = $(_._option.wrap);

    _._$imgWrap = $(_._option.imgWrap);

    _._$img = $('img', _._option.imgWrap);

    _._proxy = {
      resizeEventHandler: null
    };

    if (anyOf(notSingleEle(_._$img), notSingleEle(_._$imgWrap), notSingleEle(_._$img))) {
      throw new Error('FullSizeBg: require options object has a single wrap, imgWrap, img.');
    }
  }

  /*
   * public methods
   */
  init(obj = null) {
    const _ = this;

    if (_._initialized) return _;

    _._initialized = true;

    _._proxy.resizeEventHandler = $.proxy(_.resize, _);

    _.setResizeEventHandler(true);

    _.resize();

    return _;
  }

  setResizeEventHandler(flag = false) {
    if (!isBoolean(flag)) throw new Error('FullSizeBg: setResizeEventHandler require boolean parameter.');

    const _ = this,
      evtName = `resize.kihon.fullsizebg.${_._uniqueId}`;

    $(_._global).off(evtName, _._proxy.resizeEventHandler);

    if (flag) $(_._global).on(evtName, _._proxy.resizeEventHandler);
  }

  resize(evt = null) {
    const _ = this,
      size = _.getImageSizeAspectFill();

    _._$img.css({width: size.width, height: size.height});

    _._setWrapAlign(_._option.alignX, _._option.alignY, size);

    _._$wrap.css({width: _._global.innerWidth, height: _._global.innerHeight});

    return _;
  }

  getImageSizeAspectFill() {
    const _ = this,
      opt = _._option,
      winWidth = _._global.innerWidth,
      winHeight = _._global.innerHeight;

    let modifiedWidth = winWidth,
      modifiedHeight = Math.ceil((winWidth / opt.imgWidth) * opt.imgHeight);

    if (modifiedHeight < winHeight) {
      modifiedWidth = Math.ceil((winHeight / opt.imgHeight) * opt.imgWidth);
      modifiedHeight = winHeight;
    }

    return {width: modifiedWidth, height: modifiedHeight};
  }

  destroy(obj = null) {
    const _ = this;

    _._initialized = false;

    _.setResizeEventHandler(false);

    _._proxy.resizeEventHandler = null;

    return _;
  }

  /*
   * private methods
   */
  _setWrapAlign(alignX, alignY, modifiedSize) {
    const _ = this,
      winWidth = _._global.innerWidth,
      winHeight = _._global.innerHeight;

    let left = 0,
      top = 0;

    switch (alignX) {
      case 'left':
        left = 0;
        break;

      case 'center':
        left = Math.round((winWidth - modifiedSize.width) / 2);
        break;

      case 'right':
        left = Math.round(winWidth - modifiedSize.width);
        break;
    }

    switch (alignY) {
      case 'top':
        top = 0;
        break;

      case 'center':
        top = Math.round((winHeight - modifiedSize.height) / 2);
        break;

      case 'bottom':
        top = Math.round(winHeight - modifiedSize.height);
        break;
    }

    _._$imgWrap.css({left: left, top: top});

    return _;
  }
}

export default FullSizeBg;