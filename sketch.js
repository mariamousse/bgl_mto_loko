/* ok, isso é só um teste na realidade, onde eu nunca fiz nenhum boneco q luta de vdd sabe?
logo, vou testar uns bgls, se der bom, talvez eu faça um jogo 19h 14/04*/ 
//porra de teste, ta ficando legal 19h 15/04
var player, player_collider;
var attk;
var enemie, enemieGroup;
var enemie_life;;
var lastKey;
var time_attk = true;
var player_run;
var button_enemie;
var som_tapa;

function setup() {
  canva = createCanvas(800, 500);
  
  player = createSprite(windowWidth/2, windowHeight/2, 50, 50);
  //player.debug = true;
  
  player_collider = createSprite(windowWidth/2, windowHeight/2, 20,20);
  player_collider.shapeColor = "blue";
  //player_collider.debug = true;

  player_run = loadAnimation("arlimdo_run.gif");

  enemie = createSprite(-100,-100);
  enemieGroup = createGroup();

  button_enemie = createButton("");
  button_enemie.position(10,10);  
  button_enemie.class("button_enemie");

  som_tapa = loadSound("soco.mp3");
  

}

function draw() {
  background(0,0,0);  
  drawSprites();
  
  attk = false;
  //player.addAnimation("sla", player_run)

  player.shapeColor = "yellow";
  if(time_attk == true){
    player.shapeColor = "blue";
  }
  player.setCollider("rectangle", 0, 0 , 50, 50);
  
  player_collider.setCollider("rectangle", 0, 0, 0, 0);
  player_collider.visible = false;

  enemie.shapeColor = "white"; 
   

  //life do enemie
  



  
  playerMove();
  canva.mousePressed(Atack);
  LastKey();

  button_enemie.mousePressed(()=>{
    enemie.destroy();
    enemie = createSprite(random(100, 800), random(100, 500), 50, 50);
    enemie_life = 101;
    enemieGroup.add(enemie);
    
  });
    
    fill("white");
    rect(enemie.x - 50, enemie.y - 50, 100, 10);
    //text(" GERE OUTRO INIMIGO APENAS DEPOIS DE MATAR O ATUAL", 100, 100);
    fill("green");
    rect(enemie.x - 50, enemie.y - 50, enemie_life, 10);
  
  
};

//movimentação do player e player_collide
function playerMove(){
  if(keyDown("a")){
    player.x -= 10;
    
  };
  if(keyDown("d")){
    player.x += 10;
  };
  if(keyDown("s")){
    player.y += 10;
  };
  if(keyDown("w")){
    player.y -= 10;
  };

  player_collider.x = player.x;
  player_collider.y = player.y;
};

//vou tentar fazer ele dando golpe pra esquerda
//deu certo porra, é a função "Atack"
//attk é a variavel q determina se o player ta atacando, jegue
function Atack(){


  if(/*keyDown("space") &&*/ time_attk == true){
    
    player_collider.visible = true;
    attk = true;
    som_tapa.play();

    setTimeout(() => {
      time_attk = false;
      setTimeout(() => {
        time_attk = true;
      }, "2000");
    }, "2000");

    switch(lastKey){
      case "a":
        player_collider.setCollider("rectangle", 20, 0 , 50, 50);
        player_collider.x = player.x - 40;
      break;

      case "s":
        player_collider.setCollider("rectangle", 0, -20 , 50, 50);
        player_collider.y = player.y + 40;
      break;

      case "d":
        player_collider.setCollider("rectangle", -20, 0 , 50, 50);
        player_collider.x = player.x + 40;
      break;

      case "w":
        player_collider.setCollider("rectangle", 0, 20 , 50, 50);
        player_collider.y = player.y - 40;
      break;
    };
  };

  if(player_collider.collide(enemie) && attk == true && enemie_life > 1){
    enemie.shapeColor = "red";
    enemie_life -= 5;
  };
};

function LastKey(){
  
  
  if(keyDown("a")){
    lastKey = "a";
  };
  if(keyDown("s")){
    lastKey = "s";
  };
  if(keyDown("d")){
    lastKey = "d";
  };
  if(keyDown("w")){
    lastKey = "w";
  };


};
function gerarEnemie(){
  
  enemie = createSprite(random(100, 800), random(100, 500), 50, 50);
  enemie.shapeColor = "white"; 

  fill("white");
  rect(enemie.x - 50, enemie.y - 50, 100, 10);
  fill("green");
  rect(enemie.x - 50, enemie.y - 50, enemie_life, 10);

}

