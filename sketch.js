var lee,running_lee,gun_lee,lee_img;
var bgImg,bg;
var zombie,zombieImg,zombieGroup;
var monster,monsterImg,monsterGroup;
var bullet,bulletImg,bulletGroup;
var survivors,survivorsImg,survivorsGroup;
var bulletCount;
var gameState,PLAY,END;
function preload(){
running_lee = loadAnimation("sprites/p1r1.png","sprites/p1r2.png","sprites/p1r3.png","sprites/p1r4.png","sprites/p1r5.png","sprites/p1r6.png");
gun_lee = loadAnimation("sprites/p1gr1.png","sprites/p1gr2.png","sprites/p1gr3.png","sprites/p1gr4.png","sprites/p1gr5.png");
lee_img = loadAnimation("sprites/p1s1.png");
bgImg = loadImage("sprites/bg.jpg");
zombieImg = loadAnimation("sprites/z1r4.png","sprites/z1r5.png","sprites/z1r6.png","sprites/z1r7.png","sprites/z1r8.png","sprites/z1r9.png","sprites/z1r10.png",)
bulletImg = loadImage("sprites/bullet.png")
monsterImg = loadAnimation("sprites/z2r1.png","sprites/z2r2.png","sprites/z2r3.png","sprites/z2r4.png","sprites/z2r5.png","sprites/z2r6.png","sprites/z2r7.png")
survivorsImg = loadImage("sprites/human1.png"); 
}
function setup() {
  createCanvas(800,400);
  bg = createSprite(400,200,800,20);
  bg.addImage(bgImg);
  bg.scale = 2.7;
  bg.x = bg.width/2;
  bg.velocityX = -2;
  lee = createSprite(50, 300, 50, 50);
  //lee.addAnimation("standing",lee_img);
  lee.addAnimation("running",running_lee);
  lee.addAnimation("gun",gun_lee);
  bulletCount = 0;
  zombieGroup = new Group();
  monsterGroup = new Group();
  bulletGroup = new Group();
  survivorsGroup = new Group();
  PLAY = 1;
  END = 0;
  gameState = PLAY;
}

function draw() {
  background(0,0,0);
  if(bg.x < 0){
    bg.x = bg.width/2;
    
  }
  if(bulletGroup.isTouching(zombieGroup)){
    bulletCount++;
    bulletGroup.destroyEach;
    if(bulletCount === 3){
      zombieGroup.destroyEach;
      bulletCount=0;
    }
  }
  spawnSurvivors();
  spawnMonster();
  spawnZombies();
  //keyPressed();
  //keyReleased();
  drawSprites();
} 
/*function keyReleased(){
 if(keyCode === DOWN_ARROW){
   lee.changeAnimation("standing",lee_img);
 }
}*/
function keyPressed(){
  if(keyCode === 32){
    shoot();
  }
  if(keyCode === DOWN_ARROW){
    //lee.velocityY = 7;
    lee.y = lee.y+7;
    bg.velocityY = 2;
   // lee.changeAnimation("running",running_lee);
  }
  //if(keyup(DOWN_ARROW)){
    //lee.changeAnimation("standing",lee_img);
  //}
  else if(keyCode ===UP_ARROW){
    //lee.velocityY = -7;
    lee.y = lee.y-7;
    bg.velocityY = -2;
  }
  /*else if(keyCode === LEFT_ARROW){
  //lee.velocityX = -7;
    lee.x = lee.x-7;
    bg.velocityX = -2;*/
  }
   
  
function spawnZombies(){

  if(frameCount % 200 === 0){
    zombie = createSprite(800,300,20,40);
    zombie.addAnimation("running",zombieImg);
    zombie.scale = 0.4;
    zombie.velocityX = -2;
    zombie.lifeTime = 400;
    zombieGroup.add(zombie);    
  }
}  
function spawnMonster(){

  if(frameCount % 500 === 0){
    monster = createSprite(800,285,20,40);
    monster.addAnimation("running",monsterImg);
    monster.velocityX = -2;
    monster.lifeTime = 400;
    monsterGroup.add(monster);
  }
}
function spawnSurvivors(){
  if(frameCount % 700 === 0){
    survivors = createSprite(800,300,20,40);
    survivors.addImage(survivorsImg);
    survivors.velocityX = -2;
    survivorsGroup.add(survivors);
  }
}
function shoot(){
  lee.changeAnimation("gun",gun_lee);
  bullet = createSprite(50,300,10,10);
  bullet.addImage(bulletImg);
  bullet.scale = 0.1;
  bullet.velocityX = 10;
  bulletGroup.add(bullet);
}
