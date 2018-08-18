namespace Example.Entities {

    export class Ship extends Frixl.Entities.Sprite {


        constructor() {
            super();

            // get the spritesheet name from the config file
            this.textureName = Config.spriteSheet;

            // hardcoded frame for the ship in the spritesheet
            this.frame = new Frixl.Rendering.Frame(352, 0, 32, 32);

            // give the ship some drag so it doesn't coast forever
            this._drag = Config.shipDrag;
        }
    }
}