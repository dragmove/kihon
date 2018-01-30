import Navi from './Navi';
import {isDefined, isNotDef, isNumber} from './_util';

class NaviHasTimer extends Navi {
  constructor(options) {
    if (isNotDef(options)) throw new Error('NaviHasTimer: require options object when create instance.');

    super(options);

    const _ = this;

    // set default timer interval 0.5 sec.
    _._timerInterval = (isNumber(options.timerInterval) && options.timerInterval >= 0) ? options.timerInterval : 500;

    _._timer = null;
  }

  /*
   * private methods
   */
  // override
  _mouseoverBtnEventHandler(evt) {
    this._removeTimer();

    super._mouseoverBtnEventHandler(evt);
  }

  // override
  _mouseoutBtnEventHandler(evt) {
    const _ = this;

    super._mouseoutBtnEventHandler(evt);

    _._timer = setTimeout(() => {
      _._activateByTimer(_._activatedIndex);
    }, _._timerInterval);
  }

  _activateByTimer(index) {
    super.activate(index);

    return this;
  }

  _removeTimer() {
    const _ = this;

    if (isDefined(_._timer)) clearTimeout(_._timer);
    _._timer = null;

    return _;
  }

  /*
   * public methods
   */
  // getBtns()
  // getBtn(index)
  // getActivatedIndex()
  // activate(index)
  // setBtnsEventHandler(true / false)

  // override
  destroy() {
    this._removeTimer();

    super.destroy();

    return this;
  }
}

export default NaviHasTimer;