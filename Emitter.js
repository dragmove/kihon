// TODO:

/*
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/howdoi/eventemitter.md

import { Subject } from 'rxjs/Subject';
import { isNotDef, hasOwnProp } from './util';

function createFuncName(name) {
    return '$' + name;
}

class Emitter {
    constructor() {
        const _ = this;

        _.subjects = {};
    }

    emit(name, data) {
        const _ = this,
            fnName = createFuncName(name);

        if (isNotDef(_.subjects[fnName])) _.subjects[fnName] = new Subject();

        _.subjects[fnName].next(data);

        return _;
    }

    listen(name, handler) {
        const _ = this,
            fnName = createFuncName(name);

        if (isNotDef(_.subjects[fnName])) _.subjects[fnName] = new Subject();

        return _.subjects[fnName].subscribe(handler);
    }

    dispose() {
        const _ = this,
            subjects = _.subjects;

        for (let prop in subjects) {
            if (hasOwnProp.call(subjects, prop)) subjects[prop].unsubscribe();
        }

        _.subjects = {};

        return _;
    }
}

export default Emitter;
*/
