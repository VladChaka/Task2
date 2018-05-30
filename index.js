let http = require("http"),
    serviceData = require("./List/LinkedList"),
	getCommonHandler = require("./handler/serverHandler"),
	getParam = require("./util"),
    port = getParam("port", 4001),
    First = function () { return "First1"; },
    Second = function () { return { "test": "Second" }; },
    Third = function () {  },
    apiConfig = {
	    "": First,
	    "start": Second,
	    "test1": {
	        "test2": Third,
	    },
		"list": serviceData.viewList
	};

http.createServer(getCommonHandler(apiConfig)).listen(port);
console.log("Server started on " + port + " port");