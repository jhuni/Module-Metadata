META({
	
	"id": "js-Utils.add-1.0-jsan+jhuni",

	"builtins": [
		"Array.prototype.reduce", 
		"Array.prototype.indexOf"
	],

	"use": {
		"add": "js-Utils.add-1.0-jsan+jhuni"	
	}
	
});

return function() {
	return Array.prototype.reduce.call(arguments, function(a, b) {
		return a + b;
	});
};
