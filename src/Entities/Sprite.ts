/// <reference path='../Rendering/TextureBuffer.ts' />

namespace Frixl.Entities {

    export class Sprite extends Positionable {
        
        private _textureName: string;
        private _size: Util.Vector = new Util.Vector();
        private _layer: number = 0;
        private _alpha: number = 1;

        get layer(): number {
            return this._layer;
        }
        set layer(l: number) {
            this._layer = l;
        }

        get alpha(): number {
            return this._alpha;
        }
        set alpha(a: number) {
            this._alpha = Util.GameUtil.clamp(a, 0, 1);
        }

        get textureName(): string {
            return this._textureName;
        }
        set textureName(name: string) {
            this._textureName = name;

            let tb = Rendering.TextureBuffer;
            let tex = tb.instance.getTexture(this._textureName);

            if(tex === null) {
                throw "ERROR: supplied texture is not loaded. Textures must be preloaded with the TextureBuffer!";
            }

            this._size.x = tex.width;
            this._size.y = tex.height;
        }


        constructor(textureName: string) {
            super();
            this.textureName = textureName;
        }

        update(delta: number): void {
            super.update(delta);
        }
    }
}