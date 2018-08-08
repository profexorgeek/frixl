namespace Frixl.Rendering {

    export interface IRenderer {
        
        draw(drawables: Array<Entity.Drawable>, 
            camera: Entity.Camera, 
            canvas: HTMLCanvasElement, 
            background: string): void;
    }
}