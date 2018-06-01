let LinkedList = require("../Util/LinkedList");

module.exports = function DataServise () {
	var self = this,
		number = 0;

	self._list = new LinkedList;

	self.add = function () {
		let result;

		++number;
		result = self._list.add(`${number}`);
		
		return result;
	}

	self.remove = function () {
		let result;

		result = self._list.remove(`${number}`);
		return self.messageResult(result, "remove");
	}

	self.find = function () {
		let result;

		result = self._list.find(`${number}`);
		return self.messageResult(result, "find");
	}
	
	self.test1 = function () { return "test1"; }
	self.test2 = function () { return { "test": "test2" }; }
	self.test3 = function () { }
	self.viewList = function () { return self._list; }

	self.messageResult = function (resultOperation, operation) {
		let result;
		if (resultOperation === true) {
			result = (operation === "remove") ? `Success! ${number} removed.` : `Success! ${number} found.`;
		} else {
			result = (operation === "remove") ? `Fail! ${number} undefined` : `Fail. ${number} not found.`;
		}
	
		return result;
	}
}