let LinkedList = require("./LinkedList"),
    result,
    Success = "Success! ",
    Fail = "Fail! ";


class DataService {
	
	constructor(LinkedList) {
		this.list = LinkedList;
	}

	add(value){
		this.list.addOnList(value);
	}
	
	remove(value) {
		result = this.list.removeFromList(value);
	
		if (result === "Success") {
			result = Success + value + " removed.";
		} else {
			result = Fail + value + " undefined.";
		}
		return result;
	}
	
	find(value) {
		result = this.list.findInList(value);
	
		if (result === "Success") {
			result = Success + value + " found.";
		} else {
			result = Fail + value + " not found.";
		}
	
		return result;
	}

	First() { return "First1"; }
    Second() { return { "test": "Second" }; }
	Third() {  }
	viewList() { return LinkedList; }
}

module.exports = new DataService(LinkedList);
