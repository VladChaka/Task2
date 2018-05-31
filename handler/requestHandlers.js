let url = require("url"),
    LinkedList = require("../Util/LinkedList"),
    DataService = require("../Service/DataService"),
    DataServiceFirst = new DataService(LinkedList);

function getCommonHandler(apiConfig) {	
	return function (req, res) {
		let pathname = url.parse(req.url).pathname,
            path = parsePath(pathname);

		handler = getHandler(apiConfig, path);	

		if (handler) {				
			if (path.length > 1 && path[0] === "list") {
				// path[1] = "remove:value" of "find:value"
				path = path[1].split(":",2);
				writeResultOperationOnList(res, path);
				          
			} else {
				writeResultInResponse(res, handler);
			} 
		} else {
			writeNotFoundError(res);
		}
		res.end();
	}
}

function parsePath(pathname) {	
	let splitPath = pathname.split("/");			
		splitPath.shift();	
	return splitPath;
}

function getHandler(apiConfig, pathNodes, index) {
	index = index || 0;
	let result = apiConfig[pathNodes[index]];
	if (pathNodes[0] !== "list") {
		
		if (typeof result === "object") {
			result = getHandler(result, pathNodes, ++index);
		}
	} 

    return result;
}

function writeResultOperationOnList(respons, path) {
	let value = path[1],
	    result;
	if (path[0] === "remove") {
		result = DataServiceFirst.remove(value);
	} else if (path[0] === "find") {
	    result = DataServiceFirst.find(value);
    } else if (path[0] === "add") {
		result = DataServiceFirst.add();
	}
			
    respons.writeHead(200, { "Content-Type": "text/plain" })
    respons.write(result);
}

function writeResultInResponse(respons, handler) {
	let contentType,
	    code = 200,
		result = (typeof handler === "object") ? handler : handler();	

		console.log(result);
		

	if (result === undefined || result === null) {
		contentType= '"Content-Type": "text/plain"';
		code = 204;
		result = "Error: 204. No Content.";
		console.log("Error: 204. No Content.");
	} 
	else if (typeof result === "string") {
		contentType = '"Content-Type": "text/plain"';
	} else {
		contentType = '"Content-Type": "application/json"';
		result = JSON.stringify(result);
	}
	
	respons.writeHead(code, { contentType })
	respons.write(result);
}

function writeNotFoundError(respons) {
	respons.writeHead(404, { "Content-Type": "text/plain" });
	respons.write("Error: 404. Page not found.");
}

module.exports.server = getCommonHandler;
module.exports.DataServiceFirst = DataServiceFirst; 