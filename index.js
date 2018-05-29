let http = require("http"),
    url = require("url"),
	First = function () { return "First1"; },
    Second = function () { return { "test": "Second" }; },
	Third = function () {  },
	Fourth = function () { return { "test": "Fourth" }; },
	port = getParam("port", 4001),
    apiConfig = {
	    "": First,
	    "start": Second,
	    "test1": {
		    "test2": Third,
		    "test3": {
			    "test4": Fourth,
		    }
	    }
	};

function getParam(key, value) {
	let result = value;

    for (let index in process.argv) {
        let keyValue = process.argv[index].split("=", 2);
        pref = keyValue[0].toLowerCase();

        if (pref === key) {
            result = keyValue[1];
            break;
        }
    }

	return result;
}

http.createServer(getCommonHandler(apiConfig)).listen(port);
console.log("Server started on : ", port);

function getCommonHandler(apiConfig) {	
	return function (req, res) {
	    let pathname = url.parse(req.url).pathname,
		handler = getHandler(apiConfig, parsePath(pathname));		
		
		if (handler) {
			writeResultInResponse(res, handler);
		} 
		else {
			writeNotFoundError(res);
		}
		
		res.end();
	}
}

function getHandler(apiConfig, pathNodes, index) {	
	    index = index || 0;
	let result = apiConfig[pathNodes[index]];

	if (typeof result === "object") {
		result = getHandler(result, pathNodes, ++index);
	}
	
	return result;
}

function writeResultInResponse(respons, handler) {
	let contentType,
	    code,
		result = handler();	

	if (result === undefined || result === null) {
		contentType= '"Content-Type": "text/plain"';
		code = 204;
		result = "Error: 204. No Content.";
		console.log("Error: 204. No Content.");
	} 
	else if (typeof result === "string") {
		contentType = '"Content-Type": "text/plain"';
		code = 200;
	} else {
		contentType = '"Content-Type": "application/json"';
		code = 200;
		result = JSON.stringify(result);
	}
	
	respons.writeHead(code, { contentType })
	respons.write(result);
}

function writeNotFoundError(respons) {
	respons.writeHead(404, { "Content-Type": "text/plain" });
	respons.write("Error: 404. Page not found.");
}

function parsePath(pathname) {	
	let splitPath = pathname.split("/");			
		splitPath.shift();	
	return splitPath;
}




class LinkedList {
	constructor() {
		this.head = null;
		this.length = 0;
	}

	add(value) {
		let newNode = { value };
		newNode.next = this.head;
		this.head = newNode;
		this.length++;
		return this;
	}

	remove(value) {		
		if (this.length === 0) {
			console.log("Fail. " + value + " undefined.");			
			return undefined;
		}

		let thisNode = this.head,
		    beforNode = thisNode.next;

		if (thisNode.value === value) {
			this.head = this.head.next;
			this.length--;
			return this;
		}

		for (let i = 0; i < this.length; i++) {
			if (beforNode === null) {
				console.log("Fail. " + value + " undefined.");			
				return undefined;
			}

			if (beforNode.value === value) {
				break;
			}

			thisNode = beforNode;
			beforNode = beforNode.next;
		}
		
		thisNode.next = beforNode.next;
		this.length--;
		console.log("Success. " + value + " removed.");
		return this;
	}

	find(value) {
		let thisNode = this.head;
		for (let i = 0; i < this.length; i++) {
			if (thisNode.value === value) {
				console.log("Success. " + value + " found.");
				return thisNode;
			}
			thisNode = thisNode.next;
		}
		console.log("Fail. " + value + " not found.");	
		return thisNode;
	}
}



let list = new LinkedList().add("Hello");
console.log("0",list);
list.add("World")
console.log("1",list);
console.log(" ------------- ");
list.find("asd");
console.log(" ------------- ");
list.find("Hello");
console.log(" ------------- ");
list.remove("Hello")
console.log("2",list);
console.log(" ------------- ");
list.remove("WorldWorld")
console.log("3",list);

