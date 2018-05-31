let http = require("http"),
    serviceData = require("./List/serviceList"),
	getCommonHandler = require("./handler/serverHandler"),
	getParam = require("./util"),
    port = getParam("port", 4001),
    apiConfig = {
	    "": serviceData.First,
	    "start": serviceData.Second,
	    "test1": {
	        "test2": serviceData.Third,
	    },
		"list": serviceData.viewList
	};	

http.createServer(getCommonHandler(apiConfig)).listen(port);
console.log("Server started on " + port + " port");