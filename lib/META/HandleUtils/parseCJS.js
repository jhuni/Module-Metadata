META({
	
	"id": "js-META.HandleUtils.parseCJS-1.0-jsan+jhuni"
	
});


/*
* Copyright (c) 2010 James Brantly
* http://github.com/jbrantly/yabble/raw/master/lib/yabbler.js 
*/
var getRequires = function(moduleCode) {
	// need to account for comments
	var deps = {}, match, unique = {};
	
	var requireRegex = /(?:^|[^\w\$_.])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')\s*\)/g;
	while (match = requireRegex.exec(moduleCode)) {
		var module = eval(match[1]);
		if (!Object.prototype.hasOwnProperty.call(deps, module)) {
			deps[module] = true;
		}
	}
	
	var ensureRegex = /(?:^|[^\w\$_.])require.ensure\s*\(\s*(\[("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|\s*|,)*\])/g;
	while (match = ensureRegex.exec(moduleCode)) {
		var moduleArray = eval(match[1]);
		for (var i = moduleArray.length; i--;) {
			var module = moduleArray[i];
			delete deps[module];
		}
	}
	
	var depsArray = [];
	for (var module in deps) {
		if (Object.prototype.hasOwnProperty.call(deps, module)) {
			depsArray.push(module);
		}
	}
	
	return depsArray;
};


return function(js) {
	
	return {
		"returns": "exports",
		"use": {
			"require": "js-require-1.1.1-commonjs",
			"module": "js-module-1.1.1-commonjs"
		},
		"requires": getRequires(js),
	};
	
};
