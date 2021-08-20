var $ = require("jquery");
var assert = require("chai/chai").assert;
var TableOfContents = require("../prev-next-control");
var safeCustomElement = require("../safe-custom-element");

require("steal-mocha");

describe("TableOfContents", function() {
	if(!safeCustomElement.supported) {
		return;
	}
	var $el, $testArea;

	beforeEach(function() {
		$testArea = $("#test-area");

	});

	afterEach(function() {
		$testArea.empty();
	});
});
