function parsePath(pathname) {	
	let splitPath = pathname.split("/");			
		splitPath.shift();	
	return splitPath;
}

function getHandler(apiConfig, pathNodes, index) {
    index = index || 0;
    let result = apiConfig[pathNodes[index]];

    if (typeof result === "object") {
        result = getHandler(result, pathNodes, ++index);
    }

    return result;
}

function writeResultInResponse(respons, handler) {
	let contentType,
	    code,
		result = handler();	

	if (result === undefined || result === null) {
		contentType= '"Content-Type": "text/plain"';
		code = 204;
		result = "Error: 204. No Content.";
		console.log("Error: 204. No Content.");
	} 
	else if (typeof result === "string") {
		contentType = '"Content-Type": "text/plain"';
		code = 200;
	} else {
		contentType = '"Content-Type": "application/json"';
		code = 200;
		result = JSON.stringify(result);
	}
	
	respons.writeHead(code, { contentType })
	respons.write(result);
}

function writeNotFoundError(respons) {
	respons.writeHead(404, { "Content-Type": "text/plain" });
	respons.write("Error: 404. Page not found.");
}


module.exports.parsePath = parsePath;
module.exports.get = getHandler;
module.exports.writeResult = writeResultInResponse;
module.exports.writeError = writeNotFoundError;