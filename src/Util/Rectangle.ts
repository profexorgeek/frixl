namespace Frixl.Util {

    export class Rectangle {
        private _left: number = 0;
        private _top: number = 0;
        private _right: number = 0;
        private _bottom: number = 0;
        private _position: Vector = new Vector();
        private _size: Vector = new Vector();

        get position(): Vector {
            return this._position;
        }

        get size(): Vector {
            return this._size;
        }

        get x(): number {
            return this._position.x;
        }

        get y(): number {
            return this._position.y;
        }

        get width(): number {
            return this._size.x;
        }

        get height(): number {
            return this._size.y;
        }

        get left(): number {
            return this._left;
        }
        set left(left: number) {
            this._left = left;
            this.updateSizeAndPosition();
        }

        get top(): number {
            return this._top;
        }
        set top(top: number) {
            this._top = top;
            this.updateSizeAndPosition();
        }

        get right(): number {
            return this._right;
        }
        set right(right: number) {
            this._right = right;
            this.updateSizeAndPosition();
        }

        get bottom(): number {
            return this._bottom;
        }
        set bottom(bottom: number) {
            this._bottom = bottom;
            this.updateSizeAndPosition();
        }


        constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
            this._position = new Vector(x, y);
            this._size = new Vector(width, height);
        }

        private updateSizeAndPosition() {
            this._size.x = Math.abs(this.right - this.left);
            this._size.y = Math.abs(this.top - this.bottom);
            this._position.x = this.left + this.size.x / 2;
            this._position.y = this.bottom + this.size.y / 2;
        }

        setEdges(left: number, top: number, right: number, bottom: number) {
            this._left = left;
            this._top = top;
            this._right = right;
            this._bottom = bottom;
            this.updateSizeAndPosition();
        }

        setFromTextureCoords(left: number, top: number, width:number, height: number) {
            // texture coords count from the top so we invert them for the renderer
            this.setEdges(left, top, left + width, top - height);
        }
    }

}