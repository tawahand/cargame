 /*TO GET ALL DIVS*/

const score = document.querySelector('.score');
const startscreen = document.querySelector('.startscreen');
const gameArea = document.querySelector('.gameArea');

/*GAME START DIV KE ANIMATION CAR RUNNING KE LIA*/

startscreen.addEventListener('click', start);

let player = {speed: 5, score: 0} ;



let keys = { ArrowUp : false, ArrowDown : false, ArrowLeft : false, ArrowRight : false}

/*TO KNOW WHICH KEY PRESS*/

document.addEventListener('keydown' , keyDown);
document.addEventListener('keyup' , keyUp);
function keyDown(e){
	e.preventDefault();

	keys[e.key] = true;
	/*console.log(e.key);*/
	/*console.log(keys);*/
}
function keyUp(e){
	e.preventDefault();
	keys[e.key] = false;
	/*console.log(e.key);*/
	/*console.log(keys);*/
}

/*TO STOP CARS WHEN TOUCH*/

function isCollide(a,b){
	aRect = a.getBoundingClientRect();
	bRect = b.getBoundingClientRect();
	return ! ((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) ||
	 (aRect.left > bRect.right))
}

/* lines moving function*/

function moveLines(){
	let lines = document.querySelectorAll('.lines');
	lines.forEach(function(item) {

		/*to repaete lines movin start*/
		if(item.y >= 700){
			item.y -= 750;
		}


		/*to repaete lines movin end*/
		item.y += player.speed;
		item.style.top = item.y + "px";

	})
}

function endGame(){
	player.start = false; // game end on collide
	startscreen.classList.remove('hide');
	startscreen.innerHTML = "Game Over <br> Your Final Score Is " + player.score + "<br> Press Here To Start The Game.";

}	




/*FOR MOVING CARS*/

function moveEnemy(car){
	let enemy = document.querySelectorAll('.enemy');
	enemy.forEach(function(item) {

		if(isCollide(car,item)){

		/*	console.log("BOOM HIT");*/
			endGame();
		}

		/*to repaete lines movin start*/
		if(item.y >= 650){
			item.y = -300;
				item.style.left = Math.floor(Math.random() *300 ) + "px";
		}


		/*to repaete lines movin end*/
		item.y += player.speed;
		item.style.top = item.y + "px";

	})
}




/*front wale event jo ke start he us ke lia*/

function gamePlay(){
	/*console.log("hay i am clicked");*/

	let car = document.querySelector('.car');

	/*TO KNOW ROAD INFORMATION*/
	let road = gameArea.getBoundingClientRect();
	/*console.log(road);*/

	if (player.start){

		/* LINES KO MOVE KARNE KA FUNCTION*/
		moveLines();
		moveEnemy(car);

		/* condition to go up and down car*/
		if(keys.ArrowUp && player.y > (road.top + 70)) {player.y -= player.speed}

		if(keys.ArrowDown && player.y < (road.bottom - 70)) {player.y += player.speed}

		if(keys.ArrowLeft && player.x > 0) {player.x -= player.speed}

		if(keys.ArrowRight && player.x < (road.width - 50)) {player.x += player.speed}

		car.style.top = player.y + "px";
		car.style.left = player.x + "px";
		window.requestAnimationFrame(gamePlay);
		/*console.log(player.score++);*/
		player.score++;
		let ps = player.score -1;
		score.innerText = "Score :"+ps;


	}
	
}

function start(){
	/*gameArea.classList.remove('hide');*/
	startscreen.classList.add('hide');
	gameArea.innerHTML = " ";
	player.start = true;
	player.score = 0; //for score
	window.requestAnimationFrame(gamePlay);

	/*TO GENRATE LINES BETWEEN THE ROAD*/
	for(x=0; x<5; x++){

	let roadLine = document.createElement('div');
	roadLine.setAttribute('class','lines');

	roadLine.y = (x*150);

	roadLine.style.top = /*(x*150)*/roadLine.y + "px";
	gameArea.appendChild(roadLine);

	}

	



	/*to SHOW CARS ANIMATED BASIC METHOD */
	let car = document.createElement('div');
	car.setAttribute('class','car');
	/*car.innerText = "hay i am  ur car";*/
	gameArea.appendChild(car);

	/*to controle car position*/

	player.x = car.offsetLeft;
	player.y = car.offsetTop;
/*
	console.log("top position"+car.offsetTop);
	console.log("left position"+car.offsetLeft);*/


	/*TO GET MOVING CARS ON ROAD*/


	for(x=0; x<3; x++){

	let enemyCar = document.createElement('div');
	enemyCar.setAttribute('class','enemy');

	enemyCar.y = ((x+1) *300) * -1;

	enemyCar.style.top = /*(x*150)*/enemyCar.y + "px";
	enemyCar.style.backgroundColor = randomColor(); //to give color cars
	/*TO MOVE CARS RANDOM CORD LINE START*/
	enemyCar.style.left = Math.floor(Math.random() *300 ) + "px";



	/*TO MOVE CARS RANDOM CORD LINE END*/
	gameArea.appendChild(enemyCar);

	}	

	
}

function randomColor(){
	function c(){
		let hex = Math.floor(Math.random() * 256).toString(16);
		return("0" + String(hex)).substr(-2);
	}
	return "#" +c()+c()+c();
}