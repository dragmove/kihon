import $ from 'jquery';
import Navi from './Navi';
import {falsy, not, isDefined, isNotDef, isBoolean} from './_util';

class HorizontalScrollingNavi extends Navi {
  constructor(options) {
    if (isNotDef(options)) throw new Error('HorizontalScrollingNavi: require options object when create instance.');

    let opt = $.extend({
      /*
       // Navi.js options
       wrap,
       btns,
       mouseoverCallback,
       mouseoutCallback,
       mousedownCallback,
       mouseupCallback,
       clickCallback,
       activateCallback,
       */

      /*
       * HorizontalScrollingNavi.js options
       */
      // require Dragdealer library - https://github.com/skidding/dragdealer
      Dragdealer: require('dragdealer'),
      handleClass: 'handle',
      speed: 0.25,
      positionedCallback: null, // function(x, y)
      dragStartCallback: null, // function(x, y)
      dragStopCallback: null, // function(x, y)
      animationCallback: null, // function(x, y)

      global: window
    }, options);

    super(opt);

    const _ = this;

    _._isDraggable = false;

    _._dragDealer = null;

    // add resize event handler to proxy object in Navi.js
    $.extend(true, _._proxy, {resizeEventHandler: null});
  }

  /*
   * public methods
   */
  // override
  init() {
    super.init();

    const _ = this;

    _._proxy.resizeEventHandler = $.proxy(_.resize, _);

    _._setContents();

    _.setResizeEventHandler(true);

    _.resize();

    return _;
  }

  getRatioX() {
    if (isNotDef(this._dragDealer)) return null;

    const offset = this._dragDealer.getValue();

    return offset[0];
  }

  getOffsetRatioByPosition(x) {
    if (isNotDef(this._dragDealer)) return null;

    return this._dragDealer.getRatiosByOffsets([x, 0]);
  }

  getHandle() {
    if (isNotDef(this._dragDealer)) return null;

    return this._dragDealer.handle;
  }

  setX(x) {
    const _ = this,
      offset = _.getOffsetRatioByPosition(x);

    _._dragDealer.setValue(offset[0], offset[1]);

    return _;
  }

  setRatioX(ratioX) {
    this._dragDealer.setValue(ratioX, 0);

    return this;
  }

  isDraggable() {
    return this._isDraggable;
  }

  enable() {
    const _ = this;

    _._dragDealer.enable();

    _._isDraggable = true;

    return _;
  }

  disable() {
    const _ = this;

    _._dragDealer.disable();

    _._isDraggable = false;

    return _;
  }

  destroy(obj = null) {
    const _ = this;

    _.setResizeEventHandler(false);

    _._isDraggable = false;

    if (isDefined(_._dragDealer)) _._dragDealer.unbindEventListeners();

    _._dragDealer = null;

    super.destroy(obj);

    return _;
  }

  /*
   * private methods
   */
  _setContents() {
    const _ = this,
      opt = _._option;

    _._dragDealer = new opt.Dragdealer($(opt.wrap).get(0), {
      handleClass: opt.handleClass,
      disabled: false,
      horizontal: true,
      vertical: false,
      slide: true,
      loose: true,
      speed: opt.speed,
      css3: true,
      callback: opt.positionedCallback,
      dragStartCallback: opt.dragStartCallback,
      dragStopCallback: opt.dragStopCallback,
      animationCallback: opt.animationCallback
    });

    return _;
  }

  setResizeEventHandler(flag) {
    if (not(isBoolean)(flag)) throw new TypeError('HorizontalScrollingNavi: setResizeEventHandler require boolean parameter.');

    const _ = this,
      evtName = `resize.kihon.horizontalscrollingnavi.${_._uniqueId}`;

    $(_._option.global).off(evtName, _._proxy.resizeEventHandler);

    if (flag) $(_._option.global).on(evtName, _._proxy.resizeEventHandler);

    return _;
  }

  resize(evt) {
    const _ = this;

    if (isDefined(_._dragDealer)) {
      if ($(_.getHandle()).outerWidth() > $(_._option.wrap).width()) {
        _.enable();

      } else {
        if (falsy(_._dragDealer.disabled)) _.disable();

        const ratioX = _.getRatioX();
        if (isDefined(ratioX) && ratioX !== 0) _.setRatioX(0);
      }
    }

    return _;
  }
}

export default HorizontalScrollingNavi;