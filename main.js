const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let balls = [];

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 30;
        this.velocity = 0;
        this.gravity = 1;
        this.friction = .98;
        this.offset = 30;
    }

    applyGravity() {
        this.velocity = this.velocity + this.gravity;
        // console.log(this.velocity);
    }

    update() {
        if(this.y + this.r  + this.offset > canvas.height) {
            
            this.velocity = -this.velocity * this.friction;
            console.log(this.velocity);
        }else {
            this.applyGravity();
        }
        this.y += this.velocity;
        
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();
    }
}
function initBalls() {
    for(let i = 0; i < 1; i++) {
        balls.push(new Ball(canvas.width / 2, canvas.height / 3));
    }
    
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < balls.length; i++) {
        balls[i].draw();
        // balls[i].applyGravity();
        balls[i].update();
    }

    requestAnimationFrame(animate);
    
}

initBalls();
animate();