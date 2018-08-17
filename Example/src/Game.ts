/// <reference path='../../Engine/dist/frixl.d.ts' />

namespace Example {
    export class Game extends Frixl.Game {

        constructor() {
            super();
            let canvas = document.getElementById('frixlCanvas') as HTMLCanvasElement;
            this.initialize(canvas, 60);

            this.showCursor = false;

            this.renderer.loadTexture(Config.spriteSheet, this.onTexturesLoaded);
        }

        onTexturesLoaded = () => {
            this.logger.debug('Game textures loaded.');
            this.activeView = new Views.SpaceView();
            this.start();
        }
    }
}