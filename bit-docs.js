var tags = require("./tags");

/**
 * @module {function} bit-docs-html-toc
 * @parent plugins
 *
 * @description Injects a table of contents for the page into an HTML element.
 *
 * @body
 *
 * TBD
 */
module.exports = function(bitDocs) {
	var pkg = require("./package.json");

	var dependencies = {};
	dependencies[pkg.name] = pkg.version;

	bitDocs.register("html", {
		dependencies: dependencies
	});

	bitDocs.register("tags", tags);
};
