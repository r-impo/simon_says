var rojo = {
	name: "rojo",
	id: document.getElementById("rojo_img"),
	audio: new Howl({
			src: ["src/rojo.wav"]
		})
},
	azul = {
	name: "azul",
	id: document.getElementById("azul_img"),
	audio: new Howl({
			src: ["src/azul.wav"]
		})
},
	amarillo = {
	name: "amarillo",
	id: document.getElementById("amarillo_img"),
	audio: new Howl({
			src: ["src/amarillo.wav"]
		})
},
	verde = {
	name: "verde",
	id: document.getElementById("verde_img"),
	audio: new Howl({
			src: ["src/verde.wav"]
		})
};

var score_elem = document.getElementById("score_track"),
	contador = 1,
	arrayAI = [],
	arrayJug = [],
	arrayMain = [rojo, azul, amarillo, verde],
	turnSet = false;
	
function ai() { // empieza! Despliega puntaje 0 y pasa el turno a AI
	turnSet = false;
	arrayAI.push(Math.floor(Math.random() * 4));
	console.log("arrayAI tiene " + arrayAI.length + " elementos");
	var notas = 0;
	var run = setInterval(playAI, 1200);
	function playAI() {
		if (notas == contador) {
			clearInterval(run)
		}
        arrayAI[notas].audio.play();
		notas++
	}
	turnSet = true;
};

function reset() {
	contador = 0;
	turnSet = false;
	arrayAI = [];
	arrayJug = [];
	score_elem.innerHTML = "Score: " + contador;
	contador++
}

function timerForPlayer() {
	for (i = 0; i < arrayAI.length; i++) {
		if (arrayJug[i] === arrayAI[i] && arrayJug.length == arrayAI.length) {
			score_elem.innerHTML = "Score: " + contador;
			arrayJug = [];
			setTimeout(ai, 1000);	
		}
		else if (arrayJug[i] != undefined && arrayJug[i] != arrayAI[i]) {
			console.log("PERDISTE AMEO!!")
			reset();
		}
	}
}

function playerInput(value) {
	if (turnSet == true) {
		switch(value) {
			case 0:
				rojo.id.style.opacity = 0.8;
				rojo.audio.play();
				arrayJug.push(value);
				setTimeout(function() {
					rojo.id.style.opacity = 1;
				}, 400);
			break;
			
			case 1:
				azul.id.style.opacity = 0.8;
				azul.audio.play();
				arrayJug.push(value);
				setTimeout(function() {
					azul.id.style.opacity = 1;
				}, 400);
			break;
			
			case 2:
				amarillo.id.style.opacity = 0.8;
				amarillo.audio.play();
				arrayJug.push(value);
				setTimeout(function() {
					amarillo.id.style.opacity = 1;
				}, 400);
			break;
			
			case 3:
				verde.id.style.opacity = 0.8;
				verde.audio.play();
				arrayJug.push(value);
				setTimeout(function() {
					verde.id.style.opacity = 1;
				}, 400);			
			break;
			
			default:
				console.log("ERROR! Del lado del jugador.")	
			break;	
		}
	}
	else {
		console.log("no es tu turno nabo");
	}
	timerForPlayer();
}
