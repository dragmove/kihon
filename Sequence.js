// TODO:

/*
// Sequence
import { CanvasMovieClip } from './canvasMovieClip';
import { falsy } from '../util/util';

export class Sequence {
    constructor(options = null) {
        const _ = this;

        _.option = $.extend(
            {
                $wrap: null,
                canvasClass: 'canvas',
                spriteObj: {
                    img: null,
                    width: 100,
                    height: 100,
                    frameNum: 1,
                    fps: 1,
                    isLoop: false
                }
            },
            options
        );

        _.$wrap = _.option.$wrap;

        _.$canvas = null;

        _.canvas = null;

        _.ctx = null;

        _.animationFrame = null;

        _.isPlaying = true;

        _.spriteObj = _.option.spriteObj;

        _.movieClip = null;
    }

    // public methods
    start() {
        const _ = this;

        _.isPlaying = true;

        _.movieClip.reset();

        _.loopAnimation();

        return _;
    }

    pause() {
        console.log('pause');
        const _ = this;

        _.isPlaying = false;

        window.cancelAnimationFrame(_.animationFrame);

        return _;
    }

    reset() {
        const _ = this;

        _.pause();
        _.movieClip.reset();
        _.update();

        return _;
    }

    show(flag) {
        const _ = this;

        flag ? _.$wrap.show() : _.$wrap.hide();

        return _;
    }

    init(obj = null) {
        const _ = this,
            opt = _.option;

        _.$canvas = $(_.getCanvasTpl());
        _.$wrap.append(_.$canvas);

        _.canvas = _.$canvas.get(0);
        _.ctx = _.canvas.getContext('2d');

        _.movieClip = new CanvasMovieClip({
            ctx: _.ctx,
            img: _.spriteObj.img,
            width: _.spriteObj.width,
            height: _.spriteObj.height,
            frameNum: _.spriteObj.frameNum,
            fps: _.spriteObj.fps,
            isLoop: _.spriteObj.isLoop,
            finishCallback: () => {
                _.isPlaying = false;

                if (opt.onFinish) opt.onFinish.call(null);
            }
        });

        _.setCanvasSize(_.spriteObj.width, _.spriteObj.height);

        _.loopAnimation();

        return _;
    }

    setCanvasSize(width, height) {
        const _ = this;

        _.ctx.canvas.width = width;
        _.ctx.canvas.height = height;

        _.$canvas.attr({ width: width, height: height });
    }

    loopAnimation() {
        let _ = this;

        if (falsy(_.isPlaying)) {
            window.cancelAnimationFrame(_.animationFrame);
            return;
        }

        _.animationFrame = window.requestAnimationFrame(_.loopAnimation.bind(_));

        _.update();
    }

    update() {
        this.drawCanvas();
    }

    drawCanvas() {
        const _ = this;

        _.ctx.clearRect(0, 0, _.canvas.width, _.canvas.height);

        _.movieClip.render({
            width: _.spriteObj.width,
            height: _.spriteObj.height
        });
    }

    getCanvasTpl() {
        return `<canvas class="${this.option.canvasClass}"></canvas>`;
    }

    destroy(obj = null) {
        const _ = this;

        return _;
    }
}
*/

/*
// CanvasMovieClip
import { truthy, isFunction } from '../util/util';

export class CanvasMovieClip {
    constructor(options) {
        const _ = this;

        _.option = Object.assign(
            {
                ctx: null,
                img: null,
                width: 0,
                height: 0,
                frameNum: 1,
                fps: 60,
                isLoop: true,
                finishCallback: null
            },
            options
        );

        _.ctx = _.option.ctx;
        _.img = _.option.img;

        _.currentFrame = 1;
        _.frameNum = _.option.frameNum;
        _.isLoop = _.option.isLoop || false;

        _.renderInfo = {
            img: _.img,
            x: 0,
            y: 688,
            width: _.option.width,
            height: _.option.height
        };

        _.fpsInterval = 1000 / _.option.fps;
        _.now = Date.now();
        _.then = Date.now();
        _.startTime = _.then;

        _.isFinish = false;
    }

    render(size) {
        const _ = this;

        if (truthy(_.isFinish)) {
            return;
        }

        _._draw(_.renderInfo, size);

        _.now = Date.now();
        _.elapsed = _.now - _.then;

        if (_.elapsed > _.fpsInterval) {
            _.then = _.now - (_.elapsed % _.fpsInterval);

            // update visual
            _.renderInfo = Object.assign({}, _.renderInfo, {
                y: _.renderInfo.y + _.option.height
            });

            _.currentFrame += 1;

            if (_.isLoop === true) {
                if (_.currentFrame > _.frameNum) {
                    _.renderInfo = Object.assign({}, _.renderInfo, { y: 0 });

                    _.currentFrame = 1;
                }
            } else {
                if (_.currentFrame >= _.frameNum) {
                    _.isFinish = true;

                    _.currentFrame = _.frameNum;

                    _.renderInfo = Object.assign({}, _.renderInfo, { y: 0 });

                    if (isFunction(_.option.finishCallback)) _.option.finishCallback.call(null);
                }
            }
        }
    }

    reset() {
        const _ = this;

        _.isFinish = false;

        _.currentFrame = 1;

        _.renderInfo = Object.assign({}, _.renderInfo, {
            y: 0
        });
    }

    _draw(renderInfo, size) {
        const _ = this;

        _.ctx.drawImage(
            renderInfo.img,
            renderInfo.x,
            renderInfo.y,
            renderInfo.width,
            renderInfo.height,
            0,
            0,
            size.width,
            size.height
        );
    }
}
*/
