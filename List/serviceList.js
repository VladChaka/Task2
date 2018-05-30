let LinkedList = require("./LinkedList"),
    result,
    Success = "Success! ",
    Fail = "Fail! ";

class service extends LinkedList {

	add(value){
		super.addOnList(value)
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
		return this; 
	}
}

module.exports = new service();
