var viewTarget = require("can-view-target");
var makeTree = require("./make-tree");
var assign = require("can-assign");

// data { tagName: tagName, node: node }
var renderNodeTarget = viewTarget([{
	tag: "li",
	children: [
		{
			tag: "a",
			attrs: {
				href: function(data){
					return this.setAttribute("href","#"+data.node.id);
				}
			},
			children: [function(data){ this.nodeValue = data.node.text; }]
		},
		function(data){
			var container = document.createElement(data.tagName);
			data.node.children.forEach(function(node){
				container.appendChild(renderNodeTarget.hydrate({node: node, tagName: data.tagName}));
			});
			if(data.node.children.length) {
				this.parentNode.replaceChild(container, this);
			}

		}
	]
}]);
/*
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
*/

// data - { nodes: titles, tagName: this.tagName }
var template = function(data){
	var container = document.createDocumentFragment();
	data.nodes.forEach(function(node){
		container.appendChild(renderNodeTarget.hydrate({node: node, tagName: data.tagName}));
	});
	return container;
};


//var template = stache("{{#each nodes}}{{renderNode tagName .}}{{/each}}");
/*stache.registerSimpleHelper("renderNode", function(tagName, node) {
	return renderNode({ tagName: tagName, node: node });
});*/

var TocControl = function(el, options){
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
	el.appendChild(template({
		nodes: titles,
		tagName: this.tagName
	}));
};

assign(TocControl.prototype, {
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
module.exports = TocControl;
