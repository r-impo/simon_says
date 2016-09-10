var rojo = {
	IMG: document.getElementById("rojo_img"),
	sonido: new Howl({
			src: ["src/rojo.wav"]
		})
};

var azul = {
	IMG: document.getElementById("azul_img"),
	sonido: new Howl({
			src: ["src/azul.wav"]
		})
};

var amarillo = {
	IMG: document.getElementById("amarillo_img"),
	sonido: new Howl({
			src: ["src/amarillo.wav"]
		})
};

var verde = {
	IMG: document.getElementById("verde_img"),
	sonido: new Howl({
			src: ["src/verde.wav"]
		})
};

var score_elem = document.getElementById("score_track"),
	contador = 0,
	blockBtn = true,
	go = false,
	arrayJug = [],
	arrayAI = [];

function newGame() {
	if (go === true) {
		document.getElementById("btn_go").addEventListener("click", function(event){
			event.preventDefault();
		});
	}
	else {
		go = true;
		paseDeTurno(true);
	}
	// agregar alguna animacion de que empezo un nuevo juego?
}

function restartGame() {
	arrayJug.length = 0;
	arrayAI.length = 0;
	blockBtn = true;
	go = false;
	contador = 0;
	score_elem.innerHTML = "Score: 0";
	//agregar alguna animacion de que hizo reset?
}

/*Recibe el input del jugador y lo transforma en un nuevo elemento en el arrayJug. Antes de
agregar un nuevo elemento llama a checkPlayerArray*/
function listenForPlayer(input) {
	if (blockBtn === false) { // la funcion no hace nada si no se habilitan los botones.
		checkPlayerArray();
		if (input != null) {
			switch(input) {
				case 0:
					arrayJug.push(rojo);
					panelClick(5, rojo);
					rojo.sonido.play();
					break;
				case 1:
					arrayJug.push(azul);
					panelClick(5, azul);
					azul.sonido.play();
					break;
				case 2:
					arrayJug.push(amarillo);
					panelClick(5, amarillo);
					amarillo.sonido.play();
					break;
				case 3:
					arrayJug.push(verde);
					panelClick(5, verde);
					verde.sonido.play();
					break;
				default:
					console.log("no input!");
					break;			
			}
		}
		checkPlayerArray();
	}
	else {
		console.log("botones deshabilitados");
	}
}
/*Revisa la validez del arrayJug vs arrayAI.
if: no hay elemento en conflicto y el length es el mismo = CORRECTO, llama a paseDeTurno; puntaje + 100;
elseif: no hay elemento en conflicto y el length es menor a arrayAI = FALTAN SONIDOS QUE COPIAR, sigue esperando;
else: PERDISTE! Llama function animacionGmOver()*/
function checkPlayerArray() {
	if (arrayJug.length == arrayAI.length && compareArrays(arrayJug, arrayAI) === true) {
		contador = contador + 100;
		score_elem.innerHTML = "Score: " + contador;
		console.log("Turno AI")
		setTimeout(function(){
			paseDeTurno(true);
		}, 500);
	}
	else if (arrayJug.length != arrayAI.length && compareArrays(arrayJug, arrayAI) === true) {
		return;
	}
	else {
		animacionGmOver()
	}	

}
/*compara el jugador vs computadora sonido por sonido.*/
function compareArrays(jugador, computadora) {
	for (var elem in jugador) {
		if (jugador[elem] !== computadora[elem]) {
			return false;
		}
	}
	return true;
}
/*Le pasa el turno al ente correspondiente. Tambien INICIA el juego.*/
function paseDeTurno(gameState) {
	if (gameState === true) {
		arrayJug.length = 0;  // borra el array del jugador para la proxima ronda
		var addSonido = [rojo, azul, amarillo, verde];
		var random = Math.floor(Math.random() * 4);
		turnoAI(addSonido[random]);
	}
	else {
		setTimeout(function() {
			console.log("Turno Jugador");
			blockBtn = false;
		}, arrayAI.length * 1210);
		listenForPlayer();
	}
}
/*abstraccion del turno de la computadora*/
function turnoAI(nuevoSonido) {
	arrayAI.push(nuevoSonido); // nuevo sonido al array
	playback(arrayAI); // reproduce el array total
	paseDeTurno(false); // devuelve turno al jugador
}
/*reproduce el array de sonidos que se le pase y llama a panelClick para animar los 
botones. El time adjust hay que reemplazarlo por una funcion que con el tiempo reduzca la espera
entre sonido y sonido, subiendo la dificultad de juego. function gameSpeed(array.length)?	*/
function playback(array) {    // 
	var timeAdjust = 1;      
	for (const elemento of array) {
		setTimeout(function(){
			elemento.sonido.play();
			panelClick(timeAdjust, elemento);
		}, timeAdjust * 1250);
		timeAdjust++;
	}
	return;
}
/*Controla la animacion de los paneles de colores*/
function panelClick(adjustTime, imagenClick) { 
	imagenClick.IMG.style.opacity = 0.7;
	setTimeout(function(){
		imagenClick.IMG.style.opacity = 1;
	}, adjustTime * 50);
	return;
}
// se termina la funcion newGame y abreanimacionGmOver, que anima el html+css y muestra el puntaje obtenido
function animacionGmOver() {
	console.log("Perdiste AMEEEEO!!");
}