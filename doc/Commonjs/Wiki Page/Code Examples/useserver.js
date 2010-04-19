(function() {

//Package: Utils.add
var deps1 = (function() {

    return function() {

        return( Array.prototype.reduce.call(arguments, function(a, b) {
            return a + b;
        }) );

    };

})();

//Package: Utils.inc
var deps2 = (function(add) {

    var exports = {};

    exports.increment = function(val) {
     return add(val, 1);
    };

    return exports;

})(deps1);

//Package: Utils.program
var requestedModule = (function(inc) {
	
    var a = 1;
    inc(a); // 2
	
})(deps2);


// Now lets register the requested modules
// Using some register handler:

if (typeof Utils === 'undefined') {
    Utils = {};    
}

Utils.add     = deps1;
Utils.inc     = deps2;
Utils.program = requestedModule;


})();
