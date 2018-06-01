let http = require("http"), 
    handler = require("./handler/requestHandlers"),
    getParam = require("./Util/common"),
    DataService = require("./Service/DataService"),
    DataServiceFirst = new DataService(),
    port = getParam("port", 4001),
    getCommonHandler = handler.getCommonHandler,
    apiConfig = {
        "": DataServiceFirst.test1,
        "start": DataServiceFirst.test2,
        "test1": {
            "test2": DataServiceFirst.test3,
        },
        "list": {
            "view": DataServiceFirst.viewList,
            "add": DataServiceFirst.add,
            "remove": DataServiceFirst.remove,
            "find": DataServiceFirst.find
        }
    };	
	
http.createServer(getCommonHandler(apiConfig)).listen(port);
console.log(`Server started on ${port} port.`);