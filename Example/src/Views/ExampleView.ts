namespace Example.Views {

    export class ExampleView extends Frixl.Views.View {

        private _textureUrl: string = './content/frostFlake.png';
        private _parentSprite: Frixl.Entities.Sprite;

        constructor() {
            super();

            Game.instance.logger.debug('ExampleView instantiated.');
            Game.instance.renderer.loadTexture(this._textureUrl, this.textureLoaded);
        }

        textureLoaded = () => {
            Game.instance.logger.debug('Sprite texture loaded, adding to view.');

            this._parentSprite = new Frixl.Entities.Sprite(this._textureUrl);

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
        }

        update(delta: number) {
            super.update(delta);

            let input = Game.instance.input;
            if(input.keyDown(Frixl.Keys.Space)) {
                this._parentSprite.rotationVelocity = 0.25;
            }
            else {
                this._parentSprite.rotationVelocity = 0;
            }
        }



    }
}