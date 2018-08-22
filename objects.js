
//===============================================================
//OBJECTS && ENEMIES

//For loop for A point
function chooseA(xA, yA)	{
  randomNum = round(random(0,100));
  
  if (randomNum < 16) {//16
    fsa.push(new speedBoost(xA, yA));
  } else if (randomNum < 42) {
    fsa.push(new coins(xA, yA));
  } else if (randomNum < 50) {
    fsa.push(new invincibility(xA, yA));
  } else {
  	//nothing happens
    fsa.push(new nothing(xA, yA));

  }
}

//For loop for B point
function chooseB(xB, yB)	{
  randomNum = round(random(0,100));
  
  if (randomNum < 15) {
  	fsb.push(new teachera(xB, yB));
  } else if (randomNum < 45) {
    fsb.push(new studentsa(xB, yB));
  } else if (randomNum < 60) {
  	fsb.push(new coins(xB, yB));
  } else {
  	//nothing happens
    fsb.push(new nothing(xB, yB));
  }
}


//For loop for C point
function chooseC(xC, yC)	{
  randomNum = round(random(0,100));
  
  if (randomNum < 90) { //12.5
  	fsc.push(new multiply(xC, yC));
  } else if (randomNum < 35.5) {//35.5
    fsc.push(new speedBoost(xC, yC));
  } else if (randomNum < 35) {
  	fsc.push(new teleport(xC, yC));
  } else if (randomNum < 70) {
    fsc.push(new coins(xC, yC));     
  } else {
  	//nothing happens
    fsc.push(new nothing(xC, yC));
  }
}


//For loop for D point
function chooseD(xD, yD)	{
  randomNum = round(random(0,100));
  
  if (randomNum < 15) {
    	fsd.push(new teacherb(xD, yD));
  } else if (randomNum < 45) {
    fsd.push(new studentsb(xD, yD));
  } else if (randomNum < 60) {
  	fsd.push(new coins(xD, yD));
  } else {
  	//nothing happens
    fsd.push(new nothing(xD, yD));
  }
}



