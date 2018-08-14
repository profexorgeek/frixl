declare namespace Frixl {
    class Game {
        private static _instance;
        protected _canvas: HTMLCanvasElement;
        protected _fps: number;
        protected _paused: boolean;
        protected _gameTime: GameTime;
        protected _timer: any;
        protected _camera: Rendering.Camera;
        protected _renderer: Rendering.IRenderer;
        protected _logger: Util.ILogger;
        protected _activeView: Views.View;
        static instance: Game;
        readonly camera: Rendering.Camera;
        readonly renderer: Rendering.IRenderer;
        logger: Util.ILogger;
        activeView: Views.View;
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
declare namespace Frixl.Entities {
    class Positionable {
        protected _position: Util.Vector;
        protected _velocity: Util.Vector;
        protected _acceleration: Util.Vector;
        protected _rotation: number;
        protected _rotationVelocity: number;
        protected _drag: number;
        protected _children: Array<Positionable>;
        protected _parent: Positionable;
        rotation: number;
        velocity: Util.Vector;
        rotationVelocity: number;
        readonly children: Array<Positionable>;
        parent: Positionable;
        x: number;
        y: number;
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
        private _layer;
        private _alpha;
        private _textureCoords;
        layer: number;
        alpha: number;
        textureCoords: Util.Rectangle;
        textureName: string;
        constructor(textureName: string);
        update(delta: number): void;
    }
}
declare namespace Frixl.Rendering {
    class Camera extends Entities.Positionable {
        private _size;
        private _background;
        background: string;
        readonly left: number;
        readonly right: number;
        readonly top: number;
        readonly bottom: number;
        readonly randomVectorInView: Util.Vector;
        constructor(width: number, height: number);
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
        getTexture(url: string, callback?: Function): HTMLImageElement;
        draw(sprites: Array<Entities.Sprite>, camera: Camera, canvas: HTMLCanvasElement): void;
        drawSprite(sprite: Entities.Sprite, context: CanvasRenderingContext2D): void;
    }
}
declare namespace Frixl.Rendering {
    interface IRenderer {
        draw(drawables: Array<Entities.Sprite>, camera: Camera, canvas: HTMLCanvasElement): void;
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
declare namespace Frixl.Util {
    class Vector {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        toString(): string;
    }
}
declare namespace Frixl.Views {
    class View {
        private _sprites;
        readonly sprites: Array<Entities.Sprite>;
        update(delta: number): void;
        addSprite(sprite: Entities.Sprite): void;
        addSprites(sprites: Array<Entities.Sprite>): void;
        removeSprite(sprite: Entities.Sprite): void;
        removeSprites(sprites: Array<Entities.Sprite>): void;
        clearSprites(): void;
    }
}
