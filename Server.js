let url = require("url"),
    handlers = require("./handler/requestHandlers");

module.exports = function getCommonHandler(apiConfig) {	
	return function (req, res) {
		let pathname = url.parse(req.url).pathname,
            path = handlers.parsePath(pathname),
            handler = handlers.getHandler(apiConfig, path);	     

		if (handler) {				
			if (path.length > 1 && path[0] === "list") {            
				handlers.writeResultOperationOnList(res, path[1]);
			} else {
				handlers.writeResultInResponse(res, handler);
			} 
		} else {
			handlers.writeNotFoundError(res);
		}
		res.end();
	}
}