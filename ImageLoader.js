import {not, isNotDef, isFunction} from './_util';

class ImageLoader {
  constructor(options) {
    if (isNotDef(options)) {
      throw new Error('ImageLoader: require options object when create instance.');
    }

    const _ = this;

    _._loadCompleteCallback = isFunction(options.loadCompleteCallback) ? options.loadCompleteCallback : null;
    _._loadPerCompleteCallback = isFunction(options.loadPerCompleteCallback) ? options.loadPerCompleteCallback : null;
    _._loadErrorCallback = isFunction(options.loadErrorCallback) ? options.loadErrorCallback : null;

    _._isLoading = false;
    _._isFinish = false;

    _._loadedImgs = [];
    _._imgs = [];
    _._imgUrls = [];

    _._loadingIndex = 0;
    _._loadFailNum = 0;
    _._loadSuccessNum = 0;
    _._loadCompleteNum = 0;

    _._percentageLoaded = 0;
  }

  /*
   * public methods
   */
  /**
   * start load images
   *
   * @method start
   * @param {Array} imgUrls
   * @returns {Object} return context
   */
  start(imgUrls) {
    const _ = this;

    if (isNotDef(imgUrls) || not(Array.isArray)(imgUrls)) {
      throw TypeError('ImageLoader: start require array parameter');
    }

    if (imgUrls.length > 0) {
      _._imgUrls = imgUrls;

      if (!_._isLoading) {
        _._isLoading = true;
        _._isFinish = false;

        _._loadNext();
      }
    }

    return _;
  }

  /**
   * get flag finish load all images
   *
   * @method isFinished
   * @returns {Boolean} return boolean
   */
  isFinished() {
    return this._isFinish;
  }

  /**
   * get array has loaded images
   *
   * @method getLoadedImgs
   * @returns {Array} return array
   */
  getLoadedImgs() {
    return this._loadedImgs;
  }

  /**
   * get percentage number(0 ~ 1)
   *
   * @method getPercentageLoaded
   * @returns {Number} return number(0 ~ 1)
   */
  getPercentageLoaded() {
    return this.percentageLoaded;
  }

  /**
   * destroy
   *
   * @method destroy
   * @returns {Object} return context
   */
  destroy() {
    const _ = this;

    if (_._isLoading === true) {
      let img;
      for (let i = 0, max = _._imgs.length; i < max; i++) {
        img = _._imgs[i];

        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      }
    }

    _._loadCompleteCallback = null;
    _._loadPerCompleteCallback = null;
    _._loadErrorCallback = null;

    _._isLoading = false;
    _._isFinish = false;

    _._loadedImgs = [];
    _._imgs = [];
    _._imgUrls = [];

    _._loadingIndex = 0;
    _._loadFailNum = 0;
    _._loadSuccessNum = 0;
    _._loadCompleteNum = 0;

    _._percentageLoaded = 0;

    return _;
  }

  /*
   * private methods
   */
  _loadNext() {
    const _ = this;

    if (_._loadingIndex >= _._imgUrls.length) {
      _._isLoading = false;
      _._isFinish = true;

      if (_._loadCompleteCallback) _._loadCompleteCallback.call(null, {
        imgs: _._loadedImgs,
        percentage: _._percentageLoaded
      });

      return;
    }

    let img = document.createElement('img');

    img.onload = function (evt) {
      const img = this;
      if (img) _._loadedImgs.push(img);

      _._loadingIndex++;
      _._loadSuccessNum++;
      _._loadCompleteNum++;
      _._percentageLoaded = _._loadCompleteNum / _._imgUrls.length;

      if (_._loadPerCompleteCallback) {
        _._loadPerCompleteCallback.call(null, {
          event: evt,
          img: img,
          percentage: _._percentageLoaded
        });
      }

      _._loadNext();
    };

    img.onerror = function (evt) {
      const img = this;
      _._loadedImgs.push(null);

      _._loadingIndex++;
      _._loadFailNum++;
      _._loadCompleteNum++;
      _._percentageLoaded = _._loadCompleteNum / _._imgUrls.length;

      if (_._loadErrorCallback) {
        _._loadErrorCallback.call(null, {
          event: evt,
          img: img,
          percentage: _._percentageLoaded
        });
      }

      _._loadNext();
    };

    img.src = _._imgUrls[_._loadingIndex];

    _._imgs.push(img);
  }
}

export default ImageLoader;