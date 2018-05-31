let http = require("http"),
    LinkedList = require("./Util/LinkedList"),
    DataService = require("./Service/DataService"),
    DataServiceFirst = new DataService(LinkedList);
    getCommonHandler = require("./handler/requestHandlers"),
    getParam = require("./Util/common"),
    port = getParam("port", 4001),
    number = 0;
    apiConfig = {
        "": "DataServiceFirst.test1",
        "start": "DataServiceFirst.test2",
        "test1": {
            "test2": "DataServiceFirst.test3",
        },
        "list": {
            "view": DataServiceFirst.list,
            "add": "DataServiceFirst.add",
            "remove": "DataServiceFirst.remove",
            "find": "DataServiceFirst.find"
        }
	};
	console.log(DataServiceFirst.list);
	//console.log(DataServiceFirst.add());
	let a = DataServiceFirst.add;
	a();
	console.log(DataServiceFirst.list);
	
http.createServer(getCommonHandler(apiConfig)).listen(port);
console.log("Server started on " + port + " port");