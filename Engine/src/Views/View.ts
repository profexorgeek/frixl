
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

        addPositionables(positionable: Array<Entities.Positionable>): void {
            for(let i = 0; i < positionable.length; i += 1) {
                this.addPositionable(positionable[i]);
            }
        }

        removePositionable(positionable: Entities.Positionable): void {
            var index = this._positionables.indexOf(positionable);
            if (index >= 0) {
                this._positionables.splice(index, 1);
            }
        }

        removePositionables(positionable: Array<Entities.Positionable>): void {
            for(let i = 0; i < positionable.length; i++) {
                this.removePositionable(positionable[i]);
            }
        }

        clearSprites(): void {
            this._positionables = new Array<Entities.Sprite>();
        }
    }
}