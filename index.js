let http = require("http"),
	url = require("url"),
	LinkedList = require("./LinkedList"),
	list = new LinkedList(),
	First = function () { return "First1"; },
    Second = function () { return { "test": "Second" }; },
	Third = function () {  },
	Fourth = function () { return { "test": "Fourth" }; },
	viewList = function () { return list; },
	port = getParam("port", 4001),
    apiConfig = {
	    "": First,
	    "start": Second,
	    "test1": {
		    "test2": Third,
		    "test3": {
			    "test4": Fourth,
		    }
		},
		"list": viewList
	};

function getParam(key, value) {
	let result = value;

    for (let index in process.argv) {
        let keyValue = process.argv[index].split("=", 2);
        pref = keyValue[0].toLowerCase();

        if (pref === key) {
            result = keyValue[1];
            break;
        }
    }

	return result;
}

http.createServer(getCommonHandler(apiConfig)).listen(port);
console.log("Server started on : ", port);

function getCommonHandler(apiConfig) {	
	return function (req, res) {
	    let pathname = url.parse(req.url).pathname,
		handler = getHandler(apiConfig, parsePath(pathname));	
		
		if (handler) {
			addOnList(handler());
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

function parsePath(pathname) {	
	let splitPath = pathname.split("/");			
		splitPath.shift();	
	return splitPath;
}

function addOnList(value) {
	if (typeof value === "string") {
		list.add(value);
	}
}