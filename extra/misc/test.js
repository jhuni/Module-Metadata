META({

	"return": "rval",

	"id": "js-Utils.inc-1.0-jsan+jhuni",
	
	"deps": {
		"add": "js-Utils.add-1.082-jsan+jhuni"
	}

});

var X = CJS_TOP;

rval = function(val) {
	return X.add(val, 1);
};