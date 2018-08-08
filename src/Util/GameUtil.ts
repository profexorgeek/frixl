namespace Frixl.Util {

    export class GameUtil {

        static empty(str: string): boolean {
            return (!str || /^\s*$/.test(str));
        }

        static invert(num: number) : number {
            return 0 - num;
        }
    }
}