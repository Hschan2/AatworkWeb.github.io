// pong의 id를 가진 canvas 가져오기
const canvas = document.getElementById("pong");

// canvas 그리기
const ctx = canvas.getContext('2d');

// 사운드 가져오기
let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let comScore = new Audio();

hit.src = "sounds/hit.mp3";
wall.src = "sounds/wall.mp3";
comScore.src = "sounds/comScore.mp3";
userScore.src = "sounds/userScore.mp3";

// Ball 오브젝트 선언
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "WHITE"
}

// User 오브젝트 선언
const user = {
    x : 0, // left side of canvas
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

// Com 오브젝트 선언
const com = {
    x : canvas.width - 10, // - width of paddle
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

// net(네트) 오브젝트 선언
const net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "WHITE"
}

// 패들 그리기
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// 공 그리기
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// 마우스 움직이기
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    
    user.y = evt.clientY - rect.top - user.height/2;
}

// 점수를 획득했을 때, 공 리셋
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

// Net(네트) 그리기
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// 점수판 그리기
function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

// 공이 벽에 박았을 때 확인
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// 점수 계산 업데이트
function update(){
    
    // 플레이어 점수 변화, ball.x < 0 일 때 컴퓨터 승, ball.x > canvas.width 일 때 플레이어 승
    if( ball.x - ball.radius < 0 ){
        com.score++;
        comScore.play();
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        user.score++;
        userScore.play();
        resetBall();
    }
    
    // 공 속도
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // 컴퓨터가 스스로 움직임
    // 간단한 AI
    com.y += ((ball.y - (com.y + com.height/2)))*0.1;
    
    // 공이 벽의 위나 아래에 부딪혔을 때 속도가 반대로
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
        wall.play();
    }
    
    // 유저의 패들 혹은 컴퓨터의 패들을 쳤는지 확인
    let player = (ball.x + ball.radius < canvas.width/2) ? user : com;
    
    // 공이 패들과 충돌하면
    if(collision(ball,player)){
        // 충돌 사운드 Play
        hit.play();
        // 공이 어느 패들에 충돌했는지 확인
        let collidePoint = (ball.y - (player.y + player.height/2));
        // 충돌 지점의 값을 일반화. 1 아니면 -1
        // -player.height/2 < collide Point < player.height/2
        collidePoint = collidePoint / (player.height/2);
        
        // 공이 패들의 위쪽 부분을 쳤을 때, -45도로 반사
        // 공이 패들의 가운데 부분을 쳤을 때, 0도로 반사
        // 공이 패들의 아래 부분을 쳤을 때, 45도로 반사
        // Math.PI/4 = 45도
        let angleRad = (Math.PI/4) * collidePoint;
        
        // X와 Y값의 속도 방향 변화
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        
        // 공이 패들에 충돌할 때마다 속도 0.1씩 증가
        ball.speed += 0.1;
    }
}

// 실행 함수
function render(){
    
    // canvas 초기화
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    
    // 플레이어 점수 왼쪽에 위치
    drawText(user.score,canvas.width/4,canvas.height/5);
    
    // 컴퓨터 점수 오른쪽에 위치
    drawText(com.score,3*canvas.width/4,canvas.height/5);
    
    // 네트 그리기
    drawNet();
    
    // 유저의 패들 그리기
    drawRect(user.x, user.y, user.width, user.height, user.color);
    
    // 컴퓨터 패들 그리기
    drawRect(com.x, com.y, com.width, com.height, com.color);
    
    // 공 그리기
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}
function game(){
    update();
    render();
}
// 1초당 프레임 수
let framePerSecond = 50;

// 1초마다 게임 반복 (자연스럽게[부드럽게] 보이기 위해)
let loop = setInterval(game,1000/framePerSecond);