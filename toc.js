var stache = require("can-stache");
var Control = require("can-control");
var makeTree = require("./make-tree");

var template = stache("{{#each nodes}}{{renderNode .}}{{/each}}");

var renderNode = stache(
	"<li>" +
		"<a href='#{{id}}'>{{text}}</a>" +
		"{{#if children.length}}" +
			"<ul>{{#each children}}{{renderNode .}}{{/each}}</ul>" +
		"{{/if}}" +
	"</li>"
);

stache.registerSimpleHelper("renderNode", renderNode);

var TableOfContents = Control.extend({
	init: function(el, options) {
		var titles = this.collectTitles();

		// If there are no titles, bail
		if (!titles.length) {
			el.parentNode.removeChild(el);
			return;
		} else {
			el.parentNode.style.display = 'block';
		}

		// Append our template
		this.element.appendChild(template({
			nodes: titles
		}));
	},

	getOutlineDepth: function() {
		var depth = window.docObject.outline && window.docObject.outline.depth;
		return (typeof depth === "number" ? Math.min(depth, 6) : 1);
	},

	makeSelector: function(tagName) {
		return "article " + tagName;
	},

	collectTitles: function() {
		var selector = this.getHeadings().map(this.makeSelector).join(",");
		var titles = selector ? document.querySelectorAll(selector) : [];

		return makeTree(titles);
	},

	getHeadings: function() {
		var headings = [];
		var depth = this.getOutlineDepth();

		for(var i = 0; i < depth; i++) {
			headings.push("h" + (i + 2));
		}
		return headings;
	}
});

var TOCContainer = Control.extend({
	init: function(el) {
		el.style.display = "none";

		var toc = document.createElement("ul");
		toc.className = "on-this-page";
		el.appendChild(toc);

		new TableOfContents(toc);
	}
});

new TOCContainer(
	document.getElementsByClassName("on-this-page-container")[0]
);
