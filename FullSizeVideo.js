import $ from 'jquery';
import {truthy, falsy, not, isNotDef, isBoolean, isFunction, allOf, notSingleEle, each, lte, getSizeAspectFill} from './_util';

class FullSizeVideo {
  constructor(options) {
    if (isNotDef(options)) throw new Error('FullSizeVideo: require options object when create instance.');

    const _ = this;

    _._option = $.extend({
      videoWrap: null,
      videoUrls: [],
      videoWidth: 320,
      videoHeight: 240,

      alignX: 'center',
      alignY: 'center',

      isAutoPlay: true,
      isLoop: false,
      isMuted: false,

      canplayCallback: null,
      timeupdateCallback: null,
      endedCallback: null,

      global: window
    }, options);

    // TODO: arrange
    _._option.videoWrap = $(_._option.videoWrap);

    _._global = _._option.global;

    _._initialized = false;

    _._uniqueId = Date.now();

    _._video = null;

    _._proxy = {
      resizeEventHandler: null
    };

    if (notSingleEle(_._option.videoWrap)) {
      throw new Error('FullSizeVideo: require options object has a single videoWrap.');
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

    _._setInstance();

    _._setCallbacks();

    return _;
  }

  _setInstance() {
    const _ = this,
      opt = _._option;

    let ext = '', videoSourceTpl = '';
    each(opt.videoUrls, (url) => {
      ext = url.split('.').pop().toLowerCase();
      videoSourceTpl += `<source src="${url}" type="video/${ext}"></source>`;
    });

    $(opt.videoWrap).append(`<video>${videoSourceTpl}</video>`);

    _._video = $('video', opt.videoWrap);

    const video = _._video.get(0);
    if (opt.isAutoPlay === true) video.setAttribute('autoplay', '');
    if (opt.isMuted === true) video.setAttribute('muted', '');
    if (opt.isLoop === true) video.setAttribute('loop', '');

    _.setResizeEventHandler(true);
  }

  setResizeEventHandler(flag) {
    if (not(isBoolean)(flag)) throw new TypeError('FullSizeVideo: setResizeEventHandler require boolean parameter.');

    const _ = this,
      evtName = `resize.kihon.fullsizevideo.${_._uniqueId}`;

    $(_._global).off(evtName, _._proxy.resizeEventHandler);

    if (flag) $(_._global).on(evtName, _._proxy.resizeEventHandler);
  }

  _setCallbacks() {
    const _ = this,
      opt = _._option,
      video = _._video.get(0),
      isVideoHasOnended = video.hasOwnProperty('onended');

    if (isFunction(opt.canplayCallback)) {
      $(video).on(`canplay.kihon.fullsizevideo.${_._uniqueId}`, (evt) => {
        opt.canplayCallback.call(null, {
          event: evt
        });
      });
    }

    if (isFunction(opt.timeupdateCallback) || allOf(falsy(isVideoHasOnended), isFunction(opt.endedCallback))) {
      $(video).on(`timeupdate.kihon.fullsizevideo.${_._uniqueId}`, (evt) => {
        if (isFunction(opt.timeupdateCallback)) {
          opt.timeupdateCallback.call(null, {
            event: evt,
            currentTime: video.currentTime,
            duration: video.duration
          });
        }


        if (allOf(isFunction(opt.endedCallback), lte(video.currentTime)(video.duration))) { // if (isFunction(opt.endedCallback) && (video.currentTime >= video.duration)) {
          opt.endedCallback.call(null, {
            event: evt,
            currentTime: video.currentTime,
            duration: video.duration
          });
        }
      });
    }

    if (allOf(truthy(isVideoHasOnended), isFunction(opt.endedCallback))) {
      $(video).on(`ended.kihon.fullsizevideo.${_._uniqueId}`, (evt) => {
        opt.endedCallback.call(null, {
          event: evt,
          currentTime: video.currentTime,
          duration: video.duration
        });
      });
    }
  }

  getVideoSizeAspectFill(videoWidth = 0, videoHeight = 0, global = window) {
    // TODO - TEST
    return getSizeAspectFill(videoWidth, videoHeight, global.innerWidth, global.innerHeight);

    /*
    const _ = this,
      winWidth = global.innerWidth,
      winHeight = global.innerHeight;

    let modifiedSizeW = winWidth,
      modifiedSizeH = Math.ceil((winWidth / videoWidth) * videoHeight);

    if (modifiedSizeH < winHeight) {
      modifiedSizeW = Math.ceil((winHeight / videoHeight) * videoWidth);
      modifiedSizeH = winHeight;
    }

    return {width: modifiedSizeW, height: modifiedSizeH};
    */
  }

  resize(evt) {
    const _ = this,
      size = _.getVideoSizeAspectFill(_._option.videoWidth, _._option.videoHeight, _._global);

    console.log('size :', size);

    // TODO

    return _;
  }

  play() {
    // TODO
  }

  pause() {
    // TODO
  }

  stop() {
    // TODO
  }

  seek(second) {
    // TODO
  }

  setVolume(number) {
    // TODO
  }

  getVolume() {
    // TODO
  }

  getVideoNode() {
    // TODO
  }

  destroy() {
    const _ = this;

    return _;
  }

  /*
   * private methods
   */
  // TODO
}

export default FullSizeVideo;