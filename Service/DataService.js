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
	
	remove() {
		result = this.list.removeFromList("" + number + "");
		console.log(result);
		
	
		if (result === "Success") {
			result = "Success" + "! " + number + " removed.";
		} else {
			result = "Fail! " + number + " undefined.";
		}
		return result;
	}
	
	find() {
		result = this.list.findInList("" + number + "");
	
		if (result === "Success") {
			result = "Success" + "! " + number + " found.";
		} else {
			result = "Fail! " + number + " not found.";
		}
	
		return result;
	}

	test1() { return "test1"; }
    test2() { return { "test": "test2" }; }
	test3() { }
}