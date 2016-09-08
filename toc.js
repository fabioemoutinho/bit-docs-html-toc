var stache = require("can-stache");
require("can-stache-bindings");
var Control = require("can-control");

var template = stache("{{#each titles}}" +
	"<li><a ($click)='scrollTo(., %event)' href='#{{id}}'>{{text}}</a></li>" +
	"{{/each}}");

function throttle(fn, ms){
	var wait = false;
	return function(){
		if(!wait) {
			wait = true;
			var val = fn.apply(this, arguments);
			setTimeout(function(){
				wait = false;
			}, ms);
			return val;
		}
	};
}

function outerHeight(el) {
  var height = el.offsetHeight;
  var style = getComputedStyle(el);

  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}

var TableOfContents = Control.extend({
	init: function(el, options){
		this.scroller = document.body;
		this.container = this.element.parentNode;

		var depth = window.docObject.outline && window.docObject.outline.depth;
		this.depth = typeof depth === "number" ? depth : 1;

		this.navHeight = this.getNavHeight();
		this.titles = this.collectTitles();

		// If there are no titles, bail
		if(!this.titles.length) {
			el.parentNode.removeChild(el);
			return;
		} else {
			el.parentNode.style.display = 'block';
		}
		this.titleIndex = 0;
		this.calculateActive();

		// Append our template
		var toc = this;
		this.element.appendChild(template({
			titles: this.titles,
			scrollTo: function(item, ev){
				ev.preventDefault();
				toc.disabled(true);
				var pos = item.pos + toc.TOCHeight;
				window.scrollTo(0, pos + 1);
				toc.calculateActive();

				requestAnimationFrame(function(){
					toc.disabled(false);
				});
			}
		}));
		this.setActive(this.titleIndex);
		this.TOCHeight = this.getTOCHeight();
		this.container.style.height = this.TOCHeight + 'px';

		// Wait until we've appended the TOC so it can be part of the calculation
		this.fixed(!this.isFirstTitleVisible());

		window.addEventListener("scroll", this);
	},

	getNavHeight: function(){
		var nav = document.querySelector(".navbar");
		return nav.clientHeight;
	},

	getTOCHeight: function(){
		return outerHeight(this.element);
	},

	isFirstTitleVisible: function(){
		var firstPosition = this.titles[0].pos + this.element.clientHeight +
			this.navHeight;
		return firstPosition > this.scroller.scrollTop;
	},

	collectTitles: function(){
		var selector = this.getHeadings().map(function(h){
			return "article " + h;
		}).join(",");

		var titles = selector ? document.querySelectorAll(selector) : [];
		var curScroll = this.scroller.scrollTop;
		var navHeight = this.navHeight;
		return [].map.call(titles, function(title, idx){
			var txt = title.textContent;
			title.id = 'sig_' + txt.replace(/\s/g,"").replace(/[^\w]/g,"_");
			return {
				id: title.id,
				index: idx,
				text: txt,
				pos: title.getBoundingClientRect().top + curScroll - navHeight
			};
		});
	},

	getHeadings: function(){
		var headings = [];
		for(var i = 0; i < this.depth; i++) {
			headings.push("h" + (i + 2));
		}
		return headings;
	},

	fixed: function(fixed){
		if(fixed === this._fixed) {
			return;
		}
		this._fixed = fixed;
		this.element.classList[fixed ? "add" : "remove"]("fixed");
	},

	disabled: function(disabled){
		this.element.classList[disabled ? "add" : "remove"]("disabled");
	},

	getTitle: function(idx){
		return this.titles[idx] || {};
	},

	setActive: function(idx){
		var lastIndex = this.titleIndex;
		var lis = this.element.querySelectorAll("li");
		[].forEach.call(lis, function(li, index){
			li.classList[index === idx ? "add" : "remove"]("active");
		});
		this.titleIndex = idx;
	},

	handleEvent: throttle(function(ev){
		switch(ev.type){
			case "scroll":
				this.handleScroll(ev);
				break;
		}
	}, 20),

	handleScroll: function(ev){
		// Determine if we should show the TOC
		this.fixed(!this.isFirstTitleVisible());

		this.calculateActive();
	},

	calculateActive: function(){
		var scrollTop = this.scroller.scrollTop;
		var TOCHeight = this.TOCHeight;

		// Determine which h2 should be showing
		var prev = this.getTitle(this.titleIndex);
		var next = this.getTitle(this.titleIndex + 1);

		// See if we need to jump to the next when scrolling down
		var cur, nextPos = next.pos + TOCHeight;
		while(scrollTop > nextPos) {
			cur = next;
			next = this.getTitle(cur.index + 1);
			nextPos = next.pos + TOCHeight;
		}

		// See if we need to move to the previous when scrolling up
		if(!cur) {
			var curPos;
			do {
				cur = prev;
				curPos = cur.pos + TOCHeight;
				prev = this.getTitle(prev.index - 1);
			} while(scrollTop < curPos);
		}

		if(typeof cur.pos !== "undefined") {
			this.setActive(cur.index);
		}
	}
});

var TOCContainer = Control.extend({
	init: function(el){
		el.style.display = 'none';

		var toc = document.createElement("ul");
		toc.className = "on-this-page";
		el.appendChild(toc);

		new TableOfContents(toc);
	}
});

new TOCContainer(
	document.getElementsByClassName("on-this-page-container")[0]
);
