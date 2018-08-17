namespace Frixl.Input {

    export class InputHandler implements IUpdateable {

        private _keysDown: any = {};
        private _keysPushed: any = {};
        private _buttonsDown: any = {};
        private _buttonsPushed: any = {};
        private _cursor: Cursor = new Cursor();
        private _cursorInFrame: boolean = false;

        get cursor(): Cursor {
            return this._cursor;
        }

        constructor() {
            window.addEventListener("keydown", this.onKeyDown);
            window.addEventListener("keyup", this.onKeyUp);
            window.addEventListener("mousemove", this.onMouseMove);
            window.addEventListener("mousedown", this.onMouseDown);
            window.addEventListener("mouseup", this.onMouseUp);
            window.addEventListener("touchmove", this.onTouchMove, {passive: false});
            window.addEventListener("touchstart", this.onTouchStart, {passive: false});
            window.addEventListener("touchend", this.onTouchEnd, {passive: false});

            Game.instance.canvas.addEventListener("mouseenter", this.onEnterCanvas);
            Game.instance.canvas.addEventListener("mouseleave", this.onExitCanvas);
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

        private onEnterCanvas = (e: MouseEvent) => {
            this._cursorInFrame = true;
        }

        private onExitCanvas = (e: MouseEvent) => {
            this._cursorInFrame = false;
        }

        private onTouchMove = (e: TouchEvent) => {
            let t = e.touches[0];
            if(t) {
                this._cursor.updateLocation(t.clientX, t.clientY);
            }

            if(this._cursorInFrame) {
                e.preventDefault();
            }
        }

        private onTouchStart = (e: TouchEvent) => {
            let t = e.touches[0];
            if(t) {
                this._cursor.updateLocation(t.clientX, t.clientY);
            }

            this._buttonsDown[MouseButtons[MouseButtons.Left]] = true;

            if(this._cursorInFrame) {
                e.preventDefault();
            }
        }

        private onTouchEnd = (e: TouchEvent) => {
            let t = e.touches[0];
            if(t) {
                this._cursor.updateLocation(t.clientX, t.clientY);
            }

            this._buttonsDown[MouseButtons[MouseButtons.Left]] = false;

            if(this._cursorInFrame) {
                e.preventDefault();
            }
        }

        private onMouseMove = (e: MouseEvent) => {
            this._cursor.updateLocation(e.offsetX, e.offsetY);
        }

        private onMouseDown = (e: MouseEvent) => {
            let buttonName = Input.MouseButtons[e.which];
            this._buttonsDown[buttonName] = true;

            if(this._cursorInFrame) {
                e.preventDefault();
            }
        }

        private onMouseUp = (e: MouseEvent) => {
            let buttonName = Input.MouseButtons[e.which];

            // mark button as no longer down
            this._buttonsDown[buttonName] = false;

            // mark button as having been pressed and then released
            this._buttonsPushed[buttonName] = true;

            if(this._cursorInFrame) {
                e.preventDefault();
            }
        }

        private onKeyDown = (e: KeyboardEvent) => {
            let keyName = Input.Keys[e.keyCode];
            this._keysDown[keyName] = true;

            if(this._cursorInFrame) {
                e.preventDefault();
            }
        }

        private onKeyUp = (e: KeyboardEvent) => {
            let keyName = Input.Keys[e.keyCode];

            // mark key as no longer down
            this._keysDown[keyName] = false;

            // mark key as having been pressed and then released
            this._keysPushed[keyName] = true;

            if(this._cursorInFrame) {
                e.preventDefault();
            }
        }
    }
}