module Frixl {

    export class Game {

        private static _instance:Game;

        protected _canvas: HTMLCanvasElement;
        protected _fps: number;
        protected _background: string;
        protected _paused: boolean;
        protected _gameTime: GameTime;
        protected _timer: any;
        protected _camera: Rendering.Camera;
        protected _renderer: Rendering.IRenderer;
        protected _textures: any;
        protected _logger: Util.ILogger;
        protected _activeView: Views.View = new Views.View();

        static get instance(): Game {
            return this._instance;
        }
        static set instance(game: Game) {
            this._instance = game;
        }

        get camera(): Rendering.Camera {
            return this._camera;
        }

        get logger(): Util.ILogger {
            return this._logger;
        }
        set logger(logger: Util.ILogger) {
            this._logger = logger;
        }

        get activeView(): Views.View {
            return this._activeView;
        }
        set activeView(view: Views.View) {
            this._activeView = view;
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
            this._camera = new Rendering.Camera(this._canvas.width, this._canvas.height);
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
            if(this._activeView != null) {
                this._renderer.draw(this._activeView.sprites, this._camera, this._canvas, this._background);    
            }
        }

        toString(): string {
            return 'Instance of the Frixl game engine.';
        }
    }
}
