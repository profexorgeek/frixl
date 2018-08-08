/// <reference path='./Positionable.ts' />

namespace Frixl.Entity {

    export class Camera extends Positionable {
        private _size: Util.Vector = new Util.Vector();

        constructor(width: number, height: number) {
            super();
            this._size = new Util.Vector(width, height);
            this._position = new Util.Vector();
            console.log('Frixl camera created at size: ' + this._size);
        }
    }
}