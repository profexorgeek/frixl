/// <reference path='../Util/Rectangle.ts' />

namespace Frixl.Rendering {

    export class Frame extends Frixl.Util.Rectangle {

        private _frameSeconds: number = 0;

        get frameSeconds(): number {
            return this._frameSeconds;
        }
        set frameSeconds(time: number) {
            this._frameSeconds = time;
        }

        constructor(left: number = 0, top: number = 0, width: number = 0, height: number = 0, seconds: number = 0) {
            super();

            this.setFromTextureCoords(left, top, width, height);
            this.frameSeconds = seconds;
        }

        update(delta: number) {

        }
        
    }
}