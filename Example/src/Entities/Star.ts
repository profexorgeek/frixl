namespace Example.Entities {

    export class Star extends Frixl.Entities.Sprite {

        private _starFrames = new Array<Frixl.Rendering.Frame>(
            new Frixl.Rendering.Frame(96, 16, 16, 16),
            new Frixl.Rendering.Frame(112, 0, 16, 16)
        );

        constructor() {
            super();

            this.textureName = Config.spriteSheet;

            if(Math.random() < 0.1) {
                this.frame = this._starFrames[1];
            }
            else {
                this.frame = this._starFrames[0];
            }

            this.alpha = Frixl.Util.GameUtil.randomInRange(0.2, 1);
            this.rotation = Frixl.Util.GameUtil.randomInRange(-1.5, 1.5);
        }
    }
}