# kihon
[![npm version](https://badge.fury.io/js/kihon.svg)](https://www.npmjs.com/package/kihon)


## About
* Javascript Library to help developers make Interactive UI
* Dependency to jQuery 3.x.x

Thansk to whoever use kihon.


## Install  
```javascript  
npm install kihon --save-dev  
```


## UI Components
FullSizeBg  
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
// fullSizeBg.getImageSizeAspectFill(srcWidth, srcHeight);

// destroy
// fullSizeBg.destroy();
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
// console.log(overlay.getNode());

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