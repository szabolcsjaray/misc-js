var kigyoCols = {"1": "#AF0FFF","2":  "#FF00FF","3": "#0000FF","4": "#FF0010","0": "#1FF11F"};
function Palya(num, divEl) {
	this.num=num;
	this.divEl = divEl;
	this.kigyok = new Array();
	var inst = this;
	this.start = function() {
		console.log("start");
		this.adminTiming=setInterval(function() {inst.admin();},70);
	};
	this.mkeydown = function(e) {
		if (!e) e= event;
		if (e.keyCode==66) {
			inst.kigyok[0].turningLeft=true;
		}
		if (e.keyCode==78) {
			inst.kigyok[0].turningRight=true;
		}
	};
	this.mkeyup = function(e) {
		if (!e) e= event;
		if (e.keyCode==66) {
			inst.kigyok[0].turningLeft = false;
		}
		if (e.keyCode==78) {
			inst.kigyok[0].turningRight=false;
		}
	};
	this.create = function() {
		this.canvas = createCanvas(divEl, 0,0, 700, 700);
		this.hcanvas = createCanvas(divEl, 0,0, 700, 700);
		this.context = this.canvas.getContext("2d");
		this.hcontext = this.hcanvas.getContext("2d");
		this.addKigyo();
		this.keret();
		window.addEventListener( 'keydown', this.mkeydown, true);
		window.addEventListener( 'keyup', this.mkeyup, true);
		//divEl.addEventListener( 'keydown', instkeydown, true);
/*		divEl.onkeydown = this.keydown;
		divEl.onkeyup = this.keyup;*/
		this.start();
	};
}
Palya.prototype.keret = function() {
	this.context.strokeStyle = "#FFFF00";
	this.context.lineWidth = 7;
	this.context.rect(0, 0, 700, 700);
	this.context.stroke();
	this.context.lineWidth = 0;
};
Palya.prototype.addKigyo = function() {
	var i;
	var j;
	var k = 0;
	console.log("num: " + this.num);
	for(i=0;i<this.num;i++) {
		for(j=0;j<this.num;j++) {
			var x =   Math.floor(i*500/this.num)+100;
			var y = Math.floor(j*500/this.num)+100; //200; //Math.floor(Math.random()*500)+100;		
			//var r = Math.floor(Math.random()*3)+1;	
		
			var s = new Kigyo(x, y, 0, this, kigyoCols[k]);
			k++;
		
			this.kigyok.push(s);
			//console.log("added star:" + s);
		}
	}
};
Palya.prototype.admin = function() {
	var j;
	for (j=0; j<this.kigyok.length;j++ ) {
		this.kigyok[j].go();
	}
};

Palya.prototype.restart = function() {
	this.restarting = true;
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	var j;
	for (j=0; j<this.kigyok.length;j++ ) {
		var x = Math.floor(j*500/this.num)+100;
		var y = Math.floor(j*500/this.num)+100; 
		this.kigyok[j].x = x;
		this.kigyok[j].y = y;
		this.kigyok[j].turningLeft = false;
		this.kigyok[j].turningRight = false;
	}
	this.keret();
	this.restarting = false;
};
/*Palya.prototype.explosion = function(star) {
	var j;
	for (j=0; j<this.stars.length;j++ ) {
		if ((this.stars[j]!=star) && 
				(this.stars[j].state==IDLE)) {
				//console.log("stars.length: "+this.stars.length+" check j:" + j);
			if (this.stars[j].inExplosion(star.x,star.y,star.eRadius)) {
				//console.log(" j:" + j);
				this.stars[j].exposed();
			}
		}
	}
};*/



function createCanvas(divEl, left, top, width) {
	var canvas = document.createElement('canvas');
	canvas.width=width;
	canvas.height=width;
	canvas.style.top = top+'px';
	canvas.style.left = left+'px';
	canvas.style.position = 'absolute';
	divEl.appendChild(canvas);
	return canvas;
}

