namespace Example.Views {

    export class ExampleView extends Frixl.Views.View {

        private _textureUrl: string = './content/frostFlake.png';
        private _parentSprite: Frixl.Entities.Sprite;
        private _cursorSprite: Frixl.Entities.Sprite;

        constructor() {
            super();

            Game.instance.logger.debug('ExampleView instantiated.');

            Game.instance.renderer.loadTexture(this._textureUrl, this.onTextureLoaded);
        }

        onTextureLoaded = () => {
            Game.instance.logger.debug('Sprite texture loaded, adding to view.');

            this._parentSprite = new Frixl.Entities.Sprite(this._textureUrl);
            this._cursorSprite = new Frixl.Entities.Sprite(this._textureUrl);

            for(let i = 0; i < 500; i += 1) {
                let s = new Frixl.Entities.Sprite(this._textureUrl);
                let pos = Game.instance.camera.randomVectorInView;
                s.x = pos.x;
                s.y = pos.y;
                s.alpha = Frixl.Util.GameUtil.randomInRange(0.25, 1);
                s.rotationVelocity = Frixl.Util.GameUtil.randomInRange(-Math.PI, Math.PI);
                s.attachTo(this._parentSprite);
            }

            this.addPositionable(this._parentSprite);
            this.addPositionable(this._cursorSprite);
        }

        update(delta: number) {
            super.update(delta);

            let input = Game.instance.input;
            let camera = Game.instance.camera;

            if(this._parentSprite) {
                if(input.keyDown(Frixl.Input.Keys.Space)) {
                    this._parentSprite.rotationVelocity = 0.25;
                }
                else {
                    this._parentSprite.rotationVelocity = 0;
                }
            }

            if(input.keyDown(Frixl.Input.Keys.Right)) {
                camera.velocity.x = 100;
            }
            else if(input.keyDown(Frixl.Input.Keys.Left)) {
                camera.velocity.x = -100;
            }
            else {
                camera.velocity.x = 0;
            }

            if(input.keyDown(Frixl.Input.Keys.Up)) {
                camera.velocity.y = 100;
            }
            else if(input.keyDown(Frixl.Input.Keys.Down)) {
                camera.velocity.y = -100;
            }
            else {
                camera.velocity.y = 0;
            }

            if(input.buttonPushed(Frixl.Input.MouseButtons.Left)) {
                camera.background = "Black";
            }

            if(input.keyPushed(Frixl.Input.Keys.C)) {
                let r = Math.round(Frixl.Util.GameUtil.randomInRange(0, 255));
                let g = Math.round(Frixl.Util.GameUtil.randomInRange(0, 255));
                let b = Math.round(Frixl.Util.GameUtil.randomInRange(0, 255));

                camera.background = "rgb(" + r + "," + g + "," + b + ")";
            }

            if(this._cursorSprite) {
                this._cursorSprite.x = input.cursor.worldX;
                this._cursorSprite.y = input.cursor.worldY;
            }
        }
    }
}