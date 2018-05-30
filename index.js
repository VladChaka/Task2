let http = require("http"),
    url = require("url"),
    handlers = require("./requestHandlers"),
    LinkedList = require("./List/serviceList"),
    getParam = require("./util"),
    port = getParam("port", 4001),
    First = function () { return "First1"; },
    Second = function () { return { "test": "Second" }; },
    Third = function () {  },
    apiConfig = {
	    "": First,
	    "start": Second,
	    "test1": {
	        "test2": Third,
	    },
		"list": LinkedList.view
    };

http.createServer(getCommonHandler(apiConfig)).listen(port);
console.log("Server started on : ", port);

function getCommonHandler(apiConfig) {	
	return function (req, res) {
		let pathname = url.parse(req.url).pathname,
			path = handlers.parsePath(pathname);
			
		handler = handlers.get(apiConfig, path);	
		
		if (handler) {
			LinkedList.add(pathname);
			handlers.writeResult(res, handler);
		} 
		else {
			handlers.writeError(res);
		}
		res.end();
	}
}