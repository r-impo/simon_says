var rojo = {
	name: "rojo",
	id: document.getElementById("rojo_img"),
	audio: new Audio("src/rojo.wav")
},
	azul = {
	name: "azul",
	id: document.getElementById("azul_img"),
	audio: new Audio("src/azul.wav")
},
	amarillo = {
	name: "amarillo",
	id: document.getElementById("amarillo_img"),
	audio: new Audio("src/amarillo.wav")
},
	verde = {
	name: "verde",
	id: document.getElementById("verde_img"),
	audio: new Audio("src/verde.wav")
};

var score_elem = document.getElementById("score_track"),
	contador = 1,
	arrayAI = [],
	arrayJug = [],
	turnSet = false;
	
function start(estado) { // empieza! Despliega puntaje 0 y pasa el turno a AI (true);
	turnSet = estado;
	oneMoreLoop(Math.floor(Math.random() * 4), contador);
}

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
			setTimeout(oneMoreLoop, 2000);	
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
				}, 300);
			break;
			
			case 1:
				azul.id.style.opacity = 0.8;
				azul.audio.play();
				arrayJug.push(value);
				setTimeout(function() {
					azul.id.style.opacity = 1;
				}, 300);
			break;
			
			case 2:
				amarillo.id.style.opacity = 0.8;
				amarillo.audio.play();
				arrayJug.push(value);
				setTimeout(function() {
					amarillo.id.style.opacity = 1;
				}, 300);
			break;
			
			case 3:
				verde.id.style.opacity = 0.8;
				verde.audio.play();
				arrayJug.push(value);
				setTimeout(function() {
					verde.id.style.opacity = 1;
				}, 300);			
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

function oneMoreLoop() {
	turnSet = false;
	arrayAI.push(Math.floor(Math.random() * 4));
	var notas = 0;
	function playArray(notas) {
		switch(arrayAI[notas]) {
			case 0:
				rojo.id.style.opacity = 0.8;
				setTimeout(function() {
					rojo.audio.play();
					rojo.id.style.opacity = 1;
				}, 300);
				notas++
			return setTimeout(playArray(notas), 1700);

			case 1:
				azul.id.style.opacity = 0.8;
				setTimeout(function() {
					azul.audio.play();
					azul.id.style.opacity = 1;
				}, 300);
				notas++
			return setTimeout(playArray(notas), 1700);

			case 2:
				amarillo.id.style.opacity = 0.8;
				setTimeout(function() {
					amarillo.audio.play();
					amarillo.id.style.opacity = 1;
				}, 300);
				notas++
			return setTimeout(playArray(notas), 1700);

			case 3:
				verde.id.style.opacity = 0.8;
				setTimeout(function() {
					verde.audio.play();
					verde.id.style.opacity = 1;
				}, 300);
				notas++
			return setTimeout(playArray(notas), 1700);

			default:
				turnSet = true;
				return console.log("No hay mas array! Se cumplio el loop AI nro " + contador);
			break;
		}
	}
	playArray(notas)
};