//Boost and stuff
function speedBoost(x, y) {
  this.x = x;
  this.y = y;
  this.h = 40;
  this.w = 30;
  this.r = 0; //0
  this.g = 102; //102
  this.b = 255; //255
  this.o = 255;
  this.collided = false;
  this.frames = 0;

  this.display = function() {
    	// fill(this.r, this.g, this.b, [this.o]);
    // integer RGBA notation
   tint(255,this.o);
	this.speedImg = image(speedboostImage, this.x, (this.y - (2*this.h)), [30], [40]);
	tint(255,255);

  }

  this.move = function() {
  	this.y += spD;
  }
  
  this.addSpeed = (function() {
    let executed = false;
    return function() {
        if (!executed) {
            executed = true;
          	this.r = 130;
            this.g = 130;
            this.b = 130;
          	this.o = 0;
          fill('rgba(0,255,0,1)');
          	this.frames = frameCount;
          	
        } 
    };
})();
  
   this.collision = function() {
  	if (character.x < this.x + this.w/2 &&
   character.x + character.cwidth > this.x - this.w/2 &&
   character.y < (this.y - (2*this.h)) + this.h/2 &&
   character.cheight + character.y > (this.y - (2*this.h)) - this.h/2) {
    // collision detected!
        	

      this.collided = true;
    }
     if (this.collided) {
     	this.addSpeed();
       
       if (this.frames + 120 > frameCount) {
       	character.xSpd = 11;
        character.ySpd = 14;
       } else {
       	character.xSpd = 6;
        character.ySpd = 9;
        this.collided = false;
      }
    }
  }
}
function coins(x, y) {
  this.x = x;
  this.y = y;
  this.h = 20;
  this.w = 20;
  this.r = 255;
  this.g = 191;
  this.b = 0;
  this.o = 255;
  

  this.display = function() {
  
    tint(255, this.o);
    image(coinImage, this.x - 5, this.y - (2*this.h) - 10, [30], [40]);
		tint(255,255);
  }
  
  this.move = function() {
  	this.y += spD;
  }
  
  this.addCash = (function() {
    let executed = false;
    return function() {
        if (!executed) {
            executed = true;
            // do something
          playerData.cash++;
          this.o = 0;
        }
    };
})();
  
  this.collision = function() {
  	if ((character.x < this.x + this.w/2 &&
   character.x + character.cwidth > this.x - this.w/2 &&
   character.y < (this.y - (2*this.h)) + this.h/2 &&
   character.cheight + character.y > (this.y - (2*this.h)) - this.h/2)) {
    // collision detected!
      
			this.addCash();
      
    }
  }
}
function invincibility(x, y) {
  this.x = x;
  this.y = y;
  this.h = 40;
  this.w = 30;
  this.r = 204;
  this.g = 0;
  this.b = 204;
  

  this.display = function() {
  	fill(this.r, this.g, this.b);
    rect(this.x, this.y - (2*this.h), this.w, this.h);


  }
  
  this.move = function() {
  	this.y += spD;
  }
  
  this.addImmunity = (function() {
    let executed = false;
    return function() {
        if (!executed) {
            executed = true;
            // do something
          playerData.cash++;
          this.r = 130;
          this.g = 130;
          this.b = 130;
        }
    };
})();
  
  this.collision = function() {
  	if (character.x < this.x + this.w/2 &&
   character.x + character.cwidth > this.x - this.w/2 &&
   character.y < (this.y - (2*this.h)) + this.h/2 &&
   character.cheight + character.y > (this.y - (2*this.h)) - this.h/2) {
    // collision detected!
      
			this.addImmunity();
      
    }
  }
}
function multiply(x, y) {
  this.x = x;
  this.y = y;
  this.h = 40;
  this.w = 30;
  this.r = 242;
  this.g = 181;
  this.b = 246;
  this.time = frameCount % 60;
  this.collided = false;
  this.frames = 0;
  this.o = 255;
  

  this.display = function() {
    
    tint(255, this.o);
		image(multiplierImage, this.x, this.y - (2*this.h), [30], [40]);
		tint(255,255);
    
  }
  

  this.move = function() {
  	this.y += spD;
  }
  
  this.addMultiplier = (function() {
    let executed = false;
    return function() {
        if (!executed) {
          console.log("Started");
          console.log("variable place");
            executed = true;
            // do something
      		this.frames = frameCount;
          this.o = 0;
        }
    };
})();
  
  this.collision = function() {
  	if (character.x < this.x + this.w/2 &&
   character.x + character.cwidth > this.x - this.w/2 &&
   character.y < (this.y - (2*this.h)) + this.h/2 &&
   character.cheight + character.y > (this.y - (2*this.h)) - this.h/2) {
    // collision detected!
      this.collided = true;
    } 
    if (this.collided) {
      
      this.addMultiplier();
          if (this.frames + 120 > frameCount) {
            multiplier = 2;
            console.log("Doing");
playerData.currentscore = playerData.currentscore + (1 * multiplier);
            
          
} else {
	multiplier = 1;
  this.collided = false;
}     
    }
  }
}

