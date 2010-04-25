META({
	
	"id": "js-META.Handlers.transportD-1.0-jsan+jhuni"
	
});

return function(metadata, js, callback) {
	
	var requiresSource = '["' + metadata.requires.join('", "') + '"]';
	
	var header = 'require.define({"' + metadata.id + '":';
	js = header + "function(require, exports, module){\n" + js + "\n}}," + requiresSource + " )";
	
	callback(js);
	
};


