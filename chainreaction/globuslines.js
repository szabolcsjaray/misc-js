function GlobusLines(divEl) {
    this.divEl = divEl;
    this.phases = new Array();
    this.canvases = new Array();
    this.ctxes = new Array();
    this.drawGlobusLinesPhases();
}
GlobusLines.prototype.drawGlobusLinesPhases = function() {
    var phaseNum = 0;
    var i;
    for(i=0;i<0.3;i+=0.020) {
        this.canvases[phaseNum] = Util.createCanvas(this.divEl, 0, 0, 500);
        this.ctxes[phaseNum] = this.canvases[phaseNum].getContext("2d");
        this.ctxes[phaseNum].lineWidth = 5;
        this.ctxes[phaseNum].strokeStyle="#000000"; //"#ffffff";
        Util.drawGlobus(this.ctxes[phaseNum], 250, 250, 250, i, 0.3);
        this.canvases[phaseNum].style.display = "none";
        phaseNum++;
        this.maxPhases = phaseNum;
	}
};
GlobusLines.prototype.getImage = function(index) {
    return this.canvases[index % this.maxPhases].toDataURL();
};

