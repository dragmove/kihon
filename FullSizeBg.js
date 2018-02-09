import $ from 'jquery';
import {not, isNotDef, isBoolean, anyOf, notSingleEle, getSizeAspectFill} from './_util';

class FullSizeBg {
  constructor(options) {
    if (isNotDef(options)) throw new Error('FullSizeBg: require options object when create instance.');

    const _ = this;

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
  init() {
    const _ = this;

    if (_._initialized) return _;

    _._initialized = true;

    _._proxy.resizeEventHandler = $.proxy(_.resize, _);

    _.setResizeEventHandler(true);

    _.resize();

    return _;
  }

  setResizeEventHandler(flag) {
    if (not(isBoolean)(flag)) throw new TypeError('FullSizeBg: setResizeEventHandler require boolean parameter.');

    const _ = this,
      evtName = `resize.kihon.fullsizebg.${_._uniqueId}`;

    $(_._global).off(evtName, _._proxy.resizeEventHandler);

    if (flag) $(_._global).on(evtName, _._proxy.resizeEventHandler);

    return _;
  }

  resize(evt = null) {
    const _ = this,
      size = _.getImageSizeAspectFill(_._option.imgWidth, _._option.imgHeight, _._global);

    _._$img.css({width: size.width, height: size.height});

    _._setWrapAlign(_._option.alignX, _._option.alignY, size, _._global);

    _._$wrap.css({width: _._global.innerWidth, height: _._global.innerHeight});

    return _;
  }

  getImageSizeAspectFill(srcWidth = 0, srcHeight = 0, global = window) {
    return getSizeAspectFill(srcWidth, srcHeight, global.innerWidth, global.innerHeight);
  }

  destroy() {
    const _ = this;

    _._initialized = false;

    _._$wrap = null;

    _._$imgWrap = null;

    _._$img = null;

    _.setResizeEventHandler(false);

    _._proxy.resizeEventHandler = null;

    return _;
  }

  /*
   * private methods
   */
  _setWrapAlign(alignX = 'center', alignY = 'center', modifiedSize = {width: 0, height: 0}, global = window) {
    const _ = this,
      winWidth = global.innerWidth,
      winHeight = global.innerHeight;

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