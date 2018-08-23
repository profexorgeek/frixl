/// <reference path='../Entities/Positionable.ts' />

namespace Frixl.Rendering {

    export class Camera extends Entities.Positionable {
        private _size: Util.Vector = new Util.Vector();
        private _background: string = 'CornflowerBlue';

        private _lastFramePos: Util.Vector = new Util.Vector();
        private _positionDelta: Util.Vector = new Util.Vector();


        get background(): string {
            return this._background;
        }

        set background(color: string) {
            this._background = color;
        }

        get left(): number {
            return this.absolutePosition.x - (this._size.x / 2);
        }

        get right(): number {
            return this.absolutePosition.x + (this._size.x / 2);
        }

        get top(): number {
            return this.absolutePosition.y + (this._size.y / 2);
        }

        get bottom(): number {
            return this.absolutePosition.y - (this._size.y / 2);
        }

        get width(): number {
            return this._size.x;
        }

        get height(): number {
            return this._size.y;
        }

        get positionDelta(): Util.Vector {
            return this._positionDelta;
        }

        get randomVectorInView(): Util.Vector {
            return new Util.Vector(
                Util.GameUtil.randomInRange(this.left, this.right),
                Util.GameUtil.randomInRange(this.bottom, this.top)
            );
        }

        constructor(width: number, height: number) {
            super();
            this._size = new Util.Vector(width, height);
            this._position = new Util.Vector();
            Frixl.Game.instance.logger.debug('Frixl camera created at size: ' + this._size);
        }

        update(delta: number) {
            super.update(delta);

            // cache our position delta
            this._positionDelta.x = this.absolutePosition.x - this._lastFramePos.x;
            this._positionDelta.y = this.absolutePosition.y - this._lastFramePos.y;

            // reset last frame position
            this._lastFramePos.x = this.absolutePosition.x;
            this._lastFramePos.y = this.absolutePosition.y;
        }
    }
}