var score=0;
var gun,blueballoon,redballoon, nerfBullet, backBoard, blast;

var gunImg,blueBalloonImg, bulletImg, blastImg, backBoardImg, redballoonImg,roomImg;

var redBalloonGroup, blueBalloonGroup, bulletGroup;


var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("nerfGun.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("nerfBullet.png")
  blueBalloonImg = loadImage("blueBalloon.png")
  redballoonImg = loadImage("redBalloon.png")
  backBoardImg= loadImage("back.jpg")
  roomImg= loadImage("room.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 50,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = new Group();   
  blueBalloonGroup = new Group();   
  redBalloonGroup = new Group();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(roomImg);
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawblueBalloon();
    }

    if (frameCount % 100 === 0) {
      drawredBalloon();
    }

    if(keyDown("space")){
      shootBullet();
    }

    if (blueBalloonGroup.collide(backBoard)){
      handleGameover(blueBalloonGroup);
    }
    
    if (redBalloonGroup.collide(backBoard)) {
      handleGameover(redBalloonGroup);
    }
    
    if(blueBalloonGroup.collide(bulletGroup)){
      handleBalloonCollision(blueBalloonGroup);
    }

    if(redBalloonGroup.collide(bulletGroup)){
      handleBalloonCollision(redBalloonGroup);
    }

    drawSprites();
  }
    
  
}

function drawblueBalloon(){
  blueBalloon = createSprite(800,random(20,780),40,40);
  blueBalloon.addImage(blueBalloonImg);
  blueBalloon.scale = 0.1;
  blueBalloon.velocityX = -16;
  blueBalloon.lifetime = 400;
  blueBalloonGroup.add(blueBalloon);
}
function drawredBalloon(){
  redBalloon = createSprite(800,random(20,780),40,40);
  redBalloon.addImage(redballoonImg);
  redBalloon.scale = 0.1;
  redBalloon.velocityX = -20;
  redBalloon.lifetime = 400;
  redBalloonGroup.add(redBalloon);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-30
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 31
  bulletGroup.add(bullet)
}

function handleBalloonCollision(BalloonGroup){
    if (life > 0) {
       score=score+1;
    }

     blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) 
    
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    BalloonGroup.destroyEach()
}

function handleGameover(BalloonGroup){
  
    life=life-1;
    BalloonGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost, sorry...",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
} 