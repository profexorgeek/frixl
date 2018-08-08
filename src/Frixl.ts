module Frixl {

    export class Game {

        private static _game:Game;

        protected _canvas: HTMLCanvasElement;
        protected _fps: number;
        protected _background: string;
        protected _paused: boolean;
        protected _gameTime: GameTime;
        protected _timer: any;
        protected _camera: Entity.Camera;
        protected _renderer: Renderer;
        protected _textures: any;

        get camera(): Entity.Camera {
            return this._camera;
        }
    
        constructor() {
            console.log('Frixl engine instance created.');
        }
    
        initialize(canvas: HTMLCanvasElement, fps: number, background: string): void {
            this._canvas = canvas;
            this._fps = fps;
            this._background = background;
            this._textures = {};
            this._camera = new Entity.Camera(this._canvas.width, this._canvas.height);
            this._renderer = new Renderer();
            this._gameTime = new GameTime();
        }

        start(): void {
            let g = this;
            this._timer = setInterval(function () {
                g.update()
            }, (1000 / this._fps));
        }

        stop(): void {
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
