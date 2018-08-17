namespace Frixl.Util {

    export class Vector {
        public x: number;
        public y: number;

        constructor(x: number = 0, y: number = 0) {
            this.x = x;
            this.y = y;
        }

        subtract(v2: Vector) {
            return new Vector(this.x - v2.x, this.y - v2.y);
        }

        add(v2: Vector) {
            return new Vector(this.x + v2.x, this.y + v2.y);
        }

        divide(v2: Vector) {
            return new Vector(this.x / v2.x, this.y / v2.y);
        }

        multiply(v2: Vector) {
            return new Vector(this.x * v2.x, this.y * v2.y);
        }

        toString(): string {
            return '[x:' + this.x + ', y:' + this.y + ']';
        }
    }
}