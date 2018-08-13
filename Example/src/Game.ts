/// <reference path='../../Engine/dist/frixl.d.ts' />

namespace Example {
    export class Game extends Frixl.Game {

        constructor() {
            super();
            let canvas = document.getElementById('frixlCanvas') as HTMLCanvasElement;
            this.initialize(canvas, 60);

            this.activeView = new Views.ExampleView();

            this.start();
        }
    }
}