namespace Frixl {

    export class Game {

        private static _instance:Game;

        protected _canvas: HTMLCanvasElement;
        protected _fps: number;
        protected _paused: boolean;
        protected _gameTime: GameTime;
        protected _timer: any;
        protected _camera: Rendering.Camera;
        protected _input: Input.InputHandler;
        protected _renderer: Rendering.IRenderer;
        protected _logger: Util.ILogger;
        protected _activeView: Views.View;

        static get instance(): Game {
            return this._instance;
        }
        static set instance(game: Game) {
            this._instance = game;
        }

        get camera(): Rendering.Camera {
            return this._camera;
        }

        get renderer(): Rendering.IRenderer {
            return this._renderer;
        }

        get input(): Input.InputHandler {
            return this._input;
        }

        get canvas(): HTMLCanvasElement {
            return this._canvas;
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
    
        initialize(canvas: HTMLCanvasElement, fps: number): void {
            this.logger.debug('Initializing game.');
            this._canvas = canvas;
            this._fps = fps;
            this._camera = new Rendering.Camera(this._canvas.width, this._canvas.height);
            this._renderer = new Rendering.DefaultRenderer();
            this._gameTime = new GameTime();
            this._input = new Input.InputHandler();

            this.activeView = new Views.View();
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
            let delta = this._gameTime.frameSeconds;
            
            if(this._activeView) {
                this._activeView.update(delta);
            }

            if(this._camera) {
                this._camera.update(delta);
            }

            if(this._input) {
                this._input.update(delta);
            }

            this.draw();
        }
    
        draw(): void {
            if(this._activeView != null) {
                this._renderer.draw(this._activeView.positionables, this._camera, this._canvas);    
            }
        }

        toString(): string {
            return 'Instance of the Frixl game engine.';
        }
    }
}
