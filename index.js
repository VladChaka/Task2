let http = require("http"), 
    handler = require("./handler/requestHandlers"),
    getParam = require("./Util/common"),
    mongoose = require("mongoose"),
    DataService = require("./Service/DataService"),
    dataService = new DataService(),
    port = getParam("port", 4001),
    getCommonHandler = handler.getCommonHandler,
    apiConfig = {
        "": dataService.test1,
        "start": dataService.test2,
        "test1": {
            "test2": dataService.test3,
        },
        "list": {
            "view": dataService.viewList,
            "add": dataService.add,
            "remove": dataService.remove,
            "find": dataService.find
        }
    };	
    
mongoose.connect("mongodb://admin:vlad12345@ds245170.mlab.com:45170/mydb");
	
http.createServer(getCommonHandler(apiConfig)).listen(port);
console.log(`Server started on ${port} port.`);