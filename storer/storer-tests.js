QUnit.test( "save test", function( assert ) {
    var storer = new Storer();
    storer.save("itemname", "This is item");
    assert.ok( 1 == "1", "Passed!" );
});
QUnit.test( "load test", function( assert ) {
    var storer = new Storer();
    storer.save("itemname", "This is item");
    var loaded = storer.load("itemname");
    assert.equal( loaded, "Thsi is time" );
});

