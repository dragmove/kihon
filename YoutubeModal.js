import $ from 'jquery';
import { not, isDefined, isNotDef, isString, isObject, getUriCombinedParams } from './_util';
import Modal from './Modal';

class YoutubeModal extends Modal {
  constructor(options) {
    super(options);

    const _ = this;

    if (not(isString)(_._option.iFrameWrapSelector)) {
      throw new TypeError('YoutubeModal: iFrameWrapSelector variable type of options should be string.');
    }

    if (not(isObject)(_._option.youtube)) {
      throw new TypeError('YoutubeModal: youtube variable type of options should be object.');
    }

    if (not(isString)(_._option.youtube.id) || _._option.youtube.id.length <= 0) {
      throw new TypeError('YoutubeModal: id variable type of youtube object should be string.');
    }

    _._$iFrameWrap = null;

    _._$youtubeIFrame = null;

    _._youtubeSrc = '';
  }

  /*
   * public methods
   */
  // override
  init() {
    super.init();

    this._setContents();

    return this;
  }

  // override
  show() {
    super.show();

    const _ = this;

    if (isNotDef(_._$youtubeIFrame) || _._$youtubeIFrame.length <= 0) return _;

    _._$youtubeIFrame.attr('src', _._youtubeSrc);

    return _;
  }

  // override
  hide() {
    super.hide();

    const _ = this;

    if (isNotDef(_._$youtubeIFrame) || _._$youtubeIFrame.length <= 0) return _;

    _._$youtubeIFrame.attr('src', '');

    return _;
  }

  // override
  destroy(obj = null) {
    // {isRemoveNode: true/false, isRemoveOverlay: true/false}

    const _ = this;

    _._$iFrameWrap = null;

    if (isDefined(_._$youtubeIFrame)) {
      _._$youtubeIFrame.attr('src', '');
      _._$youtubeIFrame = null;
    }
    _._youtubeSrc = '';

    super.destroy(obj);

    return _;
  }

  changeYoutubeIFrame(youtube = { id: '', width: 0, height: 0, playerVars: {} }) {
    const _ = this;

    if (isNotDef(youtube)) return _;

    let opt = _._option;

    if (isString(youtube)) {
      // input only youtubeId
      opt.youtube.id = youtube;
    } else if (isObject(youtube)) {
      // input youtube options
      opt.youtube = $.extend(true, opt.youtube, youtube);
    }

    if (isDefined(_._$youtubeIFrame)) _._$youtubeIFrame.remove();

    _._setContents();

    return _;
  }

  getYoutubeIFrame() {
    return this._$youtubeIFrame;
  }

  getYoutubeId() {
    const _ = this;

    if (!_._option.youtube || !_._option.youtube.id) return '';

    return _._option.youtube.id;
  }

  /*
   * private methods
   */
  _setContents() {
    const _ = this,
      opt = _._option,
      w = opt.youtube.width ? opt.youtube.width : '100%',
      h = opt.youtube.height ? opt.youtube.height : '100%';

    let url = `https://www.youtube.com/embed/${opt.youtube.id}`;

    if (isObject(opt.youtube.playerVars)) {
      // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5#Parameters
      url = getUriCombinedParams(url, opt.youtube.playerVars);
    }

    _._$youtubeIFrame = $(`<iframe width="${w}" height="${h}" src="${url}" frameborder="0" allowfullscreen></iframe>`);

    _._youtubeSrc = _._$youtubeIFrame.attr('src');

    _._$iFrameWrap = $(opt.iFrameWrapSelector, _._$wrap);
    _._$iFrameWrap.append(_._$youtubeIFrame);
  }
}

export default YoutubeModal;
