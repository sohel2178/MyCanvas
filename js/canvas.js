
var canvas = document.getElementById('canvas');
canvas.width = innerWidth
canvas.height = innerHeight
const earthHeight =25;

var img = new Image()
img.src = 'img/cloud.png'
var mountain = new Image()
mountain.src ='img/mountain.png'

/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');

colorArray=[
  '#00AAFF',
  '#086788',
  '#07A0C3',
  '#F0C808',
  '#DD1C1A',
  
]

function randBetween(begin,end){
  return Math.floor(Math.random()*end)+begin
}

function getDistance(x1,y1,x2,y2){
  return Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2))
}

function Cloud(img,x,y,scale){
  this.img = img
  this.x=x;
  this.y=y;
  this.scale = scale;
  this.windVelocity = {
    x:-this.scale/5,
    y:0
  }
}

Cloud.prototype.draw = function(){
  ctx.save()
  ctx.globalAlpha =0.5
  ctx.drawImage(this.img,this.x,this.y,img.width/this.scale,img.height/this.scale)
  ctx.restore()
}

Cloud.prototype.update = function(){

  if(this.x<0){
    this.x = canvas.width//+(this.x+img.width/this.scale)
  }

  this.x += this.windVelocity.x

  this.draw()

}

//######### Moon Beginning ##########
function Moon(x,y,radius){
  Ball.call(this,x,y,radius)
  this.color = '#E3EAEF'
  this.initialY = y;
  this.velocity = {
    x:0.2,
    y:0.02
  }
}
Moon.prototype.draw=function(){
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = this.color
  ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
  ctx.shadowColor = this.color;
  ctx.shadowBlur = this.radius*1.5;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.fill();
  ctx.closePath()

  ctx.restore()
}
Moon.prototype.update = function(){

  if(this.x-this.radius>canvas.width){
    this.x = 0-this.radius
    this.y = this.initialY
  }

  this.x += this.velocity.x
  this.y += this.velocity.y

  this.draw()

}
//######### Moon End #################



//######### Ball Beginning ##########
function Ball(x,y,radius,color){
  this.x=x
  this.y=y
  this.radius=radius
  this.color =color
  this.velocity={
    x:Math.floor((Math.random()-0.5)*20),
    y:2
  }
  this.friction = .8;
  this.gravity =1
}

Ball.prototype.draw = function(){
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = this.color
  ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
  ctx.shadowColor = '#E3EAEF';
  ctx.shadowBlur = this.radius*1.5;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.fillStyle = "#E3EAEF";
  ctx.fill();
  ctx.closePath()

  ctx.restore()
  
}

Ball.prototype.createMiniBalls = function(){
  for(let i=0;i<randBetween(16,100);i++){
    miniBalls.push(new MiniBall(this.x,this.y,randBetween(1,3),'white'))
  }
}

Ball.prototype.update = function(){

  if(this.y+this.radius+this.velocity.y+earthHeight>=canvas.height){
    this.velocity.y=-this.velocity.y*this.friction
    //this.velocity.x = this.velocity.x*this.friction
    this.createMiniBalls()
    this.radius=this.radius*0.7;
  }else{
    this.velocity.y+=this.gravity
  }
  if(this.x+this.radius>canvas.width || this.x-this.radius<0){
    this.velocity.x=-this.velocity.x
  }
  this.y+=this.velocity.y
  this.x+=this.velocity.x
  this.draw()

}
//######### Ball End #################




// ######### MiniBall Beginning ##########
function MiniBall(x,y,radius,color,velocityY){
  Ball.call(this,x,y,radius,color)

  // Nope Random Speed is Perfect

  this.velocity={
    x:Math.floor((Math.random()-0.5)*10)+1,
    y: randBetween(8,13) //50/Math.pow(this.radius,2)
  }
  this.gravity=1
  this.friction =0.99
  this.ttl =150
}

MiniBall.prototype.draw = function(){
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = this.color
  ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
  ctx.shadowColor = '#E3EAEF';
  ctx.shadowBlur = this.radius*2;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.fillStyle = "#E3EAEF";
  ctx.fill();
  ctx.closePath()

  ctx.restore()
}

MiniBall.prototype.update = function(){
  if(this.y+this.radius+this.velocity.y+earthHeight>=canvas.height){
    this.velocity.y=-this.velocity.y*this.friction
    //this.velocity.x = this.velocity.x*this.friction
    
  }else{
    this.velocity.y+=this.gravity
  }

  if(this.x+this.radius>canvas.width || this.x-this.radius<0){
    this.velocity.x=-this.velocity.x
  }

  this.y+=this.velocity.y
  this.x+=this.velocity.x

  this.draw()

}
//######### MiniBall End #################



