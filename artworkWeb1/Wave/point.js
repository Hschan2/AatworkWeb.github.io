export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.01;
        this.cur = index; // 현재 포인트 값이 어딨는가
        this.max = Math.random() * 100;
    }

    update() {
        this.cur += this.speed; // 속도
        this.y = this.fixedY + (Math.sin(this.cur) * this.max); // 위 아래 움직임
        // 지정된 좌표를 이어 웨이브처럼 보이게 하고 좌표가 위 아래 움직임으로써 위 아래 움직이는 것처럼 보이기
    }
}