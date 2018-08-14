namespace Frixl {

    export enum Keys {
        Backspace = 8,
        Tab = 9,
        Enter = 13,
        Shift = 16,
        Ctrl = 17,
        Alt = 18,
        PauseBreak = 19,
        CapsLock = 20,
        Esc = 27,
        Space = 32,
        PageUp = 33,
        PageDown = 34,
        End = 35,
        Home = 36,
        Left = 37,
        Up = 38,
        Right = 39,
        Down = 40,
        Insert = 45,
        Delete = 46,
        Oem0 = 48,
        Oem1 = 49,
        Oem2 = 50,
        Oem3 = 51,
        Oem4 = 52,
        Oem5 = 53,
        Oem6 = 54,
        Oem7 = 55,
        Oem8 = 56,
        Oem9 = 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        Windows = 91,
        RightClick = 93,
        Num0 = 96,
        Num1 = 97,
        Num2 = 98,
        Num3 = 99,
        Num4 = 100,
        Num5 = 101,
        Num6 = 102,
        Num7 = 103,
        Num8 = 104,
        Num9 = 105,
        NumStar = 106,
        NumPlus = 107,
        NumMinus = 109,
        NumPeriod = 110,
        NumSlash = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        NumLock = 144,
        ScrollLock = 145,
        MyComputer = 182,
        MyCalculator = 183,
        Semicolon = 186,
        Equal = 187,
        Comma = 188,
        Dash = 189,
        Period = 190,
        ForwardSlash = 191,
        Tick = 192,
        LeftBracket = 219,
        Backslash = 220,
        RightBracket = 221,
        SingleQuote = 222
    }

    export class Input {

        private _cursor: Util.Vector;
        private _keysDown: any = {};
        private _buttonsDown: any = {};

        constructor() {
            window.addEventListener("keydown", this.onKeyDown);
            window.addEventListener("keyup", this.onKeyUp);
        }

        update(delta: number) {

        }

        keyDown(charCode: number) {
            let keyName = Keys[charCode];
            return this._keysDown[keyName] === true;
        }

        private onKeyDown = (e: KeyboardEvent) => {
            let keyName = Keys[e.keyCode];
            this._keysDown[keyName] = true;
        }

        private onKeyUp = (e: KeyboardEvent) => {
            let keyName = Keys[e.keyCode];
            this._keysDown[keyName] = false;
        }
    }
}