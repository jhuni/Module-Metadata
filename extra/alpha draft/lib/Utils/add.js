META({
	
	// The full package name:
	// language-moduleName-version-authority
	"id": "js-Utils.add-1.0-jsan+jhuni",
	
	"dependencies": {
		
		"Array.prototype.reduce": {
			"version": "1.8",
			"authority": "ecma"
		}
		
	}
	
});

return function() {
	
	return( Array.prototype.reduce.call(arguments, function(a, b) {
		return a + b;
	}) );
	
};

