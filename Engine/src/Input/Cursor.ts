namespace Frixl.Input {

    export class Cursor {
        private _lastPosition: Util.Vector = new Util.Vector();
        private _position: Util.Vector = new Util.Vector();

        get x(): number {
            return this._position.x;
        }

        get y(): number {
            return this._position.y;
        }

        get changeX(): number {
            return this._lastPosition.x - this._position.x;
        }

        get changeY(): number {
            return this._lastPosition.y - this._position.y;
        }

        get worldX(): number {
            return Game.instance.camera.x + this.x;
        }

        get worldY(): number {
            return Game.instance.camera.y + this.y;
        }

        updateLocation(x: number, y: number) {
            this._lastPosition.x = this._position.x;
            this._lastPosition.y = this._position.y;
            this._position.x = x - (Game.instance.camera.width / 2);
            this._position.y = Util.GameUtil.invert(y) + (Game.instance.camera.height / 2);

        }
    }
}