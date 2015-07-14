;(function(){
	'use strict';

	/******************************* Obstacle Class ******************************/

	function Obstacle() {
		var that = this;
		this.element = document.createElement('div');

		this.x = 0;
		this.y = 0;

		this.init = function(code, mapX, mapY) {
			//that.element.className = 'obstacle';
			//that.element.style.backgroundPosition = '-90px 0px';
			that.x = mapX * 30;
			that.y = mapY * 30;
			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
		};
	};


	/***************************** Pokemon Class ***************************/

	function Pokemon() {
		var that = this;
		this.element = document.createElement('div');

		this.x = 0;
		this.y = 0;
		this.velocity = 5;
		this.pathCounter = 0;

		this.route;

		var initialPosition = function(){
			var rand = Math.floor(Math.random()*4+1);
			//console.log(rand);
			if(rand === 1) {
				that.x = 30;
				that.y = 30;
			}else if(rand === 2) {
				that.x = 690;
				that.y = 30;
			}else if(rand === 3) {
				that.x = 690;
				that.y = 390;
			}else {
				that.x = 30;
				that.y = 390;
			}
		};
		initialPosition();

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
				console.log('equal');
				return false;
			}else {
				console.log('not equal');
				return true;
			}
		};

		this.updatePosition = function(path) {
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
							that.y += that.velocity;
						}else if(newPositionY < oldPositionY) {
							that.y -= that.velocity;
						}
					}
					//if y does not change, change x
					if(newPositionY === oldPositionY) {
						if(newPositionX > oldPositionX) {
							that.x += that.velocity;
						}else if(newPositionX < oldPositionX) {
							that.x -= that.velocity;
						}
					}
				}else {
					that.pathCounter++;
				}
			}

			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';

			
		};

