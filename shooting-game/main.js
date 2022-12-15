// 캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let gameOver = false; // true면 게임 끝, false면 게임 계속 진행
let score = 0;

// 우주선 좌표(계속 위치가 바뀌기 때문에 따로 변수 선언)
let spaceshipX = canvas.width / 2 - 33;
let spaceshipY = canvas.height - 66;

let bulletList = []; // 총알들을 저장하는 리스트
function Bullet() {
    this.x = 0;
    this.y = 0;
    this.init = function () { // 총알 위치 초기화 함수
        this.x = spaceshipX + 21;
        this.y = spaceshipY;
        this.alive = true; // true면 살아있는 총알, false면 죽은 총알

        bulletList.push(this); // 배열에 넣어줌
    };
    this.update = function () {
        this.y -= 7;
    };
    this.checkHit = function () {
        // 총알.y <= 적군.y && 총알.x >= 적군.x && 총알.x <= 적군.x + 적군의 넓이
        for (let i = 0; i < enemyList.length; i++) {
            if (this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 48) {
                // 총알이 죽게됨 == 적군이 없어짐 == 점수 획득
                score++;
                this.alive = false; // 죽은 총알
                enemyList.splice(i, 1); // 총알이 닿으면 적 하나씩 사라지도록
            }
        }
    }
}

function generateRandomValue(min, max) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
}

let enemyList = [];
// 적군 만들기
function Enemy() {
    this.x = 0;
    this.y = 0;
    this.init = function () { // 적군 위치 초기화
        this.y = 0; // 맨 위에서부터 내려옴
        this.x = generateRandomValue(0, canvas.width - 48); // x좌표의 위치는 랜덤으로 뜨도록함
        enemyList.push(this);
    };
    this.update = function () {
        this.y += 4; // 적군의 속도 조절

        if (this.y >= canvas.height - 48) {
            gameOver = true;
            console.log("game over");
        }
    };
}

// 이미지 로드
function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "images/background.png"; // 이미지를 가져올 경로

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png";

    gameOverImage = new Image();
    gameOverImage.src = "images/gameover.png";
}

// 방향키를 눌렀을 때 좌표값 변경 이벤트
let keysDown = {};

function setupKeyboardListener() {
    document.addEventListener("keydown", function (event) { // 방향키를 눌렀을 때 값 저장
        keysDown[event.keyCode] = true;
        // console.log("키다운 객체에 들어간 값은?", keysDown);
    });
    document.addEventListener("keyup", function (event) { // 방향키에서 손 뗐을때 눌렀던 방향키 삭제
        delete keysDown[event.keyCode];
        // console.log("버튼 클릭 후", keysDown);

        if (event.keyCode == 32) { // 32 : space bar
            createBullet(); // 총알 생성 함수
        }
    });
}

// 총알 생성 함수
function createBullet() {
    console.log("총알 생성");
    let b = new Bullet();
    b.init();
    console.log("총알리스트", bulletList);
}

// 1초마다 적군 생성
function createEnemy() {
    const interval = setInterval(function () {
        let e = new Enemy();
        e.init();
    }, 1000);
}

function update() {
    if (39 in keysDown) { // 39 : 오른쪽 방향키
        spaceshipX += 5; // 우주선의 속도
    }
    if (37 in keysDown) { // 37 : 왼쪽 방향키
        spaceshipX -= 5;
    }

    // 우주선 이미지 캔버스 안에서만 이동
    if (spaceshipX <= 0) {
        spaceshipX = 0;
    }
    if (spaceshipX >= canvas.width - 66) {
        spaceshipX = canvas.width - 66;
    }

    // 총알의 y좌표 업데이트하는 함수 호출
    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) { // 살아있는 총알일때만
            bulletList[i].update();
            bulletList[i].checkHit(); // 총알이 적군을 쳤는지 안 쳤는지 확인
        }
    }

    // 적군 y좌표 증가
    for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update();
    }
}

// 이미지를 보여줄 함수
function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    ctx.fillText(`Score:${score}`, 20, 20);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) { // 총알이 살아있을때만 보여줌
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
        }
    }

    for (let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
    }
}

function main() {
    if (!gameOver) { // gameOver가 true면 멈춤
        update(); // 좌표값을 업데이트
        render(); // 이미지 그려줌
        // console.log("animation calls main function");
        requestAnimationFrame(main); // 위 작업들을 반복
    } else {
        ctx.drawImage(gameOverImage, 10, 100, 380, 380);
    }

}

loadImage();
setupKeyboardListener();
createEnemy();
main();

// 우주선 움직이기
// 방향키를 누르면 우주선의 xy 좌표가 바뀌고 다시 render()

// 총알 만들기
// 1. 스페이스바를 누르면 총알 발사
// 2. 총알 발사 = 총알의 y값이 --, 총알의 x 값은? 스페이스를 누른 순간의 우주선 x좌표
// 3. 발사된 총알들은 총알 배열에 저장
// 4. 모든 총알들은 x, y 좌표값이 있어야 함
// 5. 총알 배열을 가지고 render()

// 적군 만들기
// 1. x, y, init, update
// 2. 적군은 위치가 랜덤
// 3. 적군은 밑으로 내려옴 == y좌표 증가
// 4. 1초마다 하나씩 적군이 내려옴
// 5. 적군이 캔버스의 바닥에 닿으면 게임 오버
// 6. 적군과 총알이 만나면 적군이 사라지고 점수 1점 획득