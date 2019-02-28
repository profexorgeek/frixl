namespace Example {

    export class GameConstants {

        public static fps: number = 60;
        public static spriteSheet: string = './content/spriteSheet.png';
        public static laserSound: string = './content/laser.wav';
        public static worldSize: number = 800;
        public static numStars: number = 50;
        public static numAsteroids: number = 10;
        public static shotVelocity: number = 300;
        public static shipAccel: number = 150;
        public static shipDrag: number = 0.65;
        public static shipRadius: number = 12;
        public static asteroidDrag: number = 0.3;
        public static bgColor: string = "rgb(50,50,50)";

        // Sprite Frames
        public static frameCursor: Frixl.Rendering.Frame = new Frixl.Rendering.Frame(32, 0, 32, 32);
        public static frameLaserRed: Frixl.Rendering.Frame = new Frixl.Rendering.Frame(352, 16, 16, 16);
        public static framesStar: Array<Frixl.Rendering.Frame> = new Array<Frixl.Rendering.Frame>(
            new Frixl.Rendering.Frame(96, 16, 16, 16),
            new Frixl.Rendering.Frame(112, 0, 16, 16)
        );
        public static framesShipScout: Array<Frixl.Rendering.Frame> = new Array(
            new Frixl.Rendering.Frame(384, 64, 32, 32),
            new Frixl.Rendering.Frame(384, 96, 32, 32),
            new Frixl.Rendering.Frame(384, 128, 32, 32),
            new Frixl.Rendering.Frame(384, 160, 32, 32)
        );
        public static framesAsteroidLarge: Array<Frixl.Rendering.Frame> = new Array(
            new Frixl.Rendering.Frame(0, 64, 64, 64)
        );
        public static framesAsteroidMedium: Array<Frixl.Rendering.Frame> = new Array(
            new Frixl.Rendering.Frame(32, 128, 32, 32),
            new Frixl.Rendering.Frame(32, 160, 32, 32)
        );
        public static framesAsteroidSmall: Array<Frixl.Rendering.Frame> = new Array(
            new Frixl.Rendering.Frame(0, 128, 16, 16),
            new Frixl.Rendering.Frame(16, 128, 16, 16),
            new Frixl.Rendering.Frame(0, 144, 16, 16),
            new Frixl.Rendering.Frame(16, 144, 16, 16)
        );

    }
}