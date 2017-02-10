var Control = require("can-control");
var TableOfContents = require("./toc-control");

module.exports =  Control.extend({
	init: function(el) {
		el.style.display = "none";

		var depth = this.getOutlineDepth();
		var tagName = this.getOutlineTagName();
		var selector = this.getHeadingsContainerSelector(el);

		var toc = document.createElement(tagName);
		toc.className = "on-this-page";
		el.appendChild(toc);

		new TableOfContents(toc, {
			depth: depth,
			tagName: tagName,
			headingsContainerSelector: selector
		});
	},

	getDocObject: function() {
		return window.docObject || {};
	},

	getOutlineTagName: function() {
		var docObject = this.getDocObject();
		var outline = docObject.outline || {};

		return (outline.tag === "ol") ? "ol" : "ul";
	},

	getOutlineDepth: function() {
		var docObject = this.getDocObject();
		var depth = docObject.outline && docObject.outline.depth;

		return (typeof depth === "number" ? Math.min(depth, 6) : 1);
	},

	getHeadingsContainerSelector: function(el) {
		var selector = el.dataset.headingsContainerSelector;

		return selector ? selector : "article";
	}
});
