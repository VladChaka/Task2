let result,
	number = 0;

module.exports = class DataService {

	constructor(LinkedList) {
		this.list = new LinkedList();
	}

	add(){	
		++number;
		result = this.list.addOnList(`${number}`);
		return result;
	}
	
	remove() {
		result = this.list.removeFromList(`${number}`);
		return messageResult(result, "remove");
	}
	
	find() {
		result = this.list.findInList(`${number}`);
		return messageResult(result, "find");
	}

	test1() { return "test1"; }
    test2() { return { "test": "test2" }; }
	test3() { }
}

function messageResult(result, operation) {
	let success = (operation === "remove") ? `Success! ${number} removed.` : `Success! ${number} found.`,
	    fail = (operation === "remove") ? `Fail! ${number} undefined` : `Fail. ${number} not found.`;

	if (result === "Success") {
		result = success;
	} else {
		result = fail;
	}

	return result;
}