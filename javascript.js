let playerTurn = 1;
let element, symbol, loaded;
let reload = false;
let checkSum = 0;
let playAlone;
let realPlayer;
let difficulty;
let virtualPlayer;

document.addEventListener('keypress', (event) => {
	if (parseInt(event.key) > 0 && parseInt(event.key) < 10) {
		playCell(event.key);
	}
}, false);

function playCell(val) {
	element = document.getElementById(val).innerHTML;
	if ((element == " ")) {
		if (playerTurn == 1) {
			document.getElementById(val).innerHTML = "X";
			playerTurn = 2;
		} else {
			document.getElementById(val).innerHTML = "O";
			playerTurn = 1;
		}
	}
	if(playAlone == false){showPlayer();}
	checkWins();
	computerTurn();	
}

function showPlayer() {
	if (playerTurn == 1) {
		document.getElementById('show-player').innerHTML = 'Joueur 1';
		document.getElementById('show-player').style.color = 'red';
	} else {
		document.getElementById('show-player').innerHTML = 'Joueur 2';
		document.getElementById('show-player').style.color = 'cyan';
	}
}

function checkWins() {
	for (var j = 1; j < 3; j++) {
		checkLineWins(j);
		checkRowWins(j);
		checkDiagonalWins(j);
	}
	checkNull();
	reloading(reload);
}

function checkLineWins(playerCheck) {
	if (playerCheck == 1) {symbol = 'X';} else {symbol = 'O';}
	for (var i = 1; i < 8; i = i+3) {
		if (document.getElementById(i.toString()).innerHTML == symbol && document.getElementById((i+1).toString()).innerHTML == symbol && document.getElementById((i+2).toString()).innerHTML == symbol) {reload = confirm(`Player ${playerCheck} wins !\nDo you want to play again?`);}
	}
}

function checkRowWins(playerCheck) {
	if (playerCheck == 1) {symbol = 'X';} else {symbol = 'O';}
	for (var i = 1; i < 4; i++) {
		if (document.getElementById(i.toString()).innerHTML == symbol && document.getElementById((i+3).toString()).innerHTML == symbol && document.getElementById((i+6).toString()).innerHTML == symbol) {
			reload = confirm(`Player ${playerCheck} wins !\nDo you want to play again?`);
			}
	}
}

function checkDiagonalWins(playerCheck) {
	if (playerCheck == 1) {symbol = 'X';} else {symbol = 'O';}
	if ((document.getElementById('1').innerHTML == symbol && document.getElementById('5').innerHTML == symbol && document.getElementById('9').innerHTML == symbol) || (document.getElementById('3').innerHTML == symbol && document.getElementById('5').innerHTML == symbol && document.getElementById('7').innerHTML == symbol)) {reload = confirm(`Player ${playerCheck} wins !\nDo you want to play again?`);}
}

function checkNull() {
	checkSum = 0;
	for(var i = 1; i < 10; i++){
		if (((document.getElementById(i.toString()).innerHTML == 'X') || (document.getElementById(i.toString()).innerHTML == 'O')) && !reload) {checkSum++;}
	}
	if (checkSum == 9) {reload = confirm(`No one won !\nDo you want to play again?`);}
}

function reloading(reload) {
	if (reload) {
		playAlone = false;
		reload = false;
		location.reload();
	}
}

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}