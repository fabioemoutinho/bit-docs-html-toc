var stache = require("can-stache");
var Control = require("can-control");
var makeTree = require("./make-tree");

var template = stache("{{#each nodes}}{{renderNode tagName .}}{{/each}}");

var renderNode = stache(
	"<li>" +
		"<a href='#{{node.id}}'>{{node.text}}</a>" +
		"{{#if node.children.length}}" +
			"{{#is tagName 'ul'}}" +
				"<ul>{{#each node.children}}{{renderNode tagName .}}{{/each}}</ul>" +
			"{{else}}" +
				"<ol>{{#each node.children}}{{renderNode tagName .}}{{/each}}</ol>" +
			"{{/is}}" +
		"{{/if}}" +
	"</li>"
);

stache.registerSimpleHelper("renderNode", function(tagName, node) {
	return renderNode({ tagName: tagName, node: node });
});

module.exports = Control.extend({
	init: function(el, options) {
		this.depth = options.depth;
		this.tagName = options.tagName;
		this.headingsContainerSelector = options.headingsContainerSelector;

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
			nodes: titles,
			tagName: this.tagName
		}));
	},

	makeSelector: function(tagName) {
		var container = this.headingsContainerSelector;
		return container + " " + tagName;
	},

	collectTitles: function() {
		var selector = this.getHeadings()
			.map(this.makeSelector.bind(this))
			.join(",");

		var titles = selector ? document.querySelectorAll(selector) : [];
		return makeTree(titles);
	},

	getHeadings: function() {
		var headings = [];

		for(var i = 0; i < this.depth; i++) {
			headings.push("h" + (i + 2));
		}

		return headings;
	}
});

