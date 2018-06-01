let LinkedList = require("../Util/LinkedList"),
    result,
    number = 0;

module.exports = function DataServise () {
	var self = this;

	self._list = new LinkedList;

	self.add = function () {
		++number;
		result = self._list.addOnList(`${number}`);
		console.log(self._list);
		
		return result;
	}

	self.remove = function () {
		result = self._list.removeFromList(`${number}`);
		return self.messageResult(result, "remove");
	}

	self.find = function () {
		result = self._list.findInList(`${number}`);
		return self.messageResult(result, "find");
	}

	self.viewList = function () { return self._list; }

	self.test1 = function () { return "test1"; }
	self.test2 = function () { return { "test": "test2" }; }
	self.test3 = function () { }

	self.messageResult = function (result, operation) {
		let success = (operation === "remove") ? `Success! ${number} removed.` : `Success! ${number} found.`,
			fail = (operation === "remove") ? `Fail! ${number} undefined` : `Fail. ${number} not found.`;
	
		if (result === "Success") {
			result = success;
		} else {
			result = fail;
		}
	
		return result;
	}
}