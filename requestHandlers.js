let LinkedList = require("./List/serviceList");

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

function writeResultOperationOnList(respons, value, operation) {
	let result,
		Success = "Success! " + value,
		Fail = "Fail! " + value;

	if (operation === "remove") {
		result = LinkedList.remove(value);

		if (result === "Success") {
			result = Success + " removed.";
		} else {
			result = Fail + " undefined.";
		}
	} 
	else if (operation === "find") {
		result = LinkedList.find(value);

		if (result === "Success") {
			result = Success + " found.";
		} else {
			result = Fail + " not found.";
		}
	}
	
	respons.writeHead(200, { "Content-Type": "text/plain" })
	respons.write(result);
}

function writeResultInResponse(respons, handler) {
	let contentType,
	    code = 200,
		result = handler();	

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


module.exports.parsePath = parsePath;
module.exports.get = getHandler;
module.exports.writeResultOperation = writeResultOperationOnList;
module.exports.writeResult = writeResultInResponse;
module.exports.writeError = writeNotFoundError;