namespace Example.Entities {

    export class Star extends Frixl.Entities.Sprite {

        private _parallax = 0;

        constructor() {
            super();

            this.textureName = GameConstants.spriteSheet;

            // pick a random star texture
            this.frame = Frixl.Util.GameUtil.randomInArray(GameConstants.framesStar);

            // randomize star's appearance
            this.alpha = Frixl.Util.GameUtil.randomInRange(0.4, 1);
            this.rotation = Frixl.Util.GameUtil.randomInRange(-1.5, 1.5);
            this._parallax = Frixl.Util.GameUtil.randomInRange(0.25, 0.75);
        }

        update(delta: number) {
            super.update(delta);

            // wrap the star on the screen
            if(this.absolutePosition.x > Game.instance.camera.right) {
                this._position.x -= Game.instance.camera.width;
            }

            if(this.absolutePosition.x < Game.instance.camera.left) {
                this._position.x += Game.instance.camera.width;
            }

            if(this.absolutePosition.y > Game.instance.camera.top) {
                this._position.y -= Game.instance.camera.height;
            }

            if(this.absolutePosition.y < Game.instance.camera.bottom) {
                this._position.y += Game.instance.camera.height;
            }

            // apply some parallax movement to fake depth
            this._position.x += Game.instance.camera.positionDelta.x * this._parallax;
            this._position.y += Game.instance.camera.positionDelta.y * this._parallax;
        }
    }
}