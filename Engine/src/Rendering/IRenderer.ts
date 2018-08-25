namespace Frixl.Rendering {

    export interface IRenderer {
        
        draw(positionables: Array<Entities.Positionable>, 
            camera: Camera, 
            context: CanvasRenderingContext2D): void;
    }
}