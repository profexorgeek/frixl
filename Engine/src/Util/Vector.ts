namespace Frixl.Util {

    export class Vector {
        public x: number;
        public y: number;

        constructor(x: number = 0, y: number = 0) {
            this.x = x;
            this.y = y;
        }

        toString(): string {
            return '[x:' + this.x + ', y:' + this.y + ']';
        }
    }
}