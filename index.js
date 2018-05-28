let http = require("http"),
    url = require("url"),
	First = function () { return "First"; },
	//test = function () { return { "name": Second }; },
	test = function () { return { "name": "asd" }; },
    Second = function () { return "Second"; },
    Third = function () { return "Third"; },
    Fourth = function () { return "Fourth"; },
	port = getPort(),
    apiConfig = {
	    "": First,
	    "start": test,
	    "test1": {
		    "test2": Third,
		    "test3": {
			    "test4": Fourth,
			    "test6": {
				    "test7": "Семь"
			    }
		    }
	    }
	};

function getPort() {
	let result = null;
	
	for (let value in process.argv) {
		value = process.argv[value]
		let arg = value.split("=", 2),
		    pref = arg[0].toLowerCase();
			
		if (pref === "port") {
			result = arg[1];
			break;
		}	
	}
	if (result === null || result === "") {
		result = 8888;
	}
	return result;
}
	
http.createServer((req, res) => getCommonHandler(apiConfig, req, res)).listen(port);
console.log("Server started on : ", port);

function getCommonHandler(apiConfig, req, res) {	

	let pathname = url.parse(req.url).pathname;

	var handler = getHandler(apiConfig, parsePath(pathname)),
	    result;

	if (handler) {
		result = handler;
		if (typeof(result) === "function" && typeof(result()) !== "object") {
			return writeResultInResponse(res, result, true);
		}
		else {
			return writeResultInResponse(res, result, false);
		}
	} 
	else {
		return writeNotFoundError(res);
	}
}

function getHandler(apiConfig, pathNodes) {
	let typeMasPath = typeof(pathNodes),
	    path = (typeMasPath === "string") ? pathNodes : pathNodes[0],
	    respons = (typeMasPath === "string") ? apiConfig : apiConfig[path],
	    typePath = typeof(respons),
		lengthMasPath = pathNodes.length;	
		
	if (typePath === "object") {
		for (let key in respons) {
			for (let i = 0; i < lengthMasPath; i++) {
				if (key === pathNodes[i]) {
					i++;
					pathNodes.splice(0,i);
					
					if (pathNodes.length !== 0) {
						
						respons = getHandler(respons[key], pathNodes);	
					} 
					else {
						respons = respons[key];
					}
				}
			}	
		}
	}
	return respons;
}

function writeResultInResponse(respons, result, flag) {
	console.log(result);
	
	if (flag === true) {
		respons.writeHead(200, { "Content-Type": "text/plain" });
		respons.write(result());
		respons.end();
	}
	else if (flag === false){
		if (typeof(result) === "function") {
			result = getResponsResult(result());
			result = (typeof(result) !== "function") ? result : result();
			result = JSON.stringify(result);		
		}
		else {
			result = JSON.stringify(result);
		}
		respons.writeHead(200, { "Content-Type": "application/json" });
		respons.write(result);
		respons.end();
	}
}

function getResponsResult(res) {
	let typeMasPath = typeof(res);
		
	if (typeMasPath === "object") {
		for (let key in res) {
			res = res[key];
		}
	}
	return res;
}

function writeNotFoundError(respons) {
	respons.writeHead(404, { "Content-Type": "text/plain" });
	respons.write("Error: 404");
	respons.end();
}

function parsePath(pathname) {	
	let splitPath = pathname.split("/");			
	    splitPath.shift();	
	return splitPath;
}
