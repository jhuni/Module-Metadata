META({
	
	"id": "js-require-1.1.1-commonjs"
	
});

var require = function(id) {
	return META.cache[id];
};

return require;
