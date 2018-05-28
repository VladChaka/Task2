let http = require("http"),
    url = require("url"),
    func = function() { return "error";	},
    First = function () { return "First"; },
    Second = function () { return "Second"; },
	Third = function () { return "Third"; },
	Fourth = function () { return "Fourth"; },
	port = arguments("port"),
    apiConfig = {
		"": First,
		"start": Second,
		"test1": {
			"test2": Third,
			"test3": {
				"test4": Fourth,
				"test6": {
					"test7":"six"
				}
			}
		},
		"test5": {
			name: "Влад"
		  }
	};

function arguments(argums) {
	let result = null;
	
	for (let value in process.argv) {
		value = process.argv[value]
		let arg = value.split("="),
			pref = arg[0];
		
		if (pref === "port" || pref === "Port") {
			result = arg[1];
			if (result === "") {
				result = 8888;
			}
			break;
		}	
	}
	if (result === null) {
		result = 8888;
	}
	return result;
}
	
http.createServer((req, res) => startServer(req, res)).listen(port);
console.log("Server started on : ", port);

function startServer (req, res){
	var pathname = url.parse(req.url, true).pathname;	
	
	if (pathname !== "/favicon.ico") {

		let masPath = parsePath(req, pathname),
			respons = checkObj(masPath, apiConfig),
			typeRespons = typeof(respons);

		if (typeRespons === "function") {
			res.writeHead(200, { "Content-Type": "text/plain" });
			res.write(respons());
		} 
		else {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.write(respons);
		}
	}
	res.end();
}

function parsePath(req, pathname) {	
	let splitPath = pathname.split("/");			
	    splitPath.shift();	
	return splitPath;
}

function checkObj(masPath, apiCon) {
	let typeMasPath = typeof(masPath),
	    path = (typeMasPath === "string") ? masPath : masPath[0],
	    respons = (typeMasPath === "string") ? apiCon : apiCon[path],
	    typePath = typeof(respons),
	    lengthMasPath = masPath.length;
		
	if (typePath === "object") {
		for (let key in respons) {
			for (let i = 0; i < lengthMasPath; i++) {
				if (key === masPath[i]) {
					i++;
					masPath.splice(0,i);
					if (masPath.length !== 0) {
						respons = checkObj(masPath, respons[key]);	
					} else {
						respons = respons[key];
					}
				}
			}	
		}
	}
	return respons;
}
