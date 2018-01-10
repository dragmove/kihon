import {isBoolean, isNotDef, notSingleEle} from '../util/util';

class FullSizeBg {
  constructor(options) {
    const _ = this;

    if (isNotDef(options)) throw new Error('require options object when create FullSizeBg instance.');

    _._option = $.extend({
      imgWrap: null, // image wrap
      imgWidth: 320, // natural image width
      imgHeight: 240, // natural image height
      alignX: 'center', // 'left' or 'center' or 'right'
      alignY: 'center', // 'top' or 'center' or 'bottom'
      global: window
    }, options);

    _._global = _._option.global;

    _._uniqueId = Date.now();

    _._$imgWrap = $(_._option.imgWrap);

    _._$img = $('img', _._option.imgWrap);

    if (notSingleEle(_._$imgWrap) || notSingleEle(_._$img)) {
      throw new Error('FullSizeBg Class require options object has a single imgWrap has a single img.');
    }

    _._proxy = {
      resizeEventHandler: null
    };
  }

  /*
   * public methods
   */
  init(obj = null) {
    const _ = this;

    _._proxy.resizeEventHandler = $.proxy(_.resize, _);

    _.setResizeEventHandler(true);

    return _;
  }

  setResizeEventHandler(flag) {
    const _ = this,
      evtName = `resize.kihon.fullsizebg.${_._uniqueId}`;

    if (!isBoolean(flag)) throw new Error('setResizeEventHandler require boolean parameter.');

    $(_._global).off(evtName, _._proxy.resizeEventHandler);
    if (flag) $(_._global).on(evtName, _._proxy.resizeEventHandler);
  }

  // TODO
  resize(evt = null) {
    const _ = this,
      size = _.getImageSizeAspectFill();

    _._$img.width(size.width).height(size.height);

    _._setWrapAlign(_._option.alignX, _._option.alignY, size);

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