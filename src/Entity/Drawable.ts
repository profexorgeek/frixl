/// <reference path='./Positionable.ts' />
/// <reference path='../IO/TextureBuffer.ts' />

namespace Frixl.Entity {

    export class Drawable extends Positionable {
        
        private _url: string;
        private _size: Frixl.Util.Vector;

        constructor(url: string) {
            super();
            this._url = url;
            let tb = Frixl.IO.TextureBuffer;
            let texture = tb.getTexture(this._url);

            if(texture === null) {
                throw "ERROR: supplied texture is not loaded. Textures must be preloaded with the TextureBuffer!";
            }

            this._size.x = texture.width;
            this._size.y = texture.height;
        }
    }
}