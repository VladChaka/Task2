let http = require("http"),
	url = require("url"),
	func = function() { return "error";	},
    First = function () { return "First"; },
    Second = function () { return "Second"; },
    Three = function () { return "Three"; },
	port = arguments("port"),
	//config = arguments("inf"),
	//myPath = arguments("path"),
	//myPaths = myPath.split("/"),
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
// test1/test2  ['test1', 'test2']

function startServer (req, res){
	
	var pathname = url.parse(req.url, true).pathname;	

	console.log("1",pathname);
	
	if (pathname !== "/favicon.ico") {

		let masUrl = parseUrl(req, pathname),
			respons = checkObj(masUrl, apiConfig),
			typeRespons = typeof(respons);

			console.log(typeRespons);
			

		if (typeRespons === "function") {
			res.writeHead(200, { "Content-Type": "text/plain" }); // text/plain   application/json
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

// function myUrl(req, apiCon) {
// 	let mas = [],
// 		value = null;

// 	for (let key in apiCon) {
// 		value = typeof(apiCon[key]);

// 		if (value === "object") {
// 			for (let ifObj in apiCon[key]) {
// 				mas.push(ifObj);
// 			};
// 		}	
// 		mas.push(key)
// 	}

// 	var pathname = url.parse(req.url, true);
	
// 	for (let i = 0; i < mas.length; i++) {
// 		if (pathname.pathname === "/" + mas[i]) {
// 			mas = apiCon[mas[i]]();
// 		} 
// 		else if (pathname.pathname === "/test1/test2") {
// 			mas = apiCon.test1.test2();
// 			break;
// 		}
// 	}
	
// 	return mas;
// }






