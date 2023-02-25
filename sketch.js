var player, back;
var points = 0;
var backImg;
var leftPlayerImg;
var rightPlayerImg;
var gameState= "START";
var baseImg, baseGroup;
var goodImg, goodThingsGroup;
var badImg, badThingsGroup;

//Función para cargar imágenes y animaciones
function preload() {
leftPlayerImg=loadAnimation("Imagenes/willyLeft.png");
  rightPlayerImg=loadAnimation("Imagenes/willyRight.png");
  baseImg=loadImage("Imagenes/base.png");
  backImg=loadImage("Imagenes/Clouds and sunbeam Back.png");
  goodImg= loadImage("Imagenes/base.png");
}
//Función para declarar Sprites y grupos
function setup() {
  createCanvas(450,800);
  back=createSprite(225,400,20,20);
  back.addImage(backImg);
  back.scale=0.5;
player = createSprite(225,450,20,20);
  player.addAnimation("left",leftPlayerImg);
   player.addAnimation("right",rightPlayerImg);
  player.scale=0.1;
  baseGroup = new Group();
  goodThingsGroup = new Group();
  badImg = loadImage("Imagenes/fire.png");
  badThingsGroup = new Group();
}

//Función para dibujar los Sprites y establecer reglas del juego
function draw() {
  background(220);
  drawSprites();

  
  //Puntuación 
 textSize(20);
  fill("#33FFC4");
  text("Puntos:"+points, 50, 100);
  //Inicio del juego
  if(gameState==="START" && keyDown("down_arrow")){
      //Cambio de estado
    gameState="PLAY";
    //Velocidad y cambio de estado 
    
     }
  
  if(gameState==="PLAY"){
    //Fondo infinito
   back.velocityY=1;
    if(back.velocity.y > 425){
      back.y=300;
    }
    if(back.y > 425){
    back.y = 300;
    }
    //gravedad
        if (keyDown("up_arrow")){
  player.velocityY=-4;
    }
  player.velocityY=player.velocityY+0.8;
    //Mover personaje con las flechas 
     if(keyDown("right_arrow")){
    player.x =player.x + 3;   
       player.changeAnimation("right",rightPlayerImg);
  }
  if (keyDown("left_arrow")){
  player.x =player.x - 3;
    player.changeAnimation("left",leftPlayerImg);
    }
    
    
    //crear bases y hacer que el personaje quede sobre ellas
    createBases();
    if(player.isTouching(baseGroup)){
      player.velocityY = 0;
      }
    if(player.isTouching(goodThingsGroup,removeGoodThings))
    {
       points=points+10;
        }
    //Aumentar puntos
    
    //crear Cosas Malas 
      createBadThings();
    //Cambiar a estado GAMEOVER
    
  }
  
  //Estado GAMEOVER 
  if(player.isTouching(badThingsGroup)){
  gameState="GAMEOVER";
    }
    
    if(gameState==="GAMEOVER"){
      back.velocityY = 0;
      player.velocityY = 0;
      fill("#8015");
      textSize(45);
      text("Has Perdido",150,300);
      
     }
  

}

//Función para crear bases 
function createBases(){
   if(frameCount % 100 === 0){
     var base= createSprite(random(50,450),0,70,20);
    base.addImage(baseImg);
     base.scale=0.3;
     base.velocityY = 2;
     baseGroup.add(base);
     var good = createSprite(base.x,base.y-15,20,20);
     good.velocityY=2;
     good.addImage(goodImg);
     good.scale=0.12;
     goodThingsGroup.add(good);
   }
}

//Función para crear Cosas Malas 

function createBadThings(){
  var velo = 3;
  if(frameCount % 75 === 0){
     var bad= createSprite(random(50,450),0,70,20);
    bad.velocityY= 3;
    bad.addImage(badImg);
    bad.scale=0.12;
    badThingsGroup.add(bad);
} 
}

//Función para eliminar CosasBuenas
function removeGoodThings(sprite,goodThingsGroup){
 goodThingsGroup.remove();
}

