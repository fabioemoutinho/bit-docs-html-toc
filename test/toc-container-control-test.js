var $ = require("jquery");
var assert = require("chai/chai").assert;
var TOCContainer = require("../toc-container-control");

require("steal-mocha");

describe("TOCContainer", function() {
	var $el, $testArea;

	beforeEach(function() {
		$("body").append('<div id="toc-container"></div>');

		$el = $("#toc-container");
		$testArea = $("#test-area");
	});

	afterEach(function() {
		$el.remove();
		$testArea.empty();
	});

	it("by default gets headings from 'article' children", function() {
		var headings = [
			'<article>',
				"<h2>Usage</h2>",
				"<h2>Install</h2>",
				"<h2>Configure</h2>",
			"</article>"
		];

		// append the headings to the DOM and then instantiate the control
		$("body").append(headings.join(""));
		new TOCContainer($el.get(0));

		var $items = $("#toc-container ul");
		assert.equal(
			$items.html(),
			[
				'<li><a href="#usage">Usage</a></li>',
				'<li><a href="#install">Install</a></li>',
				'<li><a href="#configure">Configure</a></li>',
			].join(""),
			"should create table of contents from the headings inside container"
		);

		// remove headings container from the DOM
		$("article").remove();
	});

	it("reads the headings container selector from the element", function() {
		// set the container selector as a data-* attribute
		$el.attr(
			"data-headings-container-selector",
			".my-custom-container"
		);

		var headings = [
			'<div class="my-custom-container">',
				"<h2>Usage</h2>",
				"<h2>Install</h2>",
				"<h2>Configure</h2>",
				"<h2>Configure</h2>",
			"</div>"
		];

		// append the headings to the DOM and then instantiate the control
		$("body").append(headings.join(""));
		new TOCContainer($el.get(0));

		var $items = $("#toc-container ul");
		assert.equal(
			$items.html(),
			[
				'<li><a href="#usage">Usage</a></li>',
				'<li><a href="#install">Install</a></li>',
				'<li><a href="#configure">Configure</a></li>',
				'<li><a href="#configure-1">Configure</a></li>'
			].join(""),
			"should create table of contents from the headings inside container"
		);

		// remove headings container from the DOM
		$(".my-custom-container").remove();
	});
});
