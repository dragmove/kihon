# kihon
[![npm version](https://badge.fury.io/js/kihon.svg)](https://www.npmjs.com/package/kihon)

kihon is a Bundle of Lite components which provide straightforward Interactive UI.


## About
* Dependency to jQuery 3.x.x
* Support ES2015+ (can also be used directly in the browser)
* Support Webpack Tree Shaking (https://webpack.js.org/guides/tree-shaking/)

Thanks to whoever use kihon.


## Install  
```javascript  
npm install kihon --save-dev  
```


## Components
FullSizeBg  
FullSizeVideo  
HorizontalScrollingNavi  
ImageLoader  
Navi  
NaviHasTimer  
Overlay  
Modal  
YoutubeModal  
  

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
    <div class="full-size-video"></div> <!-- can rename class you want -->
</div>
```  

```css
html, body {margin: 0; padding: 0;}
.wrap-full-size-video {position: relative; overflow: hidden; background: #333;}
.full-size-video {position: absolute;}
.full-size-video video {position: absolute; top: 0; left: 0;}
```

```js
import FullSizeVideo from 'kihon/FullSizeVideo';

var fullSizeVideo = new FullSizeVideo({
    wrap: $('.wrap-full-size-video'), // wrap
    videoWrap: $('.full-size-video'), // video wrap
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
    fullSizeVideo.play().setVolume(0.5);
}, 2000);

setTimeout(function () {
    fullSizeVideo.pause();
}, 5000);

setTimeout(function () {
    fullSizeVideo.seek(30).play().setVolume(1.0);
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
<ul class="navi"> <!-- can rename class you want -->
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
    wrap: $('.navi'), // navi wrap
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
<ul class="navi"> <!-- can rename class you want -->
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
    wrap: $('.navi'), // navi wrap
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


## Contact
* @Website : http://www.dragmove.com
* @Blog : http://blog.naver.com/dragmove
* @LinkedIn : https://www.linkedin.com/in/hyun-seok-kim-99748295/
* @E-mail : dragmove@gmail.com


## License
[MIT license](http://danro.mit-license.org/).