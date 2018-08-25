/// <reference path='../../Engine/dist/frixl.d.ts' />

namespace Example {
    export class Game extends Frixl.Game {

        private _callbacksFired: number = 0;
        private _allCallbackCount: number = 2;

        constructor() {
            super();
            let canvas = document.getElementById('frixlCanvas') as HTMLCanvasElement;
            this.initialize(canvas, 60);

            this.showCursor = false;

            this.logger.debug('Loading game assets...');
            this.content.loadTexture(Config.spriteSheet, this.onItemLoaded);
            this.content.loadSound(Config.laserSound, this.onItemLoaded);
        }

        onItemLoaded = (response: any) => {
            this._callbacksFired += 1;

            Game.instance.logger.debug('Preloaded ' + this._callbacksFired + '/' + this._allCallbackCount + ' assets.');

            if(this._callbacksFired >= this._allCallbackCount) {
                this.activeView = new Views.SpaceView();
                this.start();
            }
        }
    }
}