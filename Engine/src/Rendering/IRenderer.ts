namespace Frixl.Rendering {

    export interface IRenderer {
        
        draw(drawables: Array<Entities.Sprite>, 
            camera: Camera, 
            canvas: HTMLCanvasElement): void;

        loadTexture(path: string, callback: Function): void

        getTexture(path: string): HTMLImageElement
    }
}