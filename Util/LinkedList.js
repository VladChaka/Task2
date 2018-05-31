// module.exports =  class LinkedList {
// 	constructor() {
// 		this.head = null;
// 		this.length = 0;
// 	}

// 	addOnList(value) {
// 		let newNode = { value };
// 		newNode.next = this.head;
// 		this.head = newNode;
// 		this.length++;
// 	}

// 	removeFromList(value) {		
// 		if (this.length === 0) {
// 			console.log("Fail. " + value + " undefined.");						
// 			return "Fail";
// 		}

// 		let thisNode = this.head,
// 			beforNode = thisNode.next;

// 		if (thisNode.value === value) {
// 			this.head = this.head.next;
// 			this.length--;
// 			return this;
// 		}

// 		for (let i = 0; i < this.length; i++) {
// 			if (beforNode === null) {
// 				console.log("Fail. " + value + " undefined.");			
// 				return "Fail";
// 			}

// 			if (beforNode.value === value) {
// 				break;
// 			}

// 			thisNode = beforNode;
// 			beforNode = beforNode.next;
// 		}
		
// 		thisNode.next = beforNode.next;
// 		this.length--;
// 		console.log("Success. " + value + " removed.");
// 		return "Success";
// 	}

// 	findInList(value) {
// 		let thisNode = this.head;
// 		for (let i = 0; i < this.length; i++) {
// 			if (thisNode.value === value) {
// 				console.log("Success. " + value + " found.");
// 				return "Success";
// 			}
// 			thisNode = thisNode.next;
// 		}
// 		console.log("Fail. " + value + " not found.");	
// 		return "Fail";
// 	}
// }

function LinkedList() {
	this.head = null;
	this.length = 0;
}

LinkedList.prototype.addOnList = function(value) {
	console.log("2");
	
	let newNode = { value };
	newNode.next = this.head;
	this.head = newNode;
	this.length++;
}

LinkedList.prototype.removeFromList = function(value) {		
	if (this.length === 0) {
		console.log("Fail. " + value + " undefined.");						
		return "Fail";
	}

	let thisNode = this.head,
		beforNode = thisNode.next;

	if (thisNode.value === value) {
		this.head = this.head.next;
		this.length--;
		return this;
	}

	for (let i = 0; i < this.length; i++) {
		if (beforNode === null) {
			console.log("Fail. " + value + " undefined.");			
			return "Fail";
		}

		if (beforNode.value === value) {
			break;
		}

		thisNode = beforNode;
		beforNode = beforNode.next;
	}
	
	thisNode.next = beforNode.next;
	this.length--;
	console.log("Success. " + value + " removed.");
	return "Success";
}

LinkedList.prototype.findInList = function(value) {
	let thisNode = this.head;
	for (let i = 0; i < this.length; i++) {
		if (thisNode.value === value) {
			console.log("Success. " + value + " found.");
			return "Success";
		}
		thisNode = thisNode.next;
	}
	console.log("Fail. " + value + " not found.");	
	return "Fail";
}

LinkedList.prototype.test1 = function() { return "test1" }
LinkedList.prototype.test2 = function() { return { "test": "test2" }; }
LinkedList.prototype.test3 = function() { }

module.exports = LinkedList;