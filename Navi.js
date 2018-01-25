import $ from 'jquery';
import {not, isNotDef, isBoolean, isFunction, notSingleEle} from './_util';

class Navi {
  constructor(options) {
    if (isNotDef(options)) throw new Error('Navi: require options object when create instance.');

    const _ = this;

    _._option = $.extend({
      wrap: null,
      btns: [],
      mouseoverCallback: null,
      mouseoutCallback: null,
      mousedownCallback: null,
      mouseupCallback: null,
      clickCallback: null,
      activateCallback: null
    }, options);

    _._initialized = false;

    _._uniqueId = Date.now();

    _._$btns = $(_._option.btns || []);

    _._currentIndex = 0;

    _._activatedIndex = 0;

    _._proxy = {
      mouseoverBtnEventHandler: null,
      mouseoutBtnEventHandler: null,
      mousedownBtnEventHandler: null,
      mouseupBtnEventHandler: null,
      clickBtnEventHandler: null
    };

    if (notSingleEle($(_._option.wrap))) throw new Error('Navi: require options object has a single wrap.');
  }

  init() {
    const _ = this;

    if (_._initialized) return _;

    _._initialized = true;

    _._proxy.mouseoverBtnEventHandler = $.proxy(_._mouseoverBtnEventHandler, _);
    _._proxy.mouseoutBtnEventHandler = $.proxy(_._mouseoutBtnEventHandler, _);
    _._proxy.mousedownBtnEventHandler = $.proxy(_._mousedownBtnEventHandler, _);
    _._proxy.mouseupBtnEventHandler = $.proxy(_._mouseupBtnEventHandler, _);
    _._proxy.clickBtnEventHandler = $.proxy(_._clickBtnEventHandler, _);

    _.setBtnsEventHandler(true);

    return _;
  }

  /*
   * public methods
   */
  getBtns() {
    return this._$btns.toArray();
  }

  getBtn(index) {
    const _ = this,
      idx = index - 1;

    if (idx < 0 || idx >= _._$btns.length) return null;

    return _._$btns.get(idx);
  }

  getActivatedIndex() {
    return this._activatedIndex;
  }

  activate(index) {
    const _ = this,
      idx = (index <= 0 || index > _._$btns.length) ? 0 : index;

    if (isFunction(_._option.activateCallback)) {
      _._option.activateCallback.call(null, {
        prevActivatedIndex: _._activatedIndex,
        index: idx
      });
    }

    _._activatedIndex = idx;

    return _;
  }

  setBtnsEventHandler(flag) {
    if (not(isBoolean)(flag)) throw new Error('Navi: setBtnsEventHandler require boolean parameter.');

    const _ = this;

    $(_._option.wrap)
      .off(`mouseover.kihon.navi.${_._uniqueId}`, _._proxy.mouseoverBtnEventHandler)
      .off(`mouseout.kihon.navi.${_._uniqueId}`, _._proxy.mouseoutBtnEventHandler)
      .off(`mousedown.kihon.navi.${_._uniqueId}`, _._proxy.mousedownBtnEventHandler)
      .off(`mouseup.kihon.navi.${_._uniqueId}`, _._proxy.mouseupBtnEventHandler)
      .off(`click.kihon.navi.${_._uniqueId}`, _._proxy.clickBtnEventHandler);

    if (flag) {
      $(_._option.wrap)
        .on(`mouseover.kihon.navi.${_._uniqueId}`, _._proxy.mouseoverBtnEventHandler)
        .on(`mouseout.kihon.navi.${_._uniqueId}`, _._proxy.mouseoutBtnEventHandler)
        .on(`mousedown.kihon.navi.${_._uniqueId}`, _._proxy.mousedownBtnEventHandler)
        .on(`mouseup.kihon.navi.${_._uniqueId}`, _._proxy.mouseupBtnEventHandler)
        .on(`click.kihon.navi.${_._uniqueId}`, _._proxy.clickBtnEventHandler);
    }

    return _;
  }

  destroy() {
    const _ = this;

    _.setBtnsEventHandler(false);

    _._initialized = false;

    _._currentIndex = 0;

    _._activatedIndex = 0;

    _._proxy.mouseoverBtnEventHandler = null;
    _._proxy.mouseoutBtnEventHandler = null;
    _._proxy.mousedownBtnEventHandler = null;
    _._proxy.mouseupBtnEventHandler = null;
    _._proxy.clickBtnEventHandler = null;

    return _;
  }

  /*
   * private methods
   */
  _mouseoverBtnEventHandler(evt) {
    const _ = this,
      ele = evt.target,
      index = _._$btns.index(ele);

    if (index < 0) return;

    _._currentIndex = index + 1;

    if (isFunction(_._option.mouseoverCallback)) {
      _._option.mouseoverCallback.call(null, {
        event: evt,
        btn: ele,
        index: _._currentIndex
      });
    }
  }

  _mouseoutBtnEventHandler(evt) {
    const _ = this,
      ele = evt.target,
      index = _._$btns.index(ele);

    if (index < 0) return;

    if (isFunction(_._option.mouseoutCallback)) {
      _._option.mouseoutCallback.call(null, {
        event: evt,
        btn: ele,
        index: index + 1
      });
    }
  }

  _mousedownBtnEventHandler(evt) {
    const _ = this,
      ele = evt.target,
      index = _._$btns.index(ele);

    if (index < 0) return;

    evt.preventDefault();

    if (isFunction(_._option.mousedownCallback)) {
      _._option.mousedownCallback.call(null, {
        event: evt,
        btn: ele,
        index: index + 1
      });
    }
  }

  _mouseupBtnEventHandler(evt) {
    const _ = this,
      ele = evt.target,
      index = _._$btns.index(ele);

    if (index < 0) return;

    evt.preventDefault();

    if (isFunction(_._option.mouseupCallback)) {
      _._option.mouseupCallback.call(null, {
        event: evt,
        btn: ele,
        index: index + 1
      });
    }
  }

  _clickBtnEventHandler(evt) {
    const _ = this,
      ele = evt.target,
      index = _._$btns.index(ele);

    if (index < 0) return;

    evt.preventDefault();

    const prevIndex = _._activatedIndex;

    if (isFunction(_._option.clickCallback)) {
      _._option.clickCallback.call(null, {
        event: evt,
        btn: ele,
        prevActivatedIndex: prevIndex,
        index: index + 1
      });
    }

    if (isFunction(_._option.activateCallback)) {
      _._option.activateCallback.call(null, {
        prevActivatedIndex: prevIndex,
        index: index + 1
      });
    }

    _._currentIndex = _._activatedIndex = index + 1;
  }
}

export default Navi;