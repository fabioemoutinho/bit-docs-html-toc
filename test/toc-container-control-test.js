var $ = require("jquery");
var assert = require("chai/chai").assert;
var TOCContainer = require("../prev-next-container-control");

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
});
