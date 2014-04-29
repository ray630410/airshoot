var gameWidth = window.innerWidth - 22;
var gameHeight = window.innerHeight - 22;
var audioMusic = document.createElement("audio");
var audioSound = document.createElement("audio");
var ctx;
var delay = 200;

function onkeydown(e)
{
	//e = e || window.event;
	keyDown(e.keyCode); 
}

function onkeyup(e)
{
	//e = e || window.event;
	keyUp(e.keyCode); 
}

function onkeypress(e)
{
	//e = e || window.event;
	keyPress(e.keyCode); 
}

document.onkeydown = onkeydown;
document.onkeyup = onkeyup;
document.onkeypress = onkeypress;

function clearScreen()
{
	ctx.clearRect(0,0,gameWidth,gameHeight);
}

function initGame()
{
	var gameArea = document.getElementById("gameArea");
	var gameCanvas = document.getElementById("gameCanvas");
	gameArea.style.height = gameHeight;
	gameArea.style.width = gameWidth;
	gameCanvas.height = gameHeight;
	gameCanvas.width = gameWidth;
	ctx = gameCanvas.getContext("2d");
	/*
	document.addEventListener("deviceready",onDeviceReady,false);
	document.addEventListener("touchstart",touchDown,false);
	document.addEventListener("touchend",touchUp,false);
	*/
}

function touchDown(event)
{
	var x = event.touches[0].pageX;
	var y = event.touches[0].pageY;
	onTouchDown(x,y);
}

function touchUp(event)
{
	var x = event.touches[0].pageX;
	var y = event.touches[0].pageY;
	onTouchUp(x,y);
}

function onDeviceReady()
{
	navigator.accelerometer.getCurrentAcceleration(onSucces,onError);
}

function onSucces(acceleration)
{
	onAcceleration(acceleration.x,acceleration.y,acceleration.z);
	setTimeout("onDeviceReady()",300);
}

function onError()
{
	setTimeout("onDeviceReady()",300);
}

function gameLoop()
{
	nextFrame();
	setTimeout(gameLoop,delay);
}

function startGame()
{
	if(arguments.length == 1)
		delay = arguments[0];
	gameLoop();
}

function Sprite(name,pic,w,h,x,y,sw,sh)
{
	this.name = name;
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	this.sw = sw;
	this.sh = sh;
	this.speed = 1;
	
	this.show = Sprite_show;
	this.move = Sprite_move;
	this.shift = Sprite_shift;
	this.setPic = Sprite_setPic;
	this.collision = Sprite_collision;
	
	this.pic = new Image();
	this.pic.src = pic;
}

function Sprite_show(idx,idy)
{
	ctx.drawImage(this.pic,idx*this.w,idy*this.h,this.w,this.h,this.x,this.y,this.sw,this.sh);
}

function Sprite_move(x,y)
{
	this.x = x;
	this.y = y;
}

function Sprite_shift(dx,dy)
{
	this.move(this.x+dx*this.speed,this.y+dy*this.speed);
}

function Sprite_setPic(newPic)
{
	this.pic.src = newPic;
}

function Sprite_collision(obj)
{
	var rate = 0.5;
	if(this.x+(this.sw*rate) > obj.x && this.x < obj.x+(obj.sw*rate) && this.y+(this.sh*rate) > obj.y && this.y < obj.y+(obj.sh*rate))
		return true;
	else	
		return false;
}

function drawText(str,x,y,px,color)
{
	ctx.fillStyle = color;
	ctx.font = 'italic bold '+px+'px sans-serif';
	ctx.textBaseline = 'bottom';
	ctx.fillText(str,x,y);
}

function musicPlay(music)
{
	audioMusic.src = music;
	audioMusic.play();
}

function soundPlay(music)
{
	audioSound.src = music;
	audioSound.play();
}
