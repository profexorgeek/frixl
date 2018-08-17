namespace Example.Entities {

    export class GameCursor extends Frixl.Entities.Sprite {

        constructor() {
            super();
            this.textureName = Config.spriteSheet;
            this.frame = new Frixl.Rendering.Frame(32, 0, 32, 32);
        }

        update(delta: number) {
            super.update(delta);
            this.rotationVelocity = 0.25;
            this.x = Game.instance.input.cursor.worldX;
            this.y = Game.instance.input.cursor.worldY;
        }
    }
}