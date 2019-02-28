namespace Example.Entities {

    export enum AsteroidSize {
        Small,
        Medium,
        Large
    }

    export class Asteroid extends Frixl.Entities.Sprite {

        private _asteroidSize:AsteroidSize;

        get asteroidSize() : AsteroidSize {
            return this._asteroidSize;
        }

        set asteroidSize(s: AsteroidSize) {
            this._asteroidSize = s;
            let frameList: Array<Frixl.Rendering.Frame>;

            // set collision and random sprite based on new size
            switch(this._asteroidSize) {
                case AsteroidSize.Large:
                    frameList = GameConstants.framesAsteroidLarge;
                    this.radius = 30;
                break;

                case AsteroidSize.Medium:
                    frameList = GameConstants.framesAsteroidMedium;
                    this.radius = 14;
                break;
                
                case AsteroidSize.Small:
                    frameList = GameConstants.framesAsteroidSmall;
                    this.radius = 6;
                break;
            }

            // set random sprite
            this.frame = Frixl.Util.GameUtil.randomInArray(frameList);

            // randomize rotation
            this.rotation = Frixl.Util.GameUtil.randomInRange(-1.5, 1.5);
            this.rotationVelocity = Frixl.Util.GameUtil.randomInRange(-0.25, 0.25);
        }


        constructor() {
            super();
            // get the spritesheet name from the config file
            this.textureName = GameConstants.spriteSheet;

            // default to large
            this.asteroidSize = AsteroidSize.Medium;

            // set some drag so we don't drift forever
            this._drag = GameConstants.asteroidDrag;
        }
    }
}