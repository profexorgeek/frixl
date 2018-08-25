/// <reference path='../Util/GameUtil.ts' />

namespace Frixl.Rendering {

    export class DefaultRenderer implements IRenderer {

        draw(positionables: Array<Entities.Positionable>, camera: Camera, context: CanvasRenderingContext2D): void {
            let camTransX = Util.GameUtil.invert(camera.absolutePosition.x) + context.canvas.width / 2;
            let camTransY = camera.absolutePosition.y + (context.canvas.height / 2);

            context.fillStyle = camera.background;
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);

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
            if(!Util.GameUtil.empty(sprite.textureName)) {
                let texture = Game.instance.content.getAsset<HTMLImageElement>(sprite.textureName);
                let alpha = sprite.alpha;

                context.globalAlpha = alpha;
                if(texture) {
                    let coords = sprite.frame;
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
}