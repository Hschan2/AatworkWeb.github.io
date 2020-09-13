import {Text} from './Text.js';
import {BounceString} from './bounceStrings.js';

let inputString = prompt('알파벳 하나를 입력하세요.');
const eng = /^[a-zA-Z]*$/;
if(!eng.test(inputString) || inputString === '' || inputString === null) {
    location.reload();
}
if(inputString.length > 1) {
    location.reload();
}

export class Visual {
    constructor() {
        this.text = new Text();

        this.strings = [];

        this.mouse = {
            x: 0,
            y: 0,
            radius: 100,
        };

        document.addEventListener('pointermove', this.onMove.bind(this), false);
    }

    show(stageWidth, stageHeight) {
        this.pos = this.text.setText(inputString, 5, stageWidth, stageHeight);

        this.strings = [];
        for(let i = 0; i < this.pos.outline.length; i++) {
            this.strings[i] = new BounceString({
                x1: this.pos.outline[i].x,
                y1: this.pos.outline[i].minY,
                x2: this.pos.outline[i].x,
                y2: this.pos.outline[i].maxY,
            });
        }
    }

    animate(ctx) {
        for(let i = 0; i < this.strings.length; i++) {
            this.strings[i].animate(ctx, this.mouse.x, this.mouse.y);
        }
    }

    onMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
}