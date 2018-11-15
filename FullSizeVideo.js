import { from } from 'rxjs';
import { switchAll, switchMap } from 'rxjs/operators';
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
  lt,
  lte,
  getSizeAspectFill
} from './_util';

class FullSizeVideo {
  constructor(options) {
    if (isNotDef(options))
      throw new Error(
        'FullSizeVideo: require options object when create instance.'
      );

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

    _._proxy = {
      resizeEventHandler: null
    };

    _._isPlaying = false;

    _._play$ = null; // true: play / false : pause, stop

    _._subscribePlay = null;

    if (notSingleEle(_._$wrap)) {
      throw new Error(
        'FullSizeVideo: require options object has a single wrap.'
      );
    }

    if (notSingleEle(_._$videoWrap)) {
      throw new Error(
        'FullSizeVideo: require options object has a single videoWrap.'
      );
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
    return getSizeAspectFill(
      videoWidth,
      videoHeight,
      global.innerWidth,
      global.innerHeight
    );
  }

  getVolume() {
    const _ = this;

    if (isNotDef(_._$video) || notSingleEle(_._$video)) return null;

    const video = _._$video.get(0);
    if (not(isVideoElement)(video)) return null;

    return video.volume;
  }

  setVolume(volume) {
    const _ = this;

    if (not(isNumber)(volume))
      throw new TypeError(
        'FullSizeVideo: setVolume require a number parameter.'
      );
    if (gt(volume)(0) || lt(volume)(1))
      throw new Error(
        'FullSizeVideo: setVolume require a number between 0 and 1.'
      );

    if (isNotDef(_._$video) || notSingleEle(_._$video)) return _;

    const video = _._$video.get(0);
    if (not(isVideoElement)(video)) return _;

    video.volume = volume;

    return _;
  }

  mute(flag) {
    const _ = this;

    const video = _._$video.get(0);
    video.muted = flag;

    return _;
  }

  play() {
    const _ = this;

    if (isNotDef(_._$video) || notSingleEle(_._$video)) return _;

    const video = _._$video.get(0);
    if (not(isVideoElement)(video)) return _;

    /*
    if (truthy(_._isPlaying)) return _;

    if (_._subscribePlay) {
      _._subscribePlay.unsubscribe();
      _._subscribePlay = null;
    }
    */

    _._isPlaying = true;

    console.log('_._isPlaying :', _._isPlaying);

    // TODO: when call play, pause, stop, seek randomly
    const promise = video.play();

    _._play$ = isDefined(promise) ? from(promise) : null;

    _._subscribePlay = _._play$.subscribe(
      x => {
        console.log('resolve play. play. :', x);
      },
      error => {
        console.log('reject play observable. play. :', error);
      },
      y => {
        console.log('complete play observable. play. :', y);
      }
    );

    return _;
  }

  pause() {
    const _ = this;

    if (isNotDef(_._$video) || notSingleEle(_._$video)) return _;

    const video = _._$video.get(0);
    if (not(isVideoElement)(video)) return _;

    _._isPlaying = false;

    if (_._subscribePlay) _._subscribePlay.unsubscribe();

    if (isDefined(_._play$)) {
      console.log('there is _._play$. pause.');

      _._subscribePlay = _._play$.subscribe(
        () => {
          if (falsy(_._isPlaying)) {
            console.log('resolve play. pause.');
            video.pause();
          }
        },
        error => {
          console.log('reject play observable. pause. :', error);
        },
        () => {
          console.log('complete play observable. pause.');
        }
      );
    } else {
      console.log('no promise. pause.');
      video.pause();
    }

    return _;
  }

  stop() {
    const _ = this;

    if (isNotDef(_._$video) || notSingleEle(_._$video)) return _;

    const video = _._$video.get(0);
    if (not(isVideoElement)(video)) return _;

    _._isPlaying = false;

    if (_._subscribePlay) _._subscribePlay.unsubscribe();

    if (isDefined(_._play$)) {
      console.log('there is _._play$. stop.');

      _._subscribePlay = _._play$.subscribe(
        () => {
          if (falsy(_._isPlaying)) {
            console.log('resolve play. stop.');
            video.pause();
            video.currentTime = 0;
          }
        },
        error => {
          console.log('reject play observable. stop. :', error);
        },
        () => {
          console.log('complete play observable. stop.');
        }
      );
    } else {
      console.log('no promise. stop.');
      video.pause();
      video.currentTime = 0;
    }

    return _;
  }

  seek(second) {
    const _ = this,
      opt = _._option;

    if (isNotDef(_._$video) || notSingleEle(_._$video)) return _;

    const video = _._$video.get(0);
    if (not(isVideoElement)(video)) return _;

    // TODO:

    console.log('video.currentTime :', video.currentTime);
    console.log('video.duration :', video.duration);

    if (allOf(isFunction(opt.endedCallback), lte(second)(video.duration))) {
      console.log('end ?');
      video.currentTime = video.duration;

      opt.endedCallback.call(_, {
        currentTime: video.duration,
        duration: video.duration
      });
    } else {
      console.log('no end');
      video.currentTime = second;
    }

    return _;
  }

  setResizeEventHandler(flag) {
    if (not(isBoolean)(flag))
      throw new TypeError(
        'FullSizeVideo: setResizeEventHandler require boolean parameter.'
      );

    const _ = this,
      evtName = `resize.kihon.fullsizevideo.${_._uniqueId}`;

    $(_._global).off(evtName, _._proxy.resizeEventHandler);

    if (flag) $(_._global).on(evtName, _._proxy.resizeEventHandler);

    return _;
  }

  resize(evt) {
    const _ = this,
      opt = _._option,
      size = _.getVideoSizeAspectFill(
        opt.videoWidth,
        opt.videoHeight,
        _._global
      );

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
      videoSourceTpl += `<source src="${url}" type="video/${
        ext === 'ogv' ? 'ogg' : ext
      }"></source>`;
    });

