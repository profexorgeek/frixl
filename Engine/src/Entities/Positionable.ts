namespace Frixl.Entities {

    export class Positionable {
        protected _position: Util.Vector = new Util.Vector();
        protected _velocity: Util.Vector = new Util.Vector();
        protected _acceleration: Util.Vector = new Util.Vector();
        protected _rotation: number = 0;
        protected _rotationVelocity: number = 0;
        protected _drag: number = 0;
        protected _children: Array<Positionable> = new Array<Positionable>();
        protected _parent: Positionable = null;

        // #region Properties
        get rotation(): number {
            return this._rotation;
        }
        set rotation(rot: number) {
            this._rotation = rot;
        }

        get velocity(): Util.Vector {
            return this._velocity;
        }
        set velocity(vel: Util.Vector) {
            this._velocity = vel;
        }

        get rotationVelocity(): number {
            return this._rotationVelocity;
        }
        set rotationVelocity(vel: number) {
            this._rotationVelocity = vel;
        }

        get children(): Array<Positionable> {
            return this._children;
        }

        get parent(): Positionable {
            return this._parent;
        }
        set parent(p: Positionable) {
            this._parent = p;
        }

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

        get absolutePosition(): Util.Vector {
            let abs: Util.Vector = new Util.Vector();

            if(this._parent != null) {
                abs.x = Math.cos(this._parent.absoluteRotation) * this._position.x;
                abs.y = Math.cos(this._parent.absoluteRotation) * this._position.y;
            }
            else {
                abs.x = this._position.x;
                abs.y = this._position.y;
            }
            
            return abs;
        }

        get absoluteRotation(): number {
            let rot: number = this._rotation;
            if(this._parent != null) {
                rot += this._parent.absoluteRotation;
            }
            return rot;
        }
        // #endregion


        addChild(c: Positionable): void {
            c.parent = this;
            this._children.push(c);
        }

        removeChild(c: Positionable): void {
            let i = this._children.indexOf(c)
            if(i > 0) {
                this._children.splice(i, 1);
            }
            c.parent = null;
        }

        attachTo(p: Positionable) {
            p.addChild(this);
        }

        detach() {
            if(this._parent != null) {
                this._parent.removeChild(this);
            }
        }

        update(delta: number) {
            let deltaSquaredHalved = delta * delta / 2;
            let twoPi = Math.PI * 2;

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

            for(let i = 0; i < this._children.length; i += 1) {
                this._children[i].update(delta);
            }
        }
    }

}