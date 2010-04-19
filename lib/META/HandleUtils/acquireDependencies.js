META({
	
	"handler": "funcwrap"
	
});

// This tries to get the value of packageName
// packageName is something like 'JooseX.Namespace.Dependend'
var evaluatePackageName = function (packageName) {
	
	var packageValue = self;
	var keys = packageName.split('.');
	var i = 0;
	var l = keys.length;

	while (i < l && typeof packageValue !== "undefined") {

		packageValue = packageValue[keys[i++]];

	}

	return packageValue;
	
	
};

// This function will take a list of package identifiers
// and execute a callback on an associative array of their values.
// Uses recursion because it is non-blocking
return function(deps, callback, loaded, i) {
	
	var acquireDependencies = arguments.callee;
	
	loaded = loaded || {};
	i = i || 0;
	
	if (i === deps.length) {
		callback(loaded);
		return;
	}
	
	var dep = deps[i];
	var ns = dep;
	
	if (dep.indexOf("-") !== -1) {
		ns = dep.split("-")[1];
	}
	
	var data = evaluatePackageName(ns);
	
	if (data) {
		loaded[dep] = '';
		acquireDependencies(deps, callback, loaded, i+1);
	} else {
	
		META.getJS("./lib/" + ns.replace(/\./g, "/") + ".js", function(js) {
			loaded[dep] = js;
			acquireDependencies(deps, callback, loaded, i+1);
		});
	
	}
	
};



