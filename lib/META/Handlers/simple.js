META({
	
	"id": "js-META.Handlers.simple-1.0-jsan+jhuni",
	
	"handler": "funcwrap"
	
});


return function(metadata, js, callback) {
	
	var requires = metadata.requires || [];
	var builtins = metadata.builtins || [];
	var usedata = metadata.use || {};
	var dependencies = builtins.slice().concat(requires);
	
	// Get dependencies from the use key:
	for (var i in usedata) {
		if (usedata.hasOwnProperty(i)) {
			dependencies.push(usedata[i]);
		}
	}
	
	META.HandleUtils.acquireDependencies(dependencies, function(loaded) {
		
		var loadedDeps = '';
		
		for (var i in loaded) {
			if (loaded.hasOwnProperty(i)) {
				loadedDeps += loaded[i];
			}
		}
		
		// Handle the use key
		for (var i in usedata) {
			if (usedata.hasOwnProperty(i)) {
				js = "var " + i + " = " + "META.cache['" + usedata[i] + "'];" + js;
			}
		}
		
		// Handle the returns key
		if (metadata.returns) {
		
			var returnName = metadata.returns;
			js = "var " + returnName + " = {};" + js + "return " + returnName + ";";	
		
		}
		
		js = loadedDeps + "META.cache['" + metadata.id + "'] = " + '(function(){' + js + '})();';
		callback(js);
			
	});
	
};
