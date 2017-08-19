let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    
    // set new answer and reset number of attempts
    if (answer.value == "" || attempt.value == "")
    	setHiddenFields();
    
    // returns false if given input is invalid
    if (!validateInput(input.value)) {
    	return false;
    }
    else {
    	attempt += 1;
    }
    
    // updates message based on win/lose condition
    if (getResults(input)) {
    	setMessage("You Win! :)");
    	showAnswer(true);
    	showReplay();
    }
    else if (attempt >= 10) {
    	setMessage("You Lose! :(");
    	showAnswer(false);
    	showReplay();
    }
    else
    	setMessage("Incorrect, try again.");
}

function setHiddenFields() {
	var num = Math.floor(Math.random() * 10000).toString();
	num = "0000".substring(0, 4 - num.length) + num;
	answer.value = num;
	
	attempt.value = 0;
}

function setMessage(msg) {
	document.getElementById('message').innerHTML = msg;
}

function validateInput(input) {
	if (input.length == 4)
		return true;
	else {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

function getResults(input) {
	var newResult = document.createElement('div');
	newResult.className = "row";
	
	var span = document.createElement('span');
	span.className = "col-md-6";
	span.innerHTML = input.value;
	newResult.appendChild(span);
	
	var answers = document.createElement('div');
	answers.className = "col-md-6";
	
	// keeps track on how much input is correct
	var correct = 0;
	
	// shows how accurate each number is
	for (i = 0; i < 4; i++) {
		var res = document.createElement('span');
		
		if (input.value.charAt(i) === answer.value.charAt(i)) {
			res.className = "glyphicon glyphicon-ok";
			correct++;
		}
		else if (answer.value.indexOf(input.value.charAt(i)) >= 0) {
			res.className = "glyphicon glyphicon-transfer";
		}
		else {
			res.className = "glyphicon glyphicon-remove";
		}
		answers.appendChild(res);
	}
	
	newResult.appendChild(answers);
	
	console.log(newResult);
	document.getElementById('results').appendChild(newResult);
	
	if (correct == 4)
		return true;
	
	return false;
}

function showAnswer(correct) {
	var code = document.getElementById('code');
	code.innerHTML = answer.value;
	
	if (correct)
		code.className += " success";
	else
		code.className += " failure";
}

function showReplay() {
	document.getElementById('guessing-div').style.display = "none";
	document.getElementById('replay-div').style.display = "block";
}