function Storer() {
    this.store = new Array();
}
Storer.prototype.load = function(itemName) {
    return this.store[itemName];
};
Storer.prototype.save = function(itemName, item) {
    this.store[itemName] = item;
};

