var CSIKVASTAGSAG = 50;
var CSIKHOSSZ = 500;
function EnergiaCsik(maximum, palya) {
	this.maximum=maximum;
	this.palya = palya;
	this.energia = maximum;
	this.divEl = palya.divEl;
	this.csikCanvas = Util.createCanvas(this.divEl, 100, 600, CSIKHOSSZ+10);
	this.cont = this.csikCanvas.getContext("2d");

  }
  EnergiaCsik.prototype.draw = function() {
  	this.cont.fillStyle="#FFA000";
	this.cont.fillRect(0,0,this.calculateLength()+10,/*this.csikCanvas.height*/CSIKVASTAGSAG); 
  	this.cont.fillStyle="#FF0000";
	this.cont.fillRect(5,5,this.calculateLength(),/*this.csikCanvas.height*/CSIKVASTAGSAG-10); 
  }
  EnergiaCsik.prototype.decrease = function(decVal) {
  	var x2 = this.calculateLength();
  	this.energia -= decVal;
  	var x1 = this.calculateLength();
	this.cont.clearRect(5+x1,5,x2-x1, CSIKVASTAGSAG-10);
  }
  EnergiaCsik.prototype.calculateLength = function() {
	return Math.floor(CSIKHOSSZ*this.energia/this.maximum);
  }
