namespace Frixl.Entities {

    export class Sprite extends Positionable {
        
        private _textureName: string;
        private _alpha: number = 1;
        private _textureCoords: Util.Rectangle = new Util.Rectangle();

        get alpha(): number {
            return this._alpha;
        }
        set alpha(a: number) {
            this._alpha = Util.GameUtil.clamp(a, 0, 1);
        }

        get textureCoords(): Util.Rectangle {
            return this._textureCoords;
        }
        set textureCoords(rect: Util.Rectangle) {
            this._textureCoords = rect;
        }

        get textureName(): string {
            return this._textureName;
        }
        set textureName(name: string) {
            this._textureName = name;
            let tex = Game.instance.renderer.getTexture(this._textureName);
            if(tex === null) {
                throw "ERROR: supplied texture is not loaded. Textures must loaded before a Sprite can be created!";
            }
            this._textureCoords.setFromTextureCoords(0, 0, tex.width, tex.height);
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