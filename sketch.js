/*
Name: Omar Lazaro Cobas, Denzell Devonte Dixon, Jake Max Schwimmer

Date: January 12th, 2018 

Program6 Name: Elevator Run

Program Description: In this game you must run up the stairs 
quickly, because class starts soon and you are late!! 
Beat the odds and make it to class in time!!
*/

//global variables used for collision
var yPlatform1 = 30;
var yPlatform = 300;
var xPlatform = 0;
var collides = false;
var change = 50;


//literal character object - contains all character variables
var character = {
  x: 50,
  y: 0,
  g: 0,
  a: 0.6,
  vy: 4,
  xSpd: 6,  //4
  jumpSpd: 9, //7
  cwidth: 50,
  cheight: 75
}

//empty arrays to store block and object platforms in
var blocksRight = [];
var blocksLeft = [];
var platforms = [];
var stairs = [];
var yChangeStairs = 1.00;
var pCollisionOn;
var sCollisionOn;
var pSituation = 3;



var myFont;
var cgs = 1;
var lobbyFont, xLobby;
var sideImg;

var playerData;
var Jake;
var ftime = 0;

var b;
var stick;
var spD = 2.1;

var ind;
var J = 0;

var angleSeconds = -(3.14/2);
var angleMinutes = 0.10472 * 14;
var angleHours = -3.66;

var lobbyRectHeight;

var h = 400;
var xA;
var yA;
var xB;
var yB;
var xC;
var yC;
var xD;
var yD;
var randomNum;

var yStairs;
var yPlatforms;

var fsa = [];
var fsb = [];
var fsc = [];
var fsd = [];

var keyboardFont;

var randomStuff = ["Boxes",
"Peaches & Cream",
"Denshellllll",
"OmegaLuL",
"YOOOOOOOO",
"Kool Beans!",
"RIP Fortnite!",
"PUBG done!!"
];
//Previous sound track
var ptrack = 0;

//Player's Score
var multiplier = 1;

//Object images
var coinImage;
var multiplierImage;
var speedboostImage;
var ELCImage;

var characterImg;
var characterImgGame;
var lobbyImage;

function preload() {
  soundFormats('mp3', 'ogg');
  myFont = loadFont('PressStart2P-Regular.ttf');
  lobbyFont = loadFont('KoolBean.ttf');
  keyboardFont = loadFont('VAG Rounded Bold.ttf');
  xLobby = 0;
  
  playerData = JSON.parse(localStorage.getItem('player'));

  avenuesStudent = loadImage("elevator-run-title-screen-pixilart.png");
  
  
  lobbysound = loadSound('Cafe.mp3');
  runsound = loadSound('Run.mp3');
  jumpsound = loadSound('Jump.ogg');
    
  coinImage = loadImage("Coin$$.png");
	multiplierImage = loadImage("Calculator final.png");
	speedboostImage = loadImage("Coffee final.png");
  characterImgLobby = loadImage("pixil-frame-0 (7).png");
  characterImgGame = loadImage("pixil-frame-0 (7).png");
  ELCImage = loadImage("pixil-frame-0 (2).png");
	lobbyImage = loadImage("pixil-frame-0 (1).png");
	
}


function setup() {
  frameRate(60);
  rectMode(CENTER);
  var canvasChange = createCanvas(windowWidth - 400, windowHeight); //WindowWidth: 1060 WindowHeight: 991
  canvasChange.center('horizontal');
  loadPlatforms();
  loadfsa();
  loadfsb();
  loadfsc();
  loadfsd();

  // player data load, if new player, new data
	// Jake refers to stored data
  if (playerData == null) {
    Jake = {}
    Jake.highscore = 0;
    Jake.time = 0;
    Jake.currentscore = 0;
    Jake.cash = 0;
    localStorage.setItem('player', JSON.stringify(Jake));
    playerData = JSON.parse(localStorage.getItem('player'));
  }
  
  ind = floor(random(randomStuff.length));
  
}

