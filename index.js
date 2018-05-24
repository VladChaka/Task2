let http = require("http"),
url = require("url"),
port = (process.argv[2] === undefined) ? 1111 : process.argv[2];

http.createServer(function(req, res){
	var pathname = url.parse(req.url).pathname;

	if (pathname === "/start") {
		hello(req, res);
	} else if (pathname === "" || pathname === "/") {
			var body = 
		'<html>' +
			'<head>' +
				'<meta charset=UTF-8" />' +
			'</head>' +
			'<body>' +
				'<form action="/start" method="POST">' +
					'<input type="submit" value="Click" />' +
				'</form>' +
			'</body>' +
		'</html>';	

		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(body);
		res.end();
	}
}).listen(port);
console.log("Server started on port: ", port);


function hello(req, res) {
	res.writeHead(200, { "Content-Type": "text/html" });
	res.write("Hello World");
	res.end();
}

