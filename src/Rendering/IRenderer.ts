namespace Frixl.Rendering {

    export interface IRenderer {
        
        draw(drawables: Array<Entities.Sprite>, 
            camera: Camera, 
            canvas: HTMLCanvasElement, 
            background: string): void;
    }
}