function draw() {
  background(130);
  
  //if stairs array is empty reload the platforms
  if (stairs.length == 0) {
    loadPlatforms();
  }
  
  if (fsa.length == 0) {
  	loadfsa();
  }
  
  if (fsb.length == 0) {
  	loadfsb();
  }
  
  if (fsc.length == 0) {
  	loadfsc();
  }
 
  if (fsd.length == 0) {
  	loadfsd();
  }
  //Help Screen
  if (cgs === 0) {
    
    
     //Variables for the  button
    let buttonX = 200;
    let buttonY = 75;
    let fshift = 40;
		let backShift = 15;
    //back button with text
    textFont(myFont);
    fill(54,187, 217);
    rect(width / 2, height / 12, buttonX, buttonY);
    rect(width * 0.75, 0.9 * height, buttonX, buttonY);
    fill(0);
    textSize(32);
    text("Back", width / 2, (height / 12) + backShift);
    text("Items",width * 0.75, 0.9 * height + backShift);

		textSize(20);
    text("Due to our notoriously dysfunctional elevators,", width / 2, (height / 8) + fshift);
    text("Avenues students are chronically late for class. ", width / 2, (height / 6) + fshift);
    text("Elevator Run captures the familiar thrill of", width / 2, (height / 4.75) + fshift);
    text("running up the stairs.", width / 2, (height / 4) + fshift);

    
    textFont(keyboardFont, 36);
    //WASD
 		rect(width / 5, height / 2, 60, 60, 7);
  
    rect(width / 5 + 75, height / 2, 60, 60, 7);
    
    rect(width / 5 - 75, height / 2, 60, 60, 7);
    
		rect(width / 5 + 30, height / 2 + 75, 60, 60, 7);
    
		rect(width / 5 + 105, height / 2 + 75, 60, 60, 7);
    
    rect(width / 5 - 45, height / 2 + 75, 60, 60, 7);
    
    //Spacebar
    rect(width * 0.75, height / 2 + 75, 450, 60, 7);
		
		//Left arrow
    rect((width /2) + 90, height / 2, 100, 40, 7);

    
    //Right arrow

    rect((width /2 + 450) - 16.5, height / 2, 100, 40, 7); //(40 - 7) / 2

    fill(255);
    text("W", width / 5, height / 2 + backShift);
    text("E", width / 5 + 75, height / 2 + backShift);
    text("Q", width / 5 - 75, height / 2 + backShift);
    text("S", width / 5 + 30, (height / 2 + 75) + backShift);
    text("D", width / 5 + 105, (height / 2 + 75) + backShift);
    text("A", width / 5 - 45, (height / 2 + 75) + backShift);

    //Left Arrow
   // triangle(98 + width/2, height/2 - 10, width/2 + 68, 10+(height / 2), (width/2 ) + 98, (height/2) + 30);
   triangle((88 + width/2) + 10, (height/2) - 20, (width/2 + 58) + 10, (20 + (height / 2)) - 20, ((width/2 ) + 88) + 10, ((height/2) + 40) - 20);

    
    //Right Arrow
    // triangle(168 + width/2, height/2, width/2 + 198, 20+(height / 2), (width/2 ) + 168, (height/2) + 40);
    triangle((168 + width/2) + 260, (height/2) - 20, (width/2 + 198) + 260, (20+(height / 2)) - 20, ((width / 2) + 168) + 260, ((height/2) + 40) - 20);

    
    textSize(28);
    text("W - To get past teachers", width / 5, (height / 2) + 150);
    text("A - To get past teachers", width / 5, (height / 2) + 190);
    text("S - To get past teachers", width / 5, (height / 2) + 230);
    text("D - To get past teachers", width / 5, (height / 2) + 270);
    text("Q - To get past teachers", width / 5, (height / 2) + 310);
    text("E - To get past teachers", width / 5, (height / 2) + 350);


    //Space
    text("Space", width * 0.75, (height / 2 + 75) + 14);
  
    text("Space - Oh my goooooodddddddd", width * 0.75, (height / 2 + 75) + 75);

    //Left
    text("Left - Oh my goooooodddddddd", width * 0.75, (height / 2 + 75) + 125);

    //Right
    text("Right - Oh my goooooodddddddd", width * 0.75, (height / 2 + 75) + 175);

    //back button click
    if (mouseIsPressed && mouseX > (width/2 - buttonX/2) && mouseX < (width/2 + buttonX/2) && mouseY > ((height/12) - buttonY/2) && mouseY < ((height/12) + buttonY/2 )) {
      cgs = 1;

    }
    if (mouseIsPressed && mouseX > (width * 0.75 - buttonX/2) && mouseX < (width * 0.75 + buttonX/2) && mouseY > ((0.9 * height) - buttonY/2) && mouseY < ((0.9 * height) + buttonY/2)) {
    	cgs = 5;
    }
  }
  
  //Items Screen
  if (cgs === 5) {
     //Variables for the  button
    let buttonX = 400;
    let buttonY = 75;
    let fshift = 15;
    fill(54,187, 217);
    rect(width / 2, height / 6 + 10, buttonX, buttonY);
    fill(0);
    textFont(myFont, 32);
    text("Back to Menu", width / 2, (height / 6) + fshift + 10);
    
     image(speedboostImage, 0.1 * width, 0.3 * height, [100], [150]);
     image(coinImage, 0.25 * width, 0.3 * height);
     image(multiplierImage, 0.4 * width, 0.3 * height, [100], [150]);


     //back to menu button click
    if (mouseIsPressed && mouseX > (width/2 - buttonX/2) && mouseX < (width/2 + buttonX/2) && mouseY > ((height/6 + 10) - buttonY/2) && mouseY < ((height/6 + 10) + buttonY/2 )) {
      cgs = 0;

    }
    
   
    
  }
  
  //lobby game screen
  if (cgs === 1) {
    
     //Start Music
    musictrack(2);
    
		let rBlock = 200;
    let gBlock = 50;
    let bBlock = 100;
    background(220);
		let blockshift = 30;
    let fshift = 100;
    let buttonX = 120;
    let buttonY = 50;
        
    
    // lobbyDesign();
    image(lobbyImage, 0, 0);
		textSize(24);    
    text("HIGH SCORE: ", width / 2 + 3, (height / 2) - 80);
    textSize(24);
    text(str(playerData.highscore), width / 2, ((height / 2) + 22) - 80);
    
    //How-to button with text
    fill(54,187, 217);
    rect(width / 2, height / 2 + blockshift , buttonX, buttonY); //width: 200, height: 75
    fill(0);
    text("How-to", width / 2, height / 2  + 40  );
    //how to button click
    if (mouseIsPressed && mouseX > (width/2 - buttonX/2) && mouseX < (width/2 + buttonX/2) && mouseY > ((height/2+blockshift) - buttonY/2) && mouseY < ((height/2+blockshift) + buttonY/2 )) {
      cgs = 0;

    }
    
    

    clock();

    
    //Start Music
    musictrack(2);

    //Floor
    rectMode(CENTER);
    strokeWeight(1);
    fill(56, 34, 100);
    lobbyRectHeight = (200/height) * height;
    let lobbyPlayerHeight = (150/height) * height;
    let lobbyPlayerWidth = (100/width) * width;
    // rect(windowWidth/2, height - lobbyRectHeight/2, windowWidth, lobbyRectHeight);
    
    //floor Text
    textSize(80);
    textAlign(CENTER);
    textFont(lobbyFont);
    fill(rBlock, gBlock, bBlock);//Box color
    // text(randomStuff[ind], (windowWidth/2) - 200,  (height - lobbyRectHeight/2));
    
    let yLobbyx = (height - lobbyRectHeight) - lobbyPlayerHeight/2 - 180;
    //Character position
    
    image(characterImgLobby, xLobby + width / 2, yLobbyx);
    // rect(xLobby + width / 2, yLobbyx , lobbyPlayerWidth, lobbyPlayerHeight);
    //Side perameters
    
    
    if (keyIsDown(LEFT_ARROW)) {
      xLobby -= 15;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      xLobby += 15;
    }
    if (xLobby > (width/2 + lobbyPlayerWidth/2)) { //leads to stairs section
      //playing function runs here
      cgs = 3;
    }
    if (xLobby < -1 * (width/2 + lobbyPlayerWidth/2)) { //leads to lobby section
      //how-to screen function runs here
			rBlock = 100;
      gBlock = 20;
      gBlock = 150;
      
      //big box
      

     
		fill(200, 50, 100);//Box color
    rect(windowWidth/2, height - lobbyRectHeight/2, windowWidth, lobbyRectHeight);
      
    //CAFE TEXT
    textSize(80);
    textAlign(CENTER);
    textFont(lobbyFont, 80);
    fill(0);
    text("CAFE", (windowWidth/2) - 200,  (height - lobbyRectHeight/2));
    
    }
    playerData.currentscore = 0;

  }
  
  //main game screen  
  if (cgs === 3) {
    rectMode(CORNER);
    strokeWeight(5);
    textAlign(CENTER);
    textFont(lobbyFont);
    fill(0);
    textSize(80);
    fill(200);
    //spD += 0.001;
    
    //Start Music
    musictrack(3);


    // //draw and collision for right staircase
    // if (character.x > 110 && character.x <= 510 && pSituation == 1) {
    //   pCollisionOn = false;
    //   sCollisionOn = true;
    //   pSituation = 2;
    //   //print("past first staircase");
    // }
    // if (character.x <= 110 && pSituation == 3 || pSituation == 2 && character.x < 110) {
    //   pCollisionOn = true;
    //   sCollisionOn = true;
    //   // pSituation = 1;
    //   //print("before first staircase");
    // }
    // if (character.x > 510 && pSituation == 2) {
    //   pCollisionOn = true;
    //   sCollisionOn = false;
    //   // pSituation = 3;
    // }
    
    pCollisionOn = true;
    sCollisionOn = true;
    

    if (sCollisionOn) {
      for (let i = 0; i <= 4; i++) {
        fill(255, 127, 80);
        stairs[i].collisions();
      }
    }



    if (pCollisionOn) {
      for (let i = 0; i <= 4; i++) {
        fill(255, 127, 80);
        platforms[i].collisionPlatform();
        platforms[i].collisionPlatform2();

      }
    }
    
     for (let i = 0; i <= 4; i++) {
       strokeWeight(0);
      fsa[i].display();
      fsa[i].move();
      fsa[i].collision();      
      fsb[i].display();
      fsb[i].move();
      fsb[i].collision();
      fsc[i].display();
      fsc[i].move();
      fsc[i].collision();
      fsd[i].display();
      fsd[i].move();
      fsd[i].collision();

    }
    strokeWeight(5);
    for (let i = 0; i <= 4; i++) {
      fill(255, 127, 80);
      platforms[i].display();
      platforms[i].moveDownPlatform();

    }


   for (let i = 0; i <= 4; i++) {
      fill(255, 127, 80);
     strokeWeight(5);
     // blocksRight[i].display();
      // blocksRight[i].collisions();   
      stairs[i].display();
      stairs[i].moveDown();
    }



    //infinite loop stairs
    for (let i = 0; i <= 4; i++) {
      if (stairs[i].y > (2 * height)) {
        stairs[i].y = (-4000 + (2 * height));
      }
    }

    for (let i = 0; i <= 4; i++) {
      if (platforms[i].y > (2 * height)) {
        platforms[i].y = (-4000 + (2 * height));
      }
    }

    //infinite enemy objects
    if (fsa[0].y > (2 * height)) {
      let x = fsa[0].x;
      fsa.splice(0, 1);
      let y = (-4000 + (2 * height));
      chooseA(x, y);
    }

    if (fsb[0].y > (2 * height)) {
      let x = fsb[0].x;
      fsb.splice(0, 1);
      let y = (-4000 + (2 * height));
      chooseB(x, y);
    }

    if (fsc[0].y > (2 * height)) {
      let x = fsc[0].x;
      fsc.splice(0, 1);
      let y = (-4000 + (2 * height));
      chooseC(x, y);
    }

    if (fsd[0].y > (2 * height)) {
      let x = fsd[0].x;
      fsd.splice(0, 1);
      let y = (-4000 + (2 * height));
      chooseD(x, y);
    }


    /* This is the top collision for the blocks
    when the character collides with a block then the character
    won't be affected by gravity - stands on top platform
    */
    
    
    //Tracking the character Jump
    if(character.vy == 9){
    J--; 
    }
    else if(character.vy == 0){
    J--;
    }
    else if(character.vy == -10){
     J--; 
    }
    
    
    
   
    //Character velocity
    character.vy = character.vy - character.a;
    
    //Terminal Velocity -- 
    if (character.vy <= -10) {
      character.vy = -10; // how fast player falls down
    }


    //Wall bounderies
    if (character.x < 0) {
      character.x += character.xSpd;
    } else if (width - character.cwidth < character.x) {
      character.x -= character.xSpd;
    }

    //when arrow keys pressed the character moves
    if (keyIsDown(LEFT_ARROW)) character.x -= character.xSpd;

    if (keyIsDown(RIGHT_ARROW)) {
      character.x += character.xSpd;
    }

    

    //not currently usable
    if (keyIsDown(DOWN_ARROW))
      character.y += 5;

  
    //Character display and movement update
    fill(255, 0, 0);
    character.y = character.y - character.vy;
    noFill();
    //rect(character.x, character.y, character.cwidth, character.cheight);//Draws Character
    image(characterImgLobby, character.x, character.y-75,[100],[150]);//Image of Character
    fill(255);
    stroke(0);
    
    //Scoring System
    if (frameCount % 10 == 0) {
        playerData.currentscore = playerData.currentscore + (1 * multiplier);
    }
    //Display score
    text(str(playerData.currentscore), width / 2, 80);
    //Right now the multiplier is 1, we have to set something so that the multiplier can change
    
    
    //Time Played Game
    if (frameCount % 3600 == 0) {
      playerData.time++;
    }
    
    //Cash System
    //if player collects coin then add one to cash.
    
    
    
    
      //Switches to Game Over
    if (character.y > height) {
      localStorage.setItem('player', JSON.stringify(playerData));
      playerData = JSON.parse(localStorage.getItem('player'));
      cgs = 4;
    }
    

  }

  //Game Over Screen
  if (cgs === 4) {
    
    //Start Music
    musictrack(4);

    
    
    
    let buttonX = 400;
    let buttonY = 100;
    let fshift = 15;

    if (playerData.currentscore >= playerData.highscore) {
      playerData.highscore = playerData.currentscore;
    }
		//Display on Game Over Screen
    background(0);
    textFont(myFont, 108);
    textAlign(CENTER);
    text("Game", width / 2, 200);
    text("Over", width / 2, 325);
    textSize(36);
    
    text("Current Score:" + str(playerData.currentscore), width / 2, 450);
    text("High Score:" + str(playerData.highscore), width / 2, 400);

    
    fill(255, 179, 230);
    rectMode(CENTER);
    rect(width / 2, (height / 2 * 5/4), buttonX, buttonY);
    fill(153, 21, 34);
    text("Restart", width / 2, (height / 2 * 5/4)+fshift);
    //back to game screen
    if (mouseIsPressed && mouseX > (width/2 - buttonX/2) && mouseX < (width/2 + buttonX/2) && mouseY > ((height / 2 * 5/4) - buttonY/2) && mouseY < ((height / 2 * 5/4) + buttonY/2 )) {
      reset();
      musictrack(3);//Starst running sound again
      cgs = 3;

    }


    fill(255, 179, 230);
    rectMode(CENTER);
    rect(width / 2, height / 2 * 12/8, buttonX, buttonY);
    fill(153, 21, 34);
    text("Go to Lobby", width / 2, (height / 2 * 12/8) + fshift);
    //back to main game
    if (mouseIsPressed && mouseX > (width/2 - buttonX/2) && mouseX < (width/2 + buttonX/2) && mouseY > ((height / 2 * 12/8) - buttonY/2) && mouseY < ((height / 2 * 12/8) + buttonY/2 )) {
      reset();
      musictrack(2);//Starst lobby sound again
      cgs = 1;

    }

  }
    
}


