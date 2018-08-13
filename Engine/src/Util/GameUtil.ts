namespace Frixl.Util {

    export class GameUtil {

        static empty(str: string): boolean {
            return (!str || /^\s*$/.test(str));
        }

        static invert(num: number) : number {
            return 0 - num;
        }

        static clamp(val: number, min: number, max: number): number {
            let ret = val;
            if(val > max) {
                ret = max;
            }

            if(val < min) {
                ret = min;
            }

            return ret;
        }

        static randomInRange(min: number, max: number): number {
            let range = max - min;
            let val = Math.random() * range;
            return val + min;
        }
    }
}