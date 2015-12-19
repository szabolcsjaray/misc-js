function Point(x, y, canvas) {
	this.x = x;
	this.y = y;
	this.canvas = canvas;
}

Point.prototype.draw = new function() {
	this.canvas.fillStyle="#000000";
	this.canvas.beginPath();
	this.canvas.arc(this.x, this.y, this.30, 0, 2 * Math.PI, false);
	this.canvas.fill();
}