//Resets everything to start game over
function reset() {
			xLobby = 0;
      character.x = 50;
      character.y = 0;
      platforms.y -= 400;
      b = 400;
      stairs.length = 0;
  		platforms.length = 0;
  		fsa.length = 0;
  		fsb.length = 0;
  		fsc.length = 0;
  		fsd.length = 0;
      playerData.currentscore = 0;
      spD = 2.1;
  		multiplier = 1;
      
}

//What do you think this function does?
function loadPlatforms() {

  for (let i = 0; i <= 4; i++) {
    yStairs = 800 * -i;
    stairs.push(new stair(width / 2, yStairs)); //800 = vertical (y) distance between left platform and right platform
  }


  // creates new platform objects
  for (let i = 0; i <= 4; i++) {
    yPlatforms = i * -800; //x = vertical distance between two platforms
    platforms.push(new platform(((0)), ((yPlatforms))));
  }
}

function loadfsa() {
	//Point A
  for (let i = 0; i <= 4; i++) {
    xA = width / 2;
    yA = (-i * 800);
    chooseA(xA, yA);
  }
}

function loadfsb() {
	 //Point B
  for (let i = 0; i <= 4; i++) {
    xB = 3 / 4 * width;
    yB = (-i * 800) - (h / 2);
    chooseB(xB, yB);
  }
}

