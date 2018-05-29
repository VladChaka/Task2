let http = require("http"),
    url = require("url"),
	First = function () { return "First1"; },
    Second = function () { return { "test": "Second" }; },
    Third = function () { return "Third1"; },
    Fourth = function () { return { "test": "Fourth" }; },
	port = getPort(1234),
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

function getPort(argument) {
	let result = null;
	    argument = argument || 8888;

	if (typeof argument === "string") {
		for (let value in process.argv) {
			value = process.argv[value]
			let arg = value.split("=", 2),
				pref = arg[0].toLowerCase();
				
			if (pref === argument) {
				result = arg[1];
				break;
			}
		}
	}

	result = (result === null || result === "") ? argument : result;
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
		result = handler();		
	
	if (typeof result === "string") {
		contentType = '"Content-Type": "text/plain"';
	}
	else {
		contentType = '"Content-Type": "application/json"';
		result = JSON.stringify(result);
	}

	respons.writeHead(200, { contentType })
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
