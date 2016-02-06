Util = new Object();

Util.createCanvas = function(divEl, left, top, width) {
	var canvas = document.createElement('canvas');
	canvas.width=width;
	canvas.height=width;
	canvas.style.top = top+'px';
	canvas.style.left = left+'px';
	canvas.style.position = 'absolute';
	divEl.appendChild(canvas);
	return canvas;
};
Util.drawEllipse = function(ctx, x,y, xr, yr, start, end, step) {
    var i = start;
    var xp = x + xr*Math.cos(i);
    var yp = y + yr*Math.sin(i);
    ctx.beginPath();
    ctx.moveTo(xp,yp);
    var xw, yw;
    i+=step;
    while (i<end) {
         xw = xp;
         yw = yp;
         xp = x + xr*Math.cos(i);
         yp = y + yr*Math.sin(i);
         ctx.lineTo(xp, yp);
         i += step;
    }
    ctx.stroke();
};
Util.drawGlobus = function(ctx, x, y, r) {
    var xr;
    for (xr=0;xr<=Math.PI;xr+=0.2) {
        Util.drawEllipse(ctx, x, y, Math.cos(xr)*r, r, Math.PI/2.0, Math.PI*1.5+0.1, 0.1);
    }
};
