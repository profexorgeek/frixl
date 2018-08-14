namespace Example.Views {

    export class ExampleView extends Frixl.Views.View {

        private _textureUrl: string = './content/frostFlake.png';

        constructor() {
            super();

            Game.instance.logger.debug('ExampleView instantiated.');
            Game.instance.renderer.loadTexture(this._textureUrl, this.spriteLoaded);
        }

        spriteLoaded = () => {
            Game.instance.logger.debug('Sprite texture loaded, adding to view.');

            let sprite = new Frixl.Entities.Sprite(this._textureUrl);
            sprite.rotation = 0.15;
            sprite.x = 0;
            sprite.y = 0;
            sprite.rotationVelocity = 0.125;

            for(let i = 0; i < 500; i += 1) {
                let s = new Frixl.Entities.Sprite(this._textureUrl);
                let pos = Game.instance.camera.randomVectorInView;
                s.x = pos.x;
                s.y = pos.y;
                s.alpha = Frixl.Util.GameUtil.randomInRange(0.25, 1);
                s.rotationVelocity = Frixl.Util.GameUtil.randomInRange(-Math.PI, Math.PI);
                s.attachTo(sprite);
            }

            this.addPositionable(sprite);
        }

    }
}