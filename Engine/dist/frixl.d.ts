declare namespace Frixl {
    class Game {
        private static _instance;
        protected _canvas: HTMLCanvasElement;
        protected _context: CanvasRenderingContext2D;
        protected _fps: number;
        protected _paused: boolean;
        protected _gameTime: GameTime;
        protected _timer: any;
        protected _camera: Rendering.Camera;
        protected _input: Input.InputHandler;
        protected _audio: Audio.AudioHandler;
        protected _renderer: Rendering.IRenderer;
        protected _logger: Util.ILogger;
        protected _activeView: Views.View;
        protected _showCursor: boolean;
        static instance: Game;
        readonly camera: Rendering.Camera;
        readonly renderer: Rendering.IRenderer;
        readonly input: Input.InputHandler;
        readonly audio: Audio.AudioHandler;
        readonly canvas: HTMLCanvasElement;
        logger: Util.ILogger;
        activeView: Views.View;
        showCursor: boolean;
        constructor();
        initialize(canvas: HTMLCanvasElement, fps: number): void;
        start(): void;
        stop(): void;
        update(): void;
        draw(): void;
        toString(): string;
    }
}
declare namespace Frixl {
    class GameTime {
        private _start;
        private _last;
        private _current;
        private _frameSeconds;
        private _totalSeconds;
        readonly frameSeconds: number;
        readonly totalSeconds: number;
        constructor();
        update(): void;
    }
}
declare namespace Frixl {
    interface IUpdateable {
        update(delta: number): void;
    }
}
declare namespace Frixl.Audio {
    class AudioHandler {
        private _context;
        private _audioBuffer;
        constructor();
        loadSound(url: string, success?: Function, fail?: Function): void;
        playSound(url: string): void;
    }
}
declare namespace Frixl.Entities {
    class Positionable implements IUpdateable {
        protected _position: Util.Vector;
        protected _absolutePosition: Util.Vector;
        protected _absPosCalculatedThisFrame: boolean;
        protected _rotation: number;
        protected _absoluteRotation: number;
        protected _absRotCalculatedThisFrame: boolean;
        protected _velocity: Util.Vector;
        protected _acceleration: Util.Vector;
        protected _rotationVelocity: number;
        protected _drag: number;
        protected _layer: number;
        protected _children: Array<Positionable>;
        protected _parent: Positionable;
        rotation: number;
        velocity: Util.Vector;
        acceleration: Util.Vector;
        drag: number;
        rotationVelocity: number;
        readonly children: Array<Positionable>;
        parent: Positionable;
        x: number;
        y: number;
        layer: number;
        readonly absolutePosition: Util.Vector;
        readonly absoluteRotation: number;
        addChild(c: Positionable): void;
        removeChild(c: Positionable): void;
        attachTo(p: Positionable): void;
        detach(): void;
        update(delta: number): void;
    }
}
declare namespace Frixl.Entities {
    class Sprite extends Positionable {
        private _textureName;
        private _alpha;
        private _frame;
        private _animationList;
        private _animationName;
        alpha: number;
        animationList: Record<string, Rendering.Animation>;
        animationName: string;
        readonly currentAnimation: Rendering.Animation;
        frame: Rendering.Frame;
        textureName: string;
        constructor(textureName?: string);
        update(delta: number): void;
    }
}
declare namespace Frixl.Input {
    class Cursor {
        private _lastPosition;
        private _position;
        readonly x: number;
        readonly y: number;
        readonly changeX: number;
        readonly changeY: number;
        readonly worldX: number;
        readonly worldY: number;
        updateLocation(x: number, y: number): void;
    }
}
declare namespace Frixl.Input {
    class InputHandler implements IUpdateable {
        private _keysDown;
        private _keysPushed;
        private _buttonsDown;
        private _buttonsPushed;
        private _cursor;
        private _cursorInFrame;
        readonly cursor: Cursor;
        constructor();
        update(delta: number): void;
        keyDown(charCode: number): boolean;
        keyPushed(charCode: number): boolean;
        buttonDown(buttonCode: number): boolean;
        buttonPushed(buttonCode: number): boolean;
        private onEnterCanvas;
        private onExitCanvas;
        private onTouchMove;
        private onTouchStart;
        private onTouchEnd;
        private onMouseMove;
        private onMouseDown;
        private onMouseUp;
        private onKeyDown;
        private onKeyUp;
    }
}
declare namespace Frixl.Input {
    enum Keys {
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
}
declare namespace Frixl.Input {
    enum MouseButtons {
        Left = 1,
        Middle = 2,
        Right = 3
    }
}
declare namespace Frixl.Rendering {
    class Animation implements IUpdateable {
        private _name;
        private _frames;
        private _textureName;
        private _secLeftInFrame;
        private _frameIndex;
        private _playing;
        private _looping;
        name: string;
        frames: Array<Frame>;
        frameIndex: number;
        readonly currentFrame: Frame;
        textureName: string;
        looping: boolean;
        start(): void;
        stop(): void;
        restart(): void;
        update(delta: number): void;
    }
}
declare namespace Frixl.Rendering {
    class Camera extends Entities.Positionable {
        private _size;
        private _background;
        private _lastFramePos;
        private _positionDelta;
        background: string;
        readonly left: number;
        readonly right: number;
        readonly top: number;
        readonly bottom: number;
        readonly width: number;
        readonly height: number;
        readonly positionDelta: Util.Vector;
        readonly randomVectorInView: Util.Vector;
        constructor(width: number, height: number);
        update(delta: number): void;
    }
}
declare namespace Frixl.Util {
    class GameUtil {
        static empty(str: string): boolean;
        static invert(num: number): number;
        static clamp(val: number, min: number, max: number): number;
        static randomInRange(min: number, max: number): number;
    }
}
declare namespace Frixl.Rendering {
    class DefaultRenderer implements IRenderer {
        private _textures;
        constructor();
        loadTexture(url: string, callback?: Function): void;
        getTexture(url: string): HTMLImageElement;
        draw(positionables: Array<Entities.Positionable>, camera: Camera, context: CanvasRenderingContext2D): void;
        private drawPositionable;
        private drawSprite;
    }
}
declare namespace Frixl.Util {
    class Rectangle {
        private _left;
        private _top;
        private _right;
        private _bottom;
        private _position;
        private _size;
        readonly position: Vector;
        readonly size: Vector;
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
        left: number;
        top: number;
        right: number;
        bottom: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        private updateSizeAndPosition;
        setEdges(left: number, top: number, right: number, bottom: number): void;
        setFromTextureCoords(left: number, top: number, width: number, height: number): void;
    }
}
declare namespace Frixl.Rendering {
    class Frame extends Frixl.Util.Rectangle {
        private _frameSeconds;
        frameSeconds: number;
        constructor(left?: number, top?: number, width?: number, height?: number, seconds?: number);
        update(delta: number): void;
    }
}
declare namespace Frixl.Rendering {
    interface IRenderer {
        draw(positionables: Array<Entities.Positionable>, camera: Camera, context: CanvasRenderingContext2D): void;
        loadTexture(path: string, callback: Function): void;
        getTexture(path: string): HTMLImageElement;
    }
}
declare namespace Frixl.Util {
    class DefaultLogger implements ILogger {
        private _level;
        readonly loglevel: LogLevel;
        logLevel: LogLevel;
        debug(msg: string): void;
        info(msg: string): void;
        warn(msg: string): void;
        error(msg: string): void;
        log(msg: string): void;
    }
}
declare namespace Frixl.Util {
    enum LogLevel {
        Debug = 0,
        Info = 1,
        Warn = 2,
        Error = 3
    }
    interface ILogger {
        loglevel: LogLevel;
        debug(msg: string): void;
        info(msg: string): void;
        warn(msg: string): void;
        error(msg: string): void;
        log(msg: string): void;
    }
}
declare namespace Frixl.Util {
    class Vector {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        length(): number;
        subtract(v2: Vector): void;
        add(v2: Vector): void;
        divide(v2: Vector): void;
        multiply(v2: Vector): void;
        copy(): Vector;
        toString(): string;
    }
}
declare namespace Frixl.Views {
    class View implements IUpdateable {
        private _positionables;
        readonly positionables: Array<Entities.Positionable>;
        update(delta: number): void;
        addPositionable(positionable: Entities.Positionable): void;
        addPositionables(positionable: Array<Entities.Positionable>): void;
        removePositionable(positionable: Entities.Positionable): void;
        removePositionables(positionable: Array<Entities.Positionable>): void;
        clearSprites(): void;
    }
}
