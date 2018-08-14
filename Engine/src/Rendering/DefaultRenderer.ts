/// <reference path='../Util/GameUtil.ts' />

namespace Frixl.Rendering {

    export class DefaultRenderer implements IRenderer {

        private _textures: any = {};

        constructor() { }

        public loadTexture(url: string, callback: Function = null): void {

            if(!(url in this._textures) || this._textures[url] === null)
            {
                Frixl.Game.instance.logger.debug('Loading texture: ' + url);
                let img = new Image();
                let me = this;
                img.src = url;
                img.onload = function () {
                    Frixl.Game.instance.logger.debug('Texture loaded: ' + url);
                    me._textures[url] = img;
                    if(callback) {
                        callback();
                    }
                }
            }
            else {
                callback();
            }
        }

        public getTexture(url: string) : HTMLImageElement {
            let texture: HTMLImageElement = null;

            if((url in this._textures) && this._textures[url] !== null) {
                texture = this._textures[url];
            }
            else {
                Frixl.Game.instance.logger.warn('Texture ' + url + ' was not found. It should be preloaded.');
            }

            return texture;
        }

        draw(positionables: Array<Entities.Positionable>, camera: Camera, canvas: HTMLCanvasElement): void {
            let context = canvas.getContext('2d');
            let camTransX = Util.GameUtil.invert(camera.x) + context.canvas.width / 2;
            let camTransY = camera.y + (context.canvas.height / 2);

            context.fillStyle = camera.background;
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.save();
            context.translate(camTransX, camTransY);
            for(let i = 0; i < positionables.length; i++) {
                this.drawPositionable(positionables[i], context);
            }
            context.restore();
        }

        private drawPositionable(positionable: Entities.Positionable, context: CanvasRenderingContext2D): void {
            let transX = positionable.x;
            let transY = Util.GameUtil.invert(positionable.y);
            let rot = Util.GameUtil.invert(positionable.rotation);

            context.save();
            context.translate(transX, transY);
            context.rotate(rot);

            // choose draw method based on type
            if(positionable instanceof Entities.Sprite) {
                this.drawSprite(positionable as Entities.Sprite, context);
            }

            for(let i = 0; i < positionable.children.length; i += 1) {
                if(positionable.children[i] instanceof Entities.Sprite) {
                    this.drawPositionable(positionable.children[i] as Entities.Sprite, context);
                }
            }

            context.restore();
        }

        private drawSprite(sprite: Entities.Sprite, context: CanvasRenderingContext2D) {
            let texture: HTMLImageElement = null;
            if(!Util.GameUtil.empty(sprite.textureName)) {
                texture = this.getTexture(sprite.textureName);
            }
            let alpha = sprite.alpha;
            context.globalAlpha = alpha;
            if(texture) {
                let coords = sprite.textureCoords;
                context.drawImage(
                    texture,
                    coords.left,
                    coords.top,
                    coords.width,
                    coords.height,
                    coords.width / -2,
                    coords.height / -2,
                    coords.width,
                    coords.height
                );
            }
            context.globalAlpha = 1;
        }
    }
}