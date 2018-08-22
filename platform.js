//platform object
function platform(xPlatform, yPlatform) {
  this.x = xPlatform; //keyword 'this' used to refer to block's 
  this.y = yPlatform; //properties/arguments used in the block object
  this.w = (windowWidth - 400) / 2;
  this.h = 30;

  //function displays rect. at specified xPos and yPos when
  //called on block object
  this.display = function() {

    rect(this.x, this.y, this.w, this.h);
		rect(this.x + (windowWidth - 400) / 2, this.y - 400, this.w, this.h); // 400 = stairsCount * stairs.h

  }
  this.collisionPlatform = function() {
    if (character.x < this.x + this.w &&
      character.x > this.x &&
      character.y < this.y + this.h &&
      character.y > this.y - character.cheight) {
      character.vy = 0;
      character.y = this.y - character.cheight;
    	

    } 
    //collision for the top platform
    this.collisionPlatform2 = function() {
       if (character.x < (this.x + (windowWidth - 400) / 2) + this.w &&
      character.x > this.x + (windowWidth - 400) / 2 &&
      character.y < (this.y - 400) + this.h &&
      character.y > (this.y - 400) - character.cheight) {
      character.vy = 0;
      character.y = (this.y - 400) - character.cheight;
      
         

    } 
  }
    this.moveDownPlatform = function() {
      this.y += spD; //spD
    }
  }
}