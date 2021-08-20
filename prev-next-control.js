var safeCustomElement = require("./safe-custom-element");
var attributeConnect = require("./attribute-connect");

var connectAttribute = attributeConnect();

var BitPrevNext = function(){
	console.log("initialized");
	connectAttribute.initialize(this);
};

var prototype = {
	connectedCallback: function() {
		this.setPreviousNext();

		if (this.hasPrevious) {
			this.appendChild(this.getAnchorElement(this.previous, true));
		}
		if (this.hasNext) {
			this.appendChild(this.getAnchorElement(this.next))
		}
	},
	get hasNext() {
		return !(this.next.element == null)
	},
	get hasPrevious() {
		return !(this.previous.element == null)
	},
	attributeChangedCallback: connectAttribute.attributeChangedCallback,
	setPreviousNext: function() {
		var currentElement = document.querySelectorAll(this.targetSelector)[0];
		var previousElement = currentElement ? currentElement.previousElementSibling : null;
		var nextElement = currentElement ? currentElement.nextElementSibling : null;
		var previousNext = function(element) {
			if (element) {
				return {
					element: element,
					title: element.firstElementChild.innerText,
					href: element.firstElementChild.href,
				};
			}
			return {};
		};

		this.previous = previousNext(previousElement);
		this.next = previousNext(nextElement);
	},
	getAnchorElement: function(previousNextObj, isPrevious) {
		var anchor = document.createElement('a');
		anchor.setAttribute('href', previousNextObj.href);
		anchor.innerText = (isPrevious ? 'Previous Lesson: ' : 'Next Lesson: ') + this.getTruncatedTextWithEllipsis(previousNextObj.title, 20);
		anchor.title = previousNextObj.title;
		return anchor;
	},
	getTruncatedTextWithEllipsis(text, length) {
		return text.length > length ? (text.substr(0, length) + '...') : text;
	}
};

BitPrevNext = safeCustomElement("bit-prev-next", BitPrevNext, prototype);

module.exports = BitPrevNext;
