let http = require("http"),
    url = require("url"),
    handlers = require("./requestHandlers"),
    LinkedList = require("./List/serviceList"),
	getParam = require("./util"),
	countRquest = 0,
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
console.log("Server started on " + port + " port");

function getCommonHandler(apiConfig) {	
	return function (req, res) {
		let pathname = url.parse(req.url).pathname,
		    path = handlers.parsePath(pathname);
			++countRquest;		
			
		handler = handlers.get(apiConfig, path);	
		
		if (handler) {	
			LinkedList.add("" + countRquest + "");

			if (path.length > 1) {
				// path[1] = "remove:value" of "find:value"
				path = path[1].split(":",2);
				let value = path[1],
					result = handlers.writeResultOperation(res, value, path[0]);
					
				if (path[0] === "remove") {
					result;
				} else if (path[0] === "find") {
					result;
				}
				
			} else {
				handlers.writeResult(res, handler);
			}
		} else {
			handlers.writeError(res);
		}
		res.end();
	}
}