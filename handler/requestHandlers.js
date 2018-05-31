let LinkedList = require("../Util/LinkedList"),
    DataService = require("../Service/DataService"),
    DataServiceFirst = new DataService(LinkedList);

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
	if (path === "remove") {
		result = DataServiceFirst.remove();
	} else if (path === "find") {
	    result = DataServiceFirst.find();
    } else if (path === "add") {
		result = DataServiceFirst.add();
	} else {
		return writeNotFoundError(respons);
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

module.exports.parsePath = parsePath;
module.exports.getHandler = getHandler; 
module.exports.writeResultOperationOnList = writeResultOperationOnList; 
module.exports.writeResultInResponse = writeResultInResponse; 
module.exports.writeNotFoundError = writeNotFoundError; 
module.exports.DataServiceFirst = DataServiceFirst; 