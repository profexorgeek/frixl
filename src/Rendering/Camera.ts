/// <reference path='../Entities/Positionable.ts' />

namespace Frixl.Rendering {

    export class Camera extends Entities.Positionable {
        private _size: Util.Vector = new Util.Vector();

        constructor(width: number, height: number) {
            super();
            this._size = new Util.Vector(width, height);
            this._position = new Util.Vector();
            Frixl.Game.instance.logger.debug('Frixl camera created at size: ' + this._size);
        }
    }
}