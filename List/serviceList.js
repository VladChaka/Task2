let LinkedList = require("./LinkedList"),
    viewList = function () { return list; },
    list = new LinkedList();

function addOnList(value) {
	let find = list.find(value);
	if (find !== "Success") {
		list.add(value);
	}
}

function removeOnList(value) {
	list.remove(value);
}

function findOnList(value) {
	let result = list.find(value);
	return result;
}

module.exports.add = addOnList;
module.exports.remove = removeOnList;
module.exports.find = findOnList;
module.exports.view = viewList;