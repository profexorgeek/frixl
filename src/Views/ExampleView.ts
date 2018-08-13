/// <reference path='./View.ts' />

namespace Frixl.Views {

    export class ExampleView extends View {

        private _textureUrl: string = './content/frostFlake.png';

        constructor() {
            super();

            Game.instance.logger.debug('ExampleView instantiated.');

            // preload a texture
            Rendering.TextureBuffer.instance.loadTexture(this._textureUrl, this.spriteLoaded);
        }

        spriteLoaded = () => {
            Game.instance.logger.debug('Sprite texture loaded, adding to view.');

            let sprite = new Entities.Sprite(this._textureUrl);
            sprite.rotation = 0.15;
            sprite.x = 0;
            sprite.y = 0;
            sprite.rotationVelocity = 0.125;

            for(let i = 0; i < 1000; i += 1) {
                let s = new Entities.Sprite(this._textureUrl);
                let pos = Game.instance.camera.randomVectorInView;
                s.x = pos.x;
                s.y = pos.y;
                s.alpha = Util.GameUtil.randomInRange(0.25, 1);
                s.rotationVelocity = Util.GameUtil.randomInRange(-Math.PI, Math.PI);
                s.attachTo(sprite);
            }

            this.addSprite(sprite);
        }

    }
}