function Bullet(x,y)
{
	this.father = Sprite;
	this.father("bullet","./images/thrust_blue.png",128,128,x+32,y-32,64,64);
	this.speed = 35;
	this.idx = 0;
	this.picnum = 24;
	this.action = Bullet_action;
	bullets.addElement(this);
}

function Bullet_action()
{
	this.y -= this.speed;
	if(this.y <= -128)
		return false;
	
	for(var i=0;i<enemies.getSize();i++)
	{
		if(enemies.getElementAt(i).hit == -1 && this.collision(enemies.getElementAt(i)))
		{
			soundPlay("./sounds/Explosion3.wav");
			enemies.getElementAt(i).hit = 0;
			score++;
			return false;
		}
	}
	
	this.idx++;
	if(this.idx >= this.picnum)
		this.idx = 0;
	this.show(this.idx,0);
	return true;
}

function Airplane()
{
	this.father = Sprite;
	this.father("player","./images/player.png",128,128,0,0,128,128);
	this.x = gameWidth/2 - 64;
	this.y = gameHeight - 200;
	this.base = 33;
	this.hit = -1;
	this.speed = 10;
	this.idx = 0;
	this.dir = 0;
	this.up = 0;
	this.action = Airplane_action;
	this.stopPower = new Sprite("power1","images/bolt_blue.png",32,64,0,0,32,64);
	this.backPower = new Sprite("power1","images/bolt_blue.png",32,64,0,0,32,32);
	this.plusPower = new Sprite("power2","images/bolt_red.png",32,64,0,0,32,64);
	this.dead = new Sprite("spikey_dead","./images/gun_blast.png",64,64,0,0,128,128);
}

function Airplane_action()
{
	if(this.hit == -1)
	{
		for(var i = 0 ; i < enemies.getSize(); i++)
		{
			if(enemies.getElementAt(i).hit == -1 && this.collision(enemies.getElementAt(i)))
			{	
				soundPlay("./sounds/Explosion3.wav");
				this.hit = 0;
				enemies.getElementAt(i).hit = 0;
			}
		}
		this.x += this.dir * this.speed;
		this.y += this.up * this.speed;
		if(this.x < - 25)
			this.x = - 25;
		if(this.x > gameWidth - 103)
			this.x = gameWidth - 103;
		if(this.y < -8)
			this.y = -8;
		if(this.y > gameHeight - 120)
			this.y = gameHeight - 120;	
			
		this.idx++;
		if(this.idx >= 16)
			this.idx = 0;
		this.show(this.base+this.idx>=64?0:this.base+this.idx,0);
		if(this.up == -1)
		{
			this.plusPower.x = this.x + 48;
			this.plusPower.y = this.y + 115;
			this.plusPower.show(this.idx,0);
		}
		if(this.up == 0)
		{
			this.stopPower.x = this.x + 48;
			this.stopPower.y = this.y + 115;
			this.stopPower.show(this.idx,0);
		}
		if(this.up == 1)
		{
			this.backPower.x = this.x + 48;
			this.backPower.y = this.y + 115;
			this.backPower.show(this.idx,0);
		}
	}
	else
	{
		this.dead.move(this.x,this.y);
		this.dead.show(this.hit,0);
		this.hit++;
		if(this.hit >= 12)
		{
			life--;
			if(life > 0)
			{
				player = new Airplane();
			}
			else
				player = null;
		}
	}
	return true;
}

function Spikey()
{
	this.father = Sprite;
	this.father("spikey","./images/spikey.png",128,128,0,0,128,128);
	this.speed = 5;
	this.hit = -1;
	this.idx = 0;
	this.y = -128;
	this.x = Math.floor(Math.random()*(gameWidth-128));
	this.dx = Math.floor(Math.random()*2);
	if(this.dx == 0)
		this.dx = -1;
	this.action = Spikey_action;
	this.dead = new Sprite("spikey_dead","./images/gun_blast.png",64,64,0,0,128,128);
}

