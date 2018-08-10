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
            sprite.x = 50;
            sprite.y = -50;
            sprite.velocity = new Util.Vector(-5, 0);
            sprite.rotationVelocity = 1;

            this.addSprite(sprite);
        }

    }
}