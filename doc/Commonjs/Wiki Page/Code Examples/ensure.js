META({

    "id": "js-ensure-1.2-commonjs",
    
    "returns": "exports",
    
    "builtins": [
        "XMLHttpRequest", 
        "Array.prototype.indexOf",
        "Array.prototype.filter"
    ],
    
    "use": {
        "loadModuleByScript": "js-Get.script-1.0-jsan+jhuni"
    }

});



exports.ensure = function() {
    /* ... */
};
