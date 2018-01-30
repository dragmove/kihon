# kihon
[![npm version](https://badge.fury.io/js/kihon.svg)](https://www.npmjs.com/package/kihon)


## About
* Javascript Library to help developers make Interactive UI
* Dependency to jQuery 3.x.x

Thanks to whoever use kihon.


## Install  
```javascript  
npm install kihon --save-dev  
```


## Components
FullSizeBg  
ImageLoader  
Navi  
NaviHasTimer  
Overlay  
  

## Getting Started
In Node.js environment :
```javascript
will update soon.
```

In Browser environment :
```javascript
import Kihon from 'kihon'; // Import all components
import FullSizeBg from 'kihon/FullSizeBg' // Import single component. You can use tree-shaking. (https://webpack.js.org/guides/tree-shaking/)
```
  

## Examples
### FullSizeBg 
```html
<div class="wrap-full-size-bg"> <!-- can rename class you want -->
    <div class="full-size-bg"> <!-- can rename class you want -->
        <img src="https://images.unsplash.com/photo-1474496517593-015d8b59450d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&s=49563d997d36faad03833ddab8d15c0a" alt="">
    </div>
</div>
```  

```css
html, body {margin: 0; padding: 0;}
.wrap-full-size-bg {position: relative; overflow: hidden; background: #333;}
.full-size-bg {position: absolute; top: 0; left: 0; width: 100%; height: 100%;}
```

```js
import FullSizeBg from 'kihon/FullSizeBg';

var fullSizeBg = new FullSizeBg({
    wrap: $('.wrap-full-size-bg'), // wrap
    imgWrap: $('.full-size-bg'), // image wrap
    imgWidth: 4592, // natural image width
    imgHeight: 3064, // natural image height
    alignX: 'center', // 'left' or 'center' or 'right'
    alignY: 'center' // 'top' or 'center' or 'bottom'
}).init();

// set resize event handler
// fullSizeBg.setResizeEventHandler(true / false);

// resize
// fullSizeBg.resize();

// get image size based on aspect fill calculation
// console.log( fullSizeBg.getImageSizeAspectFill(srcWidth, srcHeight) );

// destroy
// fullSizeBg.destroy();
```  


### ImageLoader
```javascript
import ImageLoader from 'kihon/ImageLoader';

var imgLoader = new ImageLoader({
    loadCompleteCallback: function (obj) {
        console.log('loadComplete :', obj);
        console.log('imgLoader.isFinished() :', imgLoader.isFinished());
        console.log('imgLoader.getLoadedImgs() :', imgLoader.getLoadedImgs());
    },
    loadPerCompleteCallback: function (obj) {
        console.log('loadPerComplete :', obj);
        console.log('imgLoader.isFinished() :', imgLoader.isFinished());
        console.log('imgLoader.getLoadedImgs() :', imgLoader.getLoadedImgs());
    },
    loadErrorCallback: function (obj) {
        console.log('loadError :', obj)
        console.log('imgLoader.isFinished() :', imgLoader.isFinished());
        console.log('imgLoader.getLoadedImgs() :', imgLoader.getLoadedImgs());
    }
});

imgLoader.start([
    'https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?dpr=2&auto=compress,format&crop=entropy&fit=crop&w=767&h=511&q=80&cs=tinysrgb',
    'https://images.unsplash.com/error-dummy-url.png',
    'https://images.unsplash.com/photo-1459666644539-a9755287d6b0?dpr=2&auto=compress,format&crop=entropy&fit=crop&w=767&h=463&q=80&cs=tinysrgb'
]);

// get flag finish load all images
// console.log( imgLoader.isFinished() );

// get array has loaded images
// console.log( imgLoader.getLoadedImgs() );

// get percentage number(0 ~ 1)
// console.log( imgLoader.getPercentageLoaded() );

// destroy
// imgLoader.destroy();
```  


### Navi
```html
<ul class="navi">
    <li><a href="#">Thanks</a></li>
    <li><a href="#">to</a></li>
    <li><a href="#">whoever</a></li>
    <li><a href="#">use</a></li>
    <li><a href="#">kihon.</a></li>
</ul>
```  

```css
.navi li a.on {color: #D50000;}
```

```javascript
import Navi from 'kihon/Navi';

var navi = new Navi({
    wrap: $('.navi'),
    btns: $('.navi li a'),
    mouseoverCallback: function (obj) { // { event, btn, index }
        console.log('mouseoverCallback :', obj);
    },
    mouseoutCallback: function (obj) { // { event, btn, index }
        console.log('mouseoutCallback :', obj);
    },
    mousedownCallback: function (obj) { // { event, btn, index }
        console.log('mousedownCallback :', obj);
    },
    mouseupCallback: function (obj) { // { event, btn, index }
        console.log('mouseupCallback:', obj);
    },
    clickCallback: function (obj) { // { event, btn, prevActivatedIndex, index }
        console.log('clickCallback :', obj);
    },
    activateCallback: function (obj) { // { prevActivatedIndex, index }
        console.log('activateCallback :', obj);

        var btns = $(navi.getBtns()),
            btn = $(navi.getBtn(obj.index));

        btns.removeClass('on');
        btn.addClass('on');
    }
}).init();

// get all buttons
// console.log( navi.getBtns() );

// get one button. (1st button's index is 1.)
// console.log( navi.getBtn(button index) );

// get activated button index
// console.log( navi.getActivatedIndex() );

// activate one button, and deactivate other buttons. (1st button's index is 1.)
// navi.activate(button index);

// set buttons event handler
// navi.setBtnsEventHandler(true / false);

// destroy
// navi.destroy();
```  


### NaviHasTimer
```html
<ul class="navi">
    <li><a href="#">Thanks</a></li>
    <li><a href="#">to</a></li>
    <li><a href="#">whoever</a></li>
    <li><a href="#">use</a></li>
    <li><a href="#">kihon.</a></li>
</ul>
```  

```css
.navi {width: 75px; background-color: #CFD8DC;}
.navi li a.on {color: #D50000;}
```

```javascript
import NaviHasTimer from 'kihon/NaviHasTimer';

var navi = new NaviHasTimer({
    wrap: $('.navi'),
    btns: $('.navi li a'),
    mouseoverCallback: function (obj) { // { event, btn, index }
        console.log('mouseoverCallback :', obj);
        
        activateBtn(obj.index);
    },
    mouseoutCallback: function (obj) { // { event, btn, index }
        console.log('mouseoutCallback :', obj);
    },
    mousedownCallback: function (obj) { // { event, btn, index }
        console.log('mousedownCallback :', obj);
    },
    mouseupCallback: function (obj) { // { event, btn, index }
        console.log('mouseupCallback:', obj);
    },
    clickCallback: function (obj) { // { event, btn, prevActivatedIndex, index }
        console.log('clickCallback :', obj);
    },
    activateCallback: function (obj) { // { prevActivatedIndex, index }
        console.log('activateCallback :', obj);

        activateBtn(obj.index);
    }
}).init();

function activateBtn(index) {
    var btns = $(navi.getBtns()),
        btn = $(navi.getBtn(index));

    btns.removeClass('on');
    btn.addClass('on');
}

// get all buttons
// console.log( navi.getBtns() );

// get one button. (1st button's index is 1.)
// console.log( navi.getBtn(button index) );

// get activated button index
// console.log( navi.getActivatedIndex() );

// activate one button, and deactivate other buttons. (1st button's index is 1.)
// navi.activate(button index);

// set buttons event handler
// navi.setBtnsEventHandler(true / false);

// destroy
// navi.destroy();
```  


### Overlay
```javascript
import Overlay from 'kihon/Overlay';

var overlay = new Overlay({
    // class: 'overlay',
    // color: '#000',
    // opacity: 0.5,
    // appendTo: $('body'),
    clickCallback: function (evt) {
        console.log('Kihon.Overlay clickCallback :', evt);
    }
}).init();

overlay.show();

// set node event handler
// overlay.setNodeEventHandler(true / false);

// get node
// console.log( overlay.getNode() );

// set css
// overlay.setCss({'background-color': '#f00', ...});

// append to other element
// overlay.appendTo(parent element);

// show overlay
// overlay.show();

// hide overlay
// overlay.hide();

// destroy overlay
// overlay.destroy();
```  


## Contact
* @Website : http://www.dragmove.com
* @Blog : http://blog.naver.com/dragmove
* @LinkedIn : https://www.linkedin.com/in/hyun-seok-kim-99748295/
* @E-mail : dragmove@gmail.com


## License
[MIT license](http://danro.mit-license.org/).