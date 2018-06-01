module.exports = class LinkedList {
	constructor() {
		this.head = null;
		this.length = 0;
	}

	add(value) {
		let newNode = { value };
		newNode.next = this.head;
		this.head = newNode;
		this.length++;
	}

	remove(value) {	
		let result = false;
			
		if (this.length === 0) {						
			return result;
		} else {
			let thisNode = this.head,
			    beforNode = thisNode.next;

			if (thisNode.value === value) {
				this.head = this.head.next;
				this.length--;
				result = true;
			} else {
				for (let i = 0; i < this.length; i++) {
					if (beforNode === null) {
						result = false;
						break;
					}
		
					if (beforNode.value === value) {
						result = true;
						break;
					}
		
					thisNode = beforNode;
					beforNode = beforNode.next;
				}

				thisNode.next = beforNode.next;
				this.length--;
			}	
		}

		return result;
	}
	
	find(value) {
		let thisNode = this.head,
			result = false;
			
		for (let i = 0; i < this.length; i++) {
			if (thisNode.value === value) {
				result = true;
				break;
			}
			thisNode = thisNode.next;
		}	
		return result;
	}
}