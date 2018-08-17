namespace Example.Views {

    export class SpaceView extends Frixl.Views.View {

        private _gameCursor: Entities.GameCursor = new Entities.GameCursor();
        private _stars: Array<Entities.Star> = new Array<Entities.Star>();
        private _player: Entities.Ship = new Entities.Ship();


        constructor() {
            super();

            Game.instance.camera.background = "rgb(50, 50, 50)";

            this.addPositionable(this._gameCursor);
            this.addPositionable(this._player);

            Game.instance.camera.attachTo(this._player);

            let halfWorldSize = Config.worldSize / 2;
            for(let i = 0; i < Config.numStars; i++) {
                let s = new Entities.Star;
                s.x = Frixl.Util.GameUtil.randomInRange(-halfWorldSize, halfWorldSize);
                s.y = Frixl.Util.GameUtil.randomInRange(-halfWorldSize, halfWorldSize);
                this._stars.push(s);
                this.addPositionable(s);
            }

        }
    }
}