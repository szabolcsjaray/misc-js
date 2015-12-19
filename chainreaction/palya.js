function Palya(num, divEl) {
	this.num=num;
	this.divEl = divEl;
	this.stars = new Array();
	var inst = this;
	this.
	this.start = function() {
		this.adminTiming=setInterval(function() {inst.admin();},100);
	};
	this.create = function() {
		this.addStars();
		console.log("palya num:" + num);
		this.addEnergiaCsik(Palyak.Palyak[num].energy);
		this.start();
	};
}
Palya.prototype.addEnergiaCsik = function(maxEnergia) {
	this.energiaCsik = new EnergiaCsik(maxEnergia, this);
	this.energiaCsik.draw();
}
Palya.prototype.addStars = function() {
	var i;
	var j;
	console.log("num: " + this.num  + " " + Palyak.Palyak.length);
	for(i=0;i<Palyak.Palyak[this.num].stars.length;i++) {
	    var s = new Star( Palyak.Palyak[this.num].stars[i].x,
	                      Palyak.Palyak[this.num].stars[i].y,
	                      Star.StarTypes[Palyak.Palyak[this.num].stars[i].starType],
	                      this
	                    );
	    this.stars.push(s);
	}
	
	
	/*for(i=0;i<this.num;i++) {
		for(j=0;j<this.num;j++) {
			var x =   Math.floor(i*500/this.num)+100;
			var y = Math.floor(j*500/this.num)+100; //200; //Math.floor(Math.random()*500)+100;		
			var r = Math.floor(Math.random()*3)+1;	
		
			var s = new Star(x, y, Star.StarTypes[1], this);
		
			this.stars.push(s);
			//console.log("added star:" + s);
		}
	}*/
	//var s1 = new Star(200, 200, Star.StarTypes[1]);
	for (j=0; j<this.stars.length;j++ ) {
		this.stars[j].createExplosionCanvas(this.divEl, this);
	}
	//s1.createExplosionCanvas(this.divEl, this);
	for (j=0; j<this.stars.length;j++ ) {
		console.log("j:" + j + " ->" + (Math.floor(j*Star.Max/this.stars.length)));
		this.stars[j].create(this.divEl, this, Star.Max-1000); //Math.floor(j*Star.Max/this.stars.length));
	}
	//s1.create(this.divEl, this, 3000);
	//this.stars.push(s1);
};
Palya.prototype.admin = function() {
	var j;
	for (j=0; j<this.stars.length;j++ ) {
		this.stars[j].go();
	}
};
Palya.prototype.explosion = function(star) {
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
};