//Obstacles
function teacherb(x, y) {
  this.x = x;
  this.y = y;
  this.closest = false;
  this.gate1= false;
  this.gate2= false;
  this.gate3= false;
  
  
  this.display = function() {
  	fill(250,0,0);
  	rect(this.x, this.y, 10, 20);
  }
  
  this.move = function() {
  	this.y+= spD;
  }
  
  //Creates a slow zonea and checks buttons
  this.slowzone = function(CEN) {
    
    character.xSpd = 1;
    
    if (keyCode == 49/*number*/){
      this.gate1 = true;
    }
    else if (this.gate1 && keyCode == 50 /*number*/){
			this.gate2 = true;
      
    }
    else if ( this.gate3 || this.gate2 && keyCode == 51 || sqrt(CEN) > 15 /*number*/){
      this.gate3 = true;
			character.xSpd = 6;  

  
    }
    
    
  
    
    
  }
  
  //If you are with in radius
  this.collision = function() {
    
    let CEN = dist(this.x,this.y,character.x + 20 ,character.y);
    if (sqrt(CEN) <= 15){
      this.closest = true;
      fill('rgba(165,242,243, 0.25)'); //ice blue
      ellipseMode(RADIUS);
      ellipse(this.x, this.y, CEN, CEN)
      this.slowzone(CEN);
    }
    else if (this.closest) {
				character.xSpd = 4;
        
 }
      
}
  
} 
function teachera(x, y) {
  this.x = x;
  this.y = y;
  this.closest = false;
  this.gate1= false;
  this.gate2= false;
  this.gate3= false;
  // console.log("Teacher");
  
  this.display = function() {
  	fill(250,0,0);
  	rect(this.x, this.y, 10, 20);
  }
  
  this.move = function() {
  	this.y+= spD;
  }
  
  //Creates a slow zonea
  this.slowzone = function(CEN) {
    
    character.xSpd = 1;
    
    if (keyCode == 49/*number*/){
      this.gate1 = true;
    }
    else if (this.gate1 && keyCode == 50 /*number*/){
			this.gate2 = true;
      
    }
    else if (this.gate2 && keyCode == 51 || this.gate3 || sqrt(CEN) > 15 /*number*/){
      this.gate3 = true;
			character.xSpd = 4;  

  
    }
    
    
  
    
    
  }
  
  //If you are with in radius
  this.collision = function() {
    
    let CEN = dist(this.x,this.y,character.x,character.y);
    if (sqrt(CEN) <= 15){
      this.closest = true;
      fill('rgba(165,242,243, 0.25)'); //ice blue
      ellipseMode(RADIUS);
      ellipse(this.x, this.y, CEN, CEN)
      this.slowzone(CEN);
    }
    else if (this.closest) {
				character.xSpd = 4;
        
 }
      
}
  
} 
function studentsa(x, y) {
  this.x = x;
  this.y = y;
  this.xStep= -(1/2 * (windowWidth - 400))/100;
  this.yStep= (20 * 20)/100;
  // console.log("Student");
  
  this.display = function() {
  	image(ELCImage, this.x, this.y - 175, [100], [150]);
  }
  
  this.move = function() {
    
    if (this.x <= (windowWidth-400)/2){
    this.xStep= (1/2 * (windowWidth-400))/100;
    this.yStep= -(20 * 20)/100;
    }
    
    if ((this.x + 40) >= windowWidth-400){
    this.xStep= -(1/2 * (windowWidth-400))/100;
    this.yStep= (20 * 20)/100;
    
    }
      
    this.x += this.xStep;
    this.y += this.yStep;
      
  	this.y+= spD;
  }
  
  this.collision = function() {
  	
  }
  
}
function studentsb(x, y) {
  this.x = x;
  this.y = y;
  this.xStep= -(1/2 * (windowWidth - 400))/100;
  this.yStep= -(20 * 20)/100;
  // console.log("Student");
  
  this.display = function() {
  	image(ELCImage, this.x, this.y - 175, [100], [150]);
  }
  
  this.move = function() {
    
    if (this.x <= 0){
    this.xStep= (1/2 * (windowWidth-400))/100;
    this.yStep= (20 * 20)/100;
    }
    
    if ((this.x ) >= (windowWidth-400)/2){
    this.xStep= -(1/2 * (windowWidth-400))/100;
    this.yStep= -(20 * 20)/100;
    
    }
      
    this.x += this.xStep;
    this.y += this.yStep;
      
  	this.y+= spD;
  }
  
  this.collision = function() {
  	
  }
  
}

//Special
function teleport(x, y) {
  this.x = x;
  this.y = y;
  // console.log("Teleport");
  
  this.display = function() {
  	fill(0,255,255);
  	rect(this.x, this.y, 10, 20);
  }
  
  this.move = function() {
  	this.y+= spD;
  }
  
  this.collision = function() {
  	
  }
}



function nothing(x, y) {
  this.x = x;
  this.y = y;
  
  this.display = function() {
		fill(130);
    rect(this.x, this.y - 20, 10, 20);
  }
  
  this.move = function() {
  	this.y+= spD;
  }
  
  this.collision = function() {
  	
  }
}
