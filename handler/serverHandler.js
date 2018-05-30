let handlers = require("./requestHandlers"),
    serviceData = require("../List/serviceList"),
    url = require("url"),
    countRquest = 0;

function getCommonHandler(apiConfig) {	
	return function (req, res) {
		let pathname = url.parse(req.url).pathname,
            path = handlers.parsePath(pathname);
            
        ++countRquest;	
        //handler = (path[0] === "list") ? path[0] : handlers.get(apiConfig, path);	
        handler = handlers.get(apiConfig, path);	
		if (handler) {	
            
            
            serviceData.add("" + countRquest + "");
            handlers.writeResult(res, handler);
		} else {
			handlers.writeError(res);
		}
		res.end();
	}
}

module.exports = getCommonHandler;