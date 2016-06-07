var currentSound;

var chimes, high_hat_01, high_hat_02;
var soundOptions = [];

function preload(){
	chimes = loadSound('media/chimes.wav');
	chimes.playMode('sustain');
	chimes.name = 'chimes';
	soundOptions.push(chimes);

	high_hat_01 = loadSound('media/high_hat_01.wav');
	high_hat_01.playMode('sustain');
	high_hat_01.name = 'high_hat_01';
	soundOptions.push(high_hat_01);

	high_hat_02 = loadSound('media/high_hat_02.wav');
	high_hat_02.playMode('sustain');
	high_hat_02.name = 'high_hat_02';
	soundOptions.push(high_hat_02);
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	var curNum = Math.floor(Math.random()*soundOptions.length);
	currentSound = soundOptions[curNum];
	console.log(currentSound);
}

function draw(){
}
	
function mousePressed(){
	console.log('Playing local');
	currentSound.play();

	grabAndSend(currentSound);
}

//----------CLIENT-SIDE SOCKET CODE----------//
//Init socket object
var socket = io();

//Receive data from the server using .on()
socket.on('news', function (data) {
	console.log(data);


	//Play remote sound after a delay
	setTimeout(function(){
		playSound(data);
		console.log('Playing remote');
	}, 1000);

	//Play remote sound as soon as data is received
	//playSound(data);
	//console.log('Playing remote');
});

function playSound(data){
	var theSoundName = data.sound;
	if (theSoundName == 'chimes'){
		chimes.play();
	}
	else if (theSoundName == 'high_hat_01'){
		high_hat_01.play();
	}
	else if (theSoundName == 'high_hat_02'){
		high_hat_02.play();
	}
}

//Send data to the server using .emit()
function grabAndSend(currentSound){
	var data = {
		sound: currentSound.name
	};
	socket.emit('sound', data);
}

//----------WINDOW RESIZE-----------//
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}