function loadfsc() {
//Point C
  for (let i = 0; i <= 4; i++) {
    xC = 3 / 4 * width;
    yC = (-i * 800) - h;
    chooseC(xC, yC);
  }
}

function loadfsd() {
	//Point D
  for (let i = 0; i <= 4; i++) {
    xD = 1 / 4 * width;
    yD = (-i * 800) - (3 / 2 * h);
    chooseD(xD, yD);
  }
}
//Spacebar Jump
function keyPressed(){
if (J <= 0){
  if (keyCode == 32){
    
    character.vy+=10;
    J = 3;
  }
}
}






//Might be important ?=?
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}





//Sound Functions
function musictrack(track) {
    if (track !== ptrack) {
      if (track == 1) {
        stop();
        animesound.play();
        animesound.onended(trackloop);
        ptrack = track;
      } 
      else if (track == 2) {
        runsound.stop();
        lobbysound.play();
        lobbysound.onended(trackloop);
        ptrack = track;
      } 
      else if (track == 3) {
        lobbysound.stop();
        runsound.play();
        runsound.onended(trackloop);
        ptrack = track;
      }  
      else {
        lobbysound.stop();
        runsound.stop();
      }
    }
  }
function soundeffect(effect) {
    if (effect == 1){
       jumpsound.playMode('restart');
       jumpsound.play(); 
    }
  }
function trackloop(){
 ptrack = 0; 
}


//Lobby Design Functions
function firstLight() {
    //black rectangles of lights
  let xLamp = 0.2 * width;
  let yLamp = 0;
  let wLamp = 0.02 * width;
  let hLamp = 0.13 * width;
  strokeWeight(4);
  fill(0);
  rectMode(CENTER);
  rect(xLamp, yLamp + hLamp/2, wLamp, hLamp); //1st
  //lightbulbs
  fill(120);
  arc(xLamp , yLamp + hLamp + (hLamp * 0.2) + (hLamp * 0.5)/3, wLamp * 4, hLamp * 0.5, PI, 0, CHORD); //1st
  fill(255, 255, 76);
  arc(xLamp, yLamp + hLamp + (hLamp * 0.2) + (hLamp * 0.5)/3, wLamp + 50, hLamp * 0.35, 0, PI, CHORD); //1st 0.4 * height
	  fill(120);
   //grey rect on lights  
  rect(xLamp, yLamp + hLamp + (hLamp * 0.2)/2, 2.5 * wLamp, hLamp * 0.2); //1st
  }
function secondLight() {
	//black rectangles of lights
  let xLamp = 0.8 * width;
  let yLamp = 0;
  let wLamp = 0.02 * width;
  let hLamp = 0.13 * width;
  strokeWeight(4);
  fill(0);
  rectMode(CENTER);
  rect(xLamp, yLamp + hLamp/2, wLamp, hLamp); //1st
  //lightbulbs
  fill(120);
  arc(xLamp , yLamp + hLamp + (hLamp * 0.2) + (hLamp * 0.5)/3, wLamp * 4, hLamp * 0.5, PI, 0, CHORD); //1st
  fill(120);
   //grey rect on lights  
  rect(xLamp, yLamp + hLamp + (hLamp * 0.2)/2, 2.5 * wLamp, hLamp * 0.2); //1st
  fill(255, 255, 76);
  arc(xLamp, yLamp + hLamp + (hLamp * 0.2) + (hLamp * 0.5)/3, wLamp + 50, hLamp * 0.35, 0, PI, CHORD); //1st 0.4 * height

}
function clock() {
	fill(255);
  ellipseMode(CENTER);
  let tSize = (18/height) * height;
  let xClock = width / 2;
  let whClock = 0.15 * height;
  let rClock = (whClock / 2) - (tSize/2);                                                                                        
  let yClock = 1.5 * whClock;
  ellipse(width/2, yClock, whClock, whClock);
  point(width/2, yClock);
  fill(0);
  textSize(18);
  textAlign(CENTER, CENTER);
  text("10", xClock - ((rClock/2 * 1.73205080757)),yClock - (rClock/2));
	text("11", xClock - (rClock/2), yClock - ((rClock/2 * 1.73205080757)));
  text("1", xClock + (rClock/2), yClock - ((rClock/2 * 1.73205080757)));
  text("2", xClock + ((rClock/2 * 1.73205080757)),yClock - (rClock/2));
  text("8", xClock - ((rClock/2 * 1.73205080757)),(yClock + (rClock/2)));
  text("7", xClock - (rClock/2), yClock + ((rClock/2 * 1.73205080757)));
  text("5", xClock + (rClock/2), yClock + ((rClock/2 * 1.73205080757)));
  text("4", xClock + ((rClock/2 * 1.73205080757)),(yClock + (rClock/2)));
  textAlign(RIGHT, CENTER);
  text("3", (xClock + (whClock / 2)), yClock);
    textAlign(LEFT, CENTER);
  text("9", (xClock - (whClock / 2)), yClock);
  textAlign(CENTER, TOP);
    text("12", xClock, (yClock - (whClock / 2)));
  textAlign(CENTER, BOTTOM);
    text("6", xClock, (yClock + (whClock / 2)));

  var v0 = createVector(xClock, yClock);
  var v1 = createVector(rClock, 0);

  //seconds hand
drawArrow(v0, v1.rotate(angleSeconds), 'red');
    if (frameCount % 60 == 0) {
  	angleSeconds += (2 * PI)/60;
  }
  
  //minutes hour
  var v2 = createVector(rClock * 0.75, 0);
  drawArrow(v0, v2.rotate(angleMinutes), 'black');
  	if (frameCount % 60 == 0) {
    	angleMinutes += (2 * PI)/3600;
    }
  //hour hand

  var v3 = createVector(rClock * 0.5, 0);
	drawArrow(v0, v3.rotate(angleHours), 'black');
  	if (frameCount % 60 == 0) {
    	angleHours += (2 * PI)/43200;
    }		

}
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  var arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
function lobbyScoreBoard() {
	rectMode(CENTER);
  //scoreboard
  let wLine = 400;
  let hLine = 150;
  let xLine = width / 2;
  let yLine = height / 2;
  
  fill(255, 255, 76);
  rect(xLine, yLine, wLine, hLine);
  fill(0);
  textSize(38);
  text("Your highest score: " + str(playerData.highscore), width / 2, yLine - 20);
  text("Come on, you can do better!", xLine, yLine + 20);
  //Left line
  line(xLine - (wLine/2), 0, xLine - (wLine/2), (yLine) - (hLine/2));
  //Right line
  line(xLine + (wLine/2), 0, xLine + (wLine/2), (yLine) - (hLine/2));
}
function cafeStairs() {
  let wCafeStairs = (100/width) * width;
  let hCafeStairs = (50/height) * height;
  rect(0 + wCafeStairs/2, (height-lobbyRectHeight)-hCafeStairs/2, wCafeStairs, hCafeStairs);
  rect(0 + (3/4 * wCafeStairs)/2, ((height-lobbyRectHeight)-hCafeStairs/2) - hCafeStairs, 3/4 * wCafeStairs, hCafeStairs);
}
function gameStairs() {
	let wGameStairs = (175/width) * width;
  let hGameStairs = (50/height) * height;
  rect(width - wGameStairs/2, (height-lobbyRectHeight)-hGameStairs/2, wGameStairs, hGameStairs);
    rect(width - (3/4 * wGameStairs)/2, (height-lobbyRectHeight) - (1.5 * hGameStairs), (3/4 * wGameStairs), hGameStairs);
    rect(width - (2/4 * wGameStairs)/2, (height-lobbyRectHeight)- (2.5 * hGameStairs), (2/4 * wGameStairs), hGameStairs);
    rect(width - (1/4 * wGameStairs)/2, (height-lobbyRectHeight)- (3.5 * hGameStairs), (1/4 * wGameStairs), hGameStairs);
}
function signToCafe() {
  let wCafeSign = (100/width) * width;
  let hCafeSign = (50/height) * height; 
  let xCafeSign = wCafeSign;
  let yCafeSign = 0.4 * height;
  fill(255);
	rect(wCafeSign, yCafeSign, wCafeSign, hCafeSign);
  triangle(xCafeSign - wCafeSign/2, yCafeSign + hCafeSign, xCafeSign - (0.95*wCafeSign), yCafeSign, xCafeSign - wCafeSign/2, yCafeSign - hCafeSign);
  fill(0);
  textSize(18);
  let tSize = 18;
  text("Grab a Snack!!", xCafeSign, yCafeSign+tSize/2);

}
function signToStairs() {
  let wStairSign = (100/width) * width;
  let hStairSign = (50/height) * height; 
  let xStairSign = width - wStairSign;
  let yStairSign = 0.3 * height;
  fill(255);
	rect(xStairSign, yStairSign, wStairSign, hStairSign);
  triangle(xStairSign + wStairSign/2, yStairSign - hStairSign, xStairSign + (0.95 * wStairSign), yStairSign, xStairSign + wStairSign/2, yStairSign +hStairSign);
  fill(0);
  textSize(18);
  let tSize = 18;
  text("Get to Class!!", xStairSign, yStairSign+tSize/2);
  

}
function lobbyDesign() {
	firstLight();
  secondLight();
  lobbyScoreBoard();
  clock();
  cafeStairs();
  gameStairs();
  signToCafe();
  signToStairs();
}


