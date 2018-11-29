import $ from 'jquery';
import { not, isDefined, isBoolean, notSingleEle, getSizeAspectFill, isPromise } from './_util';
import Video from './Video';

class FullSizeVideo extends Video {
  constructor(options) {
    super(options);

    const _ = this;

    _._option = $.extend(
      {
        outerWrap: null,
        alignX: 'center',
        alignY: 'center'
      },
      _._option
    );

    _._$outerWrap = $(_._option.outerWrap);

    _._proxy = {
      resizeEventHandler: null
    };

    if (notSingleEle(_._$outerWrap)) {
      throw new Error('FullSizeVideo: require options object has a single outerWrap.');
    }
  }

  /*
   * public methods
   */
  init(obj = null) {
    const _ = this;

    if (_._initialized) return _;

    super.init(obj);

    _._proxy.resizeEventHandler = _.resize.bind(_);

    _.setResizeEventHandler(true);

    _.resize();

    return _;
  }

  getVideoSizeAspectFill(videoWidth = 0, videoHeight = 0, global = window) {
    return getSizeAspectFill(videoWidth, videoHeight, global.innerWidth, global.innerHeight);
  }

  setResizeEventHandler(flag) {
    if (not(isBoolean)(flag)) throw new TypeError('FullSizeVideo: setResizeEventHandler require boolean parameter.');

    const _ = this,
      evtName = `resize.kihon.fullsizevideo.${_._uniqueId}`;

    $(_._global).off(evtName, _._proxy.resizeEventHandler);

    if (flag) $(_._global).on(evtName, _._proxy.resizeEventHandler);

    return _;
  }

  resize(evt) {
    const _ = this,
      opt = _._option,
      size = _.getVideoSizeAspectFill(opt.videoWidth, opt.videoHeight, _._global);

    _._$video.width(size.width).height(size.height);

    _._setWrapAlign(opt.alignX, opt.alignY, size, _._global);

    _._$outerWrap.css({
      width: _._global.innerWidth,
      height: _._global.innerHeight
    });

    return _;
  }

  destroy(obj = null) {
    const _ = this;

    super.destroy(obj);

    _._$outerWrap = null;

    _.setResizeEventHandler(false);

    _._proxy.resizeEventHandler = null;

    return _;
  }

  /*
   * private methods
   */
  _subscribePlayPromise(promise) {
    const _ = this;

    if (not(isPromise)(promise)) return _;

    if (isDefined(_._subscribePlay)) _._subscribePlay.unsubscribe();

    return _;
  }

  _setWrapAlign(alignX = 'center', alignY = 'center', modifiedSize = { width: 0, height: 0 }, global = window) {
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

    _._$wrap.css({ left: left, top: top });

    return _;
  }
}

export default FullSizeVideo;
