function stair(xPos, yPos) {
  let stairsCount = 20;
  this.x = xPos; //keyword 'this' used to refer to block's 
  this.y = yPos; //properties/arguments used in the block object
  this.w = ((windowWidth - 400) / 2) / stairsCount;
  this.h = 20;

  //function displays rect. at specified xPos and yPos when
  //called on block object
  this.display = function() {
    noStroke();   
    for (let i = 0; i <= stairsCount; i++) {
      rect((width) / 2 + (i * this.w), this.y - (i * this.h), (5/4 * this.w), this.h);
			rect((width) / 2 + (-i * this.w), (this.y - (i * this.h)) - (stairsCount * this.h), (5/4 * this.w), this.h);

    }

 }


  /**
  This is the parameters for the blocks.
  This is the top collision for the blocks.
  It works by turning the movement of the block to 0
  and moving the block to the edge of the stairs.
  This simulates collision.
  
  **/
 
  //tell me if it's collison - return true and false. brick and player.


  /**
  This is the parameters for the blocks. 
  This is the side collision for the blocks.
  It works by turning the movement of the block to 0
  and moving the block to the edge of the stairs.
  This simulates collision.
  
  **/


  this.collisions = function() {
    
    for (let i = 0; i <= (stairsCount); i++) {
    	if (character.x < (this.x + (i * this.w)) + this.w &&
      character.x + character.cwidth > (this.x + (i * this.w)) &&
      character.y < (this.y - (i * 20)) + this.h &&
      character.cheight + character.y > (this.y - (i * this.h))) {
      character.vy = 0;
      character.y = this.y - (character.cheight + (i * this.h)); //110
      
      }
        
      else if (character.x < (this.x + (-i * this.w)) + this.w &&
      character.x + character.cwidth > (this.x + (-i * this.w)) &&
      character.y < ((this.y - (i * 20)) + this.h)-400 &&
      character.cheight + character.y > ((this.y - (i * this.h)))-400) {
      character.vy = 0;
      character.y = (this.y - (character.cheight + (i * this.h))-400);
      
      

    } 
      
      
  }
}

  this.moveDown = function() {
    this.y += spD;//spD
  }
}