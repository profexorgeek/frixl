namespace Example.Entities {

    export class Shot extends Frixl.Entities.Sprite {

        constructor() {
            super();

            this.textureName = GameConstants.spriteSheet;

            // pick a random star texture
            this.frame = GameConstants.frameLaserRed
        }

        update(delta: number) {
            super.update(delta);

            this.velocity.x = Math.cos(this.rotation) * GameConstants.shotVelocity;
            this.velocity.y = Math.sin(this.rotation) * GameConstants.shotVelocity;
        }
    }
}