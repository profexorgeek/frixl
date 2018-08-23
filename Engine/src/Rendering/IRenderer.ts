namespace Frixl.Rendering {

    export interface IRenderer {
        
        draw(positionables: Array<Entities.Positionable>, 
            camera: Camera, 
            context: CanvasRenderingContext2D): void;

        loadTexture(path: string, callback: Function): void

        getTexture(path: string): HTMLImageElement
    }
}