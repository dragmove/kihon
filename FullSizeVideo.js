import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import $ from 'jquery';
import {
  truthy,
  falsy,
  not,
  isDefined,
  isNotDef,
  isBoolean,
  isNumber,
  isFunction,
  isVideoElement,
  allOf,
  notSingleEle,
  each,
  gt,
  gte,
  lt,
  lte,
  eq,
  getSizeAspectFill,
  isPromise
} from './_util';

class FullSizeVideo {
  constructor(options) {
    if (isNotDef(options)) throw new Error('FullSizeVideo: require options object when create instance.');

    const _ = this;

    _._option = $.extend(
      {
        wrap: null,
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
      },
      options
    );

    _._global = _._option.global;

    _._initialized = false;

    _._uniqueId = Date.now();

    _._$wrap = $(_._option.wrap);

    _._$videoWrap = $(_._option.videoWrap);

    _._$video = null;

    _._video = null;

    _._proxy = {
      resizeEventHandler: null
    };

    _._isPlaying = false;

    _._isSeeking = false;

    _._seekingTime = 0;

    _._play$ = null; // true: play / false : pause, stop

    _._subscribePlay = null;

    if (notSingleEle(_._$wrap)) {
      throw new Error('FullSizeVideo: require options object has a single wrap.');
    }

    if (notSingleEle(_._$videoWrap)) {
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

    _._proxy.resizeEventHandler = _.resize.bind(_);

    _._setVideo();

    _._setCallbacks();

    _.setResizeEventHandler(true);

    _.resize();

    return _;
  }

  getVideoNode() {
    return this._$video;
  }

  getVideoSizeAspectFill(videoWidth = 0, videoHeight = 0, global = window) {
    return getSizeAspectFill(videoWidth, videoHeight, global.innerWidth, global.innerHeight);
  }

  getVolume() {
    const _ = this;

    if (not(isVideoElement)(_._video)) return null;

    return _._video.volume;
  }

  setVolume(volume) {
    const _ = this;

    if (not(isNumber)(volume)) throw new TypeError('FullSizeVideo: setVolume require a number parameter.');
    if (gt(volume)(0) || lt(volume)(1)) throw new Error('FullSizeVideo: setVolume require a number between 0 and 1.');

    if (not(isVideoElement)(_._video)) return _;

    _._video.volume = volume;

    return _;
  }

  isMuted() {
    return this._video.muted;
  }

  mute(flag) {
    const _ = this;

    if (not(isVideoElement)(_._video)) return _;

    _._video.muted = flag;

    return _;
  }

  play() {
    const _ = this;

    if (not(isVideoElement)(_._video)) return _;

    _._isPlaying = true;

    // https://developers.google.com/web/updates/2016/03/play-returns-promise
    const promise = _._video.play();
    _._subscribePlayPromise(promise);

    return _;
  }

  pause() {
    const _ = this;

    if (not(isVideoElement)(_._video)) return _;

    _._isPlaying = false;

    if (_._play$) {
      // promise from video.play() that is existing
    } else {
      _._video.pause();
    }

    return _;
  }

  stop() {
    const _ = this;

    if (not(isVideoElement)(_._video)) return _;

    _._isPlaying = false;

    if (_._play$) {
      // promise from video.play() that is existing
    } else {
      _._video.pause();
    }

    _.seek(0);

    return _;
  }

  seek(second) {
    const _ = this;

    if (not(isVideoElement)(_._video)) return _;

    _._isSeeking = true;

    if (_._play$) {
      // promise from video.play() that is existing
      _._seekingTime = second;
    } else {
      _._seekTimeRanges(second);

      _._isSeeking = false;
      _._seekingTime = 0;
    }

    return _;
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

    _._$wrap.css({
      width: _._global.innerWidth,
      height: _._global.innerHeight
    });

    return _;
  }

  destroy() {
    const _ = this;

    _._initialized = false;

    if (isDefined(_._$video)) {
      _.pause();

      _._$video
        .off(`canplay.kihon.fullsizevideo.${_._uniqueId}`)
        .off(`timeupdate.kihon.fullsizevideo.${_._uniqueId}`)
        .off(`ended.kihon.fullsizevideo.${_._uniqueId}`);
    }

    _._$wrap = null;

    _._$videoWrap = null;

    _._$video = null;

    _._video = null;

    _.setResizeEventHandler(false);

    _._proxy.resizeEventHandler = null;

    return _;
  }

  /*
   * private methods
   */
  _setVideo() {
    const _ = this,
      opt = _._option;

    let ext = '',
      videoSourceTpl = '';
    each(opt.videoUrls, url => {
      ext = url
        .split('.')
        .pop()
        .toLowerCase();

      videoSourceTpl += `<source src="${url}" type="video/${eq(ext)('ogv') ? 'ogg' : ext}"></source>`;
    });

    _._$video = $(`<video>${videoSourceTpl}</video>`);

    _._$videoWrap.append(_._$video);

    _._video = _._$video.get(0);

    if (eq(opt.isAutoPlay)(true)) _._video.setAttribute('autoplay', '');
    if (eq(opt.isMuted)(true)) {
      _._video.setAttribute('muted', '');
      _.mute(true);
    }
    if (eq(opt.isLoop)(true)) _._video.setAttribute('loop', '');
  }

  _subscribePlayPromise(promise) {
    const _ = this;

    if (not(isPromise)(promise)) return _;

    if (isDefined(_._subscribePlay)) _._subscribePlay.unsubscribe();

    _._play$ = from(promise).pipe(
      catchError((error, observable) => {
        // server error. but, continue subscription.
        return observable;
      })
    );

    _._subscribePlay = _._play$.subscribe({
      next: () => {
        if (truthy(_._isPlaying)) {
          // play video
        } else {
          _._video.pause();
        }

        if (truthy(_._isSeeking)) {
          _._seekTimeRanges(_._seekingTime);

          _._isSeeking = false;
          _._seekingTime = 0;
        }
      },
      // error: error => console.log('error :', error),
      complete: () => {
        if (isDefined(_._subscribePlay)) _._subscribePlay.unsubscribe();

        _._play$ = null;
      }
    });

    return _;
  }

  _seekTimeRanges(second) {
    const _ = this;

    let seekingTime = second;
    if (gt(second)(0)) {
      seekingTime = 0;
    } else if (lt(second)(_._video.duration)) {
      seekingTime = _._video.duration;
    }

    // https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/buffering_seeking_time_ranges
    let isSeekable = false;
    for (let i = 0, max = _._video.buffered.length; i < max; i++) {
      if (gte(_._video.buffered.start(i))(seekingTime) && gte(seekingTime)(_._video.buffered.end(i))) {
        isSeekable = true;
        break;
      }
    }

    if (truthy(isSeekable)) {
      _._video.currentTime = seekingTime;

      if (allOf(isFunction(_._option.endedCallback), lte(seekingTime)(_._video.duration))) {
        _._option.endedCallback.call(_, { currentTime: seekingTime, duration: seekingTime });
      }
    } else {
      // can not seek
    }

    return _;
  }

  _setCallbacks() {
    const _ = this,
      opt = _._option,
      isVideoHasOnended = _._video.hasOwnProperty('onended');

    if (isFunction(opt.canplayCallback)) {
      _._$video.on(`canplay.kihon.fullsizevideo.${_._uniqueId}`, evt => {
        opt.canplayCallback.call(_, {
          event: evt
        });
      });
    }

    if (isFunction(opt.timeupdateCallback) || allOf(falsy(isVideoHasOnended), isFunction(opt.endedCallback))) {
      _._$video.on(`timeupdate.kihon.fullsizevideo.${_._uniqueId}`, evt => {
        if (isFunction(opt.timeupdateCallback)) {
          opt.timeupdateCallback.call(_, {
            event: evt,
            currentTime: _._video.currentTime,
            duration: _._video.duration
          });
        }

        if (allOf(isFunction(opt.endedCallback), lte(_._video.currentTime)(_._video.duration))) {
          // if (isFunction(opt.endedCallback) && (_._video.currentTime >= _._video.duration)) {
          opt.endedCallback.call(_, {
            event: evt,
            currentTime: _._video.currentTime,
            duration: _._video.duration
          });
        }
      });
    }

    if (allOf(truthy(isVideoHasOnended), isFunction(opt.endedCallback))) {
      _._$video.on(`ended.kihon.fullsizevideo.${_._uniqueId}`, evt => {
        opt.endedCallback.call(_, {
          event: evt,
          currentTime: _._video.currentTime,
          duration: _._video.duration
        });
      });
    }
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

    _._$videoWrap.css({ left: left, top: top });

    return _;
  }
}

export default FullSizeVideo;
