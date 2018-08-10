///<reference path='../Entities/Sprite.ts' />

namespace Frixl.Views {

    export class View {
        private _sprites: Array<Entities.Sprite> = new Array<Entities.Sprite>();

        get sprites(): Array<Entities.Sprite> {
            return this._sprites;
        }

        update(delta: number): void {
            for(let i = this._sprites.length - 1; i > -1; i -= 1) {
                this._sprites[i].update(delta);
            }
        }

        addSprite(sprite: Entities.Sprite): void {
            var drawLayer = this._sprites.length - 1;
            for(let i = 0; i < this._sprites.length; i += 1) {
                if (sprite.layer < this._sprites[i].layer) {
                    drawLayer = i;
                    break;
                }
            }
            this._sprites.splice(drawLayer, 0, sprite);
        }

        addSprites(sprites: Array<Entities.Sprite>): void {
            for(let i = 0; i < sprites.length; i += 1) {
                this.addSprite(sprites[i]);
            }
        }

        removeSprite(sprite: Entities.Sprite): void {
            var index = this._sprites.indexOf(sprite);
            if (index >= 0) {
                this._sprites.splice(index, 1);
            }
        }

        removeSprites(sprites: Array<Entities.Sprite>): void {
            for(let i = 0; i < sprites.length; i++) {
                this.removeSprite(sprites[i]);
            }
        }

        clearSprites(): void {
            this._sprites = new Array<Entities.Sprite>();
        }
    }
}