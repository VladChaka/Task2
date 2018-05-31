let result,
	number = 0;

function DataService(LinkedList) {
	this.list = new LinkedList();
}

DataService.prototype.add = function() {	
	++number;
	// console.log("123",this.list.addOnList());
	// this.list.ad(number);
	console.log("1",this.list);
	
	
	return this.list;
}

DataService.prototype.remove = function() {	
	result = this.list.removeFromList(number);
		
	if (result === "Success") {
		result = "Success" + "! " + number + " removed.";
	} else {
		result = "Fail! " + number + " undefined.";
	}
	return result;
}

DataService.prototype.find = function() {	
	result = this.list.findInList(number);
		
	if (result === "Success") {
		result = "Success" + "! " + number + " found.";
	} else {
		result = "Fail! " + number + " not found.";
	}
	return result;
}

DataService.prototype.test1 = function() { return "test1" }
DataService.prototype.test2 = function() { return { "test": "test2" }; }
DataService.prototype.test3 = function() { }

module.exports = DataService;




// module.exports = class DataService {

// 	constructor(LinkedList) {
// 		this.list = new LinkedList();
// 	}

// 	add(){	
// 		++number;
// 		this.list.addOnList(number);
// 		return this;
// 	}
	
// 	remove() {
// 		result = this.list.removeFromList(number);
	
// 		if (result === "Success") {
// 			result = "Success" + "! " + number + " removed.";
// 		} else {
// 			result = "Fail! " + number + " undefined.";
// 		}
// 		return result;
// 	}
	
// 	find() {
// 		result = this.list.findInList(number);
	
// 		if (result === "Success") {
// 			result = "Success" + "! " + number + " found.";
// 		} else {
// 			result = "Fail! " + number + " not found.";
// 		}
	
// 		return result;
// 	}

// 	test1() { 
// 		return "test1"; 
// 	}
//     test2() { return { "test": "test2" }; }
// 	test3() {  }
// }