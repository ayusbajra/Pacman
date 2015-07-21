;(function(){
	'use strict';

	/******************************* Obstacle Class ******************************/

	function Obstacle() {
		var that = this;
		this.element = document.createElement('div');

		this.x = 0;
		this.y = 0;

		this.init = function(mapX, mapY) {
			that.x = mapX * 30;
			that.y = mapY * 30;
			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
		};
	};
	/**************************** Badge Class *************************/
	function Badge() {
		var that = this;
		this.element = document.createElement('div');
		this.element.style.background = 'url(images/badge.png)';
		this.element.backgroundPosition = '0px 0px';

		this.x = 0;
		this.y = 0;

		this.init = function(mapX, mapY) {
			that.element.className = 'badge';
			that.x = mapX * 30;
			that.y = mapY * 30;
			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
			Animation(that.element, 12, 125);
		};

		this.removeBadge = function() {
			that.element.remove();
		};
	};

	/*************************** Animation **************************/
	function Animation(element, noOfSprites, time) {
		var currentSpriteNoX = 0;
		var animateSprite = function() {
			var currentX = 30 * currentSpriteNoX;
			element.style.backgroundPositionX = currentX +'px';
			if(currentSpriteNoX == noOfSprites) {
				currentSpriteNoX = 0;
			}
			else {
				currentSpriteNoX += 1;
			}
		};
		setInterval(animateSprite, time);
	};

	/******************************* Pokeball Class *******************************/

	function Pokeball() {
		var that = this;
		this.element = document.createElement('div');
		this.element.style.background = 'url(images/pokeball.png)';
		this.element.backgroundPosition = '0px 0px';

		this.x = 0;
		this.y = 0;

		this.init = function(mapX, mapY) {
			that.element.className = 'pokeball';
			that.x = mapX;
			that.y = mapY;
			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
			Animation(that.element, 6, 125);
		};

		this.removePokeball = function() {
			that.element.remove();
		};
	};

	/***************************** Pokemon Class ***************************/

	function Pokemon() {
		var that = this;
		this.element = document.createElement('div');
		this.element.style.backgroundPosition = '0px 0px';

		this.x = 0;
		this.y = 0;
		var currentSpriteNox = 0;
		var pathCounter = 0;
		this.topLeft = false;
		this.topRight = false;
		this.bottomLeft = false;
		this.bottomRight = false;

		this.init = function(type) {
			that.element.className = 'pokemon';
			var rand = Math.floor(Math.random()*4+1);
			if(type === 1) {
				if(rand === 1) {
					that.x = 30;
					that.y = 30;
					that.topLeft = true;
				} else if(rand === 2) {
					that.x = 690;
					that.y = 30;
					that.topRight = true;
				} else if(rand === 3) {
					that.x = 690;
					that.y = 390;
					that.bottomLeft = true;
				} else {
					that.x = 30;
					that.y = 390;
					that.bottomRight = true;
				}
			} else if(type === 2) {
				that.x = 30;
				that.y = 30;
			} else if(type === 3) {
				that.x = 690;
				that.y = 30;
			} else if(type === 4) {
				that.x = 30;
				that.y = 390;
			} else if (type === 5) {
				that.x = 690;
				that.y = 390;
			}

			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
		};

		this.checkPosition = function(currentX, currentY, path) {
			var coordinate = [];
			coordinate = path[1];

			var newX = coordinate[0] * 30;
			var newY = coordinate[1] * 30;

			if(newX === currentX && newY === currentY) {
				return false;
			}else {
				return true;
			}
		};

		var animate = function() {
			var currentX = 30 * currentSpriteNox;
			that.element.style.backgroundPositionX = currentX + 'px';
			if(currentSpriteNox == 4) {
				currentSpriteNox = 0;
			} else {
				currentSpriteNox = currentSpriteNox + 1;
			}
		};

		this.updatePosition = function(path, velocity) {
			
			var coordinate = [];
			coordinate = path[pathCounter];
			//debugger;
			
			if (pathCounter < path.length) {
				var newPositionX = coordinate[0]*30;
				var newPositionY = coordinate[1]*30;

				if(pathCounter > 0) {
					var oldPosition = path[pathCounter - 1];
					var oldPositionX = oldPosition[0] * 30;
					var oldPositionY = oldPosition[1] * 30;
					
					//if x does not change, change y
					if(newPositionX === oldPositionX) {
						if(newPositionY > oldPositionY) {
							//moving down
							that.y = that.y + velocity;
							that.element.style.background = 'url(images/zapdos-down.png)';
							animate();
						}else if(newPositionY < oldPositionY) {
							//moving up
							that.y = that.y - velocity;
							that.element.style.background = 'url(images/zapdos-up.png)';
							animate();
						}
					}
					
					//if y does not change, change x
					if(newPositionY === oldPositionY) {
						if(newPositionX > oldPositionX) {
							//moving right
							that.x = that.x + velocity;
							that.element.style.background = 'url(images/zapdos-right.png)';
							animate();
						}else if(newPositionX < oldPositionX) {
							//moving left
							that.x = that.x - velocity;
							that.element.style.background = 'url(images/zapdos-left.png)';
							animate();
						}
					}
				}else {
					pathCounter = pathCounter + 1;
				}
			}

			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
		};

		this.staticFollow = function(type) {
			if(type === 1) {
				if(that.x < 180 && that.y === 30) {
					that.x += 5;
					that.element.style.background = 'url(images/charizard-right.png)';
				}else if(that.x === 180 && that.y < 150) {
					that.y += 5;
					that.element.style.background = 'url(images/charizard-down.png)';
				}else if(that.x > 30 && that.y === 150) {
					that.x -= 5;
					that.element.style.background = 'url(images/charizard-left.png)';
				}else {
					that.y -= 5;
					that.element.style.background = 'url(images/charizard-up.png)';
				}
			} else if (type === 2) {
				if(that.x === 690 && that.y < 150) {
					that.y += 5;
					that.element.style.background = 'url(images/charizard-down.png)';
				}else if(that.x > 540 && that.y === 150) {
					that.x -= 5;
					that.element.style.background = 'url(images/charizard-left.png)';
				}else if(that.x === 540 && that.y > 30) {
					that.y -= 5;
					that.element.style.background = 'url(images/charizard-up.png)';
				}else {
					that.x += 5;
					that.element.style.background = 'url(images/charizard-right.png)';
				}
			} else if (type === 3) {
				if(that.x === 30 && that.y > 270) {
					that.y -= 5;
					that.element.style.background = 'url(images/charizard-up.png)';
				}else if(that.x < 180 && that.y === 270) {
					that.x += 5;
					that.element.style.background = 'url(images/charizard-right.png)';
				}else if(that.x === 180 && that.y < 390) {
					that.y += 5;
					that.element.style.background = 'url(images/charizard-down.png)';
				}else {
					that.x -= 5;
					that.element.style.background = 'url(images/charizard-left.png)';
				}
			} else if (type === 4) {
				if(that.x > 540 && that.y === 390) {
					that.x -= 5;
					that.element.style.background = 'url(images/charizard-left.png)';
				}else if(that.x === 540 && that.y > 270) {
					that.y -= 5;
					that.element.style.background = 'url(images/charizard-up.png)';
				}else if(that.x < 690 && that.y === 270) {
					that.x += 5;
					that.element.style.background = 'url(images/charizard-right.png)';
				}else {
					that.y += 5;
					that.element.style.background = 'url(images/charizard-down.png)';
				}
			}
			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
		};

		this.removePokemon = function() {
			that.element.remove();
		};
	};

	/******************************* Guy Class*****************************/

	function Guy() {
		var that = this;
		this.element = document.createElement('div');
		this.element.style.background = 'url(images/ash-down.png)';
		this.element.style.backgroundPosition = '0px 0px';

		// center middle position
		this.x = 360;
		this.y = 210;
		this.velocityX = 0;
		this.velocityY = 0;
		var currentSpriteNox = 0;

		this.init = function() {
			that.element.className = 'guy';
			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';

			keyEvents();
		};

		this.updatePosition = function() {
			if(that.x < 30) {
				that.velocityX = 0;
				that.x = 690;
			}
			if(that.x > 690) {
				that.velocityX = 0;
				that.x = 30;
			}
			that.x = that.x + that.velocityX;
			that.y = that.y + that.velocityY;
			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
		};

		var animate = function(value) {
			if(value ===1){
				//console.log('left side');
				that.element.style.background = 'url(images/ash-left.png)';
			}else if(value === 2){
				//console.log('right side');
				that.element.style.background = 'url(images/ash-right.png)';
			}else if(value === 3){
				//console.log('up side');
				that.element.style.background = 'url(images/ash-up.png)';
			}else if(value === 4){
				//console.log('down side');
				that.element.style.background = 'url(images/ash-down.png)';
			}
			var currentX = 30 * currentSpriteNox;
			that.element.style.backgroundPositionX = currentX + 'px';
			if(currentSpriteNox == 4) {
				currentSpriteNox = 0;
			} else {
				currentSpriteNox = currentSpriteNox + 1;
			}
		};
		//this.animation = setInterval(animate, 80);

		var keyEvents = function() {
			window.onkeydown = function(event){
				//Left Button
				if(event.which==37) {
					that.velocityX = -15;
					//Left Animation
					this.animation = setInterval(animate(1), 100);
				}
				//Right Button
				if(event.which==39) { 
					that.velocityX = +15;
					//Right Animation
					this.animation = setInterval(animate(2), 100);
				}
				//Up Button
				if(event.which==38) { 
					that.velocityY = -15;
					//Up Animation
					this.animation = setInterval(animate(3), 100);
				}
				//Down Button
				if(event.which==40) { 
					that.velocityY = +15;
					//Down Animation
					this.animation = setInterval(animate(4), 100);
				}
			};
			window.onkeyup = function(event) {
				that.velocityX = 0;
				that.velocityY = 0;
				
				if (event.which==37) {
					//console.log("just pressed left");
					clearInterval(that.animation);
				}
				if (event.which==39) {
					//console.log("just pressed right");
					clearInterval(that.animation);
				}
				if (event.which==38) {
					//console.log("just pressed up");
					clearInterval(that.animation);
				}
				if (event.which==40) {
					//console.log("just pressed down");
					clearInterval(that.animation);
				}
			};
		};
	};


	/******************************* Game Class *************************/

	function Game() {
		var that = this;
		this.element = document.getElementById("container");

		this.mainScreen = document.getElementById("main-screen");
		this.play = document.getElementById("main-screen").children[0];

		this.gameoverScreen = document.getElementById("gameover-screen");
		this.result = document.getElementById("gameover-screen").children[0];
		this.playAgain = document.getElementById("gameover-screen").children[1];

		var levelMap = [
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1],
			[1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1],
			[1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1],
			[1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1],
			[1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		];

		var grid = new Grid(levelMap);
		var finder = new BreadthFirstFinder();
		var path;
		var counter = 0;
		//var findNewPath;

		var guyX;
		var guyY;
		var guyCoordX;
		var guyCoordY;
		var zapdosX;
		var zapdosY;
		var zapdosCoordX;
		var zapdosCoordY;

		var gridBackup;
		var pokeballFound = false;

		this.obstacleArray = [];
		this.guy;
		this.pokeballArray = [];
		this.pokemon = [];
		this.badges = [];

		this.init = function() {
			createMap(levelMap);

			that.guy = new Guy();
			that.guy.init();
			that.element.appendChild(that.guy.element);

			this.zapdos = new Pokemon();
			that.zapdos.init(1);
			that.element.appendChild(that.zapdos.element);

			var charizard = new Pokemon();
			charizard.init(2);
			that.element.appendChild(charizard.element);
			that.pokemon.push(charizard);

			charizard = new Pokemon();
			charizard.init(3);
			that.element.appendChild(charizard.element);
			that.pokemon.push(charizard);

			charizard = new Pokemon();
			charizard.init(4);
			that.element.appendChild(charizard.element);
			that.pokemon.push(charizard);

			charizard = new Pokemon();
			charizard.init(5);
			that.element.appendChild(charizard.element);
			that.pokemon.push(charizard);

			var badge = new Badge();
			badge.init(6, 1);
			that.element.appendChild(badge.element);
			that.badges.push(badge);

			badge = new Badge();
			badge.init(18, 1);
			that.element.appendChild(badge.element);
			that.badges.push(badge);

			badge = new Badge();
			badge.init(1, 5);
			that.element.appendChild(badge.element);
			that.badges.push(badge);

			badge = new Badge();
			badge.init(23, 5);
			that.element.appendChild(badge.element);
			that.badges.push(badge);

			badge = new Badge();
			badge.init(1, 9);
			that.element.appendChild(badge.element);
			that.badges.push(badge);

			badge = new Badge();
			badge.init(23, 9);
			that.element.appendChild(badge.element);
			that.badges.push(badge);

			badge = new Badge();
			badge.init(6, 13);
			that.element.appendChild(badge.element);
			that.badges.push(badge);

			badge = new Badge();
			badge.init(18, 13);
			that.element.appendChild(badge.element);
			that.badges.push(badge);

			this.interval = setInterval(gameLoop, 100);

		};

		var gameLoop = function() {
			//debugger;
			guyX = that.guy.x;
			guyY = that.guy.y;
			guyCoordX = Math.floor(guyX / 30);
			guyCoordY = Math.floor(guyY / 30);

			zapdosX = that.zapdos.x;
			zapdosY = that.zapdos.y;
			zapdosCoordX = Math.floor(zapdosX / 30);
			zapdosCoordY = Math.floor(zapdosY / 30);

			that.guy.updatePosition();

			gridBackup = grid.clone();
			
			//finds the path only on the first run
			if(counter === 0) {
				path = finder.findPath(zapdosCoordX, zapdosCoordY, guyCoordX, guyCoordY, gridBackup);
				counter = 1;
			}
				
			if(that.badges.length === 0) {
				if(that.zapdos.topLeft) {
					console.log('bottom right');
					findNewPath(23, 13, 10);
					if(zapdosCoordX === 23 && zapdosCoordY === 13) {
						gameover(3);
					}
				} else if(that.zapdos.topRight) {
					console.log('bottom left');
					findNewPath(1, 13, 10);
					if(zapdosCoordX === 1 && zapdosCoordY === 13) {
						gameover(3);
					}
				} else if(that.zapdos.bottomLeft) {
					console.log('top left');
					findNewPath(1, 1, 10);
					if(zapdosCoordX === 1 && zapdosCoordY === 1) {
						gameover(3);
					}
				} else if(that.zapdos.bottomRight) {
					console.log('top right');
					findNewPath(23, 1, 10);
					if(zapdosCoordX === 23 && zapdosCoordY === 1) {
						gameover(3);
					}
				}
			} else {
				findNewPath(guyCoordX, guyCoordY, 10);
				//console.log('follow ash.');
			}

			//checking collision detection between guy and obstacles
			for(var i = 0; i < that.obstacleArray.length; i++) {
				if(collisionDetection(that.guy, that.obstacleArray[i])) {
					that.guy.x = guyX;
					that.guy.y = guyY;
					that.guy.velocityX = 0;
					that.guy.velocityY = 0;
					that.guy.updatePosition();
				}
			}

			//checking collision detection between guy and pokeball
			for(var i = 0; i < that.pokeballArray.length; i++) {
				if(collisionDetection(that.guy, that.pokeballArray[i])) {
					console.log('Found Pokeball !');
					that.pokeballArray[i].removePokeball();
					that.pokeballArray[i] = null;
					pokeballFound = true;
				}
				that.pokeballArray = removeEmptyValues(that.pokeballArray);
			}

			//checking collision detection between guy and badges
			for(var i = 0; i < that.badges.length; i++) {
				if(collisionDetection(that.guy, that.badges[i])) {
					console.log('Found a badge !');
					that.badges[i].removeBadge();
					that.badges[i] = null;
					console.log(that.badges.length);
					if(that.badges.length === 1) {
						showPokeball();
					}
				}
				that.badges = removeEmptyValues(that.badges);
			}

			//checking collision detection between guy and round moving pokemon
			for(var i = 0; i < that.pokemon.length; i++) {	 
					that.pokemon[i].staticFollow(i+1);
				if(collisionDetection(that.guy, that.pokemon[i])) {
					gameover(4);
				}
			}

			//checking collision detection between guy and zapdos pokemon
			if(collisionDetection(that.guy, that.zapdos)) {
				if(pokeballFound) {
					gameover(1);
				} else {
					gameover(2);
				}
			}
		};

		//if pokemon has not reached new coordinate, keep updating its position else find new path
		var findNewPath = function(endPosX, endPosY, velocity) {
			if(path.length > 1) {
				if(that.zapdos.checkPosition(zapdosX, zapdosY, path)) {
				//console.log(zapdosX, zapdosY);
					that.zapdos.updatePosition(path, velocity);
				} else {
					gridBackup = grid.clone();
					path = finder.findPath(zapdosCoordX, zapdosCoordY, endPosX, endPosY, gridBackup);
				}
			}
		};

		var checkBadge = function() {
			if(that.badges.length === 0) {
				showPokeball();
			}
		};

		var showPokeball = function() {	
			var pokeball = new Pokeball();
			pokeball.init(360, 210);
			that.element.appendChild(pokeball.element);
			that.pokeballArray.push(pokeball);
		};

		/**************************** Create Map ********************************/
		var createMap = function(map) {
			//y-axis values
			for (var i = 0; i < map.length; i++) {
				//x-axis values
				for (var j = 0; j < map[i].length; j++) {
					if(map[i][j] !== 0) {
						var obstacle = new Obstacle();
						// implementing in an opposite way
						obstacle.init(j,i);
						that.obstacleArray.push(obstacle);
						that.element.appendChild(obstacle.element);
					}
				}
			}
		};

		/************************** Collision Detection ****************************/
		var collisionDetection = function(obj1, obj2) {
			if ((obj1.x + 30) > obj2.x && obj1.x < (obj2.x + 30) && (obj1.y + 30) > obj2.y && obj1.y < (obj2.y + 30))  {
				return true;
			}else {
				return false;
			}
		};

		/********************* Removing the empty values from an array ****************/
		var removeEmptyValues = function(array) {
			for(var i = 0; i < array.length; i++) {
				if(array[i] === null) {
					array.splice(i, 1);
				}
			}
			return array;
		};

		/***********Main Menu ***************/
		this.mainMenu = function() {
			that.play.onclick = function() {
				that.init();
				that.element.style.display = "block";
				that.mainScreen.style.display = "none";
			}
		};

		/**************************** Gameover Function ***************************/
		var gameover = function(value) {
			clearInterval(that.interval);
			that.element.style.display = "none";
			that.gameoverScreen.style.display = "block";
			
			if(value === 1) {
				console.log('You caught ZAPDOS!');
				that.result.style.background = 'url(images/you-win.png)';
			} else if(value === 2) {
				console.log('You got electrocuted!');
				that.result.style.background = 'url(images/you-lose1.png)';
			} else if(value === 3) {
				that.zapdos.removePokemon();
				console.log('It flew away!');
				that.result.style.background = 'url(images/you-lose2.png)';
			} else if(value === 4) {
				console.log('You got burned!');
				that.result.style.background = 'url(images/you-lose3.png)';
			}

			//play-again button
			that.playAgain.onclick = function() {
				// reload the page
				location.reload();
			}
		};
	};

	/******************** Breadth First Algorithm Start **********************/

	function Node(x, y, walkable) {
		//The x coordinate of the node on the grid.
	    this.x = x;
		//The y coordinate of the node on the grid.
	    this.y = y;
	    //Whether this node can be walked through.
	    this.walkable = (walkable === undefined ? true : walkable);
	};

	function Grid(width_or_matrix, height, matrix) {
	    var width;

	    if (typeof width_or_matrix !== 'object') {
	        width = width_or_matrix;
	    } else {
	        height = width_or_matrix.length;
	        width = width_or_matrix[0].length;
	        matrix = width_or_matrix;
	    }

	    //The number of columns of the grid.
	    this.width = width;
	    //The number of rows of the grid.
	    this.height = height;

	    //A 2D array of nodes.
	    this.nodes = this._buildNodes(width, height, matrix);
	};

	//Build and return the nodes.
	Grid.prototype._buildNodes = function(width, height, matrix) {
	    var i, j,
	        nodes = new Array(height);

	    for (i = 0; i < height; ++i) {
	        nodes[i] = new Array(width);
	        for (j = 0; j < width; ++j) {
	            nodes[i][j] = new Node(j, i);
	        }
	    }

	    if (matrix === undefined) {
	        return nodes;
	    }

	    if (matrix.length !== height || matrix[0].length !== width) {
	        throw new Error('Matrix size does not fit');
	    }

	    for (i = 0; i < height; ++i) {
	        for (j = 0; j < width; ++j) {
	            if (matrix[i][j]) {
	                // 0, false, null will be walkable
	                // while others will be un-walkable
	                nodes[i][j].walkable = false;
	            }
	        }
	    }
	    return nodes;
	};


	Grid.prototype.getNodeAt = function(x, y) {
	    return this.nodes[y][x];
	};


	//Determine whether the node at the given position is walkable.
	//(Also returns false if the position is outside the grid.)
	Grid.prototype.isWalkableAt = function(x, y) {
	    return this.isInside(x, y) && this.nodes[y][x].walkable;
	};


	//Determine whether the position is inside the grid.
	Grid.prototype.isInside = function(x, y) {
	    return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);
	};


	//Set whether the node on the given position is walkable.
	//NOTE: throws exception if the coordinate is not inside the grid.
	Grid.prototype.setWalkableAt = function(x, y, walkable) {
	    this.nodes[y][x].walkable = walkable;
	};


	//Get the neighbors of the given node.
	Grid.prototype.getNeighbors = function(node) {
	    var x = node.x,
	        y = node.y,
	        neighbors = [],
	        s0 = false, d0 = false,
	        s1 = false, d1 = false,
	        s2 = false, d2 = false,
	        s3 = false, d3 = false,
	        nodes = this.nodes;

	    // ↑
	    if (this.isWalkableAt(x, y - 1)) {
	        neighbors.push(nodes[y - 1][x]);
	        s0 = true;
	    }
	    // →
	    if (this.isWalkableAt(x + 1, y)) {
	        neighbors.push(nodes[y][x + 1]);
	        s1 = true;
	    }
	    // ↓
	    if (this.isWalkableAt(x, y + 1)) {
	        neighbors.push(nodes[y + 1][x]);
	        s2 = true;
	    }
	    // ←
	    if (this.isWalkableAt(x - 1, y)) {
	        neighbors.push(nodes[y][x - 1]);
	        s3 = true;
	    }

	    // ↖
	    if (d0 && this.isWalkableAt(x - 1, y - 1)) {
	        neighbors.push(nodes[y - 1][x - 1]);
	    }
	    // ↗
	    if (d1 && this.isWalkableAt(x + 1, y - 1)) {
	        neighbors.push(nodes[y - 1][x + 1]);
	    }
	    // ↘
	    if (d2 && this.isWalkableAt(x + 1, y + 1)) {
	        neighbors.push(nodes[y + 1][x + 1]);
	    }
	    // ↙
	    if (d3 && this.isWalkableAt(x - 1, y + 1)) {
	        neighbors.push(nodes[y + 1][x - 1]);
	    }

	    return neighbors;
	};


	//Get a clone of this grid.
	Grid.prototype.clone = function() {
	    var i, j,
	        width = this.width,
	        height = this.height,
	        thisNodes = this.nodes,

	        newGrid = new Grid(width, height),
	        newNodes = new Array(height);

	    for (i = 0; i < height; ++i) {
	        newNodes[i] = new Array(width);
	        for (j = 0; j < width; ++j) {
	            newNodes[i][j] = new Node(j, i, thisNodes[i][j].walkable);
	        }
	    }

	    newGrid.nodes = newNodes;

	    return newGrid;
	};


	//Breadth-First-Search path finder.
	function BreadthFirstFinder(opt) {
	    opt = opt || {};
	};


	//Find and return the the path.
	BreadthFirstFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
		//debugger;
	    var openList = [],
	        //diagonalMovement = this.diagonalMovement,
	        startNode = grid.getNodeAt(startX, startY),
	        endNode = grid.getNodeAt(endX, endY),
	        neighbors, neighbor, node, i, l;

	    // push the start pos into the queue
	    openList.push(startNode);
	    startNode.opened = true;

		//Backtrace according to the parent records and return the path.
		//(including both start and end nodes)
		var backtrace = function(node) {
			var path = [[node.x, node.y]];
			while (node.parent) {
			    node = node.parent;
			    path.push([node.x, node.y]);
			}
			return path.reverse();
		};

	    // while the queue is not empty
	    while (openList.length) {
	        // take the front node from the queue
	        node = openList.shift();
	        node.closed = true;

	        // reached the end position
	        if (node === endNode) {
	            return backtrace(endNode);
	        }

	        neighbors = grid.getNeighbors(node);
	        for (i = 0, l = neighbors.length; i < l; ++i) {
	            neighbor = neighbors[i];

	            // skip this neighbor if it has been inspected before
	            if (neighbor.closed || neighbor.opened) {
	                continue;
	            }

	            openList.push(neighbor);
	            neighbor.opened = true;
	            neighbor.parent = node;
	        }
	    }
	    
	    // fail to find the path
	    return [];
	};

	/********************* Breadth First Algorithm End ***********************/

	var game = new Game();
	game.mainMenu();

})();