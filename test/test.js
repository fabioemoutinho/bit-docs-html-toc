var $ = require("jquery");
var assert = require("chai/chai").assert;

require("steal-mocha");

describe("TableOfContents", function() {
	var $testArea;

	beforeEach(function() {
		$testArea = $("#test-area");
	});

	afterEach(function() {
		$testArea.empty();
	});
});