    _._$video = $(`<video>${videoSourceTpl}</video>`);

    _._$videoWrap.append(_._$video);

    const video = _._$video.get(0);
    if (opt.isAutoPlay === true) video.setAttribute('autoplay', '');
    if (opt.isMuted === true) {
      video.setAttribute('muted', '');
      _.mute(true);
    }
    if (opt.isLoop === true) video.setAttribute('loop', '');
  }

  _setCallbacks() {
    const _ = this,
      opt = _._option,
      video = _._$video.get(0),
      isVideoHasOnended = video.hasOwnProperty('onended');

    if (isFunction(opt.canplayCallback)) {
      _._$video.on(`canplay.kihon.fullsizevideo.${_._uniqueId}`, evt => {
        opt.canplayCallback.call(_, {
          event: evt
        });
      });
    }

    if (
      isFunction(opt.timeupdateCallback) ||
      allOf(falsy(isVideoHasOnended), isFunction(opt.endedCallback))
    ) {
      _._$video.on(`timeupdate.kihon.fullsizevideo.${_._uniqueId}`, evt => {
        if (isFunction(opt.timeupdateCallback)) {
          opt.timeupdateCallback.call(_, {
            event: evt,
            currentTime: video.currentTime,
            duration: video.duration
          });
        }

        if (
          allOf(
            isFunction(opt.endedCallback),
            lte(video.currentTime)(video.duration)
          )
        ) {
          // if (isFunction(opt.endedCallback) && (video.currentTime >= video.duration)) {
          opt.endedCallback.call(_, {
            event: evt,
            currentTime: video.currentTime,
            duration: video.duration
          });
        }
      });
    }

    if (allOf(truthy(isVideoHasOnended), isFunction(opt.endedCallback))) {
      _._$video.on(`ended.kihon.fullsizevideo.${_._uniqueId}`, evt => {
        opt.endedCallback.call(_, {
          event: evt,
          currentTime: video.currentTime,
          duration: video.duration
        });
      });
    }
  }

  _setWrapAlign(
    alignX = 'center',
    alignY = 'center',
    modifiedSize = { width: 0, height: 0 },
    global = window
  ) {
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
