namespace Frixl.Entities {

    export class Sprite extends Positionable {
        
        private _textureName: string;
        private _alpha: number = 1;
        private _frame: Rendering.Frame = null;
        private _animationList: Record<string, Rendering.Animation> = null;
        private _animationName: string = null;

        get alpha(): number {
            return this._alpha;
        }
        set alpha(a: number) {
            this._alpha = Util.GameUtil.clamp(a, 0, 1);
        }

        get animationList(): Record<string, Rendering.Animation> {
            return this._animationList;
        }
        set animationList(l: Record<string, Rendering.Animation>) {
            this._animationList = l;
        }

        get animationName(): string {
            return this._animationName;
        }
        set animationName(name: string) {
            this._animationName = name;
        }

        get currentAnimation(): Rendering.Animation {
            let a: Rendering.Animation = null;
            if(this._animationList && !Util.GameUtil.empty(this._animationName)) {
                a = this._animationList[this._animationName];
            }
            return a;
        }

        get frame(): Rendering.Frame {
            return this._frame;
        }
        set frame(f: Rendering.Frame) {
            this._frame = f;
        }

        get textureName(): string {
            return this._textureName;
        }
        set textureName(name: string) {
            this._textureName = name;
            let tex = Game.instance.content.getAsset<ImageBitmap>(this._textureName);
            if(tex === null) {
                throw "ERROR: supplied texture is not loaded. Textures must loaded before a Sprite can be created!";
            }

            if(!this._frame) {
                this._frame = new Rendering.Frame(0, 0, tex.width, tex.height);
            }
        }


        constructor(textureName: string = null) {
            super();
            if(textureName) {
                this.textureName = textureName;
            }
        }

        update(delta: number): void {
            super.update(delta);

            if(this.currentAnimation) {
                this.currentAnimation.update(delta);
                this.textureName = this.currentAnimation.textureName;
                this.frame = this.currentAnimation.currentFrame;
            }
        }
    }
}