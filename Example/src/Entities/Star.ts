namespace Example.Entities {

    export class Star extends Frixl.Entities.Sprite {

        private _parallax = 0;

        // hardcoded frames on the spritesheet
        private _starFrames = new Array<Frixl.Rendering.Frame>(
            new Frixl.Rendering.Frame(96, 16, 16, 16),
            new Frixl.Rendering.Frame(112, 0, 16, 16)
        );

        constructor() {
            super();

            this.textureName = Config.spriteSheet;

            // pick a random star texture
            if(Math.random() < 0.1) {
                this.frame = this._starFrames[1];
            }
            else {
                this.frame = this._starFrames[0];
            }

            // randomize star's appearance
            this.alpha = Frixl.Util.GameUtil.randomInRange(0.4, 1);
            this.rotation = Frixl.Util.GameUtil.randomInRange(-1.5, 1.5);
            this._parallax = Frixl.Util.GameUtil.randomInRange(0.25, 0.75);
        }

        update(delta: number) {
            super.update(delta);

            // create some shortcut vars for readability
            let absPos = this.absolutePosition;
            let cam = Game.instance.camera;

            // wrap the star on the screen
            if(absPos.x > cam.right) {
                this.x -= cam.width;
            }

            if(absPos.x < cam.left) {
                this.x += cam.width;
            }

            if(absPos.y > cam.top) {
                this.y -= cam.height;
            }

            if(absPos.y < cam.bottom) {
                this.y += cam.height;
            }

            // apply some parallax movement to fake depth
            this._position = this._position.add(cam.getParallax(this._parallax));
        }
    }
}