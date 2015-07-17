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

	/******************************* Pokeball Class *******************************/

	function Pokeball() {
		var that = this;
		this.element = document.createElement('div');
		this.element.style.width = 30 + 'px';
		this.element.style.height = 30 + 'px';
		this.element.style.background = 'url(images/pokeball.png)';

		this.x = 0;
		this.y = 0;

		this.init = function(x,y) {
			that.element.className = 'pokeball';
			that.x = x;
			that.y = y;
			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
		};

		this.removePokeball = function() {
			that.element.remove();
		};
	};



	/***************************** Pokemon Class ***************************/

	function Pokemon() {
		var that = this;
		this.element = document.createElement('div');
		//this.element.style.background = 'url(images/zapdos.png)';
		this.element.style.backgroundPosition = '0px 0px';

		this.x = 0;
		this.y = 0;
		var currentSpriteNox = 0;
		this.pathCounter = 0;
		this.a = false;
		this.b = false;
		this.c = false;
		this.d = false;

		this.initialPosition = function(){
			var rand = Math.floor(Math.random()*4+1);
			//console.log(rand);
			if(rand === 1) {
				that.x = 30;
				that.y = 30;
				that.a = true;
			} else if(rand === 2) {
				that.x = 690;
				that.y = 30;
				that.b = true;
			} else if(rand === 3) {
				that.x = 690;
				that.y = 390;
				that.c = true;
			} else {
				that.x = 30;
				that.y = 390;
				that.d = true;
			}
		};

		that.initialPosition();

		this.init = function() {
			that.element.className = 'pokemon';
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

		this.updatePosition = function(path,velocity) {
			
			var coordinate = [];
			coordinate = path[that.pathCounter];
			//debugger;
			
			if (that.pathCounter < path.length) {
				var newPositionX = coordinate[0]*30;
				var newPositionY = coordinate[1]*30;
				console.log(newPositionX, newPositionY);

				if(that.pathCounter > 0) {
					var oldPosition = path[that.pathCounter - 1];
					var oldPositionX = oldPosition[0] * 30;
					var oldPositionY = oldPosition[1] * 30;
					
					//if x does not change, change y
					if(newPositionX === oldPositionX) {
						if(newPositionY > oldPositionY) {
							//moving down
							that.y = that.y + velocity;
							that.element.style.background = 'url(images/zapdos-down.png)';
							var currentX = 30 * currentSpriteNox;
							that.element.style.backgroundPositionX = currentX + 'px';
							if(currentSpriteNox == 4) {
								currentSpriteNox = 0;
							} else {
								currentSpriteNox = currentSpriteNox + 1;
							}
						}else if(newPositionY < oldPositionY) {
							//moving up
							that.y = that.y - velocity;
							that.element.style.background = 'url(images/zapdos-up.png)';
							var currentX = 30 * currentSpriteNox;
							that.element.style.backgroundPositionX = currentX + 'px';
							if(currentSpriteNox == 4) {
								currentSpriteNox = 0;
							} else {
								currentSpriteNox = currentSpriteNox + 1;
							}
						}
					}
					
					//if y does not change, change x
					if(newPositionY === oldPositionY) {
						if(newPositionX > oldPositionX) {
							//moving right
							that.x = that.x + velocity;
							that.element.style.background = 'url(images/zapdos-right.png)';
							var currentX = 30 * currentSpriteNox;
							that.element.style.backgroundPositionX = currentX + 'px';
							if(currentSpriteNox == 4) {
								currentSpriteNox = 0;
							} else {
								currentSpriteNox = currentSpriteNox + 1;
							}
						}else if(newPositionX < oldPositionX) {
							//moving left
							that.x = that.x - velocity;
							that.element.style.background = 'url(images/zapdos-left.png)';
							var currentX = 30 * currentSpriteNox;
							that.element.style.backgroundPositionX = currentX + 'px';
							if(currentSpriteNox == 4) {
								currentSpriteNox = 0;
							} else {
								currentSpriteNox = currentSpriteNox + 1;
							}
						}
					}
				}else {
					that.pathCounter = that.pathCounter + 1;
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

		this.element = document.getElementById('container');

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
		var number = 0;
		var pokeballFound = false;

		this.obstacleArray = [];
		this.guy;
		this.pokemon = [];
		this.pokeball = [];

		this.init = function() {
			createMap(levelMap);

			that.guy = new Guy();
			that.guy.init();
			that.element.appendChild(that.guy.element);

			/*that.pokemon = new Pokemon();
			that.pokemon.init();
			that.element.appendChild(that.pokemon.element);*/
			
			var zapdos = new Pokemon();
			zapdos.init();
			that.element.appendChild(zapdos.element);
			that.pokemon.push(zapdos);

			/*var charizard = new Pokemon();
			charizard.init();
			that.element.appendChild(charizard.element);
			that.pokemon.push(charizard);*/
			

			var pokeballZapdos = new Pokeball();
			pokeballZapdos.init(that.pokemon[0].x, that.pokemon[0].y);
			that.element.appendChild(pokeballZapdos.element);
			that.pokeball.push(pokeballZapdos);

			/*var pokeballCharizard = new Pokeball();
			pokeballCharizard.init(that.pokemon[1].x, that.pokemon[1].y);
			that.element.appendChild(pokeballCharizard.element);
			that.pokeball.push(pokeballCharizard);*/

			this.interval = setInterval(gameLoop, 100);
		};

		var gameLoop = function() {
			//debugger;
			var guyX = that.guy.x;
			var guyY = that.guy.y;
			var guyCoordX = Math.floor(guyX / 30);
			var guyCoordY = Math.floor(guyY / 30);
			
			that.guy.updatePosition();

			var gridBackup = grid.clone();

			//if guy finds pokeball, go to safety
			/*var goToSafety = function(endPosX, endPosY, velocity) {
				if(number === 0) {
					path = finder.findPath(pokemonCoordX, pokemonCoordY, endPosX, endPosY, gridBackup);
					number = 1;
				}
				console.log('end position', endPosX, endPosY);
				//that.pokemon.updatePosition(path,velocity);
			};*/
			
		
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
			//debugger;
			//checking collision detection between guy and pokeball
			for(var i = 0; i < that.pokeball.length; i++) {
				if(collisionDetection(that.guy, that.pokeball[i])) {
					console.log('Found Pokeball !');
					that.pokeball[i].removePokeball();
					pokeballFound = true;
				}
			}

			for(var i = 0; i < that.pokemon.length; i++) {
				var pokemonX = that.pokemon[i].x;
				var pokemonY = that.pokemon[i].y;
				var pokemonCoordX = Math.floor(pokemonX / 30);
				var pokemonCoordY = Math.floor(pokemonY / 30);
				
				//finds the path only on the first run
				if(counter === 0) {
					path = finder.findPath(pokemonCoordX, pokemonCoordY, guyCoordX, guyCoordY, gridBackup);
					counter = 1;
				}

				//if pokemon has not reached new coordinate, keep updating its position else find new path
				var findNewPath = function(endPosX, endPosY, velocity) {
					if(that.pokemon[i].checkPosition(pokemonX, pokemonY, path)) {
						that.pokemon[i].updatePosition(path, velocity);
						console.log('old path');
					} else {
						path = finder.findPath(pokemonCoordX, pokemonCoordY, endPosX, endPosY, gridBackup);
						console.log('path found');
					}
				};

				//check if ash found pokeball or not
				if(pokeballFound) {
					if(that.pokemon[i].a) {
						console.log('bottom right', that.pokemon[i].a);
						findNewPath(23, 13, 5);
						//if pokemon reaches end position, remove it and game over.
						if(pokemonCoordX === 23 && pokemonCoordY === 13) {
							outcome(3);
						}
					} else if(that.pokemon[i].b) {
						console.log('bottom left', that.pokemon[i].b);
						findNewPath(1, 13, 5);
						//if pokemon reaches end position, remove it and game over.
						if(pokemonCoordX === 1 && pokemonCoordY === 13) {
							outcome(3);
						}
					} else if(that.pokemon[i].c) {
						console.log('top left', that.pokemon[i].c);
						findNewPath(1, 1, 5);
						//if pokemon reaches end position, remove it and game over.
						if(pokemonCoordX === 1 && pokemonCoordY === 1) {
							outcome(3);
						}
					} else if(that.pokemon[i].d) {
						console.log('top right', that.pokemon[i].d);
						findNewPath(23, 1, 5);
						//if pokemon reaches end position, remove it and game over.
						if(pokemonCoordX === 23 && pokemonCoordY === 1) {
							outcome(3);
						}
					}
				} else {
					findNewPath(guyCoordX, guyCoordY, 15);
					console.log('follow ash.');
				}

				//checking collision detection between guy and pokemon
				if(collisionDetection(that.guy, that.pokemon[i])) {
					if(pokeballFound) {
						outcome(1);
					} else {
						outcome(2);
					}
				}
			}
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

		/**************************** Outcome Function ***************************/
		var outcome = function(value) {
			if(value === 1) {
				alert('You caught ZAPDOS!');
				clearInterval(that.interval);
			} else if(value === 2) {
				alert('You got electrocuted!');
				clearInterval(that.interval);
			} else if(value === 3) {
				alert('It ran away!');
				that.pokemon[0].removePokemon();
				clearInterval(that.interval);
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

	window.onkeydown = function(event) {
		if (event.which == 32) {
			var container = document.getElementById("container");
			var mainScreen = document.getElementById("main-screen");
			container.style.display = "block";
			mainScreen.style.display = "none";

			var game = new Game();
			game.init();
		}
	};

})();