var $ = require("jquery");
var assert = require("chai/chai").assert;
var TableOfContents = require("../toc-control");

require("steal-mocha");

describe("TableOfContents", function() {
	var $el, $testArea;

	beforeEach(function() {
		$("body").append("<ul id=\"toc-test\"></ul>");

		$el = $("#toc-test");
		$testArea = $("#test-area");
	});

	afterEach(function() {
		$el.remove();
		$testArea.empty();
	});

	it("makes a flat list from headings", function() {
		var headings = [
			"<h2>Usage</h2>",
			"<h2>Install</h2>",
			"<h2>Configure</h2>",
			"<h2>Configure</h2>"
		];

		$testArea.html(headings.join(""));

		new TableOfContents($el.get(0), {
			tagName: "ul",
			depth: 1,
			headingsContainerSelector: "#test-area"
		});

		assert.equal($el.html(), [
			'<li><a href="#usage">Usage</a></li>',
			'<li><a href="#install">Install</a></li>',
			'<li><a href="#configure">Configure</a></li>',
			'<li><a href="#configure-1">Configure</a></li>'
		].join(""));
	});

	it("makes nested lists from headings hierarchy", function() {
		var headings = [
			"<h2>Bower</h2>",
			"<h3>Install</h3>",
			"<h2>NPM</h2>",
			"<h3>Install</h3>",
			"<h4>Configure</h4>",
			"<h2>Writing Modules</h2>",
		];

		$testArea.html(headings.join(""));

		new TableOfContents($el.get(0), {
			tagName: "ul",
			depth: 3,
			headingsContainerSelector: "#test-area"
		});

		assert.equal($el.find(">li:eq(0) ul").length, 1, "bower has a nested list");
		assert.equal($el.find(">li:eq(1) ul").length, 2, "npm two nested lists");
		assert.equal($el.find(">li:eq(2) ul").length, 0, "writing modules has no nested lists");
	});

	it("nests lists based on DEPTH value", function() {
		var headings = [
			"<h2>Bower</h2>",
			"<h3>Install</h3>",
			"<h2>NPM</h2>",
			"<h3>Install</h3>",
			"<h4>Configure</h4>",
			"<h2>Writing Modules</h2>"
		];

		$testArea.html(headings.join(""));

		new TableOfContents($el.get(0), {
			tagName: "ul",
			depth: 1,
			headingsContainerSelector: "#test-area"
		});

		assert.equal($el.html(), [
			'<li><a href="#bower">Bower</a></li>',
			'<li><a href="#npm">NPM</a></li>',
			'<li><a href="#writing-modules">Writing Modules</a></li>'
		].join(""));
	});
});
