class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
      
      // gameScreen HTML element will be passed as an argument
      this.gameScreen = gameScreen;

      // horizontal position of player (via position absolute)
      this.left = left;

      // vertical position of player (via position absolute)
      this.top = top;

      // width of player
      this.width = width;

      // height of player
      this.height = height;

      // direction of the player's moving horizontally
      // 1 for right; 
      // 0 for steady; 
      // -1 for left;
      this.directionX = 0;

      // direction of the player's moving vertically
      // 1 for bottom; 
      // 0 for steady; 
      // -1 for top;

      this.directionY = 0;

      // Why? Less values on the left and top CSS properties will reduce the element's distance to the left and top borders of the parent div.

      // Creation of the img tag for the player with img src and default styling. 
      this.element = document.createElement("img");
      this.element.src = imgSrc;
      this.element.style.position = "absolute";
      
      // Set up the default element's property values
      this.element.style.width = `${width}px`;
      this.element.style.height = `${height}px`;
      this.element.style.left = `${left}px`;
      this.element.style.top = `${top}px`;
  
      // Append Player to the Game Screen
      this.gameScreen.appendChild(this.element);
    }
  
    move() {
      // Update player's car position based on directionX and directionY
      this.left += this.directionX;
      this.top += this.directionY;
  
      // Ensure the player's car stays within the game screen
  
      // handles right and left  side
      // offsetWidth returns the layout width as a number
      if (this.left + this.width > this.gameScreen.offsetWidth) {
        this.left = this.gameScreen.offsetWidth - this.width;
      }
      else if(this.left <= 0){
        this.left = 0;
      }

      // handles bottom and top side
      // offsetHeight returns the layout height as a number
      if (this.top + this.height > this.gameScreen.offsetHeight) {
        this.top = this.gameScreen.offsetHeight - this.height;
      }
      else if (this.top < 0) {
        this.top = 0; // top border
      }
  
      // Update the player's car position on the screen
      this.updatePosition();
    }
  
    updatePosition() {
      // Update CSS
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
    didCollide(obstacle) {
      // define it as a rectangle and give left, right, top and bottom properties

      //.getBoundingClientRect() returns info about top, left, right, bottom, width, height, x and y position of the HTML element

      const playerRect = this.element.getBoundingClientRect();
      const obstacleRect = obstacle.element.getBoundingClientRect();

      if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top
      ) {
        // to understand better the conditions, do
        // console.log(playerRect, obstacleRect);
        return true;
      } else {
        return false;
      }
    }
  
  
  }