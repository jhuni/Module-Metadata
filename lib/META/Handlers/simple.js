META({
	
	"handler": "funcwrap"
	
});


return function(metadata, js, callback) {
	
	var builtins = metadata.builtins || [];
	var usedata = metadata.use || {};
	var dependencies = builtins.slice();
	
	// Get dependencies from the use key:
	for (var i in usedata) {
		if (usedata.hasOwnProperty(i)) {
			dependencies.push(usedata[i]);
		}
	}
	
	META.HandleUtils.acquireDependencies(dependencies, function(loaded) {
		
		var loadedDeps = '';
		
		// Handle the builtins key
		for (var i = 0, l = builtins.length; i < l; i++) {
			loadedDeps += loaded[builtins[i]];
		}
		
		// Handle the use key
		for (var i in usedata) {
			if (usedata.hasOwnProperty(i)) {
				loadedDeps += "var " + i + " = " + loaded[usedata[i]] + ";";
			}
		}
		
		js = loadedDeps + js;
		
		// Handle the returns key
		if (metadata.returns) {
		
			var returnName = metadata.returns;
			js = "var " + returnName + " = {};" + js + "return " + returnName + ";";	
		
		}
		
		js = '(function(){' + js + '})()';
		callback(js);
			
	});
	
};
