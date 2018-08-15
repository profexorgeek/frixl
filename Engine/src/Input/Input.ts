namespace Frixl.Input {

    export class InputHandler {

        private _keysDown: any = {};
        private _keysPushed: any = {};
        private _buttonsDown: any = {};
        private _buttonsPushed: any = {};
        private _cursor: Cursor = new Cursor();

        get cursor(): Cursor {
            return this._cursor;
        }

        constructor() {
            window.addEventListener("keydown", this.onKeyDown);
            window.addEventListener("keyup", this.onKeyUp);
            window.addEventListener("mousemove", this.onMouseMove);
            window.addEventListener("mousedown", this.onMouseDown);
            window.addEventListener("mouseup", this.onMouseUp);
        }

        update(delta: number) {
            // clear keys pushed every frame
            for(let key in this._keysPushed) {
                this._keysPushed[key] = false;
            }

            // clear buttons pushed every frame
            for(let button in this._buttonsPushed) {
                this._buttonsPushed[button] = false;
            }
        }

        keyDown(charCode: number) {
            let keyName = Input.Keys[charCode];
            return this._keysDown[keyName] === true;
        }

        keyPushed(charCode: number) {
            let keyName = Input.Keys[charCode];
            return this._keysPushed[keyName] === true;
        }

        buttonDown(buttonCode: number) {
            let buttonName = Input.MouseButtons[buttonCode];
            return this._buttonsDown[buttonName] === true;
        }

        buttonPushed(buttonCode: number) {
            let buttonName = Input.MouseButtons[buttonCode];
            return this._buttonsPushed[buttonName] === true;
        }


        private onMouseMove = (e: MouseEvent) => {
            this._cursor.updateLocation(e.offsetX, e.offsetY);
        }

        private onMouseDown = (e: MouseEvent) => {
            let buttonName = Input.MouseButtons[e.which];
            this._buttonsDown[buttonName] = true;
        }

        private onMouseUp = (e: MouseEvent) => {
            let buttonName = Input.MouseButtons[e.which];

            // mark button as no longer down
            this._buttonsDown[buttonName] = false;

            // mark button as having been pressed and then released
            this._buttonsPushed[buttonName] = true;
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