var TOCContainer =  require("./toc-container-control");

var el = document.getElementsByClassName("on-this-page-container");

if (el.length) {
	new TOCContainer(el.item(0));
} else {
	console.log("An element with class 'on-this-page-container' is required");
}
