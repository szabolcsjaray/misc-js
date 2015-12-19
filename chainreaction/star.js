var IDLE=0;
var CHARGE=1;
var EXPLOSION=2;
var EXPLOSION_2=3;
var DEAD=4;

function Star(x, y,tipus, palya) {
	this.x = x;
	this.y = y;
	this.coveringStars = new Array();
	// states 0 - idle, 1 - charge, 2 - explosion, 3 - dead
	this.state = IDLE;
	this.charge = 1500;
	this.tipus = tipus;
	this.palya = palya;
	this.width = this.height = this.tipus.starRadius*2;
}

Star.StarTypes = { "1":{col:"kek", starRadius:30, explRadius:80}, 
		   "2":{col:"kek", starRadius:50, explRadius:100}, 
		   "3":{col:"kek", starRadius:55, explRadius:120},
		   "4":{col:"kek", starRadius:60, explRadius:130},};
Star.Max = 3000;
Star.DeadColor = "#000000";

Star.prototype.drawStar = function () {
	this.cont.fillStyle=getCol(this.tipus.col, this.charge);
	this.cont.beginPath();
	this.cont.arc(this.tipus.starRadius, this.tipus.starRadius, this.tipus.starRadius, 0, 2 * Math.PI, false);
	this.cont.fill();
};
Star.prototype.drawExplosion = function () {
	this.conExpl.fillStyle="#FFFFFF"; //getCol(this.tipus.col, this.charge);
	this.conExpl.beginPath();
	this.conExpl.arc(this.tipus.explRadius, this.tipus.explRadius, this.eRadius, 0, 2 * Math.PI, false);
	this.conExpl.fill();
};
Star.prototype.create = function (divEl, palya, charge) {
	//this.createExplosionCanvas(divEl, palya);
	this.charge = charge;
	this.starCanvas = createCanvas(divEl, this.x-this.tipus.starRadius, this.y-this.tipus.starRadius, this.width);
	this.starCanvas.star = this;
//	this.starCanvas.onmousedown = this.mousedown;
	//this.starCanvas.onmouseup = function(evemt) {alert("up");};
	this.cont = this.starCanvas.getContext("2d");
	this.drawStar();
	
	this.centerD = document.createElement("canvas");
	this.centerD.style.width=Math.floor(this.width/2)+'px';
	this.centerD.style.height=Math.floor(this.height/2)+'px'; //alert(this.height);
	this.centerD.style.left = this.x-Math.floor(this.width/4)+'px';
	this.centerD.style.top = this.y-Math.floor(this.height/4)+'px';
	this.centerD.style.position = 'absolute';
	//this.centerD.style.backgroundColor = '#00FF00';
	this.centerD.onmouseover = this.mouseover;
	this.centerD.onmouseout = this.mouseout;
	this.centerD.onmousedown = this.mousedown;
	this.centerD.onmouseup = this.mouseup;
	this.centerD.star = this;
        divEl.appendChild(this.centerD);
        
	this.palya = palya;
};
Star.prototype.covering = function (otherStar) {
	if ((otherStar.x>=this.x-this.tipus.starRadius-otherStar.tipus.starRadius) && (otherStar.x<this.x+this.tipus.starRadius+otherStar.tipus.starRadius) &&
	 (otherStar.y>=this.y-this.tipus.starRadius-otherStar.tipus.starRadius) && (otherStar.y<this.y+this.tipus.starRadius+otherStar.tipus.starRadius)) {
	 	return true;
	 }
	 return false;
};
Star.prototype.mousedown = function(event) {
	event.preventDefault();
	if (this.star.state==IDLE) {
		 this.star.state=CHARGE;
	}
};
Star.prototype.mouseup = function(event) {
	if (this.star.state==CHARGE) this.star.state=IDLE;
	// event.preventDefault();
	//alert(" down "+this.star.coveringStars.length+". X:" + event.layerX + ". X2:" + event.clientX);
};
Star.prototype.mouseover = function(event) {
	if (this.star.state==CHARGE) this.star.state=IDLE;
	this.star.cont.fillStyle="#000000";
	this.star.cont.lineWisth = 2;
	this.star.cont.beginPath();
	this.star.cont.arc(this.star.tipus.starRadius, this.star.tipus.starRadius, this.star.tipus.starRadius-1, 0, 2 * Math.PI, false);
	this.star.cont.stroke();
};
Star.prototype.mouseout = function(event) {
	this.star.drawStar();
	if (this.star.state==CHARGE) this.star.state=IDLE;
};
Star.prototype.createExplosionCanvas = function(divEl, palya) {
	this.explosionCanvas = createCanvas(divEl, this.x-this.tipus.explRadius, this.y-this.tipus.explRadius, this.tipus.explRadius*2);
	this.explosionCanvas.className = "explosion";
	this.conExpl = this.explosionCanvas.getContext("2d");
	/*this.conExpl.fillStyle   = '#CC5422'; 
	this.conExpl.fillRect(0,   0, this.explosionCanvas.width, this.explosionCanvas.height); */
};

		   
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
Star.prototype.starExplChange = function() {
	this.charge += this.chargeD;
	if (this.charge>Star.Max) {
		this.charge = Star.Max;
		this.chargeD = -1*this.chargeD;
	} else if (this.charge<0) {
		this.charge = 0;
		this.chargeD = -1*this.chargeD;
	}
	this.drawStar();
	this.palya.explosion(this);
};
Star.prototype.doCharge = function() {
		this.charge +=100;
		if (this.charge>Star.Max) {
			this.state=EXPLOSION;
			this.charge = Star.Max;
			this.chargeD = -400;
			this.eRadius = this.tipus.starRadius;
		}
		this.drawStar();
};
Star.prototype.inExplosion =function(x,y,r) {
	//console.log("táv:" + ((this.x-x)*(this.x-x) + (this.y-y)*(this.y-y)) + ", sugarak:" + ((r+this.tipus.starRadius)*(r+this.tipus.starRadius)));
	if (((this.x-x)*(this.x-x) + (this.y-y)*(this.y-y)) < ((r+this.tipus.starRadius)*(r+this.tipus.starRadius))) {
		return true;
	}
	return false;
};
Star.prototype.go = function() {
	if (this.state==CHARGE) {
	    if (this.palya.energiaCsik.energia>=10) {
			this.doCharge();
			this.palya.energiaCsik.decrease(10);
			this.drawStar();
		} else {
			this.state=IDLE;
		}
	} else if (this.state==EXPLOSION) {
		this.eRadius+=2;
		this.starExplChange();
		if (this.eRadius>this.tipus.explRadius) {
			this.state = EXPLOSION_2;
			this.eRadius=this.tipus.explRadius;
		}
		this.drawExplosion();
	} else if (this.state==EXPLOSION_2) {
		this.eRadius-=2;
		this.starExplChange();
		if (this.eRadius<this.tipus.starRadius) {
			this.state = DEAD;
			this.eRadius=this.tipus.starRadius;
			this.conExpl.clearRect(0,0,this.tipus.explRadius*2, this.tipus.explRadius*2);
			this.charge = -1;
			this.drawStar();
			this.palya.
			return;
		}
		this.conExpl.clearRect(0,0,this.tipus.explRadius*2, this.tipus.explRadius*2);
		this.drawExplosion();
	}
};

Star.prototype.exposed = function() {
	this.doCharge();
};

function getCol(colS, charge) {
	if (charge<0) return Star.DeadColor;
	var colSchema = Colors.Schemas[colS];
	if (charge>=Star.Max) return colSchema.c[colSchema.cnum-1];
	var ind = Math.floor(charge/Star.Max*(colSchema.cnum-1));
	var col1 = colSchema.c[ind];
	var r1 = parseInt("0x"+col1.substr(1,2));
	var g1 = parseInt("0x"+col1.substr(3,2));	
	var b1 = parseInt("0x"+col1.substr(5,2));
	var col2 = colSchema.c[ind+1];
	var r2 = parseInt("0x"+col2.substr(1,2));
	var g2 = parseInt("0x"+col2.substr(3,2));	
	var b2 = parseInt("0x"+col2.substr(5,2));
	var q = (charge-ind*(Star.Max/(colSchema.cnum-1))) / (Star.Max/(colSchema.cnum-1));
	
	var rq = Math.floor(r1*(1-q) + r2*q)+256;
	var bq = Math.floor(b1*(1-q) + b2*q)+256;
	var gq = Math.floor(g1*(1-q) + g2*q)+256;
	
	var col = "#" + rq.toString(16).substr(1,2) + gq.toString(16).substr(1,2) + bq.toString(16).substr(1,2);
	
	//alert(charge+" col:"+col);
	
	return col;
}











