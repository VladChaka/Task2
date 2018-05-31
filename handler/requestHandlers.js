let url = require("url");

module.exports = function getCommonHandler(apiConfig) {	
	return function (req, res) {
		let pathname = url.parse(req.url).pathname,
            path = parsePath(pathname);

		handler = getHandler(apiConfig, path);	

		if (handler) {	
            writeResultInResponse(res, handler);
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

function writeResultInResponse(respons, handler) {
	let contentType,
	    code = 200,
		result = (typeof handler === "object") ? handler : handler();	

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