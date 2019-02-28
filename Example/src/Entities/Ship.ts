namespace Example.Entities {

    export class Ship extends Frixl.Entities.Sprite {

        private halfWorldSize: number = GameConstants.worldSize / 2;

        constructor() {
            super();
            // get the spritesheet name from the config file
            this.textureName = GameConstants.spriteSheet;

            // get a random sprite
            this.frame = Frixl.Util.GameUtil.randomInArray(GameConstants.framesShipScout);

            // hardcoded radius for collision
            this.radius = GameConstants.shipRadius;

            // give the ship some drag so it doesn't coast forever
            this._drag = GameConstants.shipDrag;
        }

        update(delta: number) {
            super.update(delta);

            // if(this.x < -this.halfWorldSize) {
            //     this.x = this.halfWorldSize;
            // }

            // if(this.x > this.halfWorldSize) {
            //     this.x = -this.halfWorldSize;
            // }

            // if(this.y < -this.halfWorldSize) {
            //     this.y = this.halfWorldSize;
            // }

            // if(this.y > this.halfWorldSize) {
            //     this.y = -this.halfWorldSize;
            // }
        }
    }
}