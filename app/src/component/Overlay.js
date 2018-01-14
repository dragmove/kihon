import $ from 'jquery';
import {isBoolean, isFunction, not} from '../util/util';

class Overlay {
  constructor(options) {
    const _ = this;

    _._option = $.extend({
      class: 'overlay',
      color: '#000',
      opacity: 0.5,
      appendTo: $('body'),
      clickCallback: null
    }, options);

    _._initialized = false;

    _._uniqueId = Date.now();

    _._$node = null;

    _._$parentNode = _._option.appendTo;

    _._proxy = {
      clickOverlayEventHandler: null
    };
  }

  /*
   * public methods
   */
  init() {
    const _ = this;

    if (_._initialized) return _;
    
    _._initialized = true;

    _._$node = $(document.createElement('div')).addClass(_._option.class);
    _._$node.css({
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      'background-color': _._option.color,
      opacity: _._option.opacity,
      filter: `alpha(opacity=${_._option.opacity * 100})`
    });

    _._$parentNode.append(_._$node);

    _._proxy.clickOverlayEventHandler = (isFunction(_._option.clickCallback)) ? $.proxy(_._option.clickCallback, _) : null;

    _.hide();

    _.setNodeEventHandler(true);

    return _;
  }

  setNodeEventHandler(flag) {
    if (!isBoolean(flag)) throw new Error('Overlay: setNodeEventHandler require boolean parameter.');

    const _ = this,
      evtName = `click.kihon.overlay.${_._uniqueId}`;

    if (not(isFunction)(_._option.clickCallback)) return _;

    _._$node.off(evtName, _._proxy.clickOverlayEventHandler);

    if(flag) _._$node.on(evtName, _._proxy.clickOverlayEventHandler);

    return _;
  }

  getNode() {
    return this._$node;
  }

  setCss(obj) {
    const _ = this;

    _._$node.css(obj);

    return _;
  }

  appendTo(element) {
    const _ = this;

    _._$parentNode = _._option.appendTo = $(element);
    _._$parentNode.append(_._$node);

    return _;
  }

  show() {
    const _ = this;

    if (_._$node.length > 0) _._$node.show();

    return _;
  }

  hide() {
    const _ = this;

    if (_._$node.length > 0) _._$node.hide();

    return _;
  }

  destroy(obj = null) {
    const _ = this;

    obj = $.extend({
      isRemoveNode: true
    }, obj);

    if (!isBoolean(obj.isRemoveNode)) throw new Error('Overlay: destroy isRemoveNode variable type of option should be boolean.');
    
    _._initialized = false;

    _.setNodeEventHandler(false);

    _._proxy.clickOverlayEventHandler = null;

    if (obj.isRemoveNode) _._$node.remove();
    _._$node = null;

    _._$parentNode = null;

    _.option = null;

    return _;
  }
}

export default Overlay;