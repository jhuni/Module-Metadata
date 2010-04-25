if (typeof META === "undefined") {
	META = function(){};
}

if (typeof META.cache === 'undefined') {
	META.cache = {};
}

if (typeof META.Handlers === "undefined") {
	META.Handlers = {};
}

if (typeof META.HandleUtils === "undefined") {
	META.HandleUtils = {};
}

META.Handlers.identity = function(metadata, js, callback) {
	callback(js);
};


META.Handlers.funcwrap = function(metadata, js, callback) {
	callback('(function(){' + js + '})()');
}

META.getJS = function(url, callback) {
	
	// This function will get the text from the url
	var slurp = function(url, callback) {
	
		var req, text;
		
		try {
			
			req = typeof ActiveXObject !== "undefined" ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
			req.open("GET", url, true);
			
			req.onreadystatechange = function() {
				
				if (req.readyState === 4) {
					
					if (req.status === 200 || req.status === 0) {
						text = req.responseText;
						
						if (typeof text === 'string') {
							callback(text);
						}
					}
				
				}
				
			};
			
			req.send(null);
			
		} catch (e) {
			
		}
		
	};

	// This function will parse a script and its META block:
	var parseScript = function(js) {
		
		var metaString = '';
		var handledJS = js;
		
		var lines = js.split("\n");
		var i = 0, l = lines.length;
		var isMeta = false;
		var metaStart = 0;
		
		while (i < l) {
			var line = lines[i++];
			
			if (!isMeta) {
				
				if (line.match(/\s*META\(\{/) !== null) {
					metaStart = i;
					isMeta = true;
				}
				
			} else {
				
				
				if (line.match(/\s*\}\)/) !== null) {
					break;
				}
				
				metaString += line;
				
			}
			
		}
		
		lines.splice(metaStart-1,i-metaStart+1).join("\n");
		var handledJS = lines.join("\n"); 
		
		var metadata = eval('({' + metaString + '})');
		var handler = (isMeta) ? META.Handlers.bundler : META.Handlers.identity
		
		if (metadata.handler) {
			handler = META.Handlers[metadata.handler];
		}
		
		return {
			js: handledJS,
			metadata: metadata,
			handler: handler
		};
		
	};
	
	
	// Now we should slurp up the necessary text:
	slurp( url, function(js) {
		
		var psc = parseScript(js);
		
		psc.handler(psc.metadata, psc.js, callback);
				
	});
	
};
