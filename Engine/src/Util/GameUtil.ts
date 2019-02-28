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

        static normalizeRotation(rotation: number): number {
            const twoPi = Math.PI * 2;
            while(rotation < 0) {
                rotation += twoPi;
            }

            while(rotation > twoPi) {
                rotation -= twoPi;
            }

            return rotation;
        }

        static invertRotation(rotation: number) {
            return GameUtil.normalizeRotation(rotation - Math.PI);
        }

        static randomInRange(min: number, max: number): number {
            const range = max - min;
            const val = Math.random() * range;
            return val + min;
        }

        static randomIntInRange(min: number, max: number): number {
            return Math.floor(GameUtil.randomInRange(min, max));
        }

        static randomInArray<T>(array: Array<T>): T {
            const i = GameUtil.randomIntInRange(0, array.length);
            return array[i];
        }
    }
}