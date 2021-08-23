/**
 * @parent plugins
 * @module {function} bit-docs-html-prev-next
 * @group bit-docs-html-prev-next/static static
 *
 * @description Injects a table of contents for the page into an HTML element.
 *
 * @body
 *
 * This plugin registers onto these hooks:
 *   - `html`
 * 
 * Registering the `html` hook adds a static JavaScript file used to hydrate
 * the table of contents [bit-docs-html-prev-next/prev-next.js].
 */
module.exports = function(bitDocs) {
	var pkg = require("./package.json");

	var dependencies = {};
	dependencies[pkg.name] = pkg.version;

	bitDocs.register("html", {
		dependencies: dependencies
	});
};
