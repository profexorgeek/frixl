/// <reference path='../Util/GameUtil.ts' />

namespace Frixl.Rendering {

    export class DefaultRenderer implements IRenderer {

        constructor() { }

        draw(sprites: Array<Entities.Sprite>, camera: Camera, canvas: HTMLCanvasElement, background: string): void {
            let context = canvas.getContext('2d');
            let camTransX = Util.GameUtil.invert(camera.x) + context.canvas.width / 2;
            let camTransY = camera.y + (context.canvas.height / 2);
            let fill = Util.GameUtil.empty(background) ? 'rgb(0,0,0,0)' : background;

            context.fillStyle = fill;
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
                context.drawImage(
                    texture,
                    0, // TODO: replace with left texture coord
                    0, // TODO: replace with top texture coord
                    texture.width,  // TODO: replace with calculated width from texture coords
                    texture.height, // TODO: replace with calculated height from texture coords
                    texture.width / -2,
                    texture.height / -2,
                    texture.width,
                    texture.height
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