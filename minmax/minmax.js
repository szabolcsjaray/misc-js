var table = new Array();
var i;
for(i=0;i<66;i++) {
	table[i] = 0;
}
table[11] = 1;
table[66] = 1;
table[61] = 2;
table[16] = 2;

var steps = new Array();
var stepNum = 0;


/*
function minimax(node, depth, maximizingPlayer) {
    if (depth==0 || terminalState()) {
        return heuristicValue();
    }    
    if (maximizingPlayer) {
        var bestValue=-100000;
        var val;
        for each child of node {
            val = minimax(child, depth-1, false);
            bestValue= Math.max(bestValue, val);
        }
        return bestValue;
    } else {
        var bestValue=100000;
        var val;
        for each child of node {
            val=minimax(child, depth-1, true);
            bestValue=Math.min(bestValue, val);
        return bestValue;
    }
}*/

/* Initial call for maximizing player 
minimax(origin, depth, TRUE);*/
