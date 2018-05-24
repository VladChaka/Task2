let http = require("http"),
	url = require("url");

start();
function start() {
	http.createServer(function(req, res){
		var pathname = url.parse(req.url).pathname;

		if (pathname === "/start") {
			hello();
		}
		
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
	}).listen(1111);
	console.log("Server started");
}

function hello(req, res) {
	res.writeHead(200, { "Content-Type": "text/html" });
	res.write("Hello World");
	res.end();
}