/*		this.chaseAsh = function(gxPos,gyPos,pxPos,pyPos) {
			
			console.log('Ash='+gxPos/30+' '+gyPos/30);
			console.log('Pokemon='+Math.floor(pxPos/30)+' '+Math.floor(pyPos/30));

			if(pxPos < gxPos) {
				that.velocityX = 5; //move to right
			}else if(pxPos > gxPos) {
				that.velocityX = -5; //move to left
			}else {
				that.velocityX = 0; //dont move
			}

			if(pyPos < gyPos) {
				that.velocityY = 5; //move down
			}else if(pyPos > gyPos) {
				that.velocityY = -5; //move up
			}else {
				that.velocityY = 0; //dont move
			}
		};*/
	};

	/******************************* Guy Class*****************************/

	function Guy() {
		var that = this;
		this.element = document.createElement('div');
		this.element.style.background = 'url(images/ash-down.png)';
		this.element.style.backgroundPosition = '0px 0px';

		this.x = 30; /*360*/
		this.y = 270; /*210*/
		this.velocityX = 0;
		this.velocityY = 0;

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
			that.x += that.velocityX;
			that.y += that.velocityY;
			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
		};

		this.animate = function(value) {
			if(value===1){
				//console.log('left side');
				that.element.style.background = 'url(images/ash-left.png)';
			}
			if(value===2){
				//console.log('right side');
				that.element.style.background = 'url(images/ash-right.png)';
			}
			if(value===3){
				//console.log('up side');
				that.element.style.background = 'url(images/ash-up.png)';
			}
			if(value===4){
				//console.log('down side');
				that.element.style.background = 'url(images/ash-down.png)';
			}
		};

		var keyEvents = function() {
			window.onkeydown = function(event){
				if(event.which==37) { /*Left Button*/
					that.velocityX = -30;
					/*Left Animation*/
					that.animate(1);
				}
				if(event.which==39) { /*Right Button*/
					that.velocityX = +30;
					/*Right Animation*/
					that.animate(2);
				}
				if(event.which==38) { /*Up Button*/
					that.velocityY = -30;
					/*Up Animation*/
					that.animate(3);
				}
				if(event.which==40) { /*Down Button*/
					that.velocityY = +30;
					/*Down Animation*/
					that.animate(4);
				}
			};
			window.onkeyup = function(event) {
				that.velocityX = 0;
				that.velocityY = 0;
				/**/
				if (event.which==37) {
					//console.log("just pressed left");
				}
				if (event.which==39) {
					//console.log("just pressed right");
				}
				if (event.which==38) {
					//console.log("just pressed up");
				}
				if (event.which==40) {
					//console.log("just pressed down");
				}
			};
		};
	};


	/******************************* Game Class *************************/

	function Game() {
		var that = this;
		this.element = document.getElementById('container');

		this.obstacleArray = [];

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


		var counter=0;

		this.init = function() {
			generateMap(levelMap);

			that.guy = new Guy();
			that.guy.init();
			that.element.appendChild(that.guy.element);

			that.pokemon = new Pokemon();
			that.pokemon.init();
			that.element.appendChild(that.pokemon.element);

			this.interval = setInterval(gameLoop, 100);
		};

		var gameLoop = function() {
			//debugger;
			var guyX = that.guy.x;
			var guyY = that.guy.y;
			var pokemonX = that.pokemon.x;
			var pokemonY = that.pokemon.y;
			var guyCoordX = guyX/30;
			var guyCoordY = guyY/30;
			var pokemonCoordX = Math.floor(pokemonX/30);
			var pokemonCoordY = Math.floor(pokemonY/30);
			that.guy.updatePosition();

			var gridBackup = grid.clone();
			if(counter===0){
				path = finder.findPath(pokemonCoordX, pokemonCoordY, guyCoordX, guyCoordY, gridBackup);
				//console.log(path);
				counter=1;
			}
			
			//if pokemon has not reached new coordinate, continue moving it 5 pixels...
			//else if pokemon reached new coordinate, first check the path array, and move it.

			if(that.pokemon.checkPosition(pokemonX, pokemonY, path)) { // if not equal
				that.pokemon.updatePosition(path);
				console.log(path);
			}else{
				path = finder.findPath(pokemonCoordX, pokemonCoordY, guyCoordX, guyCoordY, gridBackup);
			}

			
			

			//call the chasing function
			//that.pokemon.chaseAsh(guyX, guyY, pokemonX, pokemonY);
			//update the pokemon position

			for(var i = 0; i < that.obstacleArray.length; i++) {
				if(collisionDetection(that.guy, that.obstacleArray[i])) {
					
					that.guy.x = guyX;
					that.guy.y = guyY;
					that.guy.velocityX = 0;
					that.guy.velocityY = 0;
					that.guy.updatePosition();
				}
				/*if(collisionDetection(that.pokemon, that.obstacleArray[i])) {
					
					that.pokemon.x = pokemonX;
					that.pokemon.y = pokemonY;
					that.pokemon.updatePosition(path);
				}*/
			}
			/*if(guyX === pokemonX && guyY === pokemonY) {
				console.log("You Lose.");
				clearInterval(that.interval);
			}
			console.log(path.length);*/

			/*if(that.pokemon.pathCounter >= path.length)
				clearInterval(that.interval);*/

		};

		var collisionDetection = function(obj1, obj2) {
			if ((obj1.x+30)>obj2.x && obj1.x<(obj2.x+30) && (obj1.y+30)>obj2.y && obj1.y<(obj2.y+30))  {
				return true;
			}else {
				return false;
			}
		};

		var generateMap = function(map) {
			//y-axis values
			for (var i = 0; i < map.length; i++) {
				//x-axis values
				for (var j = 0; j < map[i].length; j++) {
					if(map[i][j] != 0) {;
						var obstacle = new Obstacle();
						// implementing in an opposite way
						obstacle.init(map[i][j],j,i);
						that.obstacleArray.push(obstacle);
						that.element.appendChild(obstacle.element);
					}
				}
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
	    this.allowDiagonal = opt.allowDiagonal;
	    this.dontCrossCorners = opt.dontCrossCorners;
	};


	//Find and return the the path.
	BreadthFirstFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
		//debugger;
	    var openList = [],
	        diagonalMovement = this.diagonalMovement,
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