// ######### Star Beginning ##########
function Star(x,y){
  this.x = x
  this.y = y
  this.radius = randBetween(1,4);
}
Star.prototype.draw = function(){

  ctx.save()
  ctx.translate(this.x,this.y)
  this.drawStar()
  ctx.restore()

}
Star.prototype.drawStar = function(){
  ctx.save();
  ctx.fillStyle='#E3EAEF'
  ctx.beginPath();
  ctx.moveTo(this.radius, 0);
  for (var i = 0; i < 9; i++) {
    ctx.rotate(Math.PI / 5);
    if (i % 2 === 0) {
      ctx.lineTo((this.radius / 0.525731) * 0.200811, 0);
    } else {
      ctx.lineTo(this.radius, 0);
    }
  }

  ctx.shadowColor = '#E3EAEF';
  ctx.shadowBlur = this.radius*2;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.fillStyle = "#E3EAEF";

  ctx.closePath();
  ctx.fill();
  ctx.restore();

}
// ######### Star End #################




function drawBackGround(){
  var lingrad = ctx.createLinearGradient(0, -75, 0, 75);
  lingrad.addColorStop(0,"#171e26");
	lingrad.addColorStop(1,"#3f586b");
  ctx.save()
  ctx.fillStyle = lingrad
  //ctx.globalAlpha = 0.8
  ctx.fillRect(0,0,canvas.width,canvas.height)
  ctx.restore()
}


function drawMountainRange(number,topClearance,color){
  let widthClearance =-10;

  let remainWidth = canvas.width-2*widthClearance;

  let startTingPosition={
    x:widthClearance,
    y:canvas.height-earthHeight
  }

  let segment = remainWidth/number

  for(let i=0;i<number;i++){
    ctx.save()
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(startTingPosition.x,startTingPosition.y)
    ctx.lineTo(startTingPosition.x+segment/2,topClearance)
    ctx.lineTo(startTingPosition.x+segment,startTingPosition.y)
    ctx.fill()

    ctx.restore()

    startTingPosition.x+=segment
  
  }
  
}


// ############# Actual Implementation ####################################
//###################################################


var balls;

var miniBalls;

var starts;

var frameConter;

var moon;

var clouds;


function init(){
  moon = new Moon(100,100,30)
  frameConter =0;
  balls = []

  miniBalls =[]

  starts =[]

  clouds =[]

  for(let i=0;i<randBetween(120,150);i++){
    starts.push(new Star(randBetween(0,canvas.width),randBetween(0,canvas.height)))
  }

  for(let i=0;i<4;i++){
    clouds.push(new Cloud(img,randBetween(0,canvas.width),randBetween(0,canvas.height/2),randBetween(3,7)))
  }
  animate()
}




function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height)

  frameConter +=1;
  // Too Much Lag 
  if(frameConter % 120 ==0){
    balls.push(new Ball(randBetween(0,canvas.width),-100,randBetween(10,12),'white'))
  }

  drawBackGround()

  starts.forEach(element => {
    element.draw()
  });

  moon.update()

  
  ctx.fillStyle = "#182028";
  ctx.fillRect(0, canvas.height - earthHeight, canvas.width, earthHeight);
  
  // Draw and Update Cloud
  clouds.forEach(cloud => {
    cloud.update()
  });

  drawMountainRange(1,100,'#384551')
  drawMountainRange(3,300,'#2B3843')
  drawMountainRange(5,450,'#26333E')

  // Draw and Update MountainRange
  // ctx.save()
  // ctx.globalAlpha = 0.8
  // ctx.shadowColor = '#E3EAEF';
  // ctx.shadowBlur = 10;
  // ctx.shadowOffsetX = 0;
  // ctx.shadowOffsetY = 0;
  // ctx.drawImage(mountain,0,0,canvas.width,canvas.height-earthHeight)
  // ctx.restore()


  balls.forEach((ball,index) => {

    if (ball.radius>6){
      ball.update()
    }else{
      balls.splice(index,1)
      delete ball
    }
    
  });

  miniBalls.forEach((miniBall,index) => {
    if(miniBall.ttl>0){
      miniBall.update()
      miniBall.ttl -=1;
    }else{
      miniBalls.splice(index,1)
    }
    
  });


  window.requestAnimationFrame(animate)
}

init()







