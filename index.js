let http = require("http"),
	handler = require("./handler/requestHandlers"),
	getCommonHandler = require("./Server"),
	DataService = handler.DataServiceFirst,
    getParam = require("./Util/common"),
    port = getParam("port", 4001),
    number = 0;
    apiConfig = {
        "": DataService.test1,
        "start": DataService.test2,
        "test1": {
            "test2": DataService.test3,
        },
        "list":  DataService.list
	};	
	
http.createServer(getCommonHandler(apiConfig)).listen(port);
console.log(`Server started on ${port} port.`);