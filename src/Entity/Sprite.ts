/// <reference path='./Positionable.ts' />

namespace Frixl.Entity {

    export class Sprite extends Positionable {
        
        private _url: string;

        constructor(_url: string) {
            super();
            
            this._url = _url;
        }

    }
}