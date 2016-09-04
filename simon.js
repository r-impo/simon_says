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

var	score_elem = document.getElementById("score_track"),
	contador = 0;
var	arrayAI = [];
var	arrayJug = [];
var	arrayKeys = ["0","1","2","3"],
	turnSet = false;

function start(estado) { // empieza! Despliega puntaje 0 y pasa el turno a AI (true);
	turnSet = estado;
	oneMoreLoop(Math.floor(Math.random() * 4), contador);
}

function reset() {
	contador = 0;
	turnSet = false;
	score_elem.innerHTML = "Score: " + contador;
}

function listen4Player(cuenta) {
	turnSet = true;
	var timer = 10000 + (300 * cuenta);
	setTimeout(function() {
		if (arrayAI == arrayJug) {
			score_elem.innerHTML = "Score: " + cuenta;
			oneMoreLoop(Math.floor(Math.random() * 4), cuenta)
		}
		else {
			console.log("PERDISTE!!");
		}
	}, timer);
}

function oneMoreLoop(random, cuenta) {
	turnSet = false;
	random.toString();
	arrayAI.push(random);
	console.log("Array AI: " + arrayAI);
	for (i = 0; i < arrayAI.length; i++) {
		setTimeout(function() {
			console.log(arrayAI + " array AI");
			playSound(arrayAI);
		}, 600);
	}
	cuenta++
	listen4Player(cuenta);
}

function playSound(nota) {
	console.log("NOTA " + typeof nota);
	switch(nota) {
		case "0":
			rojo.audio.play();
			rojo.id.style.opacity = 0.8;
			setTimeout(function() {
				rojo.id.style.opacity = 1;
			}, 600);
			if (contador % 2 != 0) {
				arrayJug.push(0);
			}
		break;

		case "1":
			azul.audio.play();
			azul.id.style.opacity = 0.8;
			setTimeout(function() {
				azul.id.style.opacity = 1;
			}, 600)
			if (contador % 2 != 0) {
				arrayJug.push(1);
			}
		break;

		case "2":
			amarillo.audio.play();
			amarillo.id.style.opacity = 0.8;
			setTimeout(function() {
				amarillo.id.style.opacity = 1;
			}, 600)
			if (contador % 2 != 0) {
				arrayJug.push(2);
			}
		break;

		case "3":
			verde.audio.play();
			verde.id.style.opacity = 0.8;
			setTimeout(function() {
				verde.id.style.opacity = 1;
			}, 600)
			if (contador % 2 != 0) {
				arrayJug.push(3);
			}
		break;

		default:
			console.log("ERROR!")
			break;
	}
}	