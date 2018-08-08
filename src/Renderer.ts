/// <reference path='./Util/GameUtil.ts' />

module Frixl {

    export class Renderer {

        constructor() { }

        draw(sprites: Array<Entity.Sprite>, camera: Entity.Camera, canvas: HTMLCanvasElement, background: string) {
            let context = canvas.getContext('2d');
            let camTransX = Util.GameUtil.invert(camera.x);
            let camTransY = camera.y + (context.canvas.height / 2);
            let fill = Util.GameUtil.empty(background) ? 'rgb(0,0,0,0)' : background;

            context.fillStyle = fill;
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            let img:HTMLImageElement = null;
            let url = 'https://wallpapertag.com/wallpaper/full/d/3/d/267129-large-4k-wallpaper-3840x2160-retina.jpg';

            try {
                img = IO.TextureBuffer.getTexture(url);
            }
            catch (e) {
                console.log('Texture not found: ' + e.message);
                IO.TextureBuffer.loadTexture(url);
            }

            context.save();
            context.drawImage(img, 0, 0);
            context.restore();
        }
    }
}