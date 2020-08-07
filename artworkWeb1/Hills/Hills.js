import { Hill } from './Hill.js'
import { SheepController } from './SheepController.js';
import { Sun } from './Sun.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.sun = new Sun();

        this.hills = [
            new Hill('#90EE90', 0.2, 12), // 제일 느리게, 제일 뒤에
            new Hill('#32CD32', 0.5, 8),
            new Hill('#228B22', 1.4, 6) // 제일 빠르게, 제일 앞에
        ];

        this.sheepController = new SheepController();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.sun.resize(this.stageWidth, this.stageHeight);

        for(let i=0; i<this.hills.length; i++) {
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }
    }

    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.sun.draw(this.ctx, t);

        let dots;
        for (let i=0; i<this.hills.length; i++) {
            dots = this.hills[i].draw(this.ctx);
        }

        this.sheepController.draw(this.ctx, t, dots);
    }
}

window.onload = () => {
    new App();
}