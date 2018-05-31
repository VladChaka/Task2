let result,
	number = 0;

module.exports = class DataService {

	constructor(LinkedList) {
		this.list = new LinkedList();
	}

	add(){	
		++number;
		this.list.addOnList("" + number + "");

		return result = "Success" + "! " + number + " added.";
	}
	
	remove(value) {
		result = this.list.removeFromList(value);
	
		if (result === "Success") {
			result = "Success" + "! " + value + " removed.";
		} else {
			result = "Fail! " + value + " undefined.";
		}
		return result;
	}
	
	find(value) {
		result = this.list.findInList(value);
	
		if (result === "Success") {
			result = "Success" + "! " + value + " found.";
		} else {
			result = "Fail! " + value + " not found.";
		}
	
		return result;
	}

	test1() { return "test1"; }
    test2() { return { "test": "test2" }; }
	test3() { }
}