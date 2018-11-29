// e.g : https://github.com/Reactive-Extensions/RxJS/blob/master/doc/howdoi/eventemitter.md

import { Subject } from 'rxjs/Subject';
import { not, isNotDef, isString, isFunction, hasOwnProp } from './_util';

const createFuncName = name => `$${name}`;

class Emitter {
  constructor() {
    this.subjects = {};
  }

  emit(name, data) {
    if (not(isString)(name)) throw new TypeError('Emitter: name variable type should be string.');

    const _ = this,
      fnName = createFuncName(name);

    if (isNotDef(_.subjects[fnName])) _.subjects[fnName] = new Subject();

    _.subjects[fnName].next(data);

    return _;
  }

  listen(name, handler) {
    if (not(isString)(name)) throw new TypeError('Emitter: name variable type should be string.');

    if (not(isFunction)(handler)) throw new TypeError('Emitter: handler variable type should be function.');

    const _ = this,
      fnName = createFuncName(name);

    if (isNotDef(_.subjects[fnName])) _.subjects[fnName] = new Subject();

    return _.subjects[fnName].subscribe(handler);
  }

  dispose() {
    const _ = this,
      subjects = _.subjects;

    for (const prop in subjects) {
      if (hasOwnProp.call(subjects, prop)) subjects[prop].unsubscribe();
    }

    _.subjects = {};

    return _;
  }
}

export default Emitter;
