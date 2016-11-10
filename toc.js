var Control = require("can-control");
var TableOfContents = require("./toc-control");

var TOCContainer = Control.extend({
	init: function(el) {
		el.style.display = "none";

		var depth = this.getOutlineDepth();
		var tagName = this.getOutlineTagName();
		var toc = document.createElement(tagName);

		toc.className = "on-this-page";
		el.appendChild(toc);

		new TableOfContents(toc, {
			depth: depth,
			tagName: tagName,
			headingsContainerSelector: "article"
		});
	},

	getOutlineTagName: function() {
		var outline = window.docObject.outline || {};
		return (outline.tag === "ol") ? "ol" : "ul";
	},

	getOutlineDepth: function() {
		var depth = window.docObject.outline && window.docObject.outline.depth;
		return (typeof depth === "number" ? Math.min(depth, 6) : 1);
	}
});

new TOCContainer(
	document.getElementsByClassName("on-this-page-container")[0]
);
