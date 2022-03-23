window.onload = function(){
	playAlone = confirm('Do you want to play alone?');
	if (playAlone) {
		do{
			realPlayer = prompt('Which player do you want to be ? (1 or 2)');

		}while(realPlayer != 1 && realPlayer != 2);
		if (realPlayer == 1) {virtualPlayer = 2;} else {virtualPlayer = 1;}
		do{
			difficulty = prompt('What do you want the difficulty to be ?\n1 for dumb, 2 for normal, 3 for unbeatable');
		}while(difficulty != 1 && difficulty != 2 && difficulty != 3);
		document.getElementById('show-player').innerHTML = `Joueur ${realPlayer} (Jeu solo)`;
		document.getElementById('show-player').style.color = "white";
		computerTurn();
	}
}

function computerTurn() {
	let choice;
	if (playAlone && realPlayer != playerTurn) {
		if (difficulty == 1) {
			do{
				choice = Math.floor(Math.random()*9) + 1;	
			}while(document.getElementById(choice.toString()).innerHTML != ' ');
		} else if(difficulty == 2){
			choice = checkOpportunities(virtualPlayer);
			if (!choice) {
				choice = checkOpportunities(realPlayer);
				if (!choice) {
					do{
						choice = Math.floor(Math.random()*9) + 1;	
					}while(document.getElementById(choice.toString()).innerHTML != ' ');
				}
			}
		} else{
			choice = checkOpportunities(virtualPlayer);
			if (!choice) {
				choice = checkOpportunities(realPlayer);
				if (!choice) {
					choice = testStrategies(realPlayer);
					if (!choice) {
						do{
							choice = Math.floor(Math.random()*9) + 1;	
						}while(document.getElementById(choice.toString()).innerHTML != ' ');
					}
				}
			}
		}
		playCell(choice.toString());
	}
}

function checkOpportunities(player) {
	let choice = checkLineOpportunities(player);
	if (!choice) {
		choice = checkRowOpportunities(player);
		if (!choice) {
			choice = checkDiagonalOpportunities(player);
		}
	}
	return choice;
}

function checkLineOpportunities(player) {
	let symbol;
	let choice = false;
	if (player == 1) {
		symbol = 'X';
	} else {
		symbol = 'O';
	}
	for (var i = 1; i < 8; i = i+3) {
		if (document.getElementById(i.toString()).innerHTML == symbol && document.getElementById((i+1).toString()).innerHTML == symbol && document.getElementById((i+2).toString()).innerHTML == ' ') {
			choice = i+2;
			break;
		} else if(document.getElementById(i.toString()).innerHTML == symbol && document.getElementById((i+2).toString()).innerHTML == symbol && document.getElementById((i+1).toString()).innerHTML == ' '){
			choice = i+1;
			break;
		} else if(document.getElementById((i+1).toString()).innerHTML == symbol && document.getElementById((i+2).toString()).innerHTML == symbol && document.getElementById((i).toString()).innerHTML == ' '){
			choice = i;
			break;
		}
	}
	return choice;
}

function checkRowOpportunities(player) {
	let symbol;
	let choice = false;
	if (player == 1) {
		symbol = 'X';
	} else {
		symbol = 'O';
	}
	for (var i = 1; i < 4; i++) {
		if (document.getElementById(i.toString()).innerHTML == symbol && document.getElementById((i+3).toString()).innerHTML == symbol && document.getElementById((i+6).toString()).innerHTML == ' ') {
			choice = i+6;
			break;
		} else if(document.getElementById(i.toString()).innerHTML == symbol && document.getElementById((i+6).toString()).innerHTML == symbol && document.getElementById((i+3).toString()).innerHTML == ' '){
			choice = i+3;
			break;
		} else if(document.getElementById((i+3).toString()).innerHTML == symbol && document.getElementById((i+6).toString()).innerHTML == symbol && document.getElementById((i).toString()).innerHTML == ' '){
			choice = i;
			break;
		}
	}
	return choice;
}

function checkDiagonalOpportunities(player) {
	let symbol;
	let choice = false;
	if (player == 1) {
		symbol = 'X';
	} else {
		symbol = 'O';
	}
	if (((document.getElementById('3').innerHTML == symbol && document.getElementById('7').innerHTML == symbol) || (document.getElementById('1').innerHTML == symbol && document.getElementById('9').innerHTML == symbol)) && document.getElementById('5').innerHTML == ' ') {
		choice = 5;
	} else if(document.getElementById('1').innerHTML == symbol && document.getElementById('5').innerHTML == symbol && document.getElementById('9').innerHTML == ' '){
		choice = 9;
	} else if(document.getElementById('5').innerHTML == symbol && document.getElementById('9').innerHTML == symbol && document.getElementById('1').innerHTML == ' '){
		choice = 1;
	} else if(document.getElementById('3').innerHTML == symbol && document.getElementById('5').innerHTML == symbol && document.getElementById('7').innerHTML == ' '){
		choice = 7;
	} else if(document.getElementById('7').innerHTML == symbol && document.getElementById('5').innerHTML == symbol && document.getElementById('3').innerHTML == ' '){
		choice = 3;
	}
	return choice;
}

function testStrategies(player) {
	let choice = test49Strategie(player);
	if (!choice) {
		choice = testDiagonalStrategie(player);
	}
	return choice;
}

function test49Strategie(player) {
	let symbol;
	let choice = false;
	if (player == 1) {
		symbol = 'X';
	} else {
		symbol = 'O';
	}
	if (document.getElementById('4').innerHTML == symbol && document.getElementById('9').innerHTML == symbol && document.getElementById('7').innerHTML == ' ') {
		choice = 7;
	} else if(document.getElementById('8').innerHTML == symbol && document.getElementById('3').innerHTML == symbol && document.getElementById('9').innerHTML == ' '){
		choice = 9;
	} else if(document.getElementById('6').innerHTML == symbol && document.getElementById('1').innerHTML == symbol && document.getElementById('3').innerHTML == ' '){
		choice = 3;
	} else if(document.getElementById('2').innerHTML == symbol && document.getElementById('7').innerHTML == symbol && document.getElementById('1').innerHTML == ' '){
		choice = 1;
	}
	return choice;
}

function testDiagonalStrategie(player) {
	let symbol;
	let choice = false;
	if (player == 1) {
		symbol = 'X';
	} else {
		symbol = 'O';
	}
	if (document.getElementById('1').innerHTML == symbol || document.getElementById('3').innerHTML == symbol || document.getElementById('7').innerHTML == symbol || document.getElementById('9').innerHTML == symbol) {
		for (var i = 1; i < 4; i = i+2) {
			for (var j = 0; j < 7; j = j+6) {
				if (document.getElementById((i+j).toString()).innerHTML == ' ') {
					choice = i+j;
					break;
				}
			}
		}
	}
	return choice;
}