function Spikey_action()
{
	if(this.hit == -1)
	{
		this.x += this.speed * this.dx;
		if(this.x < 0)
		{
			this.x = 0;
			this.dx = 1;
		}
		if(this.x > gameWidth - 128)
		{
			this.x = gameWidth - 128;
			this.dx = -1;
		}
		this.y += this.speed;
		if(this.y > gameHeight)
			return false;
		
		this.idx++;
		if(this.idx >= 16)
			this.idx = 0;
		this.show(this.idx,0);
	}
	else
	{
		this.dead.move(this.x,this.y);
		this.dead.show(this.hit,0);
		this.hit++;
		if(this.hit >= 12)
			return false;
	}
	return true;
}

var life = 3;
var score = 0;
var stage = 1;
var big = 0;
var background1 = new Sprite("background","./images/Background1.png",1024,1024,0,0,gameWidth,gameHeight);
var background2 = new Sprite("background","./images/Background2.png",1024,1024,0,0,gameWidth,gameHeight);
var background3 = new Sprite("background","./images/Background3.png",1024,1024,0,0,gameWidth,gameHeight);
var background4 = new Sprite("background","./images/Background4.png",1024,1024,0,0,gameWidth,gameHeight);
var player = new Airplane();
var bullets = new Vector(100);
var enemies = new Vector(100);

function showStatus()
{
	var str = "生命:"+life+"    關卡:"+stage+"    分數:"+score;
	drawText(str,20,30,20,"rgb(255,255,255)");
}

function nextFrame()
{
	if(big > 0)
		big++;
	if(big >= 100)
		if(player)
			player.base = 49;
	clearScreen();
	stage = parseInt(score/10)+1;
	
	//background.setPic("./images/Background"+(stage%4+1)+".png");
	
	switch(stage%4+1)
	{
		case 1:
			background1.show(0,0);
			break;
		case 2:
			background2.show(0,0);
			break;
		case 3:
			background3.show(0,0);
			break;
		case 4:
			background4.show(0,0);
			break;
	}
	
	if(player)
		player.action();
	if(Math.random()*100 > (100-stage))
		enemies.addElement(new Spikey());
		
	for(var i = 0;i < bullets.getSize();i++)
		if(!bullets.getElementAt(i).action())
			bullets.removeElementAt(i);
	
	for(var i = 0;i < enemies.getSize();i++)
		if(!enemies.getElementAt(i).action())
			enemies.removeElementAt(i);
			
	showStatus();
}

function keyPress(keyCode)
{
}

function keyDown(keyCode)
{
	if(player)
	{
		if(keyCode == 37)
		{
			player.dir = -1;
			player.base = 1;
		}
		else if(keyCode == 38)
		{
			player.up = -1;
			//player.base = 49;
		}
		else if(keyCode == 39)
		{
			player.dir = 1;
			player.base = 17;
		}
		else if(keyCode == 40)
		{
			player.up = 1;
		}
		if(keyCode == 32)
		{
			big++;
		}
	}
}

function keyUp(keyCode)
{
	if(player)
	{
		if(keyCode == 37 || keyCode == 39)
		{
			player.base = 33;
			player.dir = 0;
		}
		else if(keyCode == 38 || keyCode == 40)
		{
			//player.base = 33;
			player.up = 0;
		}
		else if(keyCode == 32)
		{
			//bullets.addElement(new Bullet(player.x,player.y));
			soundPlay("./sounds/LazerFire1.wav");
			if(big >= 100)
			{
				big = 0;
				player.base = 33;
				for(var i = -48;i < gameWidth-48;i += 32)
					new Bullet(i,player.y);		
			}
			else
			{
				big = 0;
				new Bullet(player.x,player.y);
			}
		}
	}
}

function onAcceleration(x,y,z)
{
	if(player)
	{
		if(x > 2)
		{
			player.dir = -1;
			player.base = 1;
		}
		else if(y < -2)
		{
			player.up = -1;
			//player.base = 49;
		}
		else if(x < -2)
		{
			player.dir = 1;
			player.base = 17;
		}
		else if(y > 2)
		{
			player.up = 1;
		}
	}
}

function onTouchUp(x,y)
{
	soundPlay("./sounds/LazerFire1.wav");
	if(big >= 100)
	{
		big = 0;
		player.base = 33;
		for(var i = -48;i < gameWidth-48;i += 32)
			new Bullet(i,player.y);		
	}
	else
	{
		big = 0;
		new Bullet(player.x,player.y);
	}
}

function onTouchDown(x,y)
{
	big++;
}

initGame();
musicPlay("./musics/MattOglseby-3.ogg");
startGame(20);
