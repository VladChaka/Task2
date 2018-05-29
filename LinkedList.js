let LinkedList = class {
	constructor() {
		this.head = null;
		this.length = 0;
	}

	add(value) {
		let newNode = { value };
		newNode.next = this.head;
		this.head = newNode;
		this.length++;
		return this;
	}

	remove(value) {		
		if (this.length === 0) {
			console.log("Fail. " + value + " undefined.");			
			return undefined;
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
				return undefined;
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
		return this;
	}

	find(value) {
		let thisNode = this.head;
		for (let i = 0; i < this.length; i++) {
			if (thisNode.value === value) {
				console.log("Success. " + value + " found.");
				return thisNode;
			}
			thisNode = thisNode.next;
		}
		console.log("Fail. " + value + " not found.");	
		return thisNode;
	}
}

exports.list = LinkedList;