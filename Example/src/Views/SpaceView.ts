namespace Example.Views {

    export class SpaceView extends Frixl.Views.View {

        private _gameCursor: Entities.GameCursor = new Entities.GameCursor();
        private _stars: Array<Entities.Star> = new Array<Entities.Star>();
        private _player: Entities.Ship = new Entities.Ship();


        constructor() {
            super();

            // shortcut to camera
            let cam = Game.instance.camera;

            // add the game cursor instance
            this.addPositionable(this._gameCursor);

            // add the player instance
            this.addPositionable(this._player);

            // attach the camera to the player
            cam.attachTo(this._player);

            // set a custom background color
            cam.background = "rgb(50, 50, 50)";

            // create a bunch of stars with random properties
            for(let i = 0; i < Config.numStars; i++) {
                let s = new Entities.Star;
                s.x = Frixl.Util.GameUtil.randomInRange(cam.left, cam.right);
                s.y = Frixl.Util.GameUtil.randomInRange(cam.bottom, cam.top);
                this._stars.push(s);
                this.addPositionable(s);
            }

            // make sure ship draws above stars and cursor draws above everything
            this._player.layer = 10;
            this._gameCursor.layer = 999;
        }

        update(delta: number) {
            super.update(delta);

            this.doPlayerInput();
        }

        doPlayerInput() {

            // create some shortcut vars for readability
            let input = Game.instance.input;
            let cursor = input.cursor;
            let plyr = this._player;

            // rotate toward cursor
            plyr.rotation = Math.atan2(cursor.worldY - plyr.absolutePosition.y, cursor.worldX - plyr.absolutePosition.x);

            // accelerate in rotation direction if mousebutton is down
            if(input.buttonDown(Frixl.Input.MouseButtons.Left)) {
                plyr.acceleration.x = Math.cos(plyr.rotation) * Config.shipAccel;
                plyr.acceleration.y = Math.sin(plyr.rotation) * Config.shipAccel;
            }
            else {
                plyr.acceleration.x = 0;
                plyr.acceleration.y = 0;
            }

            if(input.keyPushed(Frixl.Input.Keys.Space)) {
                Game.instance.audio.playSound(Config.laserSound);
            }

        }
    }
}