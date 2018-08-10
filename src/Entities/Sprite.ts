/// <reference path='../IO/TextureBuffer.ts' />

namespace Frixl.Entities {

    export class Sprite extends Positionable {
        
        private _url: string;
        private _size: Frixl.Util.Vector;
        private _layer: number;

        get layer(): number {
            return this._layer;
        }
        set layer(l: number) {
            this._layer = l;
        }

        constructor(url: string) {
            super();
            this._url = url;
            this._layer = 0;
            let tb = Frixl.IO.TextureBuffer;
            let texture = tb.instance.getTexture(this._url);

            if(texture === null) {
                throw "ERROR: supplied texture is not loaded. Textures must be preloaded with the TextureBuffer!";
            }

            this._size.x = texture.width;
            this._size.y = texture.height;
        }

        update(delta: number): void {
            
        }
    }
}