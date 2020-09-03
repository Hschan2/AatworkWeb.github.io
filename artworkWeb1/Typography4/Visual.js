import {Text} from './Text.js';
import {Particle} from './Particle.js';
import {hslToHex} from './Utils.js';

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

        this.particles = [];

        this.mouse = {
            x: 0,
            y: 0,
            radius: 100,
        };

        document.addEventListener('pointermove', this.onMove.bind(this), false);
    }

    show(stageWidth, stageHeight) {
        this.pos = this.text.setText(inputString, 20, stageWidth, stageHeight);
        this.posTotal = this.pos.length - 1;
    }

    animate(ctx) {
        if(!this.pos) {
            return;
        }

        for(let i=0; i<10; i++) {
            const myPos = this.pos[(Math.random() * this.posTotal) | 0];
            this.particles.push(new Particle(myPos, this.getColor()));
        }

        for(let i=0; i<this.particles.length; i++) {
            const item = this.particles[i];
            if(item.radius <= 1) {
                this.particles.splice(i, 1);
            }

            const dx = this.mouse.x - item.x;
            const dy = this.mouse.y - item.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = item.radius + this.mouse.radius;

            if(dist < minDist) {
                item.progress += 100;
            }

            item.draw(ctx);
        }
    }

    getColor() {
        const minHue = 80;
        const maxHue = 340;
        const hue = (maxHue - minHue) * Math.random() + minHue;

        return hslToHex(hue, 84, 50);
    }

    onMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
}

