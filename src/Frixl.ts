module Frixl {

    export class Game {

        private static _instance:Game;

        protected _canvas: HTMLCanvasElement;
        protected _fps: number;
        protected _background: string;
        protected _paused: boolean;
        protected _gameTime: GameTime;
        protected _timer: any;
        protected _camera: Entity.Camera;
        protected _renderer: Rendering.IRenderer;
        protected _textures: any;
        protected _logger: Util.ILogger;

        get camera(): Entity.Camera {
            return this._camera;
        }

        static get instance(): Game {
            return this._instance;
        }
        static set instance(game: Game) {
            this._instance = game;
        }

        get logger(): Util.ILogger {
            return this._logger;
        }
        set logger(logger: Util.ILogger) {
            this._logger = logger;
        }
    
        constructor() {
            Game.instance = this;
            this._logger = new Frixl.Util.DefaultLogger();
            Game.instance.logger.debug('Frixl engine instance created.');
        }
    
        initialize(canvas: HTMLCanvasElement, fps: number, background: string): void {
            this.logger.debug('Initializing game.');
            this._canvas = canvas;
            this._fps = fps;
            this._background = background;
            this._textures = {};
            this._camera = new Entity.Camera(this._canvas.width, this._canvas.height);
            this._renderer = new Rendering.DefaultRenderer();
            this._gameTime = new GameTime();
        }

        start(): void {
            this.logger.debug('Starting game.');
            let g = this;
            this._timer = setInterval(function () {
                g.update()
            }, (1000 / this._fps));
        }

        stop(): void {
            this.logger.debug('Stopping game.');
            clearInterval(this._timer);
        }
    
        update(): void {
            this._gameTime.update();
            this.draw();
        }
    
        draw(): void {
            this._renderer.draw(null, this._camera, this._canvas, this._background);    
        }

        toString(): string {
            return 'Instance of the Frixl game engine.';
        }
    }
}
