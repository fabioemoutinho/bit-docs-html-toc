var tags = require("./tags");

module.exports = function(bitDocs) {
	var pkg = require("./package.json");

	var dependencies = {};
	dependencies[pkg.name] = pkg.version;

	bitDocs.register("html", {
		dependencies: dependencies
	});

	bitDocs.register("tags", tags);
};
