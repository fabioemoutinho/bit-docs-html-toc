require("./prev-next-control");

// this is legacy
var PrevNextControl = function(el){
	el.style.display = "none";

	var prevNext = document.createElement("bit-prev-next");
	prevNext.className = "on-this-page";
	if(el.append) {
		el.append(prevNext);
	} else {
		el.appendChild(prevNext);
	}
};

module.exports = PrevNextControl;
