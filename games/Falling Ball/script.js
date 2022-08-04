const character = document.getElementById('character');
const game = document.getElementById('gameBox');
const scoreBoxNumber = document.getElementById('score-box-number');
const difficultyBoxNumber = document.getElementById('difficulty-box-number');
const bgFade = document.getElementById('bg-fade');
const gameOverPopup = document.getElementById('game-over-popup');
const gameOverScore = document.getElementById('game-over-score');
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];
var gameStarted = false;
var gameRunning = false;
var characterLeftOnPause = 0;
var gameSpeed = 0.55;
var bottomTouch = 0;
var difficulty = 1;
var score = 0;



function moveLeft(){
	var characterLeft = parseFloat(getComputedStyle(character).left);
	var characterTop = parseFloat(getComputedStyle(character).top);
	if (characterLeft>0){
		character.style.left = characterLeft - gameSpeed*4 + "px";
	}
}
function moveRight(){
	var characterLeft = parseFloat(getComputedStyle(character).left);
	var characterTop = parseFloat(getComputedStyle(character).top);
	if (characterLeft<380){
		character.style.left = characterLeft + gameSpeed*4 + "px";
	}
}

function keyCheck(event){
	if (both == 0){
		if (event.key == "ArrowLeft"||event.keyCode == "65"){ // (event.keyCode == "37") would also work same
			both++;
			// setInterval() is used instead of just calling moveLeft() once because it makes response faster and smoother
			interval = setInterval(moveLeft, 5)
		}
		if (event.keyCode == "39"||event.key == "d"){ // (event.key == "ArrowRight") would also work same
			both++;
			interval = setInterval(moveRight, 5)
		}
	}
}
document.addEventListener("keydown", keyCheck);

// Clearing interval upon keyup because once key is down the ball doesn't stop moving
document.body.addEventListener("keyup", function(event){
	clearInterval(interval);
	both = 0;
})

function startGame(){
	character.style.left = characterLeftOnPause + "px";

	// Main game running only if not started already
	if (!gameStarted){
		gameStarted = true;
		gameRunning = setInterval(function(){
			if (counter>0){
				var blockLast = document.getElementById("block"+(counter-1));  //this can also be kept outside of the if statement because getElementById() doesn't throw an error if the element is not found, while the blockLastTop needs to be kept inside the if statement because getComputedStyle() throws an error if the element is not found.
				var holeLast = document.getElementById("hole"+(counter-1));  //this can also be kept outside of the if statement because getElementById() doesn't throw an error if the element is not found, while the holeLastTop needs to be kept inside the if statement because getComputedStyle() throws an error if the element is not found.
				var blockLastTop = parseInt(getComputedStyle(blockLast).top);
				var holeLastTop = parseInt(getComputedStyle(holeLast).top);
			}
			// Creating platforms/blocks and holes in them
			if (counter==0||blockLastTop<400) {
				var block = document.createElement("div");
				var hole = document.createElement("div");
				block.setAttribute("class", "block");
				hole.setAttribute("class", "hole");
				block.setAttribute("id", "block" + counter);
				hole.setAttribute("id", "hole" + counter);
				block.style.top = blockLastTop + 100 + "px";
				hole.style.top = holeLastTop + 100 + "px";
				var random = Math.floor(Math.random() * 361);
				hole.style.left = random + "px";
				game.appendChild(block);
				game.appendChild(hole);
				currentBlocks.push(counter);
				counter++;
				score = counter-8;
				if (score>0) {
					scoreBoxNumber.innerHTML = score;
				}
			}
			var characterLeft = parseFloat(window.getComputedStyle(character).left);
			var characterTop = parseFloat(window.getComputedStyle(character).top);
			var drop = true;
			if (characterTop<=0) {
				clearInterval(gameRunning);
				// MAKING A DIV ELEMENT POP OUT OF NOWHERE AND PRESENT SCORE IN IT
				document.removeEventListener("keydown", keyCheck);
				document.removeEventListener("keydown", startPauseGame);
				gameOverScore.innerHTML = score;
				gameOverPopup.style.fontSize = "larger";
				gameOverPopup.style.opacity = "1";
				gameOverPopup.style.height = "auto";
				gameOverPopup.style.width = "340px";
				gameOverPopup.style.minWidth = "340px";
				gameOverPopup.style.padding = "25px 30px 30px";
				gameOverPopup.style.border = "10px solid var(--block-and-border-color)";
				gameOverPopup.style.boxShadow = "0 0 10px 5px var(--block-and-border-color)";
				bgFade.style.height = "100%";
				bgFade.style.opacity = "1";
			}
			// Moving all the platforms/blocks and holes up by some pixel with the help of a for loop looping over all the current present platforms/blocks and holes and moving them all up a step one by one which will keep repeating with the help of the setInterval function this whole thing is enclosed in
			for (var i = 0; i <= currentBlocks.length; i++) {
				var iBlockCounter = currentBlocks[i];
				var iMovingBlock = document.getElementById("block"+iBlockCounter);
				var iMovingHole = document.getElementById("hole"+iBlockCounter);
				var iMovingBlockTop = parseFloat(window.getComputedStyle(iMovingBlock).top);
				var iMovingHoleLeft = parseFloat(window.getComputedStyle(iMovingHole).left);
				iMovingBlock.style.top = iMovingBlockTop - gameSpeed + "px";
				iMovingHole.style.top = iMovingBlockTop - gameSpeed + "px";
				if (iMovingBlockTop<-20) {
					iMovingBlock.remove();
					iMovingHole.remove();
					currentBlocks.shift();
					if (score>0) {}
					if (difficulty<5) { // max difficulty will be 5 because condition will still run at difficulty 4 and make difficulty 5 when below conditions get fulfilled
						if (characterTop>459.5) {
							bottomTouch++;
							// alert("bottomTouch++ and new value is " + bottomTouch);
						}
						if (((bottomTouch>=3 && (score)%15)>=difficulty && (score)>=(difficulty*20)) || (score)>=(difficulty*35)) {
							gameSpeed *= 1.2;
							bottomTouch = 0;
							difficulty++;
							if (difficulty==2) {
								difficultyBoxNumber.innerHTML = "Medium";
							}else if (difficulty==3) {
								difficultyBoxNumber.innerHTML = "Hard";
							}else if (difficulty==4) {
								difficultyBoxNumber.innerHTML = "Extreme";
							}else if (difficulty==5) {
								difficultyBoxNumber.innerHTML = "GODLY";
							}
							// alert("speed increased at score " + (score) + " and now difficulty is " + difficulty);
						}
					}
						
				}
				if (iMovingBlockTop<characterTop+20 && characterTop<iMovingBlockTop) {
					drop = false;
					if (iMovingHoleLeft<=characterLeft && characterLeft<=iMovingHoleLeft+20) {
						drop = true;
					}
				}
			    if(drop){
			        if(characterTop < 480){
			            character.style.top = characterTop + gameSpeed*4 + "px";
			        }
			    }else{
			        character.style.top = characterTop - gameSpeed + "px";
			    }
			}
		}, 2);

	}
}

function pauseGame(){
	characterLeftOnPause = parseFloat(getComputedStyle(character).left);
	gameStarted = false;
	clearInterval(gameRunning);
}

function startPauseGame(event){
	if (event.key == " "){  // Or event.keyCode == "32"
		if (!gameStarted){
			startGame();
		}else{
			pauseGame();
		}
	}
}
document.addEventListener("keydown", startPauseGame);