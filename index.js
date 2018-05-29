let http = require("http"),
    url = require("url"),
	First = function () { return "First1"; },
    Second = function () { return { "test": "Second" }; },
	Third = function () {  },
	Fourth = function () { return { "test": "Fourth" }; },
	port = getParam("port", 4001),
    apiConfig = {
	    "": First,
	    "start": Second,
	    "test1": {
		    "test2": Third,
		    "test3": {
			    "test4": Fourth,
		    }
	    }
	};

function getParam(key, value) {
	let result = null;

	for (let value in process.argv) {
		value = process.argv[value];
		let arg = value.split("=", 2),
			pref = arg[0].toLowerCase();
				
		if (pref === key) {
			result = arg[1];
			break;
		}
	}
		
	result = (result === null || result === "") ? value : result;
	return result;
}

http.createServer(getCommonHandler(apiConfig)).listen(port);
console.log("Server started on : ", port);

function getCommonHandler(apiConfig) {	
	return function (req, res) {
	    let pathname = url.parse(req.url).pathname,
		handler = getHandler(apiConfig, parsePath(pathname));		
		
		if (handler) {
			writeResultInResponse(res, handler);
		} 
		else {
			writeNotFoundError(res);
		}
		
		res.end();
	}
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
	else if (result !== undefined || result !== null) {
		if (typeof result === "string") {
			contentType = '"Content-Type": "text/plain"';
			code = 200;
		}
		else {
			contentType = '"Content-Type": "application/json"';
			code = 200;
			result = JSON.stringify(result);
		}
	}
	
	respons.writeHead(code, { contentType })
	respons.write(result);
}

function writeNotFoundError(respons) {
	respons.writeHead(404, { "Content-Type": "text/plain" });
	respons.write("Error: 404. Page not found.");
}

function parsePath(pathname) {	
	let splitPath = pathname.split("/");			
		splitPath.shift();	
	return splitPath;
}
