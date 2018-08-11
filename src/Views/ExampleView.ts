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
            sprite.rotationVelocity = 1;

            let childSprite = new Entities.Sprite(this._textureUrl);
            childSprite.attachTo(sprite);
            childSprite.x = 50;
            childSprite.y = 50;
            childSprite.rotationVelocity = -5;

            this.addSprite(sprite);
        }

    }
}