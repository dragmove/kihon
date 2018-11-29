import $ from 'jquery';
import { not, isNotDef, isBoolean, isFunction, each } from './_util';

class Navi {
  constructor(options) {
    if (isNotDef(options)) throw new Error('Navi: require options object when create instance.');

    const _ = this;

    _._option = $.extend(
      {
        btns: [],
        mouseoverCallback: null,
        mouseoutCallback: null,
        mousedownCallback: null,
        mouseupCallback: null,
        clickCallback: null,
        activateCallback: null
      },
      options
    );

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
  }

  /*
   * public methods
   */
  init() {
    const _ = this;

    if (_._initialized) return _;

    _._initialized = true;

    _._proxy.mouseoverBtnEventHandler = _._mouseoverBtnEventHandler.bind(_);
    _._proxy.mouseoutBtnEventHandler = _._mouseoutBtnEventHandler.bind(_);
    _._proxy.mousedownBtnEventHandler = _._mousedownBtnEventHandler.bind(_);
    _._proxy.mouseupBtnEventHandler = _._mouseupBtnEventHandler.bind(_);
    _._proxy.clickBtnEventHandler = _._clickBtnEventHandler.bind(_);

    _.setBtnsEventHandler(true);

    return _;
  }

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
      idx = index <= 0 || index > _._$btns.length ? 0 : index;

    if (isFunction(_._option.activateCallback)) {
      _._option.activateCallback.call(_, {
        prevActivatedIndex: _._activatedIndex,
        index: idx
      });
    }

    _._activatedIndex = idx;

    return _;
  }

  setBtnsEventHandler(flag) {
    if (not(isBoolean)(flag)) throw new TypeError('Navi: setBtnsEventHandler require boolean parameter.');

    const _ = this;

    each(_.getBtns(), btn => {
      $(btn)
        .off(`mouseover.kihon.navi.${_._uniqueId}`, _._proxy.mouseoverBtnEventHandler)
        .off(`mouseout.kihon.navi.${_._uniqueId}`, _._proxy.mouseoutBtnEventHandler)
        .off(`mousedown.kihon.navi.${_._uniqueId}`, _._proxy.mousedownBtnEventHandler)
        .off(`mouseup.kihon.navi.${_._uniqueId}`, _._proxy.mouseupBtnEventHandler)
        .off(`click.kihon.navi.${_._uniqueId}`, _._proxy.clickBtnEventHandler);
    });

    if (flag) {
      each(_.getBtns(), btn => {
        $(btn)
          .on(`mouseover.kihon.navi.${_._uniqueId}`, _._proxy.mouseoverBtnEventHandler)
          .on(`mouseout.kihon.navi.${_._uniqueId}`, _._proxy.mouseoutBtnEventHandler)
          .on(`mousedown.kihon.navi.${_._uniqueId}`, _._proxy.mousedownBtnEventHandler)
          .on(`mouseup.kihon.navi.${_._uniqueId}`, _._proxy.mouseupBtnEventHandler)
          .on(`click.kihon.navi.${_._uniqueId}`, _._proxy.clickBtnEventHandler);
      });
    }

    return _;
  }

  destroy() {
    const _ = this;

    _._initialized = false;

    _.setBtnsEventHandler(false);

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
      btn = evt.currentTarget,
      index = _._$btns.index(btn);

    if (index < 0) return;

    _._currentIndex = index + 1;

    if (isFunction(_._option.mouseoverCallback)) {
      _._option.mouseoverCallback.call(_, {
        event: evt,
        btn: btn,
        index: _._currentIndex
      });
    }
  }

  _mouseoutBtnEventHandler(evt) {
    const _ = this,
      btn = evt.currentTarget,
      index = _._$btns.index(btn);

    if (index < 0) return;

    if (isFunction(_._option.mouseoutCallback)) {
      _._option.mouseoutCallback.call(_, {
        event: evt,
        btn: btn,
        index: index + 1
      });
    }
  }

  _mousedownBtnEventHandler(evt) {
    const _ = this,
      btn = evt.currentTarget,
      index = _._$btns.index(btn);

    if (index < 0) return;

    evt.preventDefault();

    if (isFunction(_._option.mousedownCallback)) {
      _._option.mousedownCallback.call(_, {
        event: evt,
        btn: btn,
        index: index + 1
      });
    }
  }

  _mouseupBtnEventHandler(evt) {
    const _ = this,
      btn = evt.currentTarget,
      index = _._$btns.index(btn);

    if (index < 0) return;

    evt.preventDefault();

    if (isFunction(_._option.mouseupCallback)) {
      _._option.mouseupCallback.call(_, {
        event: evt,
        btn: btn,
        index: index + 1
      });
    }
  }

  _clickBtnEventHandler(evt) {
    const _ = this,
      btn = evt.currentTarget,
      index = _._$btns.index(btn);

    if (index < 0) return;

    evt.preventDefault();

    const prevIndex = _._activatedIndex;

    if (isFunction(_._option.clickCallback)) {
      _._option.clickCallback.call(_, {
        event: evt,
        btn: btn,
        prevActivatedIndex: prevIndex,
        index: index + 1
      });
    }

    if (isFunction(_._option.activateCallback)) {
      _._option.activateCallback.call(_, {
        prevActivatedIndex: prevIndex,
        index: index + 1
      });
    }

    _._currentIndex = _._activatedIndex = index + 1;
  }
}

export default Navi;
