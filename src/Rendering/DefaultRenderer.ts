/// <reference path='../Util/GameUtil.ts' />

namespace Frixl.Rendering {

    export class DefaultRenderer implements IRenderer {

        constructor() { }

        draw(drawables: Array<Entities.Sprite>, camera: Camera, canvas: HTMLCanvasElement, background: string): void {
            let context = canvas.getContext('2d');
            let camTransX = Util.GameUtil.invert(camera.x);
            let camTransY = camera.y + (context.canvas.height / 2);
            let fill = Util.GameUtil.empty(background) ? 'rgb(0,0,0,0)' : background;

            context.fillStyle = fill;
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}