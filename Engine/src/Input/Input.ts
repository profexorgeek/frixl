namespace Frixl.Input {

    export class InputHandler {

        private _keysDown: any = {};
        private _keysPushed: any = {};
        private _buttonsDown: any = {};
        private _cursor: Cursor = new Cursor();

        get cursor(): Cursor {
            return this._cursor;
        }

        constructor() {
            window.addEventListener("keydown", this.onKeyDown);
            window.addEventListener("keyup", this.onKeyUp);
            window.addEventListener("mousemove", this.onMouseMove);
        }

        update(delta: number) {
            // clear keys pushed every frame
            for(let key in this._keysPushed) {
                this._keysPushed[key] = false;
            }
        }

        keyDown(charCode: number) {
            let keyName = Input.Keys[charCode];
            return this._keysDown[keyName] === true;
        }

        private onMouseMove = (e: MouseEvent) => {
            this._cursor.updateLocation(e.offsetX, e.offsetY);
        }

        private onKeyDown = (e: KeyboardEvent) => {
            let keyName = Input.Keys[e.keyCode];
            this._keysDown[keyName] = true;
        }

        private onKeyUp = (e: KeyboardEvent) => {
            let keyName = Input.Keys[e.keyCode];

            // mark key as no longer down
            this._keysDown[keyName] = false;

            // mark key as having been pressed and then released
            this._keysPushed[keyName] = true;
        }
    }
}