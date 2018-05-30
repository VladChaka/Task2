let LinkedList = require("./LinkedList"),
    viewList = function () { return list; },
	list = new LinkedList();

function addOnList(countRquest) {
	list.add(countRquest);
}

function remove(value) {
	return list.remove(value);
}

function findOnList(value) {
	return list.find(value);
}

module.exports.add = addOnList;
module.exports.remove = remove;
module.exports.find = findOnList;
module.exports.view = viewList;