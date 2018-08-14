namespace Frixl.Rendering {

    export interface IRenderer {
        
        draw(positionables: Array<Entities.Positionable>, 
            camera: Camera, 
            canvas: HTMLCanvasElement): void;

        loadTexture(path: string, callback: Function): void

        getTexture(path: string): HTMLImageElement
    }
}