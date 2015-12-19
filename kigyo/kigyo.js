function Kigyo(x,y,dir,palya, col) {
	this.x = x;
	this.y = y;
	this.xh = this.x;
	this.yh = this.y;
	this.dir = dir;
	this.palya = palya;
	this.size = 2.5;
	this.col = col;
	this.speed = 1.5;
	this.turningLeft = false;
	this.turningRight = false;
}
Kigyo.prototype.go = function () {
	if (this.palya.restarting)
		return;
		
	if (this.turningLeft) {
		this.turnleft();
	} else if (this.turningRight) {
		this.turnright();
	}

	this.xh += (Math.cos(this.dir)*this.speed);
	this.yh += (Math.sin(this.dir)*this.speed);
	//console.log("x:" + this.xh);
	
	if ((Math.floor(this.yh)!=this.y) || Math.floor(this.xh)!=this.x) {
		this.palya.context.fillStyle = this.col;
		this.palya.context.beginPath();
		this.palya.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
		this.palya.context.fill();
		
		/*this.palya.context.fillStyle = "#FF0000";
		this.palya.context.fillRect(Math.floor(this.xh + (Math.cos(this.dir)*(this.size+0.8))), Math.floor(this.yh + (Math.sin(this.dir)*(this.size+0.8))), 2, 2);*/
		
		var c = this.palya.context.getImageData(Math.floor(this.xh + (Math.cos(this.dir)*(this.size+0.8))), Math.floor(this.yh + (Math.sin(this.dir)*(this.size+0.8))), 1, 1).data;
		if (c[0]!=0) {
			console.log(" utkozes:" + c[0] + "," + c[1]+ "," + c[2]);
			alert("utk.");
			//this.palya.restart();
			//return;
		}
		
		this.palya.hcontext.clearRect(this.x-this.size, this.y-this.size, this.size*2,this.size*2);
		/*this.palya.hcontext.fillStyle = 'rgba(0, 0, 0, 0)';
		this.palya.hcontext.beginPath();
		this.palya.hcontext.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
		this.palya.hcontext.fill();*/
		
		this.x = Math.floor(this.xh);
		this.y = Math.floor(this.yh);
		this.palya.hcontext.fillStyle = "#FFFFFF";
		this.palya.hcontext.beginPath();
		this.palya.hcontext.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
		this.palya.hcontext.closePath();
		this.palya.hcontext.fill();
		
	}
};
Kigyo.prototype.turnleft = function () {
	this.dir -= 0.1;
	if (this.dir<0) {
		this.dir += Math.PI*2;
	}
};
Kigyo.prototype.turnright = function () {
	this.dir += 0.1;
	if (this.dir>Math.PI*2) {
		this.dir -= Math.PI*2;
	}
};

function setPixel() {
var px = $pxls[$i++ % 10000];
var d = $px.data;
d[0] = px.r;
d[1] = px.g;
d[2] = px.b;
d[3] = px.a;
$ctx.putImageData($px, px.x, px.y)
}
