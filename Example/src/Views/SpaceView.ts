namespace Example.Views {

    export class SpaceView extends Frixl.Views.View {

        private _gameCursor: Entities.GameCursor = new Entities.GameCursor();
        private _stars: Array<Entities.Star> = new Array<Entities.Star>();
        private _player: Entities.Ship = new Entities.Ship();


        constructor() {
            super();

            let cam = Game.instance.camera;

            this.addPositionable(this._gameCursor);
            this.addPositionable(this._player);

            cam.attachTo(this._player);
            cam.background = "rgb(50, 50, 50)";

            
            for(let i = 0; i < Config.numStars; i++) {
                let s = new Entities.Star;
                s.x = Frixl.Util.GameUtil.randomInRange(cam.left, cam.right);
                s.y = Frixl.Util.GameUtil.randomInRange(cam.bottom, cam.top);
                this._stars.push(s);
                this.addPositionable(s);
            }

        }
    }
}