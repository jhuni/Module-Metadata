META({
 
    "id": "js-Utils.add-1.0-jsan+jhuni",
 
    "builtins": [
    	"Array.prototype.reduce"
    ]
 
});
 
// Package
return function() {
 
    return( Array.prototype.reduce.call(arguments, function(a, b) {
        return a + b;
    }) );
 
};
