namespace Example.Entities {

    export class GameCursor extends Frixl.Entities.Sprite {

        constructor() {
            super();
            this.textureName = GameConstants.spriteSheet;
            this.frame = GameConstants.frameCursor;
        }

        update(delta: number) {
            super.update(delta);
            this.rotationVelocity = 0.25;
            this.x = Game.instance.input.cursor.worldX;
            this.y = Game.instance.input.cursor.worldY;
        }
    }
}