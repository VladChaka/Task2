let handler = require("./handler/requestHandlers"),
    startServer = require("./Server"),
    DataService = handler.DataServiceFirst,
    apiConfig = {
        "": DataService.test1,
        "start": DataService.test2,
        "test1": {
            "test2": DataService.test3,
        },
        "list":  DataService.list
    };	
	
startServer(apiConfig);