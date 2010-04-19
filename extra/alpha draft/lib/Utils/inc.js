META({
	
	// The full package name:
	// language-moduleName-version-authority
	"id": "js-Utils.inc-1.0-jsan+jhuni",
	
	"dependencies": {
		
		"add": "js-Utils.add-1.0-jsan+jhuni"
		
	}
	
});

var X = CJS_TOP,
	add = X.add;

return function(val) {
	return add(val, 1);
};

