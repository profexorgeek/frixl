namespace Frixl.Util {

    export class Vector {
        public x: number;
        public y: number;

        constructor(x: number = 0, y: number = 0) {
            this.x = x;
            this.y = y;
        }

        length(): number {
            return Vector.hypotenuseLength(this.x, this.y);
        }

        static hypotenuseLength(a: number, b: number): number {
            let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            return Math.abs(c);
        }

        // Note: These operations mutate the vector instead of
        // returning a new vector. This is because these are often
        // used in the game loop and returning a new vector causes
        // lots of allocations. Use copy() first if mutation is not
        // intended
        subtract(v2: Vector): void {
            this.x -= v2.x;
            this.y -= v2.y;
        }

        add(v2: Vector): void {
            this.x += v2.x
            this.y += v2.y;
        }

        divide(v2: Vector): void {
            this.x /= v2.x;
            this.y /= v2.y;
        }

        multiply(v2: Vector): void {
            this.x *= v2.x;
            this.y *= v2.y;
        }

        copy(): Vector {
            return new Vector(this.x, this.y);
        }

        

        toString(): string {
            return '[x:' + this.x + ', y:' + this.y + ']';
        }
    }
}