namespace Frixl.Entities {

    export class Positionable {
        protected _position: Util.Vector = new Util.Vector();
        protected _velocity: Util.Vector = new Util.Vector();
        protected _acceleration: Util.Vector = new Util.Vector();
        protected _rotation: number = 0;
        protected _rotationVelocity: number = 0;
        protected _drag: number = 0;

        get x(): number {
            return this._position.x;
        }
        set x(x: number) {
            this._position.x = x;
        }

        get y(): number {
            return this._position.y;
        }
        set y(y: number) {
            this._position.y = y;
        }

        update(delta: number) {
            let deltaSquaredHalved = delta * delta / 2;
            let twoPi = Math.PI / 2;

            this._position.x += (this._velocity.x * delta) + (this._acceleration.x * deltaSquaredHalved);
            this._position.y += (this._velocity.y * delta) + (this._acceleration.y * deltaSquaredHalved);

            this._velocity.x += (this._acceleration.x * delta) - (this._drag * this._velocity.x * delta);
            this._velocity.y += (this._acceleration.y * delta) - (this._drag * this._velocity.y * delta);

            this._rotation += this._rotationVelocity * delta;

            while(this._rotation >= twoPi) {
                this._rotation -= twoPi;
            }

            while(this._rotation < 0) {
                this._rotation += twoPi;
            }
        }
    }

}