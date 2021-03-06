# kihon
[![npm version](https://badge.fury.io/js/kihon.svg)](https://www.npmjs.com/package/kihon)

kihon is a Bundle of Lite components which provide straightforward Interactive UI.


## About
* Dependency to jQuery 3.x.x
* Support ES2015+ (can also be used directly in the browser)
* Support Webpack [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)

Thanks to whoever use kihon.


## Install  
```javascript  
npm install kihon --save-dev  
```


## Components
[Emitter](https://dragmove.github.io/pages/kihon/examples/emitter.html) (dependency to [RxJS](https://github.com/reactivex/rxjs))  
[FullSizeBg](https://dragmove.github.io/pages/kihon/examples/full-size-bg.html)  
[FullSizeVideo](https://dragmove.github.io/pages/kihon/examples/full-size-video.html)  
[HorizontalScrollingNavi](https://dragmove.github.io/pages/kihon/examples/horizontal-scrolling-navi.html) (dependency to [Dragdealer.js](https://github.com/skidding/dragdealer))  
[ImageLoader](https://dragmove.github.io/pages/kihon/examples/image-loader.html)  
[Navi](https://dragmove.github.io/pages/kihon/examples/navi.html)  
[NaviHasTimer](https://dragmove.github.io/pages/kihon/examples/navi-has-timer.html)  
[Overlay](https://dragmove.github.io/pages/kihon/examples/overlay.html)  
[Modal](https://dragmove.github.io/pages/kihon/examples/modal.html)  
[YoutubeModal](https://dragmove.github.io/pages/kihon/examples/youtube-modal.html)  
[Video](https://dragmove.github.io/pages/kihon/examples/video.html)  
  

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
### Emitter 
```js
import Emitter from 'kihon/Emitter';

var emitter = new Emitter();

var subscribeHello = emitter.listen('hello', function(data) {
    console.log('hello :', data);
});

var subscribeWorld_1 = emitter.listen('world', function(data) {
        console.log('world_1 :', data);
    }),
    subscribeWorld_2 = emitter.listen('world', function(data) {
        console.log('world_2 :', data);
    });

// Unsubscribe subscriptions.
// subscribeHello.unsubscribe();
// subscribeWorld_1.unsubscribe();
// subscribeWorld_2.unsubscribe();

emitter.emit('hello', { value: 1 });
emitter.emit('world', { value: 99 });

/*
 * Emitter public methods
 */
// set event, event handler
// emitter.listen(event name, event handler);

// emii event
// emitter.emit(event name, data)

// dispose of all subscriptions
// emitter.dispose();
```  


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

/*
 * FullSizeBg public methods
 */
// set resize event handler
// fullSizeBg.setResizeEventHandler(true / false);

// resize
// fullSizeBg.resize();

// get image size based on aspect fill calculation
// console.log( fullSizeBg.getImageSizeAspectFill(srcWidth, srcHeight) );

// destroy
// fullSizeBg.destroy();
```  


### FullSizeVideo
```html
<div class="wrap-full-size-video"> <!-- can rename class you want -->
    <div class="wrap-video"></div> <!-- can rename class you want -->
</div>
```  

```css
html, body {margin: 0; padding: 0;}
.wrap-full-size-video {position: relative; overflow: hidden; background: #333;}
.wrap-video {position: absolute;}
.wrap-video video {position: absolute; top: 0; left: 0;}
```

```js
import FullSizeVideo from 'kihon/FullSizeVideo';

var fullSizeVideo = new FullSizeVideo({
    outerWrap: $('.wrap-full-size-video'), // outer wrap
    wrap: $('.wrap-video'), // video wrap
    videoUrls: ['https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4', 'https://www.quirksmode.org/html5/videos/big_buck_bunny.ogv'], // video sources
    videoWidth: 640, // video width
    videoHeight: 360, // video height
    alignX: 'center', // left, center, right
    alignY: 'center', // top, center, bottom
    isAutoPlay: false, // auto play flag
    isLoop: false, // loop flag
    isMuted: false, // mute flag
    canplayCallback: function (obj) { // {event}
        console.log('Kihon.FullSizeVideo canplayCallback obj :', obj);
    },
    timeupdateCallback: function (obj) { // {event, currentTime, duration}
        console.log('Kihon.FullSizeVideo timeupdateCallback obj :', obj);
    },
    endedCallback: function (obj) { // {event, currentTime, duration}
        console.log('Kihon.FullSizeVideo endedCallback obj :', obj);
    }
}).init();

setTimeout(function () {
    fullSizeVideo.play();
}, 2000);

setTimeout(function () {
    fullSizeVideo.pause();
}, 5000);

setTimeout(function () {
    fullSizeVideo.seek(5).play();
}, 8000);

/*
 * FullSizeVideo public methods
 */
// get video node
// console.log( fullSizeVideo.getVideoNode() );

// get video size based on aspect fill calculation
// console.log( fullSizeVideo.getVideoSizeAspectFill(srcWidth, srcHeight) );

// get volume (0 ~ 1)
// console.log( fullSizeVideo.getVolume() );

// set volume
// console.log( fullSizeVideo.setVolume(0 ~ 1) );

// play video
// fullSizeVideo.play();

// pause video
// fullSizeVideo.pause();

// stop video
// fullSizeVideo.stop();

// seek video
// fullSizeVideo.seek(second);

// set resize event handler
// fullSizeVideo.setResizeEventHandler(true / false);

// resize
// fullSizeVideo.resize();

// destroy
// fullSizeVideo.destroy();
```  


### HorizontalScrollingNavi
```html
<div class="scrolling-navi"> <!-- can rename class you want -->
    <div class="handle"> <!-- can rename class you want -->
        <ul class="btns"> <!-- can rename class you want -->
            <li><a href="#">kihon:</a></li>
            <li><a href="#">Thanks</a></li>
            <li><a href="#">to</a></li>
            <li><a href="#">whoever</a></li>
            <li><a href="#">use</a></li>
            <li><a href="#">kihon.</a></li>
            <li><a href="#">This</a></li>
            <li><a href="#">is</a></li>
            <li><a href="#">HorizontalScrollingNavi</a></li>
        </ul>
    </div>
</div>
```  

```css
html, body {margin: 0; padding: 0; width: 100%;}
.scrolling-navi {position: relative; width: 100%; height: 50px; overflow: hidden; background-color: #CFD8DC;}
.scrolling-navi .handle {position: absolute; top: 0; left: 0;}
.scrolling-navi .btns {display: block; position: relative; margin: 0; padding: 0; font-size: 0; white-space: nowrap;}
.scrolling-navi .btns:after {content: ""; display: block; clear: both;}
.scrolling-navi .btns li {display: inline-block; height: 50px; line-height: 50px;}
.scrolling-navi .btns li a {display: block; margin-left: 0; margin-right: 0; padding-left: 8px; padding-right: 8px; font-size: 15px; font-weight: bold;text-align: center; text-decoration: none; }
.scrolling-navi .btns li a.on {color: #FF5252;}
```

```js
import HorizontalScrollingNavi from 'kihon/HorizontalScrollingNavi';

// set HorizontalScrollingNavi extends Navi
var wrap = $('.scrolling-navi');

var navi = new HorizontalScrollingNavi({
    /*
     * Kihon.Navi options
     */
    btns: $('.btns li a', wrap), // navi buttons
    mouseoverCallback: function (obj) { // {event, btn, index}
        console.log('Kihon.HorizontalScrollingNavi mouseoverCallback :', obj);
    },
    mouseoutCallback: function (obj) { // {event, btn, index}
        console.log('Kihon.HorizontalScrollingNavi mouseoutCallback :', obj);
    },
    mousedownCallback: function (obj) { // {event, btn, index}
        console.log('Kihon.HorizontalScrollingNavi mousedownCallback :', obj);
    },
    mouseupCallback: function (obj) { // {event, btn, index}
        console.log('Kihon.HorizontalScrollingNavi mouseupCallback:', obj);
    },
    clickCallback: function (obj) { // {event, btn, prevActivatedIndex, index}
        console.log('Kihon.HorizontalScrollingNavi clickCallback :', obj);
    },
    activateCallback: function (obj) { // {prevActivatedIndex, index}
        console.log('Kihon.HorizontalScrollingNavi activateCallback :', obj);

        var btns = $(navi.getBtns()),
            btn = $(navi.getBtn(obj.index));

        btns.removeClass('on');
        btn.addClass('on');
    },

    /*
     * Kihon.HorizontalScrollingNavi options
     */
    wrap: wrap, // wrap
    handleClass: 'handle', // handle class
    speed: 0.25, // how fast the handle will slide to position after you mouse up (0 ~ 1)
    positionedCallback: function(x, y) {
        // called when releasing handle or calling setX / setRatioX method, with the projected x, y position of the handle. projected value means the value the slider will have after finishing a sliding animation
        console.log('Kihon.HorizontalScrollingNavi positionedCallback :', x, navi.getOffsetRatioByPosition(x));
    },
    dragStartCallback: function (x, y) {
        // called at the beginning of a drag with handle initial x, y values.
        console.log('Kihon.HorizontalScrollingNavi dragStartCallback :', x, y);
    },
    dragStopCallback: function (x, y) {
        // same as callback(x, y) but only called after a drag, not after call setX / setRatioX method.
        console.log('Kihon.HorizontalScrollingNavi dragStopCallback :', x, y);
    },
    animationCallback: function(x, y) {
        // called every animation loop, as long as the handle is being dragged or in the process of a sliding animation.
        console.log('Kihon.HorizontalScrollingNavi animationCallback :', x, y);
    }
}).init();

/*
 * HorizontalScrollingNavi public methods
 */
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

// get navi handle position ratio x (0 ~ 1)
// console.log( navi.getRatioX() );

// get offset ratio by position
// console.log( navi.getOffsetRatioByPosition(-99) );

// get handle node
// console.log( navi.getHandle() );

// set navi handle position by x
// navi.setX(-99);

// set navi handle position by ratio x (0 ~ 1)
// navi.setRatioX(0.75);

// get flag navi is draggbale
// console.log( navi.isDraggable() );

// enable dragging
// navi.enable();

// disable dragging
// navi.disable();

// set resize event handler
// navi.setResizeEventHandler(true / false);

// resize
// navi.resize();

// destroy
// navi.destroy();
```  


### ImageLoader
```javascript
import ImageLoader from 'kihon/ImageLoader';

var imgLoader = new ImageLoader({
    loadCompleteCallback: function (obj) { // data about all images. {imgs, percentage}
        console.log('Kihon.ImageLoader loadComplete :', obj);
        console.log('Kihon.ImageLoader loadComplete - imgLoader.isFinished() :', imgLoader.isFinished());
        console.log('Kihon.ImageLoader loadComplete - imgLoader.getLoadedImgs() :', imgLoader.getLoadedImgs());
    },
    loadPerCompleteCallback: function (obj) { // data about per image. {event, img, percentage}
        console.log('Kihon.ImageLoader loadPerComplete :', obj);
        console.log('Kihon.ImageLoader loadPerComplete - imgLoader.isFinished() :', imgLoader.isFinished());
        console.log('Kihon.ImageLoader loadPerComplete - imgLoader.getLoadedImgs() :', imgLoader.getLoadedImgs());
    },
    loadErrorCallback: function (obj) { // data about per error. {event, img, percentage}
        console.log('Kihon.ImageLoader loadError :', obj);
        console.log('Kihon.ImageLoader loadError - imgLoader.isFinished() :', imgLoader.isFinished());
        console.log('Kihon.ImageLoader loadError - imgLoader.getLoadedImgs() :', imgLoader.getLoadedImgs());
    }
});

imgLoader.start([
    'https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?dpr=2&auto=compress,format&crop=entropy&fit=crop&w=767&h=511&q=80&cs=tinysrgb',
    'https://images.unsplash.com/error-dummy-url.png',
    'https://images.unsplash.com/photo-1459666644539-a9755287d6b0?dpr=2&auto=compress,format&crop=entropy&fit=crop&w=767&h=463&q=80&cs=tinysrgb'
]);

/*
 * ImageLoader public methods
 */
// get flag finish load all images
// console.log( imgLoader.isFinished() );

// get array has loaded images
// console.log( imgLoader.getLoadedImgs() );

// get percentage number(0 ~ 1)
// console.log( imgLoader.getPercentageLoaded() );

// destroy
// imgLoader.destroy();
```  


### Modal
```css
.modal-wrap {position: fixed; top: 0; right: 0; bottom: 0; left: 0;}
.modal {position: relative; display: block; margin: 0 auto; top: 50%; width: 250px; height: 250px; background-color: #CFD8DC; color: #FFFFFF; -webkit-transform: translateY(-50%); -moz-transform: translateY(-50%); -ms-transform: translateY(-50%); -o-transform: translateY(-50%); transform: translateY(-50%);}
.btn-close {position: absolute; top: 0; right: 0; background-color: #FF5252;}
```

```javascript
import Modal from 'kihon/Modal';
// import Overlay from 'kihon/Overlay';

var modal = new Modal({
    wrapClass: 'modal-wrap', // modal wrap class
    contents: '<div class="modal"><p>Kihon.Modal<br>Thanks to whoever use <a href="https://github.com/dragmove/kihon">kihon</a>.</p><a href="#" class="btn-close">close</a></div>', // modal contents html
    // appendTo: $('body'), // element to append modal wrap
    // closeBtnSelector: '.btn-close', // jQuery selector of close button
    // isCloseByClickOutside: true, // hide modal when click outside of modal contents
    // isCloseByEscKey: true, // hide modal when keydown escape key
    showCallback: function () { // call just before show modal
        console.log('Kihon.Modal showCallback :', this);
    },
    hideCallback: function () { // call just before hide modal
        console.log('Kihon.Modal hideCallback :', this);
    },
    // overlay: new Overlay().init()
}).init();

modal.show();

/*
 * Modal public methods
 */
// set close button event handler
// modal.setCloseBtnEventHandler(true / false);

// set modal wrap event handler
// modal.setWrapEventHandler(true / false);

// set escape key event handler
// modal.setEscKeyEventHandler(true / false);

// get modal node
// console.log( modal.getNode() );

// append to other element
// modal.appendTo(parent element);

// show modal
// modal.show();

// hide modal
// modal.hide();

// get flag modal is hide
// console.log( modal.isShow() );

// destroy
// modal.destroy();
// modal.destroy({isRemoveNode: true, isRemoveOverlay: true});
```  


### Navi
```html
<ul class="navi">
    <li><a href="#">kihon:</a></li>
    <li><a href="#">Thanks</a></li>
    <li><a href="#">to</a></li>
    <li><a href="#">whoever</a></li>
    <li><a href="#">use</a></li>
    <li><a href="#">kihon.</a></li>
</ul>
```  

```css
.navi {width: 75px; background-color: #CFD8DC;}
.navi li a.on {color: #FF5252;}
```

```javascript
import Navi from 'kihon/Navi';

var navi = new Navi({
    btns: $('.navi li a'), // navi buttons
    mouseoverCallback: function (obj) { // {event, btn, index}
        console.log('Kihon.Navi mouseoverCallback :', obj);
    },
    mouseoutCallback: function (obj) { // {event, btn, index}
        console.log('Kihon.Navi mouseoutCallback :', obj);
    },
    mousedownCallback: function (obj) { // {event, btn, index}
        console.log('Kihon.Navi mousedownCallback :', obj);
    },
    mouseupCallback: function (obj) { // {event, btn, index}
        console.log('Kihon.Navi mouseupCallback:', obj);
    },
    clickCallback: function (obj) { // {event, btn, prevActivatedIndex, index}
        console.log('Kihon.Navi clickCallback :', obj);
    },
    activateCallback: function (obj) { // {prevActivatedIndex, index}
        console.log('Kihon.Navi activateCallback :', obj);

        var btns = $(navi.getBtns()),
            btn = $(navi.getBtn(obj.index));

        btns.removeClass('on');
        btn.addClass('on');
    }
}).init();

/*
 * Navi public methods
 */
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
    <li><a href="#">kihon:</a></li>
    <li><a href="#">Thanks</a></li>
    <li><a href="#">to</a></li>
    <li><a href="#">whoever</a></li>
    <li><a href="#">use</a></li>
    <li><a href="#">kihon.</a></li>
</ul>
```  

```css
.navi {width: 75px; background-color: #CFD8DC;}
.navi li a.on {color: #FF5252;}
```

```javascript
import NaviHasTimer from 'kihon/NaviHasTimer';

var navi = new NaviHasTimer({
    btns: $('.navi li a'), // navi buttons
    mouseoverCallback: function (obj) { // {event, btn, index}
        console.log('Kihon.NaviHasTimer mouseoverCallback :', obj);

        activateBtn(obj.index);
    },
    mouseoutCallback: function (obj) { // {event, btn, index}
        console.log('Kihon.NaviHasTimer mouseoutCallback :', obj);
    },
    mousedownCallback: function (obj) { // {event, btn, index}
        console.log('Kihon.NaviHasTimer mousedownCallback :', obj);
    },
    mouseupCallback: function (obj) { // {event, btn, index}
        console.log('Kihon.NaviHasTimer mouseupCallback:', obj);
    },
    clickCallback: function (obj) { // {event, btn, prevActivatedIndex, index}
        console.log('Kihon.NaviHasTimer clickCallback :', obj);
    },
    activateCallback: function (obj) { // {prevActivatedIndex, index}
        console.log('Kihon.NaviHasTimer activateCallback :', obj);

        activateBtn(obj.index);
    },
    timerInterval: 1000 // after mouseout navi, interval to set activated button index
}).init();

function activateBtn(index) {
    var btns = $(navi.getBtns()),
        btn = $(navi.getBtn(index));

    btns.removeClass('on');
    btn.addClass('on');
}

/*
 * NaviHasTimer public methods
 */
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
    // class: 'overlay', // overlay class
    // color: '#000', // background color
    // opacity: 0.5, // opacity (0 ~ 1)
    // appendTo: $('body'), // element to append overlay
    clickCallback: function (evt) { // call when click overlay
        console.log('Kihon.Overlay clickCallback :', evt);
    }
}).init();

overlay.show();

/*
 * Overlay public methods
 */
// set node event handler
// overlay.setNodeEventHandler(true / false);

// get node
// console.log(overlay.getNode());

// set css
// overlay.setCss({'background-color': '#f00', ...});

// append to other element
// overlay.appendTo(parent element);

// show overlay
// overlay.show();

// hide overlay
// overlay.hide();

// destroy
// overlay.destroy();
// overlay.destroy({isRemoveNode: true});
```  


### YoutubeModal
```css
.modal-wrap {position: fixed; top: 0; right: 0; bottom: 0; left: 0;}
.modal {position: relative; display: block; margin: 0 auto; top: 50%; width: 100%; max-width: 640px; background-color: #CFD8DC; color: #FFFFFF; -webkit-transform: translateY(-50%); -moz-transform: translateY(-50%); -ms-transform: translateY(-50%); -o-transform: translateY(-50%); transform: translateY(-50%);}
.btn-close {position: absolute; top: 0; right: 0; background-color: #FF5252;}
.embed-responsive-video {position: relative; padding-top: 56.25%; /* 16:9 ratio */ background-color: #CFD8DC;}
.embed-responsive-video .iframe-wrap {position: absolute; overflow: hidden; top: 0; left: 0; width: 100%; height: 100%;}
```

```javascript
import YoutubeModal from 'kihon/YoutubeModal';
// import Overlay from 'kihon/Overlay';

var youtubeModal = new YoutubeModal({
    wrapClass: 'modal-wrap', // modal wrap class
    contents: '<div class="modal"><div class="embed-responsive-video"><div class="iframe-wrap"></div></div><a href="#" class="btn-close">close</a></div>', // modal contents html
    // appendTo: $('body'), // element to append modal wrap
    // closeBtnSelector: '.btn-close', // jQuery selector of close button
    // isCloseByClickOutside: true, // hide modal when click outside of modal contents
    // isCloseByEscKey: true, // hide modal when keydown escape key
    showCallback: function () { // call just before show modal
        console.log('Kihon.YoutubeModal showCallback :', this);
    },
    hideCallback: function () { // call just before hide modal
        console.log('Kihon.YoutubeModal hideCallback :', this);
    },
    // overlay: new Overlay().init(),
    iFrameWrapSelector: '.iframe-wrap', // youtube iframe wrap selector
    youtube: { // youtube player info
        id: 'YzKLbB5B0tg',
        width: '',
        height: '',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5#Parameters
            autoplay: 1,
            rel: 0
        }
    }
}).init();

youtubeModal.show();

/*
 * YoutubeModal public methods
 */
// set close button event handler
// youtubeModal.setCloseBtnEventHandler(true / false);

// set modal wrap event handler
// youtubeModal.setWrapEventHandler(true / false);

// set escape key event handler
// youtubeModal.setEscKeyEventHandler(true / false);

// get modal node
// console.log( youtubeModal.getNode() );

// append to other element
// youtubeModal.appendTo(parent element);

// show modal
// youtubeModal.show();

// hide overlay
// youtubeModal.hide();

// change youtube iframe
// youtubeModal.changeYoutubeIFrame('mJEZFTbxm4o');
// youtubeModal.changeYoutubeIFrame({id: 'mJEZFTbxm4o', width: '', height: '', playerVars: {autoplay: 1, rel: 0, controls: 0}});

// get youtube iframe
// console.log( youtubeModal.getYoutubeIFrame() );

// get youtube id
// console.log( youtubeModal.getYoutubeId() );

// get flag modal is hide

// destroy
// youtubeModal.destroy();
// youtubeModal.destroy({isRemoveNode: true, isRemoveOverlay: true});
```  


### Video
```html
<div class="wrap-video"> <!-- can rename class you want -->
</div>
```  

```css
html, body {margin: 0; padding: 0;}
.wrap-video {position: relative; background: #333; width: 640px; height: 360px;}
```

```js
import Video from 'kihon/Video';

var video = new Video({
    wrap: $('.wrap-video'), // wrap
    videoUrls: ['https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4', 'https://www.quirksmode.org/html5/videos/big_buck_bunny.ogv'], // video sources
    videoWidth: 640, // video width
    videoHeight: 360, // video height
    isAutoPlay: false, // auto play flag
    isLoop: false, // loop flag
    isMuted: true, // mute flag
    canplayCallback: function (obj) { // {event}
        console.log('Kihon.Video canplayCallback obj :', obj);
    },
    timeupdateCallback: function (obj) { // {event, currentTime, duration}
        // console.log('Kihon.Video timeupdateCallback obj :', obj);
    },
    endedCallback: function (obj) { // {event, currentTime, duration}
        console.log('Kihon.Video endedCallback obj :', obj);
    }
}).init();

setTimeout(function () {
    video.play();
}, 2000);

setTimeout(function () {
    video.pause();
}, 5000);

setTimeout(function () {
    video.seek(5).play();
}, 8000);

/*
 * video public methods
 */
// get video node
// console.log( video.getVideoNode() );

// get volume (0 ~ 1)
// console.log( video.getVolume() );

// set volume
// console.log( video.setVolume(0 ~ 1) );

// get video muted
// console.log( video.isMuted() );

// play video
// video.play();

// pause video
// video.pause();

// stop video
// video.stop();

// seek video
// video.seek(second);

// destroy
// video.destroy();
```  


## Contact
* @Website : http://www.dragmove.xyz
* @Blog : http://blog.naver.com/dragmove
* @LinkedIn : https://www.linkedin.com/in/hyun-seok-kim-99748295/
* @E-mail : dragmove@gmail.com


## License
[MIT license](http://danro.mit-license.org/).