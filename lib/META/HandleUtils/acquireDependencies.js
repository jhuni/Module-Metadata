META({

	"id": "js-META.HandleUtils.acquireDependencies-1.0-jsan+jhuni",
	
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

// parse the package id, to get its
// namespace, its isLoaded, and its file location
var parsePackageIdentifier = function(id) {
	
	var ns = id.indexOf("-") === -1 ? id : id.split("-")[1];
	var fileLocation = "./lib/" + ns.replace(/\./g, "/") + ".js";
	
	var isLoaded = (typeof evaluatePackageName(ns) !== "undefined");
	if (typeof META.cache[id] !== "undefined") {
		isLoaded = true;
	}
	
	return {
		id: id,
		namespace: ns,
		fileLocation: fileLocation,
		isLoaded: isLoaded
	};
	
};

// This function will take a list of package identifiers
// and execute a callback on an associative array of their values.
// Uses recursion because it is non-blocking
var acquireDependencies = function(deps, i, loaded, callback) {
	
	if (i === deps.length) {
		callback(loaded);
		return;
	}
	
	var dep = parsePackageIdentifier(deps[i]);
	
	if (dep.isLoaded) {
		loaded[dep.id] = '';
		acquireDependencies(deps, i+1, loaded, callback);
	} else {
	
		META.getJS(dep.fileLocation, function(js) {
			loaded[dep.id] = js;
			acquireDependencies(deps, i+1, loaded, callback);
		});
	
	}
	
};


// This just uses acquireDependencies
return function(deps, callback) {
	
	acquireDependencies(deps, 0, {}, callback);
	
};



