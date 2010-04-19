(function() {

//Package: Utils.add
var deps1 = (function(CJS_TOP) {

	return function() {
		return ( Array.prototype.reduce.call(arguments, function(a, b) {
			return a + b;
		}) );
	};

})({});

//Package: Utils.inc
var requestedModule = (function(CJS_TOP) {
	
	var X = CJS_TOP;
	var add = X.add;
	
	return function(val) {
		return add(val, 1);
	};
	
})({
	add: deps1
});


// Now lets register the requested modules
// Using some register handler:

if (typeof CJS === "undefined") {
	CJS = {};
}

if (typeof CJS.loaded === "undefined") {
	CJS.loaded = {};
}

CJS.loaded["js-Utils.add-1.0-jsan+jhuni"] = deps1;
CJS.loaded["js-Utils.inc-1.0-jsan+jhuni"] = requestedModule;


})();
