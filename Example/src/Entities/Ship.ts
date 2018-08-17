namespace Example.Entities {

    export class Ship extends Frixl.Entities.Sprite {


        constructor() {
            super();

            this.textureName = Config.spriteSheet;
            this.frame = new Frixl.Rendering.Frame(352, 0, 32, 32);
            this._drag = Config.shipDrag;
        }

        update(delta: number) {
            super.update(delta);
            let input = Game.instance.input;
            let cursor = input.cursor;

            this.rotation = Math.atan2(cursor.worldY - this.y, cursor.worldX - this.x);

            if(input.buttonDown(Frixl.Input.MouseButtons.Left)) {
                this.acceleration.x = Math.cos(this.rotation) * Config.shipAccel;
                this.acceleration.y = Math.sin(this.rotation) * Config.shipAccel;
            }
            else {
                this.acceleration.x = 0;
                this.acceleration.y = 0;
            }
        }

    }
}