let http = require("http"),
	url = require("url"),
	port = arguments("port"),	
	config = arguments("inf"),
	// apiConfig = (config === "") ? 'http://localhost:' + port + '/' : {
	// 	'/': First(),
	// 	'/start': Second(),
	// 	'/test': {
	// 		'/start1': Thred()
	// 	}
	// },
	apiConfig = (config === "") ? 'http://localhost:' + port + '/' : {
		'/': function () {
			console.log("First");
		},
		'/start': function (){
			console.log("Second");
			
		},
		'/test': {
			'/start1': function(){
				console.log("Thred");
			}
		}
	},
	myPath = arguments("path");
	//myPath = apiConfig[myPath];	
	console.log(myPath);
	
	apiConfig.First();
	
	//let func = JSON.parse(apiConfig[myPath]);
	

	// var pathname = url.parse(apiCon, true);
	// pathname = pathname.pathname;
	
	
	

// http.createServer(function (req, res){
	
// 	var pathname = url.parse(req.url).pathname;
	
// 	if (pathname === "/start") {
// 		hello(req, res);
// 	} else if (pathname === "" || pathname === "/") {
// 			var body = 
// 		'<html>' +
// 			'<head>' +
// 				'<meta charset=UTF-8" />' +
// 			'</head>' +
// 			'<body>' +
// 				'<form action="/start" method="POST">' +
// 					'<input type="submit" value="Click" />' +
// 				'</form>' +
// 			'</body>' +
// 		'</html>';	

// 		res.writeHead(200, { "Content-Type": "text/html" });
// 		res.write(body);
// 		res.end();
// 	}
// }).listen(port);


http.createServer().listen(port);
console.log("Server started on port: ", port);


// function body (req, res, apiCon){
	
// 	var pathname = url.parse(apiCon, true);
// 	pathname = pathname.pathname;
	
// 	if (pathname === "/") {
// 		First(req, res);
// 	} 
			
// 	res.writeHead(200, { "Content-Type": "text/html" });
// 	res.write(body);
// 	res.end();	
// }

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
				result = arg[1];
				
				break;
			}	
		}
		if (result === null) {
			result = "/";
		}
	};
	return result;
}

function First(req, res) {
	return "First";
}
function Second(req, res) {
	return "Second";
}
function Thred(req, res) {
	return "Thred";
}

