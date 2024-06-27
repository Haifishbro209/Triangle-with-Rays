const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
let hue = 100;
const triangleSide = 200;
const triangleHeight = Math.sqrt(3) * triangleSide/2;
const Ax = (canvas.width/2)-triangleSide/2;
const Ay = canvas.height/2; 
const Bx = canvas.width/2;
const By = (canvas.height/2)-triangleHeight;
const Cx = (canvas.width/2) + (triangleSide/2);
const Cy = canvas.height/2;



window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});



class Particle{
    constructor(speedX, speedY,x,y){
        this.x = x;
        this.y = y;
        //this.size = Math.random() * 5 + 1;    //1 bis 6
        //this.speedX = Math.random() * 2 -1; //+1,5 bis -1.5
        //this.speedY = Math.random() * 2 -1;
        this.speedX = speedX;
        this.speedY = speedY;
        this.speedSqr = this.speedX * this.speedX + this.speedY * this.speedY;
        this.dxCenter = 0;
        this.dyCenter = 0;
        this.color = 'hsl('+ hue + ', 100%, 50%)';
    }
    
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init(){
   let j = 15;

   for (let i = 0; i < j; i++) {
    let angle = ((60 / j) * i) * (Math.PI / 180); 
    //particleArray.push(new Particle(Math.cos(angle), -Math.sin(angle), Ax, Ay));
    particleArray.push(new Particle(0.5,0.89, Bx, By));
    //particleArray.push(new Particle(Math.cos(angle), Math.sin(angle), Bx, By));
    //particleArray.push(new Particle(-Math.cos(angle), -Math.sin(angle), Cx, Cy));
}
   }
   
   
   
    


function handleParticles(){
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].update();
        particleArray[i].draw();
        /*if (particleArray[i].distanceToCenter > 250) {
            const gegenVecktorX = -1 * particleArray[i].speedX;
            const gegenVecktorY = -1 * particleArray[i].speedY;   
            particleArray[i].speedX = gegenVecktorX;
            particleArray[i].speedY = gegenVecktorY;
        } else {
            particleArray[i].draw();
        }*/
    }
}

function drawTriangle(){
    ctx.strokeStyle = 'red';
    var path=new Path2D();
    path.moveTo(canvas.width/2,(canvas.height/2)-triangleHeight);
    path.lineTo((canvas.width/2)-triangleSide/2,canvas.height/2);
    path.lineTo((canvas.width/2)+ (triangleSide/2),canvas.height/2);
    path.lineTo((canvas.width/2),(canvas.height/2)-triangleHeight);
    ctx.stroke(path);
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //hue += 1;
    drawTriangle();
    handleParticles();
    init();
    requestAnimationFrame(animate);
}



animate();