let LinkedList = require("./LinkedList"),
    result,
    Success = "Success! ",
    Fail = "Fail! ";


class DataService {
	
	constructor(LinkedList) {
		this.add = LinkedList.addOnList;
		this.remove = LinkedList.removeFromList;
		this.find = LinkedList.findInList;
		this.view = LinkedList;
	}

	add(value){
		this.ad(value);
	}
	
	remove(value) {
		result = super.removeFromList(value);
	
		if (result === Success) {
			result = Success + value + " removed.";
		} else {
			result = Fail + value + " undefined.";
		}
		return result;
	}
	
	find(value) {
		result = super.findInList(value);
	
		if (result === Success) {
			result = Success + value + " found.";
		} else {
			result = Fail + value + " not found.";
		}
	
		return result;
	}

	viewList() { 
		console.log("123",this.view);
		console.log("1233",LinkedList);
		LinkedList;
	}
}

module.exports = new DataService(LinkedList);
