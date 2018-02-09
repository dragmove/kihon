import $ from 'jquery';
import {truthy, not, isDefined, isNotDef, isBoolean, isFunction} from './_util';

class Modal {
  constructor(options) {
    const _ = this;

    _._option = $.extend({
      wrapClass: 'modal-wrap',
      contents: '',
      appendTo: $('body'),
      closeBtnSelector: '.btn-close',
      isCloseByClickOutside: true,
      isCloseByEscKey: true,
      showCallback: null,
      hideCallback: null
    }, options);

    _._initialized = false;

    _._uniqueId = Date.now();

    _._$wrap = null;

    _._$contents = null;

    _._$parentNode = _._option.appendTo;

    _._$closeBtn = null;

    _._isShow = false;

    _._proxy = {
      closeBtnEventHandler: null,
      wrapEventHandler: null,
      escKeyEventHandler: null
    };
  }

  /*
   * public methods
   */
  init() {
    const _ = this;

    if (_._initialized) return _;

    _._initialized = true;

    _._$contents = $(_._option.contents);

    _._$wrap = $(document.createElement('div')).addClass(_._option.wrapClass);
    _._$wrap.html(_._$contents).hide();

    _._$parentNode.append(_._$wrap);

    _._$closeBtn = $(_._option.closeBtnSelector, _._$wrap);

    _._proxy.closeBtnEventHandler = $.proxy(_._closeBtnEventHandler, _);
    _._proxy.wrapEventHandler = $.proxy(_._wrapEventHandler, _);
    _._proxy.escKeyEventHandler = $.proxy(_._escKeyEventHandler, _);

    if (_._$closeBtn.length > 0) _.setCloseBtnEventHandler(true);

    if (_._option.isCloseByClickOutside === true) _.setWrapEventHandler(true);

    if (_._option.isCloseByEscKey === true) _.setEscKeyEventHandler(true);

    return _;
  }

  setCloseBtnEventHandler(flag) {
    if (not(isBoolean)(flag)) throw new TypeError('Modal: setCloseBtnEventHandler require boolean parameter.');

    const _ = this,
      evtName = `click.kihon.modal.${_._uniqueId}`;

    if (_._$closeBtn.length <= 0) return _;

    _._$closeBtn.off(evtName, _._proxy.closeBtnEventHandler);

    if (flag) _._$closeBtn.on(evtName, _._proxy.closeBtnEventHandler);

    return _;
  }

  setWrapEventHandler(flag) {
    if (not(isBoolean)(flag)) throw new TypeError('Modal: setWrapEventHandler require boolean parameter.');

    const _ = this,
      evtName = `click.kihon.modal.${_._uniqueId}`;

    if (isNotDef(_._$wrap) || _._$wrap.length <= 0) return _;

    _._$wrap.off(evtName, _._proxy.wrapEventHandler);

    if (flag) _._$wrap.on(evtName, _._proxy.wrapEventHandler);

    return _;
  }

  setEscKeyEventHandler(flag) {
    if (not(isBoolean)(flag)) throw new TypeError('Modal: setEscKeyEventHandler require boolean parameter.');

    const _ = this,
      evtName = `keydown.kihon.modal.${_._uniqueId}`;

    $('body').off(evtName, _._proxy.escKeyEventHandler);

    if (flag) $('body').on(evtName, _._proxy.escKeyEventHandler);

    return _;
  }

  getNode() {
    return this._$wrap;
  }

  appendTo(element) {
    const _ = this;

    _._$parentNode = _._option.appendTo = $(element);
    _._$parentNode.append(_._$wrap);

    return _;
  }

  show() {
    const _ = this;

    if (truthy(_._isShow)) return;

    _._isShow = true;

    if (isFunction(_._option.showCallback)) _._option.showCallback.call(_);

    if (isDefined(_._$wrap)) _._$wrap.show();

    return _;
  }

  hide() {
    const _ = this;

    if (!_._isShow) return;
    _._isShow = false;

    if (isFunction(_._option.hideCallback)) _._option.hideCallback.call(_);

    if (isDefined(_._$wrap)) _._$wrap.hide();

    return _;
  }

  isShow() {
    return this._isShow;
  }

  destroy() {
    const _ = this;

    _._initialized = false;

    _.setCloseBtnEventHandler(false);
    _.setWrapEventHandler(false);
    _.setEscKeyEventHandler(false);

    _._$wrap = null;

    _._$contents = null;

    _._$parentNode = null;

    _._$closeBtn = null;

    _._proxy.closeBtnEventHandler = null;
    _._proxy.wrapEventHandler = null;
    _._proxy.escKeyEventHandler = null;

    return _;
  }
}

export default Modal;