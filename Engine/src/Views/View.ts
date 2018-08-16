
namespace Frixl.Views {

    export class View implements IUpdateable {
        private _positionables: Array<Entities.Positionable> = new Array<Entities.Positionable>();

        get positionables(): Array<Entities.Positionable> {
            return this._positionables;
        }

        update(delta: number): void {
            for(let i = this._positionables.length - 1; i > -1; i -= 1) {
                this._positionables[i].update(delta);
            }
        }

        addPositionable(positionable: Entities.Positionable): void {
            var drawLayer = this._positionables.length - 1;
            for(let i = 0; i < this._positionables.length; i += 1) {
                if (positionable.layer < this._positionables[i].layer) {
                    drawLayer = i;
                    break;
                }
            }
            this._positionables.splice(drawLayer, 0, positionable);
        }

        addSprites(sprites: Array<Entities.Sprite>): void {
            for(let i = 0; i < sprites.length; i += 1) {
                this.addPositionable(sprites[i]);
            }
        }

        removePositionable(positionable: Entities.Positionable): void {
            var index = this._positionables.indexOf(positionable);
            if (index >= 0) {
                this._positionables.splice(index, 1);
            }
        }

        removeSprites(sprites: Array<Entities.Sprite>): void {
            for(let i = 0; i < sprites.length; i++) {
                this.removePositionable(sprites[i]);
            }
        }

        clearSprites(): void {
            this._positionables = new Array<Entities.Sprite>();
        }
    }
}