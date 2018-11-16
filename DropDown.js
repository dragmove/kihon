import { interval, fromEvent, from } from 'rxjs';
import { switchMap, mapTo } from 'rxjs/operators';

class DropDown {
  constructor(options) {
    const _ = this;
  }

  init(obj = null) {
    console.log('init DropDown');

    const promise_1 = new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve('promise 1');
      }, 1000);
    });

    const promise_2 = new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve('promise 1');
      }, 2000);
    });

    /*
    promise_1.then(val => {
      console.log('promise_1 val :', val);
    });

    promise_2.then(val => {
      console.log('promise_2 val :', val);
    });
    */

    const prom$ = from(promise_1);
    const promNext$ = prom$.pipe(switchMap(val => promise_2));

    console.log(new Date().getTime());

    promNext$.subscribe(val => {
      console.log('subscribe :', val);

      console.log(new Date().getTime());
    });

    //
    // RxJS v6+
    //emit result of promise
    const promiseSource = from(new Promise(resolve => resolve('Hello World!')));
    //output: 'Hello World'
    const subscribe = promiseSource.subscribe(
      val => console.log(val),
      () => {},
      () => {
        console.log('complete');
      }
    );

    /*
    //emit every click
    const source = fromEvent(document, 'click');
    //if another click comes within 3s, message will not be emitted
    const example = source.pipe(
      switchMap(val => interval(3000).pipe(mapTo('Hello, I made it!')))
    );
    //(click)...3s...'Hello I made it!'...(click)...2s(click)...
    const subscribe = example.subscribe(val => console.log(val));
    */
  }
}

export default DropDown;
