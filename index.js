let http = require("http"),
	url = require("url"),
	func = function() { return "error";	},
    First = function () { return "First"; },
    Second = function () { return "Second"; },
    Three = function () { return "Three"; },
	port = arguments("port"),	
	config = arguments("inf"),
	apiConfig = (config === "") ? '{ "/": "First", "/start": "Second", "/test1": { "/test2": "Three" } }' : {
		"/": First,
		"/start": Second,
		"/test": {
			"/start": Three
		}
	},
	myPath = arguments("path"),
	type = typeof(apiConfig);		

http.createServer((req, res) => body (req, res, apiConfig)).listen(port);
console.log("Server started on : ", port);

function body (req, res, apiCon){
	
	//var pathname = url.parse(, true);
	//pathname = pathname.pathname;
	//console.log(url);
	
	
	//if (pathname === "/") {
	//	First(req, res);
	//} 
	if (type == "object") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.write(apiCon[myPath]());
		
	}
	else if (type == "string") {
		res.writeHead(200, { "Content-Type": "application/json" }); //text/x-json

		let result = null;

		JSON.parse(apiCon, function(key, value) { 
			if (myPath == key) result = value; 
		});
		
		if (result === "First") {
			func = First;
		} 
		else if (result === "Second"){
			func = Second;
		}
		else if (result === "Three"){
			func = Three;
		}
		
		
		res.write(func());
	}		
	res.end();	
}

function arguments(argums) {
	let result = null;

	if (argums === "port") {
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
	} else if (argums === "inf") {
		for (let value in process.argv) {
			value = process.argv[value]
			let arg = value.split("="),
				pref = arg[0];
	
			if (pref === "inf" || pref === "Inf") {
				result = arg[1];
				break;
			}	
		}
		if (result === null) {
			result = "";
		}
	} else if (argums === "path") {
		for (let value in process.argv) {
			value = process.argv[value]
			let arg = value.split("="),
				pref = arg[0];
	
			if (pref === "path" || pref === "Path") {
				if (arg[1] === "") {
					result = "/";
				} else {
					result = arg[1];
				}
				break;
			}	
		}
		if (result === null) {
			result = "/";
		}
	};
	return result;
}




