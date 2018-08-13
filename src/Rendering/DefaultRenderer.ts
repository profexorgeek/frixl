/// <reference path='../Util/GameUtil.ts' />

namespace Frixl.Rendering {

    export class DefaultRenderer implements IRenderer {

        constructor() { }

        draw(sprites: Array<Entities.Sprite>, camera: Camera, canvas: HTMLCanvasElement): void {
            let context = canvas.getContext('2d');
            let camTransX = Util.GameUtil.invert(camera.x) + context.canvas.width / 2;
            let camTransY = camera.y + (context.canvas.height / 2);

            context.fillStyle = camera.background;
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.save();
            context.translate(camTransX, camTransY);
            for(let i = 0; i < sprites.length; i++) {
                this.drawSprite(sprites[i], context);
            }
            context.restore();
        }

        drawSprite(sprite: Entities.Sprite, context: CanvasRenderingContext2D) {
            let texture: HTMLImageElement = null;
            if(!Util.GameUtil.empty(sprite.textureName)) {
                texture = TextureBuffer.instance.getTexture(sprite.textureName);
            }

            let transX = sprite.x;
            let transY = Util.GameUtil.invert(sprite.y);
            let rotation = -sprite.rotation;
            let alpha = sprite.alpha;

            context.save();
            context.translate(transX, transY);
            context.rotate(rotation);
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
            
            // reset alpha before drawing children
            context.globalAlpha = 1;

            // draw children
            for(let i = 0; i < sprite.children.length; i += 1) {
                if(sprite.children[i] instanceof Entities.Sprite) {
                    this.drawSprite(sprite.children[i] as Entities.Sprite, context);
                }
            }

            context.restore();
        }
    }
}