let http = require("http"),
	url = require("url"),
	func = function() { return "error";	},
    First = function () { return "First"; },
    Second = function () { return "Second"; },
    Three = function () { return "Three"; },
	port = arguments("port"),
	apiConfig = {
		"": First,
		"start": Second,
		"test1": {
			"test2": Three
		},
		"test3": {
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

		let masUrl = parseUrl(req, pathname),
			respons = checkObj(masUrl, apiConfig),
			typeRespons = typeof(respons);

		if (typeRespons === "function") {
			res.writeHead(200, { "Content-Type": "text/plain" });
			res.write(respons());
			res.end();
		} else if (typeRespons === "string"){
			respons = JSON.stringify(respons);
			res.writeHead(200, { "Content-Type": "application/json" });
			res.write(respons);
			res.end();
		}
	}
}

function parseUrl(req, pathname) {	
	let splitUrl = pathname.split("/");			
		splitUrl.shift();	
	return splitUrl;
}

function checkObj(masUrl, apiCon) {
	let typeMasUrl = typeof(masUrl),
		url = (typeMasUrl === "string") ? masUrl : masUrl[0],
		respons = apiCon[url],
		typeUrl = typeof(respons);
		
	if (typeUrl === "object") {
		for (let key in respons) {
			respons = checkObj(key, respons);
		}
	}
	return respons;
}
