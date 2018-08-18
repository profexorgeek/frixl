namespace Frixl.Entities {

    export class Positionable implements IUpdateable {
        protected _position: Util.Vector = new Util.Vector();
        protected _absolutePosition: Util.Vector = new Util.Vector();
        protected _absPosCalculatedThisFrame: boolean = false;

        protected _rotation: number = 0;
        protected _absoluteRotation: number = 0
        protected _absRotCalculatedThisFrame: boolean = false;

        protected _velocity: Util.Vector = new Util.Vector();
        protected _acceleration: Util.Vector = new Util.Vector();
        protected _rotationVelocity: number = 0;
        protected _drag: number = 0;

        protected _layer: number = 0;
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

        get acceleration(): Util.Vector {
            return this._acceleration;
        }
        set acceleration(accel: Util.Vector) {
            this._acceleration = accel;
        }

        get drag(): number {
            return this._drag;
        }
        set drag(d: number) {
            this._drag = d;
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

            // force recalculation of absolutes
            this._absPosCalculatedThisFrame = false;
            this._absRotCalculatedThisFrame = false;
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

        get layer(): number {
            return this._layer;
        }
        set layer(l: number) {
            this._layer = l;
        }

        get absolutePosition(): Util.Vector {

            // calculate and cache absolute position and update
            // flag that we've calculated it this frame. Flag will
            // be cleared every frame. This means that absolute
            // position will only be calculated 0 or 1 times/frame for perf
            if(!this._absPosCalculatedThisFrame) {
                if(this._parent != null) {
                    let pAbs = this._parent.absolutePosition;
                    this._absolutePosition.x = Math.cos(this._parent.absoluteRotation) * this._position.x + pAbs.x;
                    this._absolutePosition.y = Math.sin(this._parent.absoluteRotation) * this._position.y + pAbs.y;
                }
                else {
                    this._absolutePosition.x = this.x;
                    this._absolutePosition.y = this.y;
                }

                this._absPosCalculatedThisFrame = true;
            }
            
            return this._absolutePosition;
        }

        get absoluteRotation(): number {

            // calculate and cache absolute rotation and update
            // flag that we've calculated it this frame. Flag will
            // be cleared every frame. This means that absolute
            // rotation will only be calculated 0 or 1 times/frame for perf
            if(!this._absRotCalculatedThisFrame) {
                if(this._parent != null) {
                    this._absoluteRotation = this._parent.absoluteRotation + this._rotation;
                    this._absRotCalculatedThisFrame = true;
                }
                else {
                    this._absoluteRotation = this._rotation;
                }
            }

            return this._absoluteRotation;
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

            // sort children by layer
            this._children.sort((a: Positionable, b: Positionable): number => {
                return a.layer - b.layer;
            });

            // update children
            for(let i = 0; i < this._children.length; i += 1) {
                this._children[i].update(delta);
            }

            // clear flag so absolute position is recalculated if accessed
            this._absPosCalculatedThisFrame = false;
        }
    }

}