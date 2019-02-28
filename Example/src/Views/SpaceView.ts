namespace Example.Views {

    export class SpaceView extends Frixl.Views.View {

        private _gameCursor: Entities.GameCursor = new Entities.GameCursor();
        private _stars: Array<Entities.Star> = new Array<Entities.Star>();
        private _asteroids: Array<Entities.Asteroid> = new Array<Entities.Asteroid>();
        private _shots: Array<Entities.Shot> = new Array<Entities.Shot>();
        private _player: Entities.Ship = new Entities.Ship();


        constructor() {
            super();

            const halfWorldSize = GameConstants.worldSize / 2;

            // create a camera shortcut and set some properties
            const cam = Game.instance.camera;
            cam.background = GameConstants.bgColor;

            // add the game cursor instance
            this.addPositionable(this._gameCursor);

            // add the player instance and attach camera
            this.addPositionable(this._player);
            cam.attachTo(this._player);

            // create a bunch of stars with random properties
            for(let i = 0; i < GameConstants.numStars; i++) {
                const s = new Entities.Star;
                s.x = Frixl.Util.GameUtil.randomInRange(cam.left, cam.right);
                s.y = Frixl.Util.GameUtil.randomInRange(cam.bottom, cam.top);
                this._stars.push(s);
                this.addPositionable(s);
            }

            for(let i = 0; i < GameConstants.numAsteroids; i++) {
                const a = new Entities.Asteroid;
                a.x = Frixl.Util.GameUtil.randomInRange(-halfWorldSize, halfWorldSize);
                a.y = Frixl.Util.GameUtil.randomInRange(-halfWorldSize, halfWorldSize);
                this._asteroids.push(a);
                this.addPositionable(a);
            }

            // make sure ship draws above stars and cursor draws above everything
            this._player.layer = 10;
            this._gameCursor.layer = 999;
        }

        update(delta: number) {
            super.update(delta);

            this.doPlayerInput();
            this.doPlayerVsAsteroidCollision();
            this.doAsteroidVsAsteroidCollision();
            this.doShotVsAsteroidCollision();
        }

        private doPlayerInput() {

            // create some shortcut vars for readability
            const input = Game.instance.input;
            const cursor = input.cursor;
            const plyr = this._player;

            // rotate toward cursor
            plyr.rotation = Math.atan2(cursor.worldY - plyr.absolutePosition.y, cursor.worldX - plyr.absolutePosition.x);

            // accelerate in rotation direction if mousebutton is down
            if(input.buttonDown(Frixl.Input.MouseButtons.Right)) {
                plyr.acceleration.x = Math.cos(plyr.rotation) * GameConstants.shipAccel;
                plyr.acceleration.y = Math.sin(plyr.rotation) * GameConstants.shipAccel;
            }
            else {
                plyr.acceleration.x = 0;
                plyr.acceleration.y = 0;
            }

            // fire shots
            if(input.buttonPushed(Frixl.Input.MouseButtons.Left)) {
                const s = new Entities.Shot();
                s.x = this._player.x;
                s.y = this._player.y;
                s.rotation = this._player.rotation;

                this._shots.push(s);
                this.addPositionable(s);

                Game.instance.audio.playSound(GameConstants.laserSound);
            }
        }

        private doPlayerVsAsteroidCollision() {
            for(let i = this._asteroids.length - 1; i > -1; i--) {
                const a = this._asteroids[i];
                this._player.collideAndBounce(a, 0.25, 0.99);
            }
        }

        private doAsteroidVsAsteroidCollision() {
            for(let i = this._asteroids.length - 1; i > -1; i--) {
                const a1 = this._asteroids[i];
                for(let j = this._asteroids.length - 1; j > -1; j--) {
                    const a2 = this._asteroids[j];

                    if(a1 != a2) {
                        a1.collideAndBounce(a2, 0.5, 0.5);
                    }
                }
            }
        }

        private doShotVsAsteroidCollision() {
            for(let i = this._asteroids.length - 1; i > -1; i--) {
                const a = this._asteroids[i];
                for(let j = this._shots.length - 1; j > -1; j--) {
                    const s = this._shots[j];

                    if(s.collideAndBounce(a, 0.25, 1)) {
                        this._shots.splice(j, 1);
                        this.removePositionable(s);
                    }
                }
            }
        }
    }
}