const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let balls = [];
const randomNumbers = (max, min) => Math.floor(Math.random() * (max - min) + min);

const offset = 70;
const palette = [
    "#905DA6",
    "#3BD97F",
    "#F2CB05",
    "#F27649"
];
class Ball {
    constructor(x, y, r, c, o) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.velocity = 0;
        this.gravity = 1;
        this.friction = .9;
        this.offset = o;
        this.color = c;
        
    }

    applyGravity() {
        this.velocity = this.velocity + this.gravity;
    }

    update() {
   
        if(this.y + this.r > canvas.height && (this.velocity - this.gravity) > 5) {
            
            this.y = canvas.height - this.r;
        }
        if((Math.floor(this.y) + this.r) >= canvas.height) {
           
            this.velocity = -this.velocity * this.friction;
     
        }else {
            this.applyGravity();
        }
        this.y += this.velocity;
        
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.stroke();
    }
}
function initBalls() {
    for(let i = 0; i < 30; i++) {
        balls.push(new Ball(randomNumbers(0, canvas.width), randomNumbers(0, canvas.height / 2), randomNumbers(15, 30), palette[randomNumbers(0, 4)], offset));
    }
    
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
    }

    requestAnimationFrame(animate);
    
}

initBalls();